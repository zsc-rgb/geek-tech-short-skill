import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";

export const HookMetric: React.FC<{
  cuts: SceneCut;
  value: number;
  unit: string;
  headline: string;
  cardWidth: number;
}> = ({ cuts, value, unit, headline, cardWidth }) => {
  const frame = useCurrentFrame();
  const breath = interpolate(Math.sin(frame / 8), [-1, 1], [0.92, 1.08]);
  const done = frame >= cuts.analyzeEnd;
  const display = done
    ? Math.round(
        interpolate(frame, [cuts.analyzeEnd, cuts.analyzeEnd + 36], [value, Math.max(1, value * 0.005)], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      )
    : value;
  const accent = done ? THEME.success : THEME.danger;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 48,
        width: cardWidth,
        transform: "translateX(-50%)",
        border: `2px solid ${accent}`,
        borderRadius: 16,
        background: THEME.panelSolid,
        padding: "18px 22px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ color: THEME.muted, fontSize: 20, marginBottom: 8 }}>{headline}</div>
      <div
        style={{
          color: accent,
          fontSize: 52,
          fontWeight: 800,
          fontFamily: "ui-monospace, monospace",
          transform: `scale(${done ? 1 : breath})`,
          transformOrigin: "left center",
          textShadow: `0 0 18px ${accent}`,
        }}
      >
        {display}
        <span style={{ fontSize: 22, marginLeft: 8 }}>{unit}</span>
      </div>
    </div>
  );
};
