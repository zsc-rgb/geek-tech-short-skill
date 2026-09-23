import type { SceneCut } from "../engine/clock";
import { IoCongestion } from "./IoCongestion";
import { WaterTank } from "./WaterTank";
import { BTreeSearch } from "./BTreeSearch";
import { ThreadWorkers } from "./ThreadWorkers";
import { NodeGraph, type GraphEdge, type GraphNode } from "./NodeGraph";
import { BarRace, type Contender } from "./BarRace";

export type MetaphorType =
  | "io-congestion"
  | "water-tank"
  | "btree-search"
  | "thread-workers"
  | "node-graph"
  | "bar-race"
  | "none";

export type MetaphorProps = {
  type: MetaphorType;
  cuts: SceneCut;
  width: number;
  params?: Record<string, unknown>;
};

export const MetaphorWidget: React.FC<MetaphorProps> = ({
  type,
  cuts,
  width,
  params = {},
}) => {
  switch (type) {
    case "io-congestion":
      return (
        <IoCongestion
          cuts={cuts}
          width={width}
          from={Number(params.from ?? 100)}
          to={Number(params.to ?? 1)}
        />
      );
    case "water-tank":
      return <WaterTank cuts={cuts} width={width} overflowAt={Number(params.overflowAt ?? 0.92)} />;
    case "btree-search":
      return <BTreeSearch cuts={cuts} width={width} />;
    case "thread-workers":
      return <ThreadWorkers cuts={cuts} width={width} workers={Number(params.workers ?? 6)} />;
    case "node-graph":
      return (
        <NodeGraph
          cuts={cuts}
          width={width}
          nodes={(params.nodes as GraphNode[]) ?? []}
          edges={(params.edges as GraphEdge[]) ?? []}
        />
      );
    case "bar-race":
      return (
        <BarRace
          cuts={cuts}
          width={width}
          contenders={(params.contenders as Contender[]) ?? []}
          unit={String(params.unit ?? "QPS")}
        />
      );
    case "none":
    default:
      return null;
  }
};

export {
  IoCongestion,
  WaterTank,
  BTreeSearch,
  ThreadWorkers,
  NodeGraph,
  BarRace,
};
