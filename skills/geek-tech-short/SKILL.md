---
name: geek-tech-short
description: >-
  Dual-mode Remotion skill for vertical tech shorts (1080×1920). Switch via
  job.json meta.mode: geek-dark (cold-black archetypes + metaphors) or
  editorial-warm (letterbox ivory card + StageWidget icon-matrix | ui-mockup |
  flow-step). Dynamic ms→frame clock; zero required PNG assets. Use for
  Douyin/视频号/Shorts, 知识库/产品科普, 性能/架构/跑分, or geek-tech-short /
  极客短视频 / 暖调社论 / Notion Canvas.
---

# Geek Tech Short — Dual Engine

Two parallel visual engines share the same skill. **Pick one per video** via `meta.mode` — never mix themes in a single composition.

| `meta.mode` | Feel | Best for |
|-------------|------|----------|
| **`geek-dark`** | Cold black `#070A10`, danger/success accents, full-bleed stage | 重构避坑 · 架构原理 · 跑分对决 · 硬核程序员频道 |
| **`editorial-warm`** | Letterbox black + ivory card `#F7F4EB`, Notion-like calm | 知识库 · 产品/AI 科普 · 协议速查 · 低压迫感学习感 |

## What callers get

1. **`meta.mode` first** — geek-dark vs editorial-warm.
2. **geek-dark** — 3 archetypes + pluggable metaphors + dynamic clock + platform safe areas.
3. **editorial-warm** — letterbox-card + StageWidget (`icon-matrix` / `ui-mockup` / `flow-step`) + optional CSS mascot (zero PNG deps).
4. **Dynamic timeline** — production narration ⇒ `clock: "dynamic"` + scene ms; `derive-clock` + `calculateMetadata`.
5. **Optional voice** — `config.narration` = `tts` | `off` | `file`; `config.voice` aliases (`yunjian` / `xiaoxiao` / …); not locked to one gender.
6. **Ship path** — v2.1 `job.json` → `reference/` → [CHECKLIST.md](CHECKLIST.md).

| Doc | Purpose |
|-----|---------|
| [PROMPT.md](PROMPT.md) | Copy-paste prompts (both engines) |
| [CHECKLIST.md](CHECKLIST.md) | Pre-publish QA |
| [examples.md](examples.md) | Topic packs (Geek-Dark) |
| [schema.md](schema.md) | `job.json` + Editorial config |
| [metaphors.md](metaphors.md) | Geek-Dark metaphor widgets |

## Reference implementation

```bash
cd reference
npm i
npm run clock -- jobs/code-refactor.job.json
npm run clock -- jobs/editorial-icons.job.json
npm run dev
# Geek: npm run render:code | render:arch | render:race
# Editorial + Jev TTS: render:editorial-* | render:jev
```

| Composition | mode | Source |
|-------------|------|--------|
| `CodeRefactorShort` | geek-dark | `jobs/code-refactor.job.json` |
| `ArchitectureFlowShort` | geek-dark | `jobs/architecture-flow.job.json` |
| `BenchmarkRaceShort` | geek-dark | `jobs/benchmark-race.job.json` |
| `EditorialTableShort` | editorial-warm | `DEMO_EDITORIAL_TABLE` |
| `EditorialIconGridShort` | editorial-warm | `DEMO_EDITORIAL_ICONS` / `jobs/editorial-icons.job.json` |
| `EditorialFlowShort` | editorial-warm | `DEMO_EDITORIAL_FLOW` |
| `JevReleaseShort` | editorial-warm | Edge-TTS `jev-clock.json` |

Agent rule: **copy/adapt from `reference/src`**. Editorial center = `<StageWidget />`. Geek metaphors = `MetaphorWidget`.

---

## Engine picker → `meta.mode`

| Signal in the brief | `meta.mode` |
|---------------------|-------------|
| 重构 / N+1 / 跑分 / 冷黑 / IDE / 红绿对比 | **`geek-dark`** |
| 知识库 / Notion / 协议图标墙 / SaaS 表格 / 暖纸 / 发布科普 | **`editorial-warm`** |
| Unclear | Ask once; default `geek-dark` for hardcore eng topics |

---

## Agent workflow

```
Task Progress:
- [ ] 1. Set meta.mode (geek-dark | editorial-warm)
- [ ] 2a. geek-dark → archetype + metaphor + gotcha
- [ ] 2b. editorial-warm → widget.type (icon-matrix | ui-mockup | flow-step)
- [ ] 3. Write job.json; if narration → clock=dynamic + startMs/endMs
- [ ] 4. npm run clock -- jobs/….json  (rejects dynamic without ms)
- [ ] 5. Mount StageWidget / archetype from reference/src — no neon inventing
- [ ] 6. lint → render → CHECKLIST.md
```

Without a geek-dark gotcha, the video stays “入门八股” — reject and ask for one.

---

## Warm Editorial / Notion Canvas

**Layout:** full-frame black stage (`#000`) + centered ivory card (~1000×900, radius 32). Upper/lower letterbox stays black — that *is* the vertical-video composition, not empty void.

**Theme** (`reference/src/EditorialShort/theme.ts`):

```ts
EDITORIAL_THEME = {
  stageBg: "#000000",
  cardBg: "#F7F4EB",
  textTitle: "#1C1917",
  textMuted: "#78716C",
  accentBlue: "#2563EB",
  accentOrange: "#EA580C",
  accentGreen: "#16A34A",
}
```

**Widgets** via `<StageWidget />` (`reference/src/EditorialShort/StageWidget.tsx`):

| `widget.type` / `widgetType` | Component | Use when |
|------------------------------|-----------|----------|
| `icon-matrix` (alias `icon-grid`) | `IconGridWidget` | 协议/工具/概念速查墙 |
| `ui-mockup` | `UiMockupWidget` | SaaS/Notion 表格 + 光标 |
| `flow-step` | `FlowStepWidget` | A→B 认知升级 |

Zero-asset rule: no required PNG/mascot files — `MascotAvatar` is geometric SVG; omit via `showMascot: false`.

**Config type:** `EditorialVideoConfig` in `reference/src/EditorialShort/types.ts`.

### Editorial non-negotiables

1. Letterbox-card only — do not stretch the ivory card to full 1920 height.
2. Warm paper palette — no Geek-Dark danger/success neon on Editorial shots.
3. One widget type per composition.
4. Frame-driven springs only (no CSS transitions / random timers).
5. Captions sit in the lower letterbox; keep clear of platform UI chrome.
6. **Center-aligned content** — category/badge row, title, StageWidget, and caption are horizontally centered on the card axis (`textAlign: "center"` + flex `alignItems/justifyContent: "center"`). Header+widget stack is **vertically centered** inside the ivory card. Titles/punchlines use `\n` for balanced wraps — never leave a single orphan char on the next line. Mascot is a corner decoration only — never add left padding that shifts the stage off-center.
7. No required PNG assets.

---

## Geek-Dark non-negotiables

1. **Cold-black geek** — `#070A10`; accents only danger `#FF2A6D` / success `#05FFA1` / cyan `#38BDF8`.
2. **No global camera scale** — never stage-wide `scale`/`translate` that clips cards.
3. **No dead void** — ≥50% intentional content every frame (standby widgets OK).
4. **Platform safe areas** — use `PLATFORMS[meta.platform]` (never hard-code Douyin-only).
5. **Dry-goods upgrade** — universal pain hook + **≥1 enterprise gotcha**.
6. **CTA ≠ caption twins** — button and subtitle must not accidentally match.
7. **JSON-driven** — no 口播/titles hard-coded across TSX files.
8. **Clock honesty** — production renders use **dynamic** scene ms when audio exists; static frames only for silent UI preview.

---

## Three Geek-Dark archetypes

Set `meta.archetype`. Agent mounts **only** that shell’s components.

| Archetype | Core visuals | Best for | Viewer payoff |
|-----------|--------------|----------|---------------|
| `code-refactor` | `CodeWindow` + ShikiMorph + MetaphorWidget | N+1、深分页、类型陷阱 | “我写得这么烂” → 优雅重构爽感 |
| `architecture-flow` | `SvgNodeGraph` + `TokenParticles` | RAG 翻车、Kafka、Agent 调度 | 黑话被 30s 动图顿悟 |
| `benchmark-race` | `TerminalLogs` + `BarChartRace` | 框架/模型跑分对决 | 站队、对线、社交货币 |

Shared chrome (all archetypes): `Background`, `Alert/HookMetric`, `CtaBoard`, `Captions`, `SoundEffects`.

**4-beat emotional arc** (names may differ; keep the job):

| Beat | Job | Visual rule |
|------|-----|-------------|
| Hook | Pain number | Metric big; secondary stage **standby** (no empty lower half) |
| Analyze | Prove the pain | Metaphor / graph / race goes **red / congested / losing** |
| Resolve | Fix or insight | Morph / green path / winner lock + **Ding** |
| CTA | Gotcha principles | Soft fade (−20px) → board `scale 0.95→1` |

---

## Platform presets

```ts
export const PLATFORMS = {
  douyin:        { safeBottom: 180, safeRight: 90, cardWidth: 900 },
  videoAccount:  { safeBottom: 220, safeRight: 70, cardWidth: 920 }, // 微信视频号
  youtubeShorts: { safeBottom: 200, safeRight: 80, cardWidth: 900 },
  bilibili:      { safeBottom: 160, safeRight: 100, cardWidth: 900 },
} as const;

export type PlatformId = keyof typeof PLATFORMS;
```

Composition reads `meta.platform` → `CARD_W = preset.cardWidth`, captions `bottom: preset.safeBottom`, badges inset by `safeRight`.

---

## Theme (Geek-Dark)

```ts
export const THEME = {
  bg: "#070A10",
  panel: "#0C111A",
  panelSolid: "#101622",
  border: "rgba(255,255,255,0.1)",
  text: "#FFFFFF",
  muted: "#94A3B8",
  mutedDim: "#64748B",
  danger: "#FF2A6D",
  dangerSoft: "rgba(255,42,109,0.16)",
  success: "#05FFA1",
  successSoft: "rgba(5,255,161,0.14)",
  cursor: "#38BDF8",
  highlight: "#FDE047",
} as const;
```

Floor grid line alpha **0.12–0.15**. Soft spotlight only — no neon wash.

---

## Clock: static preview vs dynamic timestamps

### Static preview (UI / silent)

```ts
// ONLY when no narration audio — local layout debug
export const SCENE_PREVIEW = {
  hookEnd: 120,
  analyzeEnd: 300,
  resolveEnd: 520, // was refactorEnd
  end: 660,
} as const;
```

### Dynamic (production — required with TTS)

`scenes[].startMs` / `endMs` from TTS length + Whisper word timestamps.

```ts
const msToFrame = (ms: number, fps: number) => Math.floor((ms / 1000) * fps);

export function deriveSceneCuts(
  scenes: Array<{ beat: string; startMs: number; endMs: number }>,
  fps: number,
) {
  const by = (beat: string) => scenes.filter((s) => s.beat === beat);
  const endOf = (beat: string) =>
    Math.max(...by(beat).map((s) => msToFrame(s.endMs, fps)), 0);
  return {
    hookEnd: endOf("hook"),
    analyzeEnd: endOf("analyze"),
    resolveEnd: endOf("resolve"),
    end: Math.max(...scenes.map((s) => msToFrame(s.endMs, fps))),
  };
}
```

Wire Remotion `calculateMetadata` to set `durationInFrames` from `end` (+ small padding).

**Climax SFX:** fire Ding at `resolveStart + morphPeakOffset`, **not** a hard-coded frame `316`. If Whisper gives a keyword time for “批量/16ms/胜出”, prefer that.

| Mode | When | Risk if misused |
|------|------|-----------------|
| `clock: "static"` | No audio / Studio UI | Fine for layout |
| `clock: "dynamic"` | Ship / pipeline | **Must** use ms → frame |

---

## Metaphor library (Geek-Dark)

`content.body.metaphor.type` selects a widget — **not** always IoFlow.

| `type` | Component | Use when |
|--------|-----------|----------|
| `io-congestion` | IoFlow | 网络 IO、RPC 串行、连接池 |
| `water-tank` | WaterfillTank | OOM、全表查、堆泄漏 |
| `btree-search` | BTreeSearch | 索引失效 vs 覆盖 |
| `thread-workers` | ThreadWorkers | 抢锁、饥饿、死锁 |
| `node-graph` | SvgNodeGraph | 架构链路（常与 architecture-flow 同用） |
| `bar-race` | BarChartRace | 跑分排位（常与 benchmark-race 同用） |
| `none` | — | 纯代码/纯口播，仍须填满下半屏（备用图或原则预告） |

Standby → active → resolved color story: muted → danger → success. Params live under `metaphor.params` — see [metaphors.md](metaphors.md).

---

## Modular `job.json` (v2 · Geek-Dark)

Minimal shape (full reference → [schema.md](schema.md)):

```json
{
  "meta": {
    "topic": "Java 循环查库",
    "archetype": "code-refactor",
    "platform": "douyin",
    "clock": "dynamic"
  },
  "content": {
    "hook": {
      "headline": "接口超时 3 秒？又是循环查库！",
      "metric": { "value": 3280, "unit": "ms", "state": "critical" }
    },
    "body": {
      "metaphor": { "type": "io-congestion", "params": { "from": 100, "to": 1 } },
      "code": {
        "lang": "java",
        "badFile": "AntiPattern.java",
        "goodFile": "Solution.java",
        "bad": "...",
        "good": "..."
      },
      "gotcha": "Lists.partition(ids, 500) + toMap(..., (v1,v2)->v1)"
    },
    "cta": {
      "headline": "线上实战 · 重构避坑三原则",
      "principles": [
        "杜绝循环 I/O，全量改批量",
        "超大集合使用分批切片",
        "内存 Map 必配合并策略"
      ],
      "badge": "点赞收藏这套线上避坑模板"
    }
  },
  "scenes": [
    { "beat": "hook", "text": "…", "startMs": 0, "endMs": 4000 },
    { "beat": "analyze", "text": "…", "startMs": 4000, "endMs": 10000 },
    { "beat": "resolve", "text": "…", "startMs": 10000, "endMs": 17000 },
    { "beat": "cta", "text": "…", "startMs": 17000, "endMs": 22000 }
  ],
  "config": {
    "width": 1080,
    "height": 1920,
    "fps": 30,
    "narration": "tts",
    "voice": "yunjian",
    "rate": "+28%",
    "paddingBackMs": 100
  }
}
```

**Voice aliases** (see `reference/scripts/voices.mjs`): `yunjian`/`male` · `yunyang` · `xiaoxiao`/`female` · `xiaoyi` · `xiaochen` · or full `zh-CN-…Neural`.  
**Narration modes:** `tts` | `off`（无配音）| `file`（自备 mp3）。CLI：`npm run tts:jev -- --voice=xiaoxiao` / `--off`。

**v1 compat:** if Agent sees old flat `content.titles` / fixed `SCENE`, migrate to v2 before new features — or map: `refactorEnd` → `resolveEnd`.

---

## Composition tree

### Geek-Dark

```
Root
└─ GeekTechShort
   ├─ Background
   ├─ HookMetric / Alert
   ├─ ArchetypeStage          // switch(meta.archetype)
   │    ├─ code-refactor  → CodeWindow + MetaphorWidget
   │    ├─ architecture-flow → SvgNodeGraph + TokenParticles
   │    └─ benchmark-race → TerminalLogs + BarChartRace
   ├─ CtaBoard
   ├─ Captions
   ├─ Narration
   └─ SoundEffects
```

### Warm Editorial

```
Root
└─ EditorialShort
   └─ EditorialCard (letterbox stage + ivory card)
        ├─ header (category + title)
        ├─ widget: IconGrid | UiMockup | FlowStep
        ├─ MascotAvatar + badge (optional)
        └─ caption pill (lower letterbox)
```

Animate per-element `top` / `opacity` / local `scale` only.

---

## Archetype-specific notes (Geek-Dark)

### code-refactor
- Mono ≈32px; single-line assignments; `(v1,v2)->v1`.
- Fit: `chars × CHAR_WIDTH + pad < CARD_W`.
- Shiki morph: frame-driven tokens — **no** CSS transitions.

### architecture-flow
- ≤6 nodes on screen; edge pulses = “token” flow.
- Failure path = danger pulse; fix = success path highlight.
- Prefer labels in 中文短词 + one English protocol name max.

### benchmark-race
- Bars race on shared axis; winner locks green + Ding.
- Terminal lines ≤5 visible (scroll or typewriter).
- Disclose methodology in gotcha (warmup / concurrency / machine).

---

## Motion / audio (clock-relative · Geek-Dark)

| Moment | Motion | Audio |
|--------|--------|-------|
| →Analyze | Primary lifts; metaphor 0.3→1 | Alarm fade |
| Resolve climax | Green lock / morph peak | **Enter + Ding** |
| →CTA | Fade ~0.5s, y −20px | Soft |
| CTA enter | opacity + scale 0.95→1 | Optional ping |

SFX: `public/sfx/{alarm,woosh,keyboard,ping}.wav`.

---

## Ship

1. Pick engine; start from skill-repo `reference/`.
2. Geek-Dark: fill v2 `job.json` → `derive-clock.mjs` when narration exists.
3. Editorial: edit `EditorialShort/demos.ts` (or pass `config` props) → matching Composition id.
4. `npm run lint` / `tsc` → `npx remotion render <Id> out/video.mp4`.
5. [CHECKLIST.md](CHECKLIST.md) for that engine + platform UI overlay.

---

## Anti-patterns

- Mixing Geek-Dark neon with Editorial ivory in one shot
- Forcing every topic into code-morph + IoFlow
- Stretching Editorial card to full 1920 height
- Shipping Geek-Dark with `clock: "static"` while narration exists
- Hard-coded `hookEnd: 120` in production components
- Global camera scale / neon clutter / empty Hook lower half (Geek-Dark)
- Caption twin of CTA badge
- Ignoring `PLATFORMS` when targeting 视频号 / Shorts
- Hard-coded copy scattered in TSX
