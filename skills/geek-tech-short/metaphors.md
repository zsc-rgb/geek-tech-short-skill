# Metaphor widget library

**Renderable source of truth:** `reference/src/metaphors/` (`MetaphorWidget` switch).

All widgets share lifecycle: **standby** (opacity ~0.3) → **active/danger** → **resolved/success**.

Mount via `content.body.metaphor`:

```json
{ "type": "io-congestion", "params": { "from": 100, "to": 1 } }
```

---

## `io-congestion` → IoFlow

**When:** 网络往返、连接池、串行 RPC。  
**Params:**

| Key | Default | Meaning |
|-----|---------|---------|
| `from` | 100 | Congested request count |
| `to` | 1 | After fix |
| `labelBad` | `IO × N` | Active label |
| `labelGood` | `IO × 1` | Resolved |

Visual: waterfall / pool fill bar; shake near saturation.

---

## `water-tank` → WaterfillTank

**When:** OOM、全表加载、堆泄漏。  
**Params:** `capacityMb`, `fillFrom`, `fillTo`, `overflowAt` (0–1).

Visual: tank level rises to red overflow line, then drains to safe green band.

---

## `btree-search` → BTreeSearch

**When:** 索引失效、全表扫描 vs 索引命中。  
**Params:** `modeBad: "scan" | "miss"`, `modeGood: "index" | "cover"`.

Visual: left = linear red probes; right = short green path to leaf.

---

## `thread-workers` → ThreadWorkers

**When:** 线程池打满、锁竞争、死锁。  
**Params:** `workers`, `blocked`, `fairAfter` (bool).

Visual: worker slots fill red / spin-wait; after resolve, orderly green checkmarks.

---

## `node-graph` → SvgNodeGraph (+ TokenParticles)

**When:** 架构链路、RAG、消息队列。  
**Params:** usually mirrored from `content.body.graph`.

Rules: ≤6 nodes; pulse failing edge in danger; highlight healthy path in success.

---

## `bar-race` → BarChartRace

**When:** 吞吐/延迟/跑分对决。  
**Params:** mirrored from `content.body.race`.

Rules: shared axis; one winner lock + Ding; show unit on axis.

---

## `none`

Still fill Hook lower half: muted principle teaser, diagram silhouette, or standby empty-state card — **never** pure black void.

---

## Choosing quickly

| Pain keyword | Prefer |
|--------------|--------|
| 连接池 / TCP / RPC / IO | `io-congestion` |
| OOM / 堆 / 全表 | `water-tank` |
| 索引 / 慢查询计划 | `btree-search` |
| 线程 / 锁 / 死锁 | `thread-workers` |
| 链路 / 中间件原理 | `node-graph` (+ architecture-flow) |
| vs / 跑分 / QPS | `bar-race` (+ benchmark-race) |
