# geek-tech-short

> Cursor / Claude Code / Codex Agent Skill for **Remotion** Douyin/TikTok vertical tech shorts  
> 冷黑极客风 · 痛点钩子 · 代码变形 · 企业级避坑收束

Make Chinese programmer shorts that feel **senior**, not “培训班霓虹”.

---

## Install（推荐）

用 [skills](https://github.com/vercel-labs/skills) CLI 一键安装到 Cursor：

```bash
npx skills add <YOUR_GITHUB_USER>/geek-tech-short-skill -a cursor -y
```

只装这一条 skill：

```bash
npx skills add <YOUR_GITHUB_USER>/geek-tech-short-skill --skill geek-tech-short -a cursor -y
```

全局安装（所有项目可用）：

```bash
npx skills add <YOUR_GITHUB_USER>/geek-tech-short-skill -a cursor -g -y
```

### 手动安装

```bash
git clone https://github.com/<YOUR_GITHUB_USER>/geek-tech-short-skill.git
# 项目级
cp -r geek-tech-short-skill/skills/geek-tech-short your-remotion-project/.cursor/skills/
# 或用户级
cp -r geek-tech-short-skill/skills/geek-tech-short ~/.cursor/skills/
```

安装后新开一个 Agent 对话，说：

> 按 geek-tech-short 做一条抖音技术短视频

或直接粘贴 [`skills/geek-tech-short/PROMPT.md`](skills/geek-tech-short/PROMPT.md) 里的主提示词。

---

## Gitee 镜像（可选）

若 GitHub 访问慢，可把本仓库 mirror 到 Gitee，然后：

```bash
npx skills add https://gitee.com/<YOUR_GITEE_USER>/geek-tech-short-skill.git -a cursor -y
```

（skills CLI 支持任意 git URL。）

---

## What’s inside

```
skills/geek-tech-short/
  SKILL.md       # Agent 主规范（自动发现用）
  PROMPT.md      # 复制即用的制作 / 精修提示词
  CHECKLIST.md   # 发布前自检
  examples.md    # 多选题包（N+1、分页、缓存、RPC…）
```

### 四幕骨架（约 22s）

| 幕 | 时间 | 作用 |
|----|------|------|
| Hook | 0–4s | 痛点数字 + 坏代码；对比面板待命（禁死黑） |
| Analyze | 4–10s | 红色拥堵可视化 |
| Refactor | 10–17s | 代码 morph + 指标变绿 + Ding |
| CTA | 17–22s | 三原则 + 软切换；口播与按钮不双胞胎 |

视觉：`#070A10` 冷黑，危险 `#FF2A6D`，成功 `#05FFA1`；卡片宽 ≤900；字幕 `bottom ≥ 180`。

---

## 建议搭配

```bash
# Remotion 官方技能包
npx skills add remotion-dev/skills -a cursor -y
```

本 skill 管「内容节奏 + 抖音适配 + 干货公式」；Remotion 官方 skill 管 API / Studio / render。

---

## License

MIT — 可自由用于商业 Remotion 短视频制作；欢迎 Star / PR 补充选题包。
