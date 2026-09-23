import { Composition } from "remotion";
import active from "./generated/active-job.json";
import { CodeRefactorShort } from "./compositions/CodeRefactorShort";
import { ArchitectureFlowShort } from "./compositions/ArchitectureFlowShort";
import { BenchmarkRaceShort } from "./compositions/BenchmarkRaceShort";
import {
  EditorialShort,
  DEMO_EDITORIAL_FLOW,
  DEMO_EDITORIAL_ICONS,
  DEMO_EDITORIAL_TABLE,
} from "./EditorialShort";

const fps = 30;
const fallbackDuration = 660;

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
      />
      <Composition
        id="ArchitectureFlowShort"
        component={ArchitectureFlowShort}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
      />
      <Composition
        id="BenchmarkRaceShort"
        component={BenchmarkRaceShort}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
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
    </>
  );
};
