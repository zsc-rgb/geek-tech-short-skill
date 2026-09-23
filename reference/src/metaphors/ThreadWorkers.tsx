import { useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";
import { MetaphorShell, phaseAt } from "./MetaphorShell";

export const ThreadWorkers: React.FC<{
  cuts: SceneCut;
  width: number;
  workers?: number;
}> = ({ cuts, width, workers = 6 }) => {
  const frame = useCurrentFrame();
  const phase = phaseAt(frame, cuts);

  return (
    <MetaphorShell
      cuts={cuts}
      width={width}
      title={phase === "resolved" ? "Pool Healthy" : "Workers Starved"}
    >
      <div style={{ display: "flex", gap: 10, height: "100%", alignItems: "center" }}>
        {Array.from({ length: workers }).map((_, i) => {
          const busy = phase === "active" && (frame + i * 5) % 17 > 6;
          const ok = phase === "resolved";
          const color = ok ? THEME.success : busy ? THEME.danger : THEME.mutedDim;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: 72,
                borderRadius: 10,
                border: `2px solid ${color}`,
                background: ok ? THEME.successSoft : busy ? THEME.dangerSoft : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color,
                fontFamily: "ui-monospace, monospace",
                fontSize: 16,
              }}
            >
              {ok ? "✓" : busy ? "…" : "idle"}
            </div>
          );
        })}
      </div>
    </MetaphorShell>
  );
};
