import { AbsoluteFill } from "remotion";
import type { SceneCut, JobScene } from "../engine/clock";
import type { PlatformId } from "../engine/theme";
import { PLATFORMS } from "../engine/theme";
import { Background } from "../chrome/Background";
import { HookMetric } from "../chrome/HookMetric";
import { CtaBoard } from "../chrome/CtaBoard";
import { Captions } from "../chrome/Captions";
import { MetaphorWidget } from "../metaphors";
import type { GraphEdge, GraphNode } from "../metaphors/NodeGraph";

export const ArchitectureFlowStage: React.FC<{
  cuts: SceneCut;
  platform: PlatformId;
  fps: number;
  scenes: JobScene[];
  headline: string;
  metricValue: number;
  metricUnit: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  ctaHeadline: string;
  principles: string[];
  badge: string;
}> = (props) => {
  const preset = PLATFORMS[props.platform];
  return (
    <AbsoluteFill>
      <Background cuts={props.cuts} />
      <HookMetric
        cuts={props.cuts}
        value={props.metricValue}
        unit={props.metricUnit}
        headline={props.headline}
        cardWidth={preset.cardWidth}
      />
      <MetaphorWidget
        type="node-graph"
        cuts={props.cuts}
        width={preset.cardWidth}
        params={{ nodes: props.nodes, edges: props.edges }}
      />
      <CtaBoard
        cuts={props.cuts}
        cardWidth={preset.cardWidth}
        headline={props.ctaHeadline}
        principles={props.principles}
        badge={props.badge}
      />
      <Captions scenes={props.scenes} fps={props.fps} safeBottom={preset.safeBottom} />
    </AbsoluteFill>
  );
};
