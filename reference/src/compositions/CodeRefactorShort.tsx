import { AbsoluteFill } from "remotion";
import active from "../generated/active-job.json";
import type { SceneCut, JobScene } from "../engine/clock";
import { CodeRefactorStage } from "../archetypes/CodeRefactorStage";
import type { MetaphorType } from "../metaphors";
import type { PlatformId } from "../engine/theme";

type AnyJob = {
  meta: { archetype?: string; platform: string; mode?: string };
  content: {
    hook: { headline: string; metric: { value: number; unit: string } };
    body: Record<string, any>;
    cta: { headline: string; principles: string[]; badge: string };
  };
};

export const CodeRefactorShort: React.FC = () => {
  const cuts = active.cuts as SceneCut;
  const scenes = active.scenes as JobScene[];
  const job = active.job as unknown as AnyJob;
  if (job.meta.archetype !== "code-refactor") {
    return (
      <AbsoluteFill style={{ background: "#070A10", color: "#fff", padding: 40 }}>
        Run: npm run clock -- jobs/code-refactor.job.json
      </AbsoluteFill>
    );
  }
  return (
    <CodeRefactorStage
      cuts={cuts}
      platform={job.meta.platform as PlatformId}
      fps={active.fps}
      scenes={scenes}
      headline={job.content.hook.headline}
      metricValue={job.content.hook.metric.value}
      metricUnit={job.content.hook.metric.unit}
      bad={String(job.content.body.code?.bad ?? "")}
      good={String(job.content.body.code?.good ?? "")}
      metaphorType={(job.content.body.metaphor?.type ?? "io-congestion") as MetaphorType}
      metaphorParams={job.content.body.metaphor?.params}
      ctaHeadline={job.content.cta.headline}
      principles={job.content.cta.principles}
      badge={job.content.cta.badge}
    />
  );
};
