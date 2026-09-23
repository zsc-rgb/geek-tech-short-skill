export const THEME = {
  bg: "#070A10",
  panel: "#0C111A",
  panelSolid: "#101622",
  border: "rgba(255,255,255,0.1)",
  text: "#FFFFFF",
  muted: "#94A3B8",
  mutedDim: "#64748B",
  danger: "#FF2A6D",
  dangerSoft: "rgba(255, 42, 109, 0.16)",
  success: "#05FFA1",
  successSoft: "rgba(5, 255, 161, 0.14)",
  cursor: "#38BDF8",
  highlight: "#FDE047",
} as const;

export const PLATFORMS = {
  douyin: { safeBottom: 180, safeRight: 90, cardWidth: 900 },
  videoAccount: { safeBottom: 220, safeRight: 70, cardWidth: 920 },
  youtubeShorts: { safeBottom: 200, safeRight: 80, cardWidth: 900 },
  bilibili: { safeBottom: 160, safeRight: 100, cardWidth: 900 },
} as const;

export type PlatformId = keyof typeof PLATFORMS;

/** Silent UI preview only — never ship narration with these. */
export const SCENE_PREVIEW = {
  hookEnd: 120,
  analyzeEnd: 300,
  resolveEnd: 520,
  end: 660,
} as const;
