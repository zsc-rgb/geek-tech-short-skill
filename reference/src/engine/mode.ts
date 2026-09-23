/** Unified visual mode — pick one per video. */
export type VisualMode = "geek-dark" | "editorial-warm";

/** Canonical StageWidget ids after alias normalization */
export type StageWidgetId =
  | "icon-matrix"
  | "ui-mockup"
  | "flow-step"
  | "code-morph";

/**
 * Raw widget ids accepted in job.json / EditorialVideoConfig.
 * alias: icon-grid → icon-matrix
 */
export type StageWidgetType = StageWidgetId | "icon-grid";

export const normalizeMode = (raw?: string): VisualMode => {
  if (raw === "editorial-warm" || raw === "warm-editorial" || raw === "editorial") {
    return "editorial-warm";
  }
  return "geek-dark";
};

export const normalizeWidgetType = (raw?: string): StageWidgetId => {
  if (raw === "icon-grid" || raw === "icon-matrix") return "icon-matrix";
  if (raw === "ui-mockup" || raw === "table") return "ui-mockup";
  if (raw === "flow-step" || raw === "flow") return "flow-step";
  if (raw === "code-morph" || raw === "code-refactor") return "code-morph";
  return "ui-mockup";
};

/** @deprecated alias — use normalizeWidgetType */
export const normalizeWidgetId = normalizeWidgetType;
