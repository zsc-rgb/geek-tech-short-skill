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

export function deriveSceneCuts(
  scenes: JobScene[],
  fps: number,
  paddingBackMs = 100,
): SceneCut {
  const byBeat = (beat: Beat) => scenes.filter((s) => s.beat === beat);
  const endOf = (beat: Beat) => {
    const list = byBeat(beat);
    if (list.length === 0) return 0;
    return Math.max(
      ...list.map((s) => msToFrame(s.endMs ?? s.startMs ?? 0, fps)),
    );
  };

  const hookEnd = endOf("hook") || 120;
  const analyzeEnd = endOf("analyze") || Math.max(hookEnd + 180, 300);
  const resolveEnd = endOf("resolve") || Math.max(analyzeEnd + 180, 520);
  const last = Math.max(
    ...scenes.map((s) => msToFrame(s.endMs ?? 0, fps)),
    resolveEnd,
  );
  const end = last + msToFrame(paddingBackMs, fps);

  const resolveStart = analyzeEnd;
  const climaxFrame = resolveStart + Math.round((resolveEnd - resolveStart) * 0.4);

  return { hookEnd, analyzeEnd, resolveEnd, end, climaxFrame };
}
