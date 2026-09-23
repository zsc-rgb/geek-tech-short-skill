import { AbsoluteFill } from "remotion";
import active from "../generated/active-job.json";
import type { SceneCut, JobScene } from "../engine/clock";
import { ArchitectureFlowStage } from "../archetypes/ArchitectureFlowStage";
import type { PlatformId } from "../engine/theme";

type AnyJob = {
  meta: { archetype: string; platform: string };
  content: {
    hook: { headline: string; metric: { value: number; unit: string } };
    body: Record<string, any>;
    cta: { headline: string; principles: string[]; badge: string };
  };
};

export const ArchitectureFlowShort: React.FC = () => {
  const cuts = active.cuts as SceneCut;
  const scenes = active.scenes as JobScene[];
  const job = active.job as AnyJob;
  if (job.meta.archetype !== "architecture-flow") {
    return (
      <AbsoluteFill style={{ background: "#070A10", color: "#fff", padding: 40 }}>
        Run: npm run clock -- jobs/architecture-flow.job.json
      </AbsoluteFill>
    );
  }
  return (
    <ArchitectureFlowStage
      cuts={cuts}
      platform={job.meta.platform as PlatformId}
      fps={active.fps}
      scenes={scenes}
      headline={job.content.hook.headline}
      metricValue={job.content.hook.metric.value}
      metricUnit={job.content.hook.metric.unit}
      nodes={job.content.body.graph?.nodes ?? []}
      edges={job.content.body.graph?.edges ?? []}
      ctaHeadline={job.content.cta.headline}
      principles={job.content.cta.principles}
      badge={job.content.cta.badge}
    />
  );
};
