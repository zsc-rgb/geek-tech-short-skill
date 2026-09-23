/**
 * Edge-TTS voice presets for geek-tech-short.
 *
 * Aliases (case-insensitive) → full Azure Neural voice id.
 * Pass a full `zh-CN-…Neural` id to bypass the alias table.
 */

export const VOICE_PRESETS = {
  /** 男 · 讲解感（默认样片） */
  yunjian: "zh-CN-YunjianNeural",
  male: "zh-CN-YunjianNeural",
  /** 男 · 新闻播报 */
  yunyang: "zh-CN-YunyangNeural",
  /** 女 · 清晰通用（推荐女声默认） */
  xiaoxiao: "zh-CN-XiaoxiaoNeural",
  female: "zh-CN-XiaoxiaoNeural",
  /** 女 · 更柔和 */
  xiaoyi: "zh-CN-XiaoyiNeural",
  /** 女 · 情感偏活泼 */
  xiaochen: "zh-CN-XiaochenNeural",
};

/** narration modes */
export const NARRATION_MODES = ["tts", "off", "file"];

/**
 * @param {string | undefined} raw
 * @returns {string} full Edge voice id
 */
export function resolveVoice(raw) {
  if (!raw || String(raw).trim() === "") {
    return VOICE_PRESETS.yunjian;
  }
  const key = String(raw).trim();
  const lower = key.toLowerCase();
  if (VOICE_PRESETS[lower]) return VOICE_PRESETS[lower];
  // already a full id
  if (/^zh-CN-.+Neural$/i.test(key)) return key;
  throw new Error(
    `Unknown voice "${raw}". Use alias (${Object.keys(VOICE_PRESETS).join(", ")}) or full zh-CN-…Neural id.`,
  );
}

/**
 * Parse CLI argv for TTS scripts.
 * Supports: --voice=xiaoxiao | --voice xiaoxiao | --off | --narration=off | --rate=+10% | --config=path.json
 */
export function parseTtsArgs(argv = process.argv.slice(2)) {
  /** @type {{ voice?: string; narration: "tts" | "off" | "file"; rate?: string; configPath?: string }} */
  const out = { narration: "tts" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--off" || a === "--silent") {
      out.narration = "off";
      continue;
    }
    if (a.startsWith("--narration=")) {
      const v = a.slice("--narration=".length).toLowerCase();
      if (!NARRATION_MODES.includes(v)) {
        throw new Error(`--narration must be one of: ${NARRATION_MODES.join(", ")}`);
      }
      out.narration = /** @type {"tts"|"off"|"file"} */ (v);
      continue;
    }
    if (a === "--narration" && argv[i + 1]) {
      const v = argv[++i].toLowerCase();
      if (!NARRATION_MODES.includes(v)) {
        throw new Error(`--narration must be one of: ${NARRATION_MODES.join(", ")}`);
      }
      out.narration = /** @type {"tts"|"off"|"file"} */ (v);
      continue;
    }
    if (a.startsWith("--voice=")) {
      out.voice = a.slice("--voice=".length);
      continue;
    }
    if (a === "--voice" && argv[i + 1]) {
      out.voice = argv[++i];
      continue;
    }
    if (a.startsWith("--rate=")) {
      out.rate = a.slice("--rate=".length);
      continue;
    }
    if (a === "--rate" && argv[i + 1]) {
      out.rate = argv[++i];
      continue;
    }
    if (a.startsWith("--config=")) {
      out.configPath = a.slice("--config=".length);
      continue;
    }
    if (a === "--config" && argv[i + 1]) {
      out.configPath = argv[++i];
      continue;
    }
  }
  return out;
}

/**
 * Merge job.json `config` + CLI overrides.
 * @param {Record<string, unknown> | null | undefined} jobConfig
 * @param {ReturnType<typeof parseTtsArgs>} cli
 */
export function resolveNarrationConfig(jobConfig, cli) {
  const cfg = jobConfig && typeof jobConfig === "object" ? jobConfig : {};
  const narrationRaw = cli.narration !== "tts" ? cli.narration : cfg.narration ?? "tts";
  const narration = String(narrationRaw).toLowerCase();
  if (!NARRATION_MODES.includes(narration)) {
    throw new Error(`config.narration must be one of: ${NARRATION_MODES.join(", ")}`);
  }
  const voiceRaw = cli.voice ?? cfg.voice;
  const rate = cli.rate ?? cfg.rate ?? "+12%";
  return {
    narration: /** @type {"tts"|"off"|"file"} */ (narration),
    voice: narration === "tts" ? resolveVoice(/** @type {string|undefined} */ (voiceRaw)) : null,
    rate: String(rate),
    voiceAlias: voiceRaw ? String(voiceRaw) : "yunjian",
  };
}

export function listVoiceHelp() {
  const lines = Object.entries(VOICE_PRESETS).map(([k, v]) => `  ${k.padEnd(12)} → ${v}`);
  return `Voice presets:\n${lines.join("\n")}\nNarration: tts | off | file\nExamples:\n  npm run tts:jev -- --voice=xiaoxiao\n  npm run tts:jev -- --off\n  npm run render:jev:female`;
}
