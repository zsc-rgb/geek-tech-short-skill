import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";
import { MetaphorShell, phaseAt } from "./MetaphorShell";

export type Contender = { id: string; label: string; target: number };

export const BarRace: React.FC<{
  cuts: SceneCut;
  width: number;
  contenders: Contender[];
  unit?: string;
}> = ({ cuts, width, contenders, unit = "QPS" }) => {
  const frame = useCurrentFrame();
  const phase = phaseAt(frame, cuts);
  const progress =
    phase === "standby"
      ? 0.08
      : phase === "active"
        ? interpolate(frame, [cuts.hookEnd, cuts.analyzeEnd], [0.15, 0.85], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : 1;

  const max = Math.max(...contenders.map((c) => c.target), 1);
  const winnerId =
    phase === "resolved"
      ? contenders.reduce((a, b) => (a.target >= b.target ? a : b)).id
      : null;

  return (
    <MetaphorShell cuts={cuts} width={width} title={`Benchmark · ${unit}`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, height: "100%", justifyContent: "center" }}>
        {contenders.map((c, i) => {
          const value = c.target * progress * (0.85 + (i % 3) * 0.05);
          const pct = (value / max) * 100;
          const win = winnerId === c.id;
          const color = win ? THEME.success : phase === "active" ? THEME.cursor : THEME.muted;
          return (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 88, color: THEME.muted, fontSize: 16 }}>{c.label}</div>
              <div style={{ flex: 1, height: 18, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: color,
                    boxShadow: win ? `0 0 12px ${THEME.success}` : "none",
                  }}
                />
              </div>
              <div style={{ width: 64, textAlign: "right", color, fontFamily: "ui-monospace, monospace" }}>
                {Math.round(value)}
              </div>
            </div>
          );
        })}
      </div>
    </MetaphorShell>
  );
};
