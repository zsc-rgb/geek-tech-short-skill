# Pre-publish checklist — geek-tech-short

Play the MP4 once. Fail any ❌ before shipping.

## Story / dry-goods
- [ ] Hook number readable in first 1–2s
- [ ] Contrast metaphor obvious without reading every line of code
- [ ] ≥1 production gotcha (not only textbook tip)
- [ ] CTA principles actionable and specific
- [ ] Caption text ≠ CTA button text (no accidental twins)

## Layout / platform
- [ ] No empty lower-half void in first ~4s (standby panel OK)
- [ ] Card width ≤ 900 on 1080 canvas
- [ ] Captions clear of Douyin bottom UI (`bottom ≥ 180`)
- [ ] Top-right badge clear of Douyin right rail (~80–100px)
- [ ] Code fully inside card; no clipped tokens

## Code craft
- [ ] Assignments prefer single line
- [ ] Idiomatic merge names `(v1,v2)->v1` (or language equivalent)
- [ ] Font ~32px; fits `CARD_W`

## Motion / audio
- [ ] No global camera scale clipping cards
- [ ] Refactor→CTA soft fade (~0.5s) + slight rise; CTA scales in
- [ ] Morph climax has Ding/Enter reward SFX
- [ ] SFX present but not drowning narration

## Look
- [ ] Cold black base; only danger/success/cyan accents
- [ ] Floor grid alpha ~0.12–0.15, not neon-noisy
- [ ] Red → green color story is clear

## Ship
- [ ] precompile (if needed) + lint clean
- [ ] Spot-check Hook / Morph / CTA frames on the final MP4
