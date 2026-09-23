import { AbsoluteFill } from "remotion";
import active from "../generated/active-job.json";
import type { SceneCut, JobScene } from "../engine/clock";
import { BenchmarkRaceStage } from "../archetypes/BenchmarkRaceStage";
import type { PlatformId } from "../engine/theme";

type AnyJob = {
  meta: { archetype: string; platform: string };
  content: {
    hook: { headline: string; metric: { value: number; unit: string } };
    body: Record<string, any>;
    cta: { headline: string; principles: string[]; badge: string };
  };
};

export const BenchmarkRaceShort: React.FC = () => {
  const cuts = active.cuts as SceneCut;
  const scenes = active.scenes as JobScene[];
  const job = active.job as AnyJob;
  if (job.meta.archetype !== "benchmark-race") {
    return (
      <AbsoluteFill style={{ background: "#070A10", color: "#fff", padding: 40 }}>
        Run: npm run clock -- jobs/benchmark-race.job.json
      </AbsoluteFill>
    );
  }
  return (
    <BenchmarkRaceStage
      cuts={cuts}
      platform={job.meta.platform as PlatformId}
      fps={active.fps}
      scenes={scenes}
      headline={job.content.hook.headline}
      metricValue={job.content.hook.metric.value}
      metricUnit={job.content.hook.metric.unit}
      contenders={job.content.body.race?.contenders ?? []}
      unit={String(job.content.body.race?.unit ?? "QPS")}
      terminalLines={job.content.body.terminalLines ?? []}
      ctaHeadline={job.content.cta.headline}
      principles={job.content.cta.principles}
      badge={job.content.cta.badge}
    />
  );
};
