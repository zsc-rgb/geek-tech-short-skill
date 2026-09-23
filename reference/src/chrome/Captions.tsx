import { useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { JobScene } from "../engine/clock";

export const Captions: React.FC<{
  scenes: JobScene[];
  fps: number;
  safeBottom: number;
}> = ({ scenes, fps, safeBottom }) => {
  const frame = useCurrentFrame();
  const ms = (frame / fps) * 1000;
  const active =
    scenes.find((s) => ms >= (s.startMs ?? 0) && ms < (s.endMs ?? 0)) ??
    scenes[scenes.length - 1];

  if (!active?.text) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        bottom: safeBottom,
        textAlign: "center",
        color: THEME.text,
        fontSize: 36,
        fontWeight: 800,
        lineHeight: 1.35,
        textShadow: "0 1px 2px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      {active.text}
    </div>
  );
};
