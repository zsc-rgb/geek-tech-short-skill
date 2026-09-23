# geek-tech-short reference (Remotion)

Renderable demos for **Geek-Dark** (3 archetypes + metaphors + dynamic clock) and **Warm Editorial** (letterbox ivory card + widgets).

## Quick start

```bash
cd reference
npm install
npm run pipeline          # Geek-Dark: derive cuts from jobs/*.job.json
npm run clock -- jobs/code-refactor.job.json
npm run dev               # Remotion Studio
```

### Geek-Dark renders

```bash
npm run render:code
npm run render:arch
npm run render:race
```

### Warm Editorial renders

```bash
npm run render:editorial-table   # UiMockup / SaaS table
npm run render:editorial-icons   # IconGrid protocol wall
npm run render:editorial-flow    # FlowStep A→B punchline
npm run render:editorial-job     # job.json → EditorialFromJobShort (default icons)
npm run render:editorial-job:table
npm run render:editorial-job:flow
npm run render:jev               # TTS（默认 voice=yunjian，见 jobs/jev-release.job.json）
npm run render:jev:female        # 女声 Xiaoxiao
npm run render:jev:silent        # 无配音预览
npm run tts:jev                  # 只重生 Edge-TTS + jev-clock.json
npm run tts:jev:female           # 女声 TTS only
npm run tts:jev:help             # 列出 voice 别名
```

配音在 `jobs/jev-release.job.json` 的 `config.narration` / `config.voice` / `config.rate`，也可用 CLI 覆盖：

```bash
node scripts/tts-jev.mjs --voice=xiaoyi --rate=+8%
node scripts/tts-jev.mjs --off
```

Demo mp4 (committed for preview on Gitee/GitHub):

[`../demos/jev-release.mp4`](../demos/jev-release.mp4) — Warm Editorial 发布样片（约 55s，含口播），**不是** Skill 唯一默认风格。

## Layout

| Path | Role |
|------|------|
| `jobs/*.job.json` | Geek-Dark / Editorial / Jev voice samples |
| `scripts/derive-clock.mjs` | `startMs/endMs` → frame cuts |
| `scripts/voices.mjs` | Edge-TTS voice aliases + CLI parse |
| `scripts/tts-jev.mjs` | Jev TTS / silent / file clock |
| `src/metaphors/` | Io / WaterTank / BTree / Threads / NodeGraph / BarRace |
| `src/archetypes/` | Geek-Dark stage shells |
| `src/compositions/` | Geek-Dark compositions |
| `src/EditorialShort/` | Warm Editorial theme, card, widgets, demos, mascot |

## Compositions

| Id | Engine | Data |
|----|--------|------|
| `CodeRefactorShort` | Geek-Dark | active job |
| `ArchitectureFlowShort` | Geek-Dark | active job |
| `BenchmarkRaceShort` | Geek-Dark | active job |
| `EditorialTableShort` | Editorial | `DEMO_EDITORIAL_TABLE` |
| `EditorialIconGridShort` | Editorial | `DEMO_EDITORIAL_ICONS` |
| `EditorialFlowShort` | Editorial | `DEMO_EDITORIAL_FLOW` |
| `JevReleaseShort` | Editorial + TTS | `jev-clock.json` + `DEMO_JEV_*` |

Edit Editorial copy/widgets in `src/EditorialShort/demos.ts`.

## Clock rule (Geek-Dark)

- Edit `scenes[].startMs/endMs` in the job
- Run `npm run clock -- jobs/<file>.job.json`
- Compositions read `src/generated/active-job.json`

Never ship narration with hard-coded `hookEnd: 120` — use this derive step.

## Metaphor switch (Geek-Dark)

In `job.content.body.metaphor.type`:

`io-congestion` | `water-tank` | `btree-search` | `thread-workers` | `node-graph` | `bar-race` | `none`

## Editorial widget switch

In `EditorialVideoConfig.widgetType`:

`icon-grid` | `ui-mockup` | `flow-step`
