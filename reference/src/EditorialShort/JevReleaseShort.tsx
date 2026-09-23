import { AbsoluteFill, Sequence } from "remotion";
import { EditorialShort } from "./Short";
import {
  DEMO_JEV_HOOK,
  DEMO_JEV_TAKEAWAY,
  DEMO_JEV_TYPES,
} from "./demos";

/** ~22s Warm Editorial release short: LangChain × Jev */
export const JEV_RELEASE_DURATION =
  (DEMO_JEV_HOOK.durationInFrames ?? 210) +
  (DEMO_JEV_TYPES.durationInFrames ?? 240) +
  (DEMO_JEV_TAKEAWAY.durationInFrames ?? 210);

export const JevReleaseShort: React.FC = () => {
  const hook = DEMO_JEV_HOOK.durationInFrames ?? 210;
  const types = DEMO_JEV_TYPES.durationInFrames ?? 240;
  const takeaway = DEMO_JEV_TAKEAWAY.durationInFrames ?? 210;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence from={0} durationInFrames={hook}>
        <EditorialShort config={DEMO_JEV_HOOK} />
      </Sequence>
      <Sequence from={hook} durationInFrames={types}>
        <EditorialShort config={DEMO_JEV_TYPES} />
      </Sequence>
      <Sequence from={hook + types} durationInFrames={takeaway}>
        <EditorialShort config={DEMO_JEV_TAKEAWAY} />
      </Sequence>
    </AbsoluteFill>
  );
};
