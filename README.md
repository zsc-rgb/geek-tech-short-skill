# geek-tech-short

> Cursor / Claude Code / Codex **Agent Skill** · Remotion 竖屏极客技术短视频**工业化母机**  
> 冷黑极客风 · 三形态 Archetype · 可插拔隐喻 · 动态音画时钟 · 多平台安全区

从「单条代码变形爆款模板」升级为可承接 **重构 / 架构原理 / 跑分对决** 的通用生产力引擎。

---

## 安装

```bash
npx skills add https://gitee.com/CodingKeep/geek-tech-short-skill.git -a cursor -y
```

全局 / 仅此 skill：

```bash
npx skills add https://gitee.com/CodingKeep/geek-tech-short-skill.git -a cursor -g -y
npx skills add https://gitee.com/CodingKeep/geek-tech-short-skill.git --skill geek-tech-short -a cursor -y
```

手动：`skills/geek-tech-short/` → 项目 `.cursor/skills/` 或 `~/.cursor/skills/`。

验证：新开 Agent → 「按 geek-tech-short 做一条技术短视频」。

---

## v2 能力一览

| 能力 | 说明 |
|------|------|
| **3 Archetypes** | `code-refactor` · `architecture-flow` · `benchmark-race` |
| **Metaphor widgets** | IoFlow / WaterTank / BTree / ThreadWorkers / NodeGraph / BarRace |
| **Clock** | `static` 预览 vs `dynamic`（TTS+Whisper `startMs/endMs` → frame） |
| **Platforms** | douyin / videoAccount / youtubeShorts / bilibili 安全区预设 |
| **Non-negotiables** | 禁霓虹土味、禁全局运镜穿模、禁首屏死黑、禁硬切、禁 CTA 双胞胎 |

---

## 仓库结构

```
skills/geek-tech-short/
  SKILL.md       # Agent 主规范
  PROMPT.md      # 新片 / 精修提示词
  CHECKLIST.md   # 发布自检
  examples.md    # 按形态选题包
  schema.md      # job.json v2
  metaphors.md   # 隐喻组件参数
```

---

## 快速开始

1. 选 `archetype` + `platform` + `metaphor.type`
2. 填 v2 `job.json`（见 `schema.md`）
3. 有口播 → `clock: "dynamic"`，禁止写死 `hookEnd: 120` 出片
4. `calculateMetadata` 用最后一幕 `endMs` 定片长
5. 对照 `CHECKLIST.md` 出片

提示词模板：[`PROMPT.md`](skills/geek-tech-short/PROMPT.md)

---

## 搭配 Remotion 官方 Skill

```bash
npx skills add remotion-dev/skills -a cursor -y
```

## License

MIT
