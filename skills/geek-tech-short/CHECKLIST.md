# Pre-publish checklist — geek-tech-short v2

## Meta
- [ ] `archetype` fits the topic (not forcing code-morph)
- [ ] `platform` preset applied (safeBottom / safeRight / cardWidth)
- [ ] `clock: "dynamic"` when narration exists; ms→frame for all beats
- [ ] `metaphor.type` matches the pain (or justified `none` with filled lower half)

## Story / dry-goods
- [ ] Hook metric readable in 1–2s
- [ ] Contrast / graph / race readable without reading every line
- [ ] ≥1 production gotcha
- [ ] 3 actionable principles
- [ ] Caption ≠ CTA badge (no twins)

## Layout
- [ ] No empty lower-half void in Hook
- [ ] Cards respect `PLATFORMS[platform].cardWidth`
- [ ] Captions & badges clear of that platform’s UI chrome
- [ ] Code (if any) fully inside card

## Motion / audio
- [ ] No global camera scale clipping
- [ ] Soft resolve→CTA handoff (~0.5s, −20px; scale 0.95→1)
- [ ] Ding/Enter on climax **aligned to dynamic clock**
- [ ] SFX under narration

## Look
- [ ] Cold black; only danger/success/cyan accents
- [ ] Floor grid ~0.12–0.15
- [ ] Red/congested → green/resolved story clear

## Ship
- [ ] v2 job.json committed / used
- [ ] lint + render; spot-check Hook / Resolve / CTA frames
