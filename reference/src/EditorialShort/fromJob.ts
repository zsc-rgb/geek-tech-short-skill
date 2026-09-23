import type { EditorialVideoConfig, EditorialWidgetType } from "./types";
import { normalizeWidgetType } from "../engine/mode";
import { msToFrame, type JobScene, type SceneCut } from "../engine/clock";

export type EditorialJob = {
  meta: {
    mode?: string;
    widget?: { type?: string };
    platform?: string;
    clock?: string;
  };
  content: {
    header: { category: string; title: string };
    badge?: string;
    widgetData: EditorialVideoConfig["widgetData"];
    showMascot?: boolean;
    theme?: "warm-ivory" | "paper-white";
  };
  scenes: JobScene[];
  config?: { fps?: number; paddingBackMs?: number };
};

/** Map scenes ms → local subtitle frame ranges spanning the full cut timeline. */
export function scenesToSubtitles(
  scenes: JobScene[],
  fps: number,
): EditorialVideoConfig["subtitles"] {
  if (!scenes.length) return [];
  return scenes.map((s) => ({
    text: s.text,
    startFrame: msToFrame(s.startMs ?? 0, fps),
    endFrame: Math.max(
      msToFrame(s.endMs ?? (s.startMs ?? 0) + 2000, fps),
      msToFrame(s.startMs ?? 0, fps) + 1,
    ),
  }));
}

export function editorialJobToConfig(
  job: EditorialJob,
  cuts: SceneCut,
  fps: number,
): EditorialVideoConfig {
  const widgetRaw = job.meta.widget?.type ?? "icon-matrix";
  const kind = normalizeWidgetType(widgetRaw);
  const widgetType = (
    kind === "icon-matrix" ? "icon-matrix" : kind
  ) as EditorialWidgetType;

  return {
    mode: "editorial-warm",
    theme: job.content.theme ?? "warm-ivory",
    layout: "letterbox-card",
    header: job.content.header,
    badge: job.content.badge,
    widgetType,
    widgetData: job.content.widgetData,
    subtitles: scenesToSubtitles(job.scenes ?? [], fps),
    showMascot: job.content.showMascot !== false,
    durationInFrames: cuts.end,
    fps,
  };
}
