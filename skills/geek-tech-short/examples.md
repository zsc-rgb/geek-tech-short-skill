# Topic packs by archetype

Always: **pain metric → prove pain → resolve → gotcha CTA**.  
Vary archetype/metaphor so the feed does not look identical.

---

## A. `code-refactor`

### A1. Java N+1（canonical）
- metric: `3280ms` → `16ms`
- metaphor: `io-congestion` `{ from: 100, to: 1 }`
- gotcha: `Lists.partition` + `toMap(..., (v1,v2)->v1)`

### A2. 无分页拉全表
- metric: heap / Full GC
- metaphor: `water-tank`
- gotcha: 深分页 seek，禁大 OFFSET

### A3. 索引失效
- metaphor: `btree-search`
- gotcha: 对函数包裹列导致无法走索引

### A4. 线程池打满
- metaphor: `thread-workers`
- gotcha: 业务隔离池 + 拒绝策略，勿共用 Tomcat 线程

---

## B. `architecture-flow`

### B1. RAG 为何翻车
- nodes: Query → Embed → VectorDB → Rerank → LLM
- fail edge: top-k 过小 / 脏切片
- gotcha: 召回评估先于调 Prompt

### B2. Kafka 为何快
- nodes: Producer → PageCache → Partition → Consumer
- pulse sequential append vs random disk
- gotcha: 盲目加分区不治跨分区事务痛点

### B3. Agent 工具调度
- nodes: Planner → ToolRouter → Tools → Observer
- fail: 无超时 / 无幂等
- gotcha: 每个 tool 独立 deadline + 可重试边界

---

## C. `benchmark-race`

### C1. FastAPI vs Go vs Spring Boot 吞吐
- race unit: `QPS`
- gotcha: 公布 concurrency、payload、是否 warmup

### C2. 本地推理引擎跑分
- contenders: llama.cpp / vLLM / Ollama …
- gotcha: 同量化、同 prompt、同 GPU；注明 tokens/s 定义

---

## Dynamic clock + SFX

```text
scenes[].endMs(hook)     → hookEnd
scenes[].endMs(analyze)  → analyzeEnd
scenes[].endMs(resolve)  → resolveEnd
Ding @ resolveStart + morphPeak  OR Whisper keyword hit (“16ms”/“胜出”)
CTA fade: resolveEnd … resolveEnd+0.5s
```

Never ship narration with `clock: "static"`.
