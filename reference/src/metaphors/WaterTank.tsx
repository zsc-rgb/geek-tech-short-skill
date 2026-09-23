import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";
import { MetaphorShell, phaseAt } from "./MetaphorShell";

export const WaterTank: React.FC<{
  cuts: SceneCut;
  width: number;
  overflowAt?: number;
}> = ({ cuts, width, overflowAt = 0.92 }) => {
  const frame = useCurrentFrame();
  const phase = phaseAt(frame, cuts);
  const fill =
    phase === "standby"
      ? 0.12
      : phase === "active"
        ? interpolate(frame, [cuts.hookEnd, cuts.analyzeEnd], [0.2, overflowAt], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : interpolate(frame, [cuts.analyzeEnd, cuts.analyzeEnd + 40], [overflowAt, 0.28], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
  const accent = fill > 0.85 ? THEME.danger : phase === "resolved" ? THEME.success : THEME.cursor;

  return (
    <MetaphorShell cuts={cuts} width={width} title="Heap / Memory">
      <div
        style={{
          position: "relative",
          height: "100%",
          border: `2px solid ${THEME.border}`,
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: `${fill * 100}%`,
            background: accent,
            opacity: 0.85,
            boxShadow: `0 0 24px ${accent}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 8,
            right: 8,
            top: `${(1 - overflowAt) * 100}%`,
            borderTop: `2px dashed ${THEME.danger}`,
            opacity: 0.7,
          }}
        />
      </div>
    </MetaphorShell>
  );
};
