import { useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";
import { MetaphorShell, phaseAt } from "./MetaphorShell";

export const IoCongestion: React.FC<{
  cuts: SceneCut;
  width: number;
  from?: number;
  to?: number;
}> = ({ cuts, width, from = 100, to = 1 }) => {
  const frame = useCurrentFrame();
  const phase = phaseAt(frame, cuts);
  const cols = phase === "resolved" ? Math.min(4, to) : phase === "standby" ? 4 : 14;
  const accent =
    phase === "resolved" ? THEME.success : phase === "active" ? THEME.danger : THEME.mutedDim;

  return (
    <MetaphorShell cuts={cuts} width={width} title={phase === "resolved" ? `IO × ${to}` : `IO × ${from}`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, height: "100%" }}>
        {Array.from({ length: 7 }).map((_, r) => (
          <div key={r} style={{ display: "flex", gap: 3, flex: 1 }}>
            {Array.from({ length: cols }).map((__, c) => {
              const lag = (r * 3 + c * 2 + frame) % 20;
              const on = phase === "standby" ? 0.25 : lag < 12 ? 0.45 + (lag / 12) * 0.55 : 0.2;
              return (
                <div
                  key={c}
                  style={{
                    flex: 1,
                    borderRadius: 2,
                    background: accent,
                    opacity: on,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </MetaphorShell>
  );
};
