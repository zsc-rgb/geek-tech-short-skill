import { Composition, CalculateMetadataFunction } from "remotion";
import active from "./generated/active-job.json";
import { CodeRefactorShort } from "./compositions/CodeRefactorShort";
import { ArchitectureFlowShort } from "./compositions/ArchitectureFlowShort";
import { BenchmarkRaceShort } from "./compositions/BenchmarkRaceShort";
import {
  EditorialShort,
  DEMO_EDITORIAL_FLOW,
  DEMO_EDITORIAL_ICONS,
  DEMO_EDITORIAL_TABLE,
  JevReleaseShort,
  JEV_RELEASE_DURATION,
} from "./EditorialShort";

const fps = 30;
const fallbackDuration = 660;

/** Geek-Dark durations always come from derived cuts (active-job.json). */
const geekCalculateMetadata: CalculateMetadataFunction<Record<string, unknown>> =
  async () => {
    const durationInFrames = Math.max(
      active?.cuts?.end ?? fallbackDuration,
      30,
    );
    return {
      durationInFrames,
      fps: active?.fps ?? fps,
      props: {},
    };
  };

export const RemotionRoot: React.FC = () => {
  const durationInFrames = active?.cuts?.end ?? fallbackDuration;

  return (
    <>
      <Composition
        id="CodeRefactorShort"
        component={CodeRefactorShort}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
        calculateMetadata={geekCalculateMetadata}
      />
      <Composition
        id="ArchitectureFlowShort"
        component={ArchitectureFlowShort}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
        calculateMetadata={geekCalculateMetadata}
      />
      <Composition
        id="BenchmarkRaceShort"
        component={BenchmarkRaceShort}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
        calculateMetadata={geekCalculateMetadata}
      />

      {/* Warm Editorial / Notion Canvas */}
      <Composition
        id="EditorialTableShort"
        component={EditorialShort}
        durationInFrames={DEMO_EDITORIAL_TABLE.durationInFrames ?? 450}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{ config: DEMO_EDITORIAL_TABLE }}
      />
      <Composition
        id="EditorialIconGridShort"
        component={EditorialShort}
        durationInFrames={DEMO_EDITORIAL_ICONS.durationInFrames ?? 450}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{ config: DEMO_EDITORIAL_ICONS }}
      />
      <Composition
        id="EditorialFlowShort"
        component={EditorialShort}
        durationInFrames={DEMO_EDITORIAL_FLOW.durationInFrames ?? 450}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{ config: DEMO_EDITORIAL_FLOW }}
      />
      <Composition
        id="JevReleaseShort"
        component={JevReleaseShort}
        durationInFrames={JEV_RELEASE_DURATION}
        fps={fps}
        width={1080}
        height={1920}
        calculateMetadata={async () => ({
          durationInFrames: JEV_RELEASE_DURATION,
          fps,
        })}
      />
    </>
  );
};
