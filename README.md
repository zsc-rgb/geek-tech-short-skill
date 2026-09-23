# geek-tech-short

> Cursor / Claude Code / Codex **Agent Skill** · Remotion 竖屏技术短视频**双模工业化母机**  
> **Geek-Dark** 冷黑极客 · **Warm Editorial** 暖纸社论（Notion Canvas）  
> 三形态 Archetype · 可插拔隐喻 · Letterbox 卡片 · 动态音画时钟 · 多平台安全区

从「单条代码变形爆款模板」升级为可承接 **重构 / 架构 / 跑分** 与 **知识库 / 产品科普** 的通用生产力引擎。

---

## 双模一眼懂

| 引擎 | 视觉 | 适合 |
|------|------|------|
| **Geek-Dark** | 冷黑 `#070A10` + 红/绿强调，全屏舞台 | 重构避坑 · 架构原理 · 跑分对决 |
| **Warm Editorial** | 黑边 Letterbox + 象牙卡片 `#F7F4EB` | 协议速查 · SaaS 表格 · A→B 认知升级 |

一条视频只选一个引擎，不要混色板。

---

## 调用后你能得到什么？

| 收益 | 具体效果 |
|------|----------|
| **频道级统一视觉** | 两套可复用视觉系统；避开霓虹土味、全局运镜穿模、硬切跳帧 |
| **Geek-Dark 三形态** | `code-refactor` · `architecture-flow` · `benchmark-race` |
| **Editorial 三组件** | `icon-grid` · `ui-mockup` · `flow-step` + 可选吉祥物 |
| **对比隐喻可装配** | Io / 水箱 / 索引树 / 线程池 / 节点图 / 柱状赛道（Geek-Dark） |
| **音画能对齐** | Geek-Dark：`dynamic` 时钟；Editorial：帧区间字幕 |
| **多平台不挡 UI** | 抖音 / 视频号 / Shorts / B 站安全区预设 |
| **可跑参考实现** | `reference/`：6 条 Composition（3 Geek + 3 Editorial） |

---

## 安装

```bash
# GitHub
npx skills add zsc-rgb/geek-tech-short-skill -a cursor -y
npx skills add https://github.com/zsc-rgb/geek-tech-short-skill.git -a cursor -y

# Gitee（国内网络）
npx skills add https://gitee.com/CodingKeep/geek-tech-short-skill.git -a cursor -y
```

手动：把 `skills/geek-tech-short/` 拷到项目 `.cursor/skills/` 或 `~/.cursor/skills/`。

验证：新开 Agent 对话，发送：

> 按 geek-tech-short 做一条抖音技术短视频  
> 或：按 Warm Editorial 做一条知识库竖屏短视频

---

## v2 能力一览

| 能力 | 说明 |
|------|------|
| **Dual engines** | `geek-dark` · `warm-editorial` |
| **3 Archetypes** | code-refactor · architecture-flow · benchmark-race |
| **3 Editorial widgets** | icon-grid · ui-mockup · flow-step |
| **Metaphor widgets** | IoFlow / WaterTank / BTree / ThreadWorkers / NodeGraph / BarRace |
| **Clock** | Geek：`static` vs `dynamic`；Editorial：字幕 `startFrame/endFrame` |
| **Platforms** | douyin / videoAccount / youtubeShorts / bilibili |

---

## 仓库结构

```
skills/geek-tech-short/   # Agent Skill 文档（双模）
reference/                # 可渲染 Remotion 参考工程
  jobs/*.job.json         # Geek-Dark 样例
  src/EditorialShort/     # Warm Editorial 组件 + demos
  src/metaphors|archetypes|compositions/
```

### 跑通参考片

```bash
cd reference
npm i
npm run clock -- jobs/code-refactor.job.json
npm run dev
# Geek-Dark
npm run render:code | render:arch | render:race
# Warm Editorial
npm run render:editorial-table | render:editorial-icons | render:editorial-flow
```

详见 [`reference/README.md`](reference/README.md)。

---

## 快速开始

1. 选 **engine**（geek-dark | warm-editorial）
2. Geek → 填 v2 `job.json`；Editorial → 填 `EditorialVideoConfig` / 改 `demos.ts`
3. 有口播的 Geek 片 → `clock: "dynamic"`，禁止写死 `hookEnd: 120`
4. 对照 [`CHECKLIST.md`](skills/geek-tech-short/CHECKLIST.md) 出片

提示词：[`PROMPT.md`](skills/geek-tech-short/PROMPT.md)

---

## 搭配 Remotion 官方 Skill

```bash
npx skills add remotion-dev/skills -a cursor -y
```

本 skill 管「引擎 / 形态 / 干货 / 隐喻 / 时钟 / 平台安全区」；官方 skill 管 Remotion API / Studio / render。

## License

MIT
