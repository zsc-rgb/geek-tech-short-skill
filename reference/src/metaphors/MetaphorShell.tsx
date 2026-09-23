import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";

export type MetaphorPhase = "standby" | "active" | "resolved";

export const phaseAt = (frame: number, cuts: SceneCut): MetaphorPhase => {
  if (frame < cuts.hookEnd) return "standby";
  if (frame < cuts.analyzeEnd) return "active";
  return "resolved";
};

type ShellProps = {
  cuts: SceneCut;
  width: number;
  title: string;
  children: React.ReactNode;
};

export const MetaphorShell: React.FC<ShellProps> = ({
  cuts,
  width,
  title,
  children,
}) => {
  const frame = useCurrentFrame();
  const phase = phaseAt(frame, cuts);
  const awaken = interpolate(frame, [cuts.hookEnd, cuts.hookEnd + 12], [0.32, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(frame, [cuts.resolveEnd, cuts.resolveEnd + 15], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [cuts.resolveEnd, cuts.resolveEnd + 15], [0, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const accent =
    phase === "standby"
      ? THEME.mutedDim
      : phase === "active"
        ? THEME.danger
        : THEME.success;

  if (exit <= 0.01) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 1020,
        width,
        transform: `translateX(-50%) translateY(${exitY}px)`,
        opacity: (phase === "standby" ? 0.32 : awaken) * exit,
        border: `2px solid ${accent}`,
        borderRadius: 16,
        background: THEME.panel,
        padding: "14px 18px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          color: THEME.muted,
          fontSize: 18,
          marginBottom: 10,
          fontFamily: "ui-sans-serif, system-ui",
        }}
      >
        {phase === "standby" ? `监控待命 · ${title}` : title}
      </div>
      <div style={{ height: 160 }}>{children}</div>
    </div>
  );
};
