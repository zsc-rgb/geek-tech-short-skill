# Config schema (v2 · dual engine)

- **Geek-Dark** → `job.json` below (`meta.archetype` …).
- **Warm Editorial** → `EditorialVideoConfig` at the bottom (not the same file format).

---

# job.json schema (Geek-Dark)

## Top level

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `meta` | object | yes | topic, archetype, platform, clock |
| `content` | object | yes | hook / body / cta |
| `scenes` | array | yes | beat + text + timing |
| `config` | object | yes | 1080×1920, fps, voice |

## `meta`

```ts
type Meta = {
  topic: string;
  archetype: "code-refactor" | "architecture-flow" | "benchmark-race";
  platform: "douyin" | "videoAccount" | "youtubeShorts" | "bilibili";
  clock: "static" | "dynamic";
};
```

## `content.hook`

```ts
type Hook = {
  headline: string; // may include \n
  metric: {
    value: number;
    unit: string; // "ms" | "%" | "QPS" | "MB" …
    state: "critical" | "warn" | "ok";
  };
};
```

## `content.body`

```ts
type Body = {
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
  /** code-refactor */
  code?: {
    lang: string;
    badFile: string;
    goodFile: string;
    bad: string;
    good: string;
  };
  /** architecture-flow */
  graph?: {
    nodes: Array<{ id: string; label: string; role?: string }>;
    edges: Array<{ from: string; to: string; label?: string; state?: "ok" | "fail" }>;
  };
  /** benchmark-race */
  race?: {
    contenders: Array<{ id: string; label: string; color?: string }>;
    series: Array<{ tMs: number; scores: Record<string, number> }>;
    unit: string;
  };
  gotcha: string; // ≥1 production landmine — required
};
```

## `content.cta`

```ts
type Cta = {
  headline: string;
  principles: [string, string, string] | string[]; // prefer exactly 3
  badge: string; // button; must not twin caption
};
```

## `scenes[]`

```ts
type Scene = {
  beat: "hook" | "analyze" | "resolve" | "cta";
  text: string; // TTS 口播
  startMs?: number; // required if clock=dynamic
  endMs?: number;
  visual?: string; // optional override hint
};
```

## `config`

```ts
type Config = {
  width: 1080;
  height: 1920;
  fps: 30;
  voice: string;
  rate?: string; // Edge-TTS e.g. "+28%"
  paddingBackMs?: number;
};
```

## v1 → v2 migration map

| v1 | v2 |
|----|----|
| `content.titles.hook` | `content.hook.headline` |
| `content.metrics.beforeMs` | `content.hook.metric.value` |
| `content.code` | `content.body.code` |
| `content.cta.prompt` | `content.cta.badge` |
| `SCENE.refactorEnd` | `resolveEnd` |
| fixed frames only | `meta.clock` + `scenes[].startMs/endMs` |

---

# EditorialVideoConfig (Warm Editorial)

Type source of truth: `reference/src/EditorialShort/types.ts`.

```ts
type EditorialWidgetType = "icon-grid" | "ui-mockup" | "flow-step";

type EditorialVideoConfig = {
  theme: "warm-ivory" | "paper-white";
  layout: "letterbox-card";
  header: { category: string; title: string };
  widgetType: EditorialWidgetType;
  widgetData: IconGridItem[] | FlowStep | TableMockupData;
  subtitles: Array<{ startFrame: number; endFrame: number; text: string }>;
  badge?: string;
  showMascot?: boolean;
  durationInFrames?: number;
  fps?: number;
};

type IconGridItem = { id: string; label: string; color: string; glyph: string };
type FlowStep = { from: string; to: string; punchline: string };
type TableMockupData = {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: string[][];
  highlight?: { row: number; col: number };
  actionLabel?: string;
};
```

Samples: `reference/src/EditorialShort/demos.ts` → compositions `EditorialTableShort` / `EditorialIconGridShort` / `EditorialFlowShort`.
