# 极客技术短视频 · 通用制作提示词（母机 v2）

先安装 skill `geek-tech-short`，再粘贴对应提示词；把 `【】` 换成选题。

---

## 主提示词（新片 · 先选形态）

```markdown
请按 skill「geek-tech-short」制作一条竖屏技术短视频（1080×1920，Remotion）。

### 形态与平台（必填）
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

### 交付
- 输出 v2 job.json（见 schema.md）
- dynamic：TTS→Whisper→填 startMs/endMs→calculateMetadata
- lint → remotion render → CHECKLIST.md 自检
```

---

## 精修-only

```markdown
请按 geek-tech-short v2 精修当前视频：
1. 确认 archetype/metaphor 是否匹配选题（不要强行 IoFlow+代码变形）
2. 若有口播：clock=dynamic，Ding/变绿对齐 scenes 时间戳，去掉硬编码 SCENE
3. 平台安全区走 PLATFORMS；CTA 与字幕不双胞胎
4. 补 gotcha；软切换；冷黑克制
改完 render 出片。
```

---

## 快速选型口诀

| 选题感觉 | archetype | metaphor |
|----------|-----------|----------|
| 坏代码→好代码 | code-refactor | io-congestion / water-tank / … |
| 讲清链路/原理 | architecture-flow | node-graph |
| A vs B 跑分 | benchmark-race | bar-race |

完整 schema → [schema.md](schema.md) · 隐喻参数 → [metaphors.md](metaphors.md) · 案例 → [examples.md](examples.md)
