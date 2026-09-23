# geek-tech-short

> Cursor / Claude Code / Codex **Agent Skill** · Remotion 竖屏极客技术短视频**工业化母机**  
> 冷黑极客风 · 三形态 Archetype · 可插拔隐喻 · 动态音画时钟 · 多平台安全区

从「单条代码变形爆款模板」升级为可承接 **重构 / 架构原理 / 跑分对决** 的通用生产力引擎。

---

## 调用后你能得到什么？

装上这份 Skill 后，Agent 不再「随便做条 Remotion 视频」，而是按同一套工业规范出片。你实际拿到的是：

| 收益 | 具体效果 |
|------|----------|
| **频道级统一视觉** | 冷黑极客风（`#070A10` + 红/绿强调），避开霓虹土味、全局运镜穿模、首屏下半死黑、硬切跳帧；连续发片也像同一套产品 |
| **三种内容形态可切换** | `code-refactor` 重构避坑 · `architecture-flow` 原理顿悟 · `benchmark-race` 跑分对决 —— 不必每条都是「坏代码→绿代码」 |
| **对比隐喻可装配** | Io 拥堵 / 内存水箱 / 索引树 / 线程池 / 节点图 / 柱状赛道；观众 3 秒看懂痛点，不只听口播 |
| **音画能对齐** | 有 TTS 用 `dynamic` 时钟（`startMs/endMs`→帧），Ding/变绿跟口播走；减少「话没说完画面已变绿」 |
| **多平台不挡 UI** | 抖音 / 视频号 / Shorts / B 站安全区预设；改 `platform` 即可分发 |
| **干货有底线** | 强制：痛点钩子 + ≥1 条线上避坑 + 三原则 CTA，且按钮与字幕不双胞胎 |
| **交付路径清楚** | `job.json` v2 → **reference 可渲染工程** → `CHECKLIST` 出片；`PROMPT.md` 填空即可开工 |
| **可跑参考实现** | 仓库内 `reference/`：三形态 Composition + 隐喻组件 + `derive-clock` 动态时钟脚本 |

**一句话：** 更快做出能发的专业向竖屏技术片，而不是偶然撞出一条好看的。

---

## 安装

```bash
# GitHub
npx skills add zsc-rgb/geek-tech-short-skill -a cursor -y
npx skills add https://github.com/zsc-rgb/geek-tech-short-skill.git -a cursor -y

# Gitee（国内网络）
npx skills add https://gitee.com/CodingKeep/geek-tech-short-skill.git -a cursor -y
```

全局 / 仅此 skill：

```bash
npx skills add zsc-rgb/geek-tech-short-skill -a cursor -g -y
npx skills add zsc-rgb/geek-tech-short-skill --skill geek-tech-short -a cursor -y
```

手动：把 `skills/geek-tech-short/` 拷到项目 `.cursor/skills/` 或 `~/.cursor/skills/`。

验证：新开 Agent 对话，发送：

> 按 geek-tech-short 做一条抖音技术短视频

或直接粘贴 [`PROMPT.md`](skills/geek-tech-short/PROMPT.md) 里的主提示词。

---

## v2 能力一览

| 能力 | 说明 |
|------|------|
| **3 Archetypes** | `code-refactor` · `architecture-flow` · `benchmark-race` |
| **Metaphor widgets** | IoFlow / WaterTank / BTree / ThreadWorkers / NodeGraph / BarRace |
| **Clock** | `static` 预览 vs `dynamic`（TTS+Whisper `startMs/endMs` → frame） |
| **Platforms** | douyin / videoAccount / youtubeShorts / bilibili |
| **Non-negotiables** | 禁霓虹土味、禁全局运镜穿模、禁首屏死黑、禁硬切、禁 CTA 双胞胎 |

---

## 仓库结构

```
skills/geek-tech-short/   # Agent Skill 文档
reference/                # 可渲染 Remotion 参考工程（三形态 + 隐喻 + 时钟）
  jobs/*.job.json
  scripts/derive-clock.mjs
  scripts/pipeline.mjs
  src/metaphors|archetypes|compositions/
```

### 跑通参考片

```bash
cd reference
npm i
npm run clock -- jobs/code-refactor.job.json
npm run dev
# npm run render:code | render:arch | render:race
```

详见 [`reference/README.md`](reference/README.md)。

---

## 快速开始

1. 选 `archetype` + `platform` + `metaphor.type`
2. 填 v2 `job.json`（见 [`schema.md`](skills/geek-tech-short/schema.md)）
3. 有口播 → `clock: "dynamic"`，禁止写死 `hookEnd: 120` 出片
4. `calculateMetadata` 用最后一幕 `endMs` 定片长
5. 对照 [`CHECKLIST.md`](skills/geek-tech-short/CHECKLIST.md) 出片

---

## 搭配 Remotion 官方 Skill

```bash
npx skills add remotion-dev/skills -a cursor -y
```

本 skill 管「形态 / 干货 / 隐喻 / 时钟 / 平台安全区」；官方 skill 管 Remotion API / Studio / render。

## License

MIT
