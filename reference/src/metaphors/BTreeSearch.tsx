import { useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";
import { MetaphorShell, phaseAt } from "./MetaphorShell";

export const BTreeSearch: React.FC<{ cuts: SceneCut; width: number }> = ({
  cuts,
  width,
}) => {
  const frame = useCurrentFrame();
  const phase = phaseAt(frame, cuts);
  const scan = phase === "active";
  const hit = phase === "resolved";

  return (
    <MetaphorShell cuts={cuts} width={width} title={hit ? "Index Hit" : "Table Scan"}>
      <svg width="100%" height="100%" viewBox="0 0 360 140">
        {[40, 120, 200, 280].map((x, i) => (
          <g key={x}>
            <rect
              x={x}
              y={20}
              width={48}
              height={28}
              rx={6}
              fill={THEME.panelSolid}
              stroke={scan && i === Math.floor(frame / 8) % 4 ? THEME.danger : THEME.border}
              strokeWidth={2}
            />
            {scan ? (
              <circle
                cx={x + 24}
                cy={90}
                r={4 + ((frame + i * 3) % 10)}
                fill={THEME.danger}
                opacity={0.5}
              />
            ) : null}
          </g>
        ))}
        {hit ? (
          <path
            d="M64 48 L160 100 L280 48"
            stroke={THEME.success}
            strokeWidth={3}
            fill="none"
          />
        ) : (
          <path
            d="M64 100 H300"
            stroke={THEME.danger}
            strokeWidth={2}
            strokeDasharray="6 6"
            opacity={scan ? 0.8 : 0.25}
          />
        )}
      </svg>
    </MetaphorShell>
  );
};
