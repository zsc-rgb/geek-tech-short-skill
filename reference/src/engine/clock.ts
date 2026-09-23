export type Beat = "hook" | "analyze" | "resolve" | "cta";

export type SceneCut = {
  hookEnd: number;
  analyzeEnd: number;
  resolveEnd: number;
  end: number;
  climaxFrame: number;
};

export type JobScene = {
  beat: Beat;
  text: string;
  startMs?: number;
  endMs?: number;
};

export const msToFrame = (ms: number, fps: number) =>
  Math.max(0, Math.floor((ms / 1000) * fps));

/**
 * Production rule: when clock is dynamic (or narration exists), every scene
 * must carry startMs/endMs. Static frame fallbacks are preview-only.
 */
export function assertDynamicSceneTiming(
  scenes: JobScene[],
  clock: "static" | "dynamic" | string | undefined,
): void {
  if (clock === "static") return;
  const bad = scenes.filter(
    (s) => s.startMs === undefined || s.endMs === undefined,
  );
  if (bad.length > 0) {
    throw new Error(
      `[geek-tech-short] clock=dynamic requires startMs/endMs on every scene (missing on ${bad.map((s) => s.beat).join(", ")}). Run TTS/Whisper or fill ms manually — never ship hard-coded hookEnd:120.`,
    );
  }
}

export function deriveSceneCuts(
  scenes: JobScene[],
  fps: number,
  paddingBackMs = 100,
  opts?: { allowStaticFallback?: boolean },
): SceneCut {
  const byBeat = (beat: Beat) => scenes.filter((s) => s.beat === beat);
  const endOf = (beat: Beat) => {
    const list = byBeat(beat);
    if (list.length === 0) return 0;
    return Math.max(
      ...list.map((s) => msToFrame(s.endMs ?? s.startMs ?? 0, fps)),
    );
  };

  const hasMs = scenes.some((s) => s.endMs !== undefined);
  if (!hasMs && !opts?.allowStaticFallback) {
    throw new Error(
      "[geek-tech-short] No scene endMs found. Provide dynamic timestamps or pass allowStaticFallback for silent UI preview only.",
    );
  }

  const hookEnd = endOf("hook") || (opts?.allowStaticFallback ? 120 : 0);
  const analyzeEnd =
    endOf("analyze") ||
    (opts?.allowStaticFallback ? Math.max(hookEnd + 180, 300) : hookEnd);
  const resolveEnd =
    endOf("resolve") ||
    (opts?.allowStaticFallback ? Math.max(analyzeEnd + 180, 520) : analyzeEnd);
  const last = Math.max(
    ...scenes.map((s) => msToFrame(s.endMs ?? 0, fps)),
    resolveEnd,
  );
  const end = last + msToFrame(paddingBackMs, fps);

  const resolveStart = analyzeEnd;
  const climaxFrame =
    resolveStart + Math.round((resolveEnd - resolveStart) * 0.4);

  return { hookEnd, analyzeEnd, resolveEnd, end, climaxFrame };
}
