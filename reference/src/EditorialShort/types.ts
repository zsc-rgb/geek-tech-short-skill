export type EditorialWidgetType =
  | "icon-grid"
  | "icon-matrix"
  | "ui-mockup"
  | "flow-step";

export type EditorialSubtitle = {
  startFrame: number;
  endFrame: number;
  text: string;
};

export type IconGridItem = {
  id: string;
  label: string;
  /** CSS color for circle tray */
  color: string;
  /** Short glyph or emoji fallback when no SVG */
  glyph: string;
};

export type FlowStep = {
  from: string;
  to: string;
  punchline: string;
};

export type TableMockupData = {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: string[][];
  highlight?: { row: number; col: number };
  actionLabel?: string;
};

/** @deprecated alias — use TableMockupData */
export type TableProps = TableMockupData;

export type EditorialVideoConfig = {
  /** Always editorial-warm for this shell */
  mode?: "editorial-warm";
  theme: "warm-ivory" | "paper-white";
  layout: "letterbox-card";
  header: {
    category: string;
    title: string;
  };
  /** Prefer icon-matrix; icon-grid kept as alias */
  widgetType: EditorialWidgetType;
  widgetData: IconGridItem[] | FlowStep | TableMockupData;
  subtitles: EditorialSubtitle[];
  badge?: string;
  showMascot?: boolean;
  durationInFrames?: number;
  fps?: number;
};
