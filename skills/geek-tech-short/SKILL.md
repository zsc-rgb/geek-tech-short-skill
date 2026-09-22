---
name: geek-tech-short
description: >-
  Produces Douyin/TikTok vertical tech shorts (1080×1920) with Remotion in a
  cold-black geek style: pain-point hook → red congestion visual → code morph →
  enterprise dry-goods CTA. Use when creating or polishing Chinese programmer
  shorts, 性能优化/避坑/重构 explainers, Remotion tech templates, or when the
  user mentions geek-tech-short / 极客短视频 / 爆款技术短视频提示词.
---

# Geek Tech Short (Douyin × Remotion)

Vertical tech shorts that look senior, not “培训班霓虹”.

| Resource | File |
|----------|------|
| Copy-paste prompts | [PROMPT.md](PROMPT.md) |
| Pre-publish QA | [CHECKLIST.md](CHECKLIST.md) |
| Topic examples | [examples.md](examples.md) |

**Companion Remotion skills (install separately if needed):**
- `remotion-dev/skills` → remotion-best-practices / remotion-create / remotion-markup
- Code morph: prefer `@shikijs/magic-move` (frame-driven; no CSS transitions in Remotion)

---

## Agent workflow (follow in order)

```
Task Progress:
- [ ] 1. Lock topic: pain metric + contrast metaphor + ≥1 production gotcha
- [ ] 2. Write job.json (titles / code / metrics / cta / scenes)
- [ ] 3. Scaffold Remotion composition (or adapt existing) to 4-beat timeline
- [ ] 4. Theme + Douyin safe areas + floor grid
- [ ] 5. Hook standby panel (no lower-half void)
- [ ] 6. Morph + climax Ding SFX
- [ ] 7. Soft CTA handoff
- [ ] 8. precompile (if Shiki) → lint → render → CHECKLIST.md
```

Do not skip step 1: without a gotcha, the video stays “入门八股”.

---

## Non-negotiables

1. **Cold-black geek** — bg `#070A10`; accents only danger `#FF2A6D` / success `#05FFA1` / cyan `#38BDF8`.
2. **No global camera scale** — never wrap the whole stage in `scale`/`translate` that clips cards. Per-element motion only.
3. **No dead void** — every frame keeps ≥50% intentional content (standby panels OK; empty black half-screen is not).
4. **Douyin safe areas** — caption `bottom ≥ 180`; `CARD_W ≤ 900` on 1080 canvas; keep badges off the right rail (~80–100px).
5. **Dry-goods upgrade** — universal pain as hook; **≥1 enterprise gotcha** as close.
6. **CTA ≠ caption twins** — board button and bottom caption must not accidentally share the same sentence.
7. **JSON-driven copy** — components read content config; no hard-coded 口播 in JSX.

---

## Canonical 4-beat timeline (~20–26s @ 30fps)

| Beat | Time | Job | Visual |
|------|------|-----|--------|
| Hook | 0–4s | Pain number + bad code | Alert / code centered; contrast panel **standby** (opacity ~0.3) |
| Analyze | 4–10s | Congestion proof | Code lifts up; panel **lights** → red waterfall / pool fill |
| Refactor | 10–17s | Fix + reward | Morph bad→good; metrics crash to green; **Ding** at climax |
| CTA | 17–22s | Principles + follow | Soft handoff (fade + −20px); board scale `0.95→1`; 3 principles |

Stretch/compress cuts to match TTS length; keep this emotional arc.

Suggested constants:

```ts
export const VIDEO = { width: 1080, height: 1920, fps: 30, durationInFrames: 660 } as const;
export const SCENE = {
  hookEnd: 120,      // 4s
  analyzeEnd: 300,   // 10s
  refactorEnd: 520,  // 17s
  end: 660,          // 22s
} as const;
```

---

## Theme tokens

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

export const CARD_W = 900; // ≈90px gutters on 1080 — Douyin right-rail safe
```

Perspective floor grid line alpha **0.12–0.15**. Soft radial spotlight only — no full-screen neon wash.

---

## Content formula

**Hook:** one concrete failure metric (`3280ms`, pool 100%, OOM, P99…)。Digit ≥1.5× body type, light breath/glow.

**Body:** one drawable contrast metaphor (100× red IO vs 1× green batch). Prefer panels over walls of text.

**Dry-goods close (required):**
- Universal tip + **one** production landmine
- Java example: `Lists.partition(ids, 500)` + `toMap(..., (v1, v2) -> v1)`
- Idiomatic names: `(v1,v2)->v1` not `(a,b)->a`

**CTA:** 3 short principles + follow cue. Caption may say 点赞收藏; button text must be deliberate (same intent OK, accidental twins not OK).

More topic packs → [examples.md](examples.md).

---

## Suggested composition tree

```
Root
└─ GeekTechShort (AbsoluteFill)
   ├─ Background (spotlight + perspective floor grid)
   ├─ Header / AlertModal          // hook metric
   ├─ CodeWindow + ShikiMorph      // bad → good
   ├─ ContrastPanel / IoFlow       // standby → red → green
   ├─ CtaBoard                     // 3 principles + button
   ├─ Captions                     // bottom safe
   ├─ Narration Audio sequences
   └─ SoundEffects                 // alarm / woosh / keys / ding
```

Keep cards at fixed width centered; animate `top` / `opacity` / local `scale` only.

---

## Code card rules

- Mono ≈ **32px**; assignments on **one line** when possible.
- Break long chains at fluent points:

```java
List<User> all = mapper.selectBatchIds(ids);
Map<Long,User> map = all.stream().collect(
  toMap(User::getId, u -> u, (v1, v2) -> v1));
```

- Fit test: `chars × CHAR_WIDTH + horizontalPadding < CARD_W`. Overflow → smaller font / more breaks — **never** clip out of the box.
- Morph with frame-driven token animation (`@shikijs/magic-move` or equivalent). No CSS `transition` for morph (Remotion will not interpolate it).

---

## Motion / audio

| Moment | Motion | Audio |
|--------|--------|-------|
| Hook→Analyze | Code lift; panel 0.3→1 | Alarm fade; light key ticks |
| Morph climax | Green flash + metric drop | **Enter + Ding/ping** stacked |
| →CTA | opacity 1→0 over ~0.5s, y −20px | Soft; no hard cut |
| CTA enter | opacity 0→1, scale 0.95→1, slight rise | Optional soft ping |

SFX pack: `public/sfx/{alarm,woosh,keyboard,ping}.wav`.

---

## `job.json` schema

```json
{
  "content": {
    "titles": { "hook": "", "analyze": "", "refactor": "", "cta": "" },
    "badges": { "hook": "", "good": "" },
    "code": {
      "lang": "java",
      "badFile": "AntiPattern.java",
      "goodFile": "Solution.java",
      "bad": "",
      "good": ""
    },
    "metrics": { "beforeMs": 3280, "afterMs": 16, "boosts": [] },
    "cta": {
      "headline": "",
      "principles": ["", "", ""],
      "prompt": ""
    }
  },
  "scenes": [
    { "text": "口播", "visual": "code-bad" }
  ],
  "config": {
    "width": 1080,
    "height": 1920,
    "fps": 30,
    "voice": "zh-CN-YunjianNeural",
    "rate": "+28%"
  }
}
```

`visual` enum (extend as needed): `code-bad` | `code-morph` | `code-good` | `cta` | `analyze-panel`.

After editing code strings: regenerate Shiki/token steps if your project has `npm run precompile`.

---

## Ship

1. Fill `job.json` (pain + gotcha + 3 principles).
2. Wire beat components to `SCENE` cuts.
3. `npm run precompile` (optional) → `npm run lint` → `npx remotion render <Id> out/video.mp4`
4. Run [CHECKLIST.md](CHECKLIST.md) (phone brightness + Douyin UI mental overlay).

Full paste prompts → [PROMPT.md](PROMPT.md).

---

## Anti-patterns (reject on sight)

- Purple-glow / rainbow neon / busy particle spam
- Global camera scale that crops cards (“穿模”)
- First ~4s lower half empty black
- Caption duplicating CTA button by accident
- Teaching production `toMap` without merge function
- Hard cut refactor→CTA with no fade
- Cards wider than ~920px on 1080 canvas
- Hard-coded Chinese copy scattered across 10 TSX files
