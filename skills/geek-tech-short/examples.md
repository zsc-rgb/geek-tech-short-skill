# Topic packs & morph examples

Use these as `job.json` starters. Always keep: **pain metric → contrast panel → morph → gotcha CTA**.

---

## 1. Java N+1 / 循环查库（canonical）

| Field | Value |
|-------|-------|
| Hook metric | `3280ms` → `16ms` |
| Metaphor | 100× red network IO vs 1× green batch |
| Gotcha | `Lists.partition(ids, 500)` + `toMap(..., (v1,v2)->v1)` |
| Principles | 拒循环 I/O；超大集合分批；toMap 声明去重 |

```java
// bad
for (Long id : ids) {
  list.add(mapper.selectById(id));
}

// good
// 避坑：toMap 防 Duplicate Key
List<User> all = mapper.selectBatchIds(ids);
Map<Long,User> map = all.stream().collect(
  toMap(User::getId, u -> u, (v1, v2) -> v1));
```

---

## 2. 接口无分页一次拉全表

| Field | Value |
|-------|-------|
| Hook | 堆内存 / Full GC / 接口 30s+ |
| Metaphor | 红色“整表倾倒” vs 绿色 cursor/page 流式 |
| Gotcha | 深分页用 seek (`WHERE id > lastId`) 代替 `OFFSET` 大偏移 |
| Principles | 强制分页；限制 max pageSize；深翻页用 seek |

---

## 3. 缓存击穿 / 热点 Key

| Field | Value |
|-------|-------|
| Hook | QPS 尖刺、DB CPU 打满 |
| Metaphor | 红色打穿箭雨 vs 绿色 singleflight / 互斥重建 |
| Gotcha | 空值也短 TTL；重建加分布式锁或 singleflight |
| Principles | 热点隔离；空值缓存；重建合并 |

---

## 4. 同步调用串行扇出

| Field | Value |
|-------|-------|
| Hook | 下游 3 个 RPC 串行 = 延迟相加 |
| Metaphor | 红色一条长链 vs 绿色 `CompletableFuture` / 并行扇出 |
| Gotcha | 并行要设超时与线程池隔离，避免公共池耗尽 |
| Principles | 可并行则并行；超时兜底；线程池隔离 |

---

## 5. 前端大列表无虚拟化（非 Java 也可）

| Field | Value |
|-------|-------|
| Hook | 首屏卡顿、内存涨 |
| Metaphor | 红色 DOM 爆炸 vs 绿色 window 虚拟列表 |
| Gotcha | 动态行高要测量缓存；key 稳定 |
| Principles | 可视区渲染；稳定 key；避免列表内重计算 |

---

## Morph + SFX timing (30fps)

Assume `analyzeEnd = 300` (10s):

| Frame | Event |
|-------|-------|
| `analyzeEnd - 2` | woosh |
| `analyzeEnd … +36` | code morph 0→1 |
| `analyzeEnd + 16` | **Ding + Enter** (green flash peak) |
| `refactorEnd … +15` | code/panel fade out, y −20 |
| `refactorEnd … +15` | CTA opacity/scale in |

Tune to your morph curve; Ding must land on the “变绿爽点”, not after the viewer already scrolled away.
