import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../engine/theme";
import type { SceneCut } from "../engine/clock";
import { MetaphorShell, phaseAt } from "./MetaphorShell";

export type GraphNode = { id: string; label: string };
export type GraphEdge = { from: string; to: string; fail?: boolean };

export const NodeGraph: React.FC<{
  cuts: SceneCut;
  width: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
}> = ({ cuts, width, nodes, edges }) => {
  const frame = useCurrentFrame();
  const phase = phaseAt(frame, cuts);
  const n = Math.min(nodes.length, 6);
  const gap = 320 / Math.max(n - 1, 1);

  return (
    <MetaphorShell cuts={cuts} width={width} title="Architecture Flow">
      <svg width="100%" height="100%" viewBox="0 0 360 140">
        {edges.slice(0, 8).map((e, i) => {
          const a = nodes.findIndex((x) => x.id === e.from);
          const b = nodes.findIndex((x) => x.id === e.to);
          if (a < 0 || b < 0) return null;
          const x1 = 40 + a * gap;
          const x2 = 40 + b * gap;
          const failing = phase === "active" && e.fail;
          const pulse = interpolate((frame + i * 4) % 20, [0, 20], [0.35, 1]);
          return (
            <line
              key={`${e.from}-${e.to}-${i}`}
              x1={x1}
              y1={70}
              x2={x2}
              y2={70}
              stroke={failing ? THEME.danger : phase === "resolved" ? THEME.success : THEME.mutedDim}
              strokeWidth={failing ? 3 : 2}
              opacity={failing ? pulse : 0.85}
            />
          );
        })}
        {nodes.slice(0, n).map((node, i) => {
          const x = 40 + i * gap;
          return (
            <g key={node.id}>
              <rect
                x={x - 36}
                y={48}
                width={72}
                height={44}
                rx={8}
                fill={THEME.panelSolid}
                stroke={THEME.border}
                strokeWidth={2}
              />
              <text
                x={x}
                y={75}
                textAnchor="middle"
                fill={THEME.text}
                fontSize={12}
                fontFamily="ui-sans-serif, system-ui"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </MetaphorShell>
  );
};
