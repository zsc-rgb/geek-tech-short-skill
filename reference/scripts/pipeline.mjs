/**
 * Production pipeline stub (dynamic clock first; TTS/Whisper hooks documented).
 *
 * Full path (install tools yourself):
 *   1) edge-tts / CosyVoice → public/scene-N.mp3
 *   2) faster-whisper → word timestamps → fill scenes[].startMs/endMs
 *   3) node scripts/derive-clock.mjs jobs/xxx.job.json
 *   4) npx remotion render <CompositionId> out/video.mp4
 *
 * This script runs step 3 for all jobs/ and prints next commands.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const jobsDir = path.join(root, "jobs");

const jobs = fs.readdirSync(jobsDir).filter((f) => f.endsWith(".job.json"));
for (const file of jobs) {
  const r = spawnSync(process.execPath, [path.join(__dirname, "derive-clock.mjs"), path.join("jobs", file)], {
    cwd: root,
    encoding: "utf8",
  });
  process.stdout.write(r.stdout || "");
  if (r.status !== 0) {
    process.stderr.write(r.stderr || "");
    process.exit(r.status ?? 1);
  }
}

console.log(`
Next:
  npm run render:code   # CodeRefactorShort
  npm run render:arch   # ArchitectureFlowShort
  npm run render:race   # BenchmarkRaceShort

TTS/Whisper (optional upgrade):
  edge-tts --voice zh-CN-YunjianNeural --text "..." --write-media public/scene-0.mp3
  # then write startMs/endMs back into jobs/*.job.json and re-run: npm run pipeline
`);
