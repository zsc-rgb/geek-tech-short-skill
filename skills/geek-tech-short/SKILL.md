---
name: geek-tech-short
description: >-
  Industrial Remotion engine for vertical geek tech shorts (1080×1920): cold-black
  look, 4-beat arc, pluggable archetypes (code-refactor | architecture-flow |
  benchmark-race), metaphor widgets, platform safe-area presets, and static or
  TTS/Whisper-driven dynamic clocks. Use for Douyin/视频号/Shorts programmer videos,
  性能优化/架构/跑分/避坑, or when the user mentions geek-tech-short / 极客短视频母机.
---

# Geek Tech Short — Industrial Engine

Cold-black geek shorts that stay senior — **not** a single “红球堵车→绿代码” template.

| Doc | Purpose |
|-----|---------|
| [PROMPT.md](PROMPT.md) | Copy-paste production prompts |
| [CHECKLIST.md](CHECKLIST.md) | Pre-publish QA |
| [examples.md](examples.md) | Topic packs by archetype |
| [schema.md](schema.md) | Full `job.json` reference |
| [metaphors.md](metaphors.md) | Metaphor widget library |

Install companions as needed: `remotion-dev/skills`, frame-driven `@shikijs/magic-move`.

---

## Agent workflow

```
Task Progress:
- [ ] 1. Pick archetype + platform + metaphor (or “none” for pure diagram)
- [ ] 2. Lock: pain metric + contrast story + ≥1 production gotcha
- [ ] 3. Write modular job.json (meta / content / scenes / clock)
- [ ] 4. Resolve SCENE cuts: static preview OR dynamic timestamps
- [ ] 5. Mount archetype shell + metaphor widget + platform zones
- [ ] 6. Soft handoffs + climax Ding aligned to clock
- [ ] 7. precompile (if code) → lint → render → CHECKLIST.md
```

Without a gotcha, the video stays “入门八股” — reject and ask for one.

---

## Non-negotiables (all archetypes)

1. **Cold-black geek** — `#070A10`; accents only danger `#FF2A6D` / success `#05FFA1` / cyan `#38BDF8`.
2. **No global camera scale** — never stage-wide `scale`/`translate` that clips cards.
3. **No dead void** — ≥50% intentional content every frame (standby widgets OK).
4. **Platform safe areas** — use `PLATFORMS[meta.platform]` (never hard-code Douyin-only).
5. **Dry-goods upgrade** — universal pain hook + **≥1 enterprise gotcha**.
6. **CTA ≠ caption twins** — button and subtitle must not accidentally match.
7. **JSON-driven** — no 口播/titles hard-coded across TSX files.
8. **Clock honesty** — production renders use **dynamic** scene ms when audio exists; static frames only for silent UI preview.

---

## Three archetypes

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

## Theme (shared)

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

## Metaphor library (decoupled widgets)

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

## Modular `job.json` (v2)

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
    "voice": "zh-CN-YunjianNeural",
    "rate": "+28%",
    "paddingBackMs": 100
  }
}
```

**v1 compat:** if Agent sees old flat `content.titles` / fixed `SCENE`, migrate to v2 before new features — or map: `refactorEnd` → `resolveEnd`.

---

## Composition tree (pluggable)

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
   ├─ Captions                // platform.safeBottom
   ├─ Narration (Sequence by startMs)
   └─ SoundEffects            // keyed off derived SCENE + climax cue
```

Animate per-element `top` / `opacity` / local `scale` only.

---

## Archetype-specific notes

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

## Motion / audio (clock-relative)

| Moment | Motion | Audio |
|--------|--------|-------|
| →Analyze | Primary lifts; metaphor 0.3→1 | Alarm fade |
| Resolve climax | Green lock / morph peak | **Enter + Ding** |
| →CTA | Fade ~0.5s, y −20px | Soft |
| CTA enter | opacity + scale 0.95→1 | Optional ping |

SFX: `public/sfx/{alarm,woosh,keyboard,ping}.wav`.

---

## Ship

1. Fill v2 `job.json` (`archetype` + `platform` + `metaphor` + gotcha).
2. Pipeline TTS → Whisper → write `startMs`/`endMs` → `clock: "dynamic"`.
3. `calculateMetadata` duration from last `endMs`.
4. `precompile` (code) → lint → `npx remotion render … out/video.mp4`.
5. [CHECKLIST.md](CHECKLIST.md) with **that** platform’s UI overlay in mind.

---

## Anti-patterns

- Forcing every topic into code-morph + IoFlow
- Shipping with `clock: "static"` while narration exists (音画错位)
- Hard-coded `hookEnd: 120` in production components
- Global camera scale / neon clutter / empty Hook lower half
- Caption twin of CTA badge
- Ignoring `PLATFORMS` when targeting 视频号 / Shorts
- Hard-coded copy scattered in TSX
