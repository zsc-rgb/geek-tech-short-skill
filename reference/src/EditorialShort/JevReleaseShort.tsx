import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { EditorialShort } from "./Short";
import {
  JEV_VISUAL_BY_ID,
  subtitlesFromNarration,
  DEMO_JEV_HOOK,
  DEMO_JEV_TYPES,
  DEMO_JEV_TAKEAWAY,
} from "./demos";
import type { EditorialVideoConfig } from "./types";
import clockFallback from "../generated/jev-clock.json";

type JevClock = {
  fps: number;
  totalFrames: number;
  /** tts | off | file — when off, scenes have empty audio */
  narration?: "tts" | "off" | "file" | null;
  voice?: string | null;
  scenes: Array<{
    id: string;
    audio: string;
    narration: string;
    from: number;
    durationInFrames: number;
  }>;
};

const clock = clockFallback as JevClock;

/** Fallback if TTS clock not generated yet (~22s silent) */
export const JEV_RELEASE_DURATION = clock.totalFrames || 660;

const withSubs = (
  visual: EditorialVideoConfig,
  narration: string,
  durationInFrames: number,
): EditorialVideoConfig => ({
  ...visual,
  durationInFrames,
  subtitles: subtitlesFromNarration(narration, durationInFrames),
});

export const JevReleaseShort: React.FC = () => {
  const scenes =
    clock.scenes?.length > 0
      ? clock.scenes
      : [
          {
            id: "hook",
            audio: "",
            narration: DEMO_JEV_HOOK.subtitles?.[0]?.text ?? "",
            from: 0,
            durationInFrames: 220,
          },
          {
            id: "types",
            audio: "",
            narration: "",
            from: 220,
            durationInFrames: 240,
          },
          {
            id: "cta",
            audio: "",
            narration: "",
            from: 460,
            durationInFrames: 200,
          },
        ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {scenes.map((scene) => {
        const visual = JEV_VISUAL_BY_ID[scene.id] ?? DEMO_JEV_TYPES;
        const config = withSubs(visual, scene.narration, scene.durationInFrames);
        return (
          <Sequence
            key={`${scene.id}-${scene.from}`}
            from={scene.from}
            durationInFrames={scene.durationInFrames}
          >
            <EditorialShort config={config} />
            {scene.audio ? (
              <Audio src={staticFile(scene.audio)} volume={1} />
            ) : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export { DEMO_JEV_HOOK, DEMO_JEV_TYPES, DEMO_JEV_TAKEAWAY };
