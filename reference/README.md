# geek-tech-short reference (Remotion)

Minimal **renderable** demo for the three archetypes + metaphor widgets + dynamic clock.

## Quick start

```bash
cd reference
npm install
npm run pipeline          # derive cuts from all jobs/*.job.json (last job wins active)
npm run clock -- jobs/code-refactor.job.json
npm run dev               # Remotion Studio
```

Render:

```bash
npm run render:code
npm run render:arch
npm run render:race
```

## Layout

| Path | Role |
|------|------|
| `jobs/*.job.json` | v2 job samples (one per archetype) |
| `scripts/derive-clock.mjs` | `startMs/endMs` → frame cuts |
| `scripts/pipeline.mjs` | batch clock + next-step hints (TTS/Whisper documented) |
| `src/metaphors/` | Io / WaterTank / BTree / Threads / NodeGraph / BarRace |
| `src/archetypes/` | Stage shells for each archetype |
| `src/compositions/` | Remotion compositions |

## Clock rule

- Edit `scenes[].startMs/endMs` in the job
- Run `npm run clock -- jobs/<file>.job.json`
- Compositions read `src/generated/active-job.json`

Never ship narration with hard-coded `hookEnd: 120` — use this derive step.

## Metaphor switch

In `job.content.body.metaphor.type`:

`io-congestion` | `water-tank` | `btree-search` | `thread-workers` | `node-graph` | `bar-race` | `none`
