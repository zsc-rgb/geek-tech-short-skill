# 极客技术短视频 · 通用制作提示词（双模母机）

先安装 skill `geek-tech-short`，再粘贴对应提示词；把 `【】` 换成选题。  
**先选引擎：** Geek-Dark（冷黑硬核）或 Warm Editorial（暖纸社论 / Notion Canvas）。

---

## 主提示词 · Geek-Dark（冷黑 · 三形态）

```markdown
请按 skill「geek-tech-short」制作一条竖屏技术短视频（1080×1920，Remotion）。

### 引擎与形态（必填）
- engine：geek-dark
- archetype：【code-refactor | architecture-flow | benchmark-race】
- platform：【douyin | videoAccount | youtubeShorts | bilibili】
- clock：有口播音频则用 dynamic（scenes 写 startMs/endMs）；仅 UI 调试可用 static
- metaphor.type：【io-congestion | water-tank | btree-search | thread-workers | node-graph | bar-race | none】

### 选题
- 痛点主题：【】
- Hook 指标：【value + unit，如 3280ms】→ 成功态：【】
- 对比故事（一句话）：【】
- 企业级 gotcha（至少 1 条）：【】
- 三原则：【1】【2】【3】

### 四幕（情绪弧，时长跟 TTS）
1. Hook：放大指标；主视觉待命占位，禁止下半屏死黑
2. Analyze：隐喻/图谱/赛道进入「痛」（红/堵/落后）
3. Resolve：变绿 / 通路 / 胜出 + Ding（对齐动态时钟，禁止写死第 300 帧）
4. CTA：软切 fade+−20px；卡 scale 0.95→1；badge 与字幕不双胞胎

### 规范
- 冷黑 #070A10；危险 #FF2A6D；成功 #05FFA1
- 使用 PLATFORMS[platform] 的 safeBottom / safeRight / cardWidth
- 禁止全局运镜 scale；JSON 驱动文案；≥1 条线上避坑
- 从 reference/src 适配，禁止霓虹土味

### 交付
- 输出 v2 job.json（见 schema.md）
- dynamic：TTS→Whisper→填 startMs/endMs→calculateMetadata
- lint → remotion render → CHECKLIST.md 自检
```

---

## 主提示词 · Warm Editorial（暖纸社论 / Notion Canvas）

```markdown
请按 skill「geek-tech-short」的 Warm Editorial 引擎制作一条竖屏知识短视频（1080×1920）。

### 引擎与组件（必填）
- engine：warm-editorial
- layout：letterbox-card（黑底 + 居中象牙色卡片，勿拉满全高）
- widgetType：【icon-grid | ui-mockup | flow-step】
- theme：warm-ivory

### 文案
- category（眉题，如「网络基础」）：【】
- title（卡片主标题，可换行）：【】
- badge（可选，品牌/知识库名）：【】
- 字幕 2～4 句（按帧或按口播）：【】
- punchline / 知识点（一句话）：【】

### widgetData（按类型填）
- icon-grid：8～10 个 { id, label, color, glyph }
- ui-mockup：{ title, columns, rows, highlight?, actionLabel? }
- flow-step：{ from, to, punchline }

### 视觉规范
- 舞台 #000；卡片 #F7F4EB；标题 #1C1917；辅色蓝/橙/绿克制
- 参考 reference/src/EditorialShort/（Card + Widgets + Mascot）
- 帧驱动 spring；禁止全局运镜；禁止混入 Geek-Dark 霓虹红绿
- 字幕放在卡片下方 letterbox；可保留吉祥物

### 交付
- 输出 EditorialVideoConfig（或改 demos.ts）
- Studio 预览对应 Composition：EditorialIconGridShort / EditorialTableShort / EditorialFlowShort
- lint → npm run render:editorial-* → CHECKLIST（Editorial 段）自检
```

---

## 精修-only

```markdown
请按 geek-tech-short 双模规范精修当前视频：
1. 确认 engine 是否选对（冷黑硬核 vs 暖纸社论），不要混主题
2. Geek-Dark：archetype/metaphor 匹配；有口播则 dynamic 时钟；补 gotcha
3. Editorial：letterbox-card + 单一 widgetType；暖纸色板；字幕在下黑边
4. 平台安全区；CTA 与字幕不双胞胎；禁止全局 scale
改完 render 出片。
```

---

## 快速选型口诀

| 选题感觉 | engine | 形态 / widget |
|----------|--------|----------------|
| 坏代码→好代码 | geek-dark | code-refactor + io/water-tank… |
| 讲清链路/原理 | geek-dark | architecture-flow + node-graph |
| A vs B 跑分 | geek-dark | benchmark-race + bar-race |
| 协议/概念速查墙 | warm-editorial | icon-grid |
| SaaS/表格产品感 | warm-editorial | ui-mockup |
| A→B 认知升级一句 | warm-editorial | flow-step |

完整 schema → [schema.md](schema.md) · 隐喻 → [metaphors.md](metaphors.md) · 案例 → [examples.md](examples.md)
