# geek-tech-short

> Cursor / Claude Code / Codex **Agent Skill** · 用 Remotion 做抖音/TikTok 竖屏技术短视频  
> 冷黑极客风 · 痛点钩子 · 代码变形 · 企业级避坑收束

让技术短视频看起来像**资深工程师经验**，而不是培训班霓虹片。

---

## 安装（别人怎么调用）

### 方式 A — skills CLI（推荐）

仓库公开后，在任意 Remotion 项目里执行：

```bash
npx skills add https://gitee.com/CodingKeep/geek-tech-short-skill.git -a cursor -y

# GitHub（若已同步镜像）
npx skills add CodingKeep/geek-tech-short-skill -a cursor -y
```

只装这一条 skill、或装到全局：

```bash
npx skills add https://gitee.com/CodingKeep/geek-tech-short-skill.git --skill geek-tech-short -a cursor -y
npx skills add https://gitee.com/CodingKeep/geek-tech-short-skill.git -a cursor -g -y
```

### 方式 B — 手动复制

```bash
git clone https://gitee.com/CodingKeep/geek-tech-short-skill.git
cp -r geek-tech-short-skill/skills/geek-tech-short your-project/.cursor/skills/
# 或用户级：~/.cursor/skills/
```

### 验证

新开 Cursor Agent 对话，发送：

> 按 geek-tech-short 做一条抖音技术短视频

或粘贴 [`skills/geek-tech-short/PROMPT.md`](skills/geek-tech-short/PROMPT.md) 里的主提示词。

---

## 仓库结构

```
skills/geek-tech-short/
  SKILL.md       # Agent 自动发现的主规范
  PROMPT.md      # 复制即用：新片 / 精修提示词
  CHECKLIST.md   # 发布前自检清单
  examples.md    # 多选题包（N+1、分页、缓存、RPC…）
PUBLISH.md       # 你自己如何把本仓库推到 Gitee/GitHub
```

符合 [vercel-labs/skills](https://github.com/vercel-labs/skills) 约定：`skills/<name>/SKILL.md`。

---

## 四幕骨架（约 22s @ 30fps）

| 幕 | 时间 | 作用 |
|----|------|------|
| Hook | 0–4s | 痛点数字 + 坏代码；对比面板待命（禁下半屏死黑） |
| Analyze | 4–10s | 红色拥堵可视化 |
| Refactor | 10–17s | 代码 morph + 指标变绿 + Ding 音效 |
| CTA | 17–22s | 三原则软切入；口播与按钮不双胞胎 |

**视觉：** bg `#070A10` · 危险 `#FF2A6D` · 成功 `#05FFA1` · 卡片宽 ≤900 · 字幕 `bottom ≥ 180`

**干货：** 通用痛点做钩子 + **至少 1 条线上避坑**做升华。

---

## 建议搭配 Remotion 官方 Skill

```bash
npx skills add remotion-dev/skills -a cursor -y
```

本 skill 管「抖音节奏 / 干货公式 / 平台安全区」；官方 skill 管 Remotion API / Studio / render。

---

## 发布本仓库

见 [PUBLISH.md](PUBLISH.md)。本地已 `git init` 并完成初始提交，创建远端空仓库后 `git push` 即可。

## License

MIT
