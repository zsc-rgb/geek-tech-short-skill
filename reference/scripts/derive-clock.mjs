/**
 * Derive SCENE cuts from job.json scenes[].startMs/endMs
 * Usage: node scripts/derive-clock.mjs [jobs/xxx.job.json]
 *
 * Production: meta.clock=dynamic requires startMs/endMs on every scene.
 * Preview-only: meta.clock=static allows frame fallbacks (logged as WARN).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const jobPath = path.resolve(
  root,
  process.argv[2] || "jobs/code-refactor.job.json",
);

const job = JSON.parse(fs.readFileSync(jobPath, "utf8"));
const fps = job.config?.fps ?? 30;
const paddingBackMs = job.config?.paddingBackMs ?? 100;
const scenes = job.scenes ?? [];
const clockMode = job.meta?.clock ?? "dynamic";
const mode = job.meta?.mode ?? (job.meta?.archetype ? "geek-dark" : "editorial-warm");

const msToFrame = (ms) => Math.max(0, Math.floor((ms / 1000) * fps));

const missingMs = scenes.filter(
  (s) => s.startMs === undefined || s.endMs === undefined,
);
if (clockMode !== "static" && missingMs.length > 0) {
  console.error(
    `[derive-clock] REJECTED: clock=${clockMode} but scenes missing startMs/endMs: ${missingMs.map((s) => s.beat).join(", ")}`,
  );
  console.error(
    "Fill ms from TTS/Whisper, or set meta.clock to \"static\" for silent UI preview only.",
  );
  process.exit(1);
}
if (clockMode === "static") {
  console.warn(
    "[derive-clock] WARN: clock=static — frame fallbacks in use. Do not ship with narration.",
  );
}

const endOf = (beat) => {
  const list = scenes.filter((s) => s.beat === beat);
  if (!list.length) return 0;
  return Math.max(...list.map((s) => msToFrame(s.endMs ?? s.startMs ?? 0)));
};

const allowFallback = clockMode === "static";
const hookEnd = endOf("hook") || (allowFallback ? 120 : 0);
const analyzeEnd = endOf("analyze") || (allowFallback ? Math.max(hookEnd + 180, 300) : hookEnd);
const resolveEnd = endOf("resolve") || (allowFallback ? Math.max(analyzeEnd + 180, 520) : analyzeEnd);
const last = Math.max(...scenes.map((s) => msToFrame(s.endMs ?? 0)), resolveEnd);
const end = last + msToFrame(paddingBackMs);
const climaxFrame = analyzeEnd + Math.round((resolveEnd - analyzeEnd) * 0.4);

// Ensure mode is persisted on job copy
if (!job.meta) job.meta = {};
if (!job.meta.mode) job.meta.mode = mode;

const out = {
  sourceJob: path.relative(root, jobPath).replace(/\\/g, "/"),
  fps,
  clock: clockMode,
  mode: job.meta.mode,
  cuts: { hookEnd, analyzeEnd, resolveEnd, end, climaxFrame },
  scenes,
  job,
};

const genDir = path.join(root, "src", "generated");
fs.mkdirSync(genDir, { recursive: true });
fs.writeFileSync(path.join(genDir, "active-job.json"), JSON.stringify(out, null, 2));
console.log(
  `Wrote src/generated/active-job.json  mode=${out.mode} clock=${out.clock} cuts=${JSON.stringify(out.cuts)}  from ${out.sourceJob}`,
);
