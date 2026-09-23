# Config schema (v2.1 · dual mode)

One `job.json` shape for both engines. Switch with **`meta.mode`**.

| `meta.mode` | Engine | Center stage |
|-------------|--------|--------------|
| `geek-dark` | Cold black + archetypes + metaphors | `code-morph` / graph / race via `meta.archetype` + `content.body.metaphor` |
| `editorial-warm` | Letterbox ivory card | `meta.widget.type` → `<StageWidget />` |

---

## Top level

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `meta` | object | yes | **mode**, platform, clock, archetype or widget |
| `content` | object | yes | hook/body/cta (geek) or header/widgetData (editorial) |
| `scenes` | array | yes | beat + text + **startMs/endMs** when clock=dynamic |
| `config` | object | yes | 1080×1920, fps, voice |

## `meta` (unified)

```ts
type Meta = {
  topic: string;
  /** Required — pick exactly one visual system */
  mode: "geek-dark" | "editorial-warm";
  platform: "douyin" | "videoAccount" | "youtubeShorts" | "bilibili";
  /**
   * dynamic = production with narration (ms required on every scene).
   * static = silent UI preview only — never ship with TTS.
   */
  clock: "static" | "dynamic";
  /** geek-dark only */
  archetype?: "code-refactor" | "architecture-flow" | "benchmark-race";
  /** editorial-warm only — StageWidget slot */
  widget?: {
    type: "icon-matrix" | "ui-mockup" | "flow-step" | "code-morph";
    // aliases accepted: icon-grid → icon-matrix
  };
};
```

## Dynamic timeline contract

```
frame = Math.floor((ms / 1000) * fps)
```

- Prefer `scenes[].startMs` / `endMs` (Whisper or TTS length).
- Optional summary beats object (documentation only; derive from scenes):

```json
"beats": {
  "hookDurationMs": 3800,
  "analyzeDurationMs": 6200,
  "resolveDurationMs": 7500,
  "ctaDurationMs": 4500
}
```

`npm run clock -- jobs/….job.json` writes `src/generated/active-job.json` cuts.  
Geek compositions use `calculateMetadata` from those cuts.  
**Reject** `clock=dynamic` when any scene lacks ms (`derive-clock.mjs` exits 1).

## Geek-Dark `content`

```ts
type GeekContent = {
  hook: {
    headline: string;
    metric: { value: number; unit: string; state: "critical" | "warn" | "ok" };
  };
  body: {
    metaphor: {
      type:
        | "io-congestion"
        | "water-tank"
        | "btree-search"
        | "thread-workers"
        | "node-graph"
        | "bar-race"
        | "none";
      params?: Record<string, unknown>;
    };
    code?: { lang?: string; bad: string; good: string; badFile?: string; goodFile?: string };
    graph?: { nodes: unknown[]; edges: unknown[] };
    race?: { contenders: unknown[]; series: unknown[]; unit: string };
    gotcha: string; // required
  };
  cta: { headline: string; principles: string[]; badge: string };
};
```

## Editorial-warm `content`

```ts
type EditorialContent = {
  header: { category: string; title: string };
  badge?: string;
  widgetData: IconGridItem[] | FlowStep | TableMockupData;
};
```

Runtime type also: `EditorialVideoConfig` in `reference/src/EditorialShort/types.ts`  
(widgetType aliases: `icon-grid` ≡ `icon-matrix`).

## `scenes[]`

```ts
type Scene = {
  beat: "hook" | "analyze" | "resolve" | "cta";
  text: string;
  startMs?: number; // required if clock=dynamic
  endMs?: number;
};
```

## `config`

```ts
type Config = {
  width: 1080;
  height: 1920;
  fps: 30;
  /**
   * Narration mode (optional; default `tts` when shipping with voice):
   * - `tts`  — Edge-TTS synthesize (needs Python `edge-tts`)
   * - `off`  — silent video; clock uses fixed beat lengths; no Audio track
   * - `file` — use pre-dropped `public/jev/scene-N.mp3` (or scene assets); skip synthesize
   */
  narration?: "tts" | "off" | "file";
  /**
   * Voice alias or full Azure Neural id. Aliases:
   * yunjian|male · yunyang · xiaoxiao|female · xiaoyi · xiaochen
   * Default: yunjian (男讲解). Female default alias: xiaoxiao.
   */
  voice?: string;
  /** Edge-TTS rate, e.g. "+12%" | "+0%" | "-5%" */
  rate?: string;
  paddingBackMs?: number;
};
```

CLI overrides (Jev):

```bash
npm run tts:jev -- --voice=xiaoxiao
npm run tts:jev -- --off
npm run render:jev:female
npm run render:jev:silent
node scripts/tts-jev.mjs --help
```

## Samples

| Job | mode |
|-----|------|
| `jobs/code-refactor.job.json` | geek-dark |
| `jobs/architecture-flow.job.json` | geek-dark |
| `jobs/benchmark-race.job.json` | geek-dark |
| `jobs/editorial-icons.job.json` | editorial-warm · icon-matrix |
| `jobs/editorial-table.job.json` | editorial-warm · ui-mockup |
| `jobs/editorial-flow.job.json` | editorial-warm · flow-step |
| `jobs/jev-release.job.json` | editorial-warm · voice/narration config for TTS |
| Composition `EditorialFromJobShort` | `npm run clock -- jobs/editorial-*.job.json` then render |
| Jev TTS short | editorial-warm (`JevReleaseShort` + `jev-clock.json`) |

## Zero-asset rule

- No required `assets/*.png` for icons or mascot.
- Icon glyphs / Lucide-style letters in JSON; mascot = inline SVG geometry with CSS badge fallback.
- UI mockup = pure CSS (no screenshots).
