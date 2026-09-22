# 极客技术短视频 · 通用制作提示词

把下面整段交给 Cursor / Claude Code 等 Agent（先确保已安装 `geek-tech-short` skill），按选题替换 `【】`。

---

## 主提示词（新片）

```markdown
请按 skill「geek-tech-short」制作一条抖音竖屏技术短视频（1080×1920，约 20–26 秒，Remotion）。

### 选题
- 痛点主题：【例如：循环里查库导致接口超时】
- 核心对比隐喻：【例如：100 次网络 IO vs 1 次 Batch】
- 失败指标 Hook：【例如：3280ms】→ 成功指标：【例如：16ms】
- 企业级升华避坑（至少 1 条）：【例如：Lists.partition 分批 + toMap (v1,v2)->v1】
- 结尾三原则：【1】【2】【3】

### 四幕节奏（不可缺）
1. **0–4s Hook**：放大痛点数字；坏代码居中；下方对比面板半透明「待命」，禁止下半屏死黑。
2. **4–10s Analyze**：代码上浮归位；面板点亮，红色拥堵全力表现。
3. **10–17s Refactor**：代码 Magic Move 坏→好；耗时闪降变绿；高光叠 Enter+Ding。
4. **17–22s CTA**：代码+面板 ~0.5s 淡出并上移 ~20px；三原则卡 scale 0.95→1 滑入；口播与按钮文案不双胞胎撞车。

### 视觉规范
- 冷黑：bg #070A10，危险 #FF2A6D，成功 #05FFA1；禁杂乱霓虹。
- 卡片宽 ≤900；字幕 bottom≥180；徽章避开抖音右侧互动栏。
- 透视网格透明度 0.12–0.15；禁止全局镜头 scale 穿模裁切。
- 代码约 32px；赋值尽量单行；合并函数用 (v1,v2)->v1。

### 干货法则
通用痛点做钩子，1 个线上避坑做升华——不要只讲入门八股。

### 交付
- JSON 驱动文案（job.json）
- precompile（如有）→ lint → remotion render → 打开 out/video.mp4
- 对照 geek-tech-short/CHECKLIST.md 自检后汇报改动点
```

---

## 精修-only

```markdown
请按 geek-tech-short 对当前 Remotion 视频做发布前精修：
1. 代码微排版：单行赋值、地道命名；禁止溢出卡片
2. 幕间软切换：退场 fade+−20px；CTA scale 0.95→1
3. 网格 0.12–0.15；CARD_W≤900；徽章避让右侧 UI
4. 变形变绿高光叠 Ding/Enter
5. 干货：补一条企业级避坑；CTA 与字幕不双胞胎
保持冷黑基调与节奏，改完 render 出片。
```

---

## 最小 `job.json`

见 [SKILL.md](SKILL.md) 中的 schema；更多选题包见 [examples.md](examples.md)。
