# Pre-publish checklist — geek-tech-short (dual engine)

## Engine
- [ ] One mode only: **`geek-dark`** or **`editorial-warm`** (no mixed palettes)
- [ ] `meta.mode` set in job.json (or EditorialVideoConfig for warm demos)

## Timeline (critical)
- [ ] Narration present ⇒ `clock: "dynamic"` and every scene has `startMs`/`endMs`
- [ ] Ran `npm run clock -- jobs/….json` (rejects dynamic without ms)
- [ ] No hard-coded `hookEnd: 120` / static SCENE in production components
- [ ] `calculateMetadata` / active cuts drive `durationInFrames`

---

## Geek-Dark (`mode: geek-dark`)

### Meta
- [ ] `archetype` fits the topic (not forcing code-morph)
- [ ] `platform` preset applied (safeBottom / safeRight / cardWidth)
- [ ] `metaphor.type` matches the pain (or justified `none` with filled lower half)

### Story / dry-goods
- [ ] Hook metric readable in 1–2s
- [ ] Contrast / graph / race readable without reading every line
- [ ] ≥1 production gotcha
- [ ] 3 actionable principles
- [ ] Caption ≠ CTA badge (no twins)

### Layout
- [ ] No empty lower-half void in Hook
- [ ] Cards respect `PLATFORMS[platform].cardWidth`
- [ ] Captions & badges clear of that platform’s UI chrome
- [ ] Code (if any) fully inside card

### Motion / audio
- [ ] No global camera scale clipping
- [ ] Soft resolve→CTA handoff (~0.5s, −20px; scale 0.95→1)
- [ ] Ding/Enter on climax **aligned to dynamic clock**
- [ ] SFX under narration

### Look
- [ ] Cold black; only danger/success/cyan accents
- [ ] Floor grid ~0.12–0.15
- [ ] Red/congested → green/resolved story clear

### Ship
- [ ] v2 job.json committed / used
- [ ] lint + render; spot-check Hook / Resolve / CTA frames

---

## Warm Editorial (`mode: editorial-warm`)

### Meta / content
- [ ] `layout: "letterbox-card"`; ivory card not stretched to full 1920 height
- [ ] Single widget via StageWidget: icon-matrix | ui-mockup | flow-step
- [ ] No required PNG assets (CSS/SVG mascot or `showMascot: false`)
- [ ] Category + title readable; punchline / insight clear in 3s
- [ ] Subtitles in lower letterbox; ≠ badge twins

### Look / motion
- [ ] Stage `#000` + card `#F7F4EB` (or paper-white); no Geek neon accents
- [ ] Header / title / widget / caption **horizontally centered** (mascot does not shift layout)
- [ ] Multi-line title/punchline uses `\n` with balanced wraps (no orphan last character)
- [ ] Frame-driven springs only; no global camera scale
- [ ] Captions clear of platform UI chrome
- [ ] Optional mascot does not cover critical text

### Ship
- [ ] `EditorialVideoConfig` / demos updated
- [ ] Narration intentional: `tts` + chosen voice **or** `off` / `file` (not accidental Yunjian lock-in)
- [ ] lint + `render:editorial-*` / `render:jev[:female|:silent]`; spot-check mid + end frames
