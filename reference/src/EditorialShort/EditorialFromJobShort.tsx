import { AbsoluteFill } from "remotion";
import active from "../generated/active-job.json";
import type { SceneCut } from "../engine/clock";
import { EditorialShort } from "./Short";
import {
  editorialJobToConfig,
  type EditorialJob,
} from "./fromJob";
import { DEMO_EDITORIAL_ICONS } from "./demos";

/**
 * editorial-warm composition driven by active-job.json
 * (npm run clock -- jobs/editorial-*.job.json).
 */
export const EditorialFromJobShort: React.FC = () => {
  const mode = (active as { mode?: string }).mode ?? active.job?.meta?.mode;
  const job = active.job as unknown as EditorialJob;
  const cuts = active.cuts as SceneCut;
  const fps = active.fps ?? 30;

  if (mode !== "editorial-warm") {
    return (
      <AbsoluteFill
        style={{
          background: "#000",
          color: "#F7F4EB",
          padding: 48,
          fontSize: 28,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        EditorialFromJobShort expects meta.mode=editorial-warm.
        {"\n"}Run: npm run clock -- jobs/editorial-icons.job.json
      </AbsoluteFill>
    );
  }

  const config = editorialJobToConfig(job, cuts, fps);
  return <EditorialShort config={config} />;
};

/** Fallback duration when active job is not editorial */
export const editorialFromJobDuration = () => {
  const mode = (active as { mode?: string }).mode ?? active.job?.meta?.mode;
  if (mode === "editorial-warm" && active.cuts?.end) {
    return active.cuts.end as number;
  }
  return DEMO_EDITORIAL_ICONS.durationInFrames ?? 450;
};
