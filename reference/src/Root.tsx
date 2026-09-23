import { Composition } from "remotion";
import active from "./generated/active-job.json";
import { CodeRefactorShort } from "./compositions/CodeRefactorShort";
import { ArchitectureFlowShort } from "./compositions/ArchitectureFlowShort";
import { BenchmarkRaceShort } from "./compositions/BenchmarkRaceShort";

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
    </>
  );
};
