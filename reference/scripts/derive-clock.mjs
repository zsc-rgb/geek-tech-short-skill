/**
 * Derive SCENE cuts from job.json scenes[].startMs/endMs
 * Usage: node scripts/derive-clock.mjs [jobs/xxx.job.json]
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

const msToFrame = (ms) => Math.max(0, Math.floor((ms / 1000) * fps));

const endOf = (beat) => {
  const list = scenes.filter((s) => s.beat === beat);
  if (!list.length) return 0;
  return Math.max(...list.map((s) => msToFrame(s.endMs ?? s.startMs ?? 0)));
};

const hookEnd = endOf("hook") || 120;
const analyzeEnd = endOf("analyze") || Math.max(hookEnd + 180, 300);
const resolveEnd = endOf("resolve") || Math.max(analyzeEnd + 180, 520);
const last = Math.max(...scenes.map((s) => msToFrame(s.endMs ?? 0)), resolveEnd);
const end = last + msToFrame(paddingBackMs);
const climaxFrame = analyzeEnd + Math.round((resolveEnd - analyzeEnd) * 0.4);

const out = {
  sourceJob: path.relative(root, jobPath).replace(/\\/g, "/"),
  fps,
  clock: job.meta?.clock ?? "dynamic",
  cuts: { hookEnd, analyzeEnd, resolveEnd, end, climaxFrame },
  scenes,
  job,
};

const genDir = path.join(root, "src", "generated");
fs.mkdirSync(genDir, { recursive: true });
fs.writeFileSync(path.join(genDir, "active-job.json"), JSON.stringify(out, null, 2));
console.log(
  `Wrote src/generated/active-job.json  cuts=${JSON.stringify(out.cuts)}  from ${out.sourceJob}`,
);
