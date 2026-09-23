/**
 * Edge-TTS for JevReleaseShort — writes public/jev/*.mp3 + src/generated/jev-clock.json
 *
 * Usage: node scripts/tts-jev.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync, spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public", "jev");
const generatedDir = path.join(root, "src", "generated");

const FPS = 30;
const VOICE = "zh-CN-YunjianNeural";
const RATE = "+12%";
const PAD_MS = 280;

/** Longer release script — one narration line per beat */
export const JEV_BEATS = [
  {
    id: "hook",
    narration:
      "Agent 循环里，每想一步、调一次工具，再想一步，都可能再烧一次大模型。工具调用已经结构化了，可分类和分流决策，往往还在用最贵的方式做。",
  },
  {
    id: "what",
    narration:
      "TypeSafe 的 Jev 是 System One 模型：它不聊天、不写长文，只吃一段 state，再回答你定义好的结构化问题，并给出概率。",
  },
  {
    id: "types",
    narration:
      "三种题型：Choice 多选、Score 分级、Noul 是否题。一次请求可并行多问。官方称在分类任务上最高约两百倍更快、四百倍更省。",
  },
  {
    id: "usecase",
    narration:
      "接到 LangChain 以后，常见两种用法：模型路由，简单任务走快模型、难题走强模型；还有 Auto Mode，在执行危险工具前先用 Jev 拦一道。",
  },
  {
    id: "cta",
    narration:
      "记住这套分工：开放推理留给大模型，结构化判定交给 Jev。点赞收藏，Agent Harness 里该放它的位置，就清楚了。",
  },
];

const sleep = (ms) => {
  spawnSync(process.execPath, ["-e", `Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,${ms})`], {
    stdio: "ignore",
  });
};

const mp3DurationMs = (file) => {
  const py = `
import sys
try:
  from mutagen.mp3 import MP3
  print(int(MP3(sys.argv[1]).info.length * 1000))
except Exception:
  # fallback: rough size estimate ~16kbps edge-tts often ~48-64kbps; prefer ffprobe
  import subprocess, json
  try:
    out = subprocess.check_output([
      "ffprobe","-v","quiet","-print_format","json","-show_format", sys.argv[1]
    ], text=True)
    print(int(float(json.loads(out)["format"]["duration"]) * 1000))
  except Exception:
    print(4000)
`;
  const r = spawnSync("python", ["-c", py, file], { encoding: "utf8" });
  const n = parseInt((r.stdout || "").trim(), 10);
  return Number.isFinite(n) && n > 500 ? n : 4000;
};

const ttsOne = (text, outFile) => {
  const args = [
    "-m",
    "edge_tts",
    "--voice",
    VOICE,
    "--rate",
    RATE,
    "--text",
    text,
    "--write-media",
    outFile,
  ];
  let lastErr;
  for (let i = 1; i <= 5; i++) {
    try {
      execFileSync("python", args, { cwd: root, stdio: "inherit" });
      if (fs.existsSync(outFile) && fs.statSync(outFile).size > 800) return;
    } catch (e) {
      lastErr = e;
      console.warn(`TTS retry ${i}/5 for ${path.basename(outFile)}`);
      sleep(1500 * i);
    }
  }
  throw lastErr ?? new Error(`TTS failed: ${outFile}`);
};

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(generatedDir, { recursive: true });

const scenes = [];
let cursorFrame = 0;

for (let i = 0; i < JEV_BEATS.length; i++) {
  const beat = JEV_BEATS[i];
  const audioRel = `jev/scene-${i}.mp3`;
  const outFile = path.join(publicDir, `scene-${i}.mp3`);
  console.log(`TTS [${beat.id}] → ${audioRel}`);
  ttsOne(beat.narration, outFile);
  const durMs = mp3DurationMs(outFile) + PAD_MS;
  const durationInFrames = Math.max(Math.ceil((durMs / 1000) * FPS), 90);
  scenes.push({
    id: beat.id,
    audio: audioRel,
    narration: beat.narration,
    from: cursorFrame,
    durationInFrames,
  });
  cursorFrame += durationInFrames;
}

const clock = {
  fps: FPS,
  voice: VOICE,
  rate: RATE,
  totalFrames: cursorFrame,
  scenes,
};

fs.writeFileSync(
  path.join(generatedDir, "jev-clock.json"),
  JSON.stringify(clock, null, 2),
  "utf8",
);

console.log(`\nDone. totalFrames=${cursorFrame} (~${(cursorFrame / FPS).toFixed(1)}s)`);
console.log(`Wrote src/generated/jev-clock.json`);
