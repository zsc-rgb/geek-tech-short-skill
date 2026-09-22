# 发布到 GitHub / Gitee

本地仓库已就绪：`geek-tech-short-skill/`（含初始 commit）。

## 一键发布到 GitHub（推荐）

在 PowerShell 中执行（需已登录 GitHub）：

```powershell
cd "d:\A Remotion\加强版Remotion视频效果\geek-tech-short-skill"

# 1) 登录（首次）
& "$env:TEMP\gh-cli\bin\gh.exe" auth login

# 或若已把 gh 加入 PATH：
# gh auth login

# 2) 创建公开仓库并推送（把 YOUR_USER 换成你的 GitHub 用户名）
& "$env:TEMP\gh-cli\bin\gh.exe" repo create geek-tech-short-skill --public --source=. --remote=origin --push --description "Remotion Douyin geek tech-short Agent Skill for Cursor"

# 3) 把 README 里的 <YOUR_GITHUB_USER> 换成真实用户名后，再 commit + push 一次
```

别人调用：

```bash
npx skills add YOUR_USER/geek-tech-short-skill -a cursor -y
```

## 发布到 Gitee

1. 浏览器打开 https://gitee.com/projects/new 新建公开仓库 `geek-tech-short-skill`（不要勾选「使用 Readme 初始化」）。
2. 本地：

```powershell
cd "d:\A Remotion\加强版Remotion视频效果\geek-tech-short-skill"
git remote add origin https://gitee.com/YOUR_GITEE_USER/geek-tech-short-skill.git
git branch -M main
git push -u origin main
```

别人调用：

```bash
npx skills add https://gitee.com/YOUR_GITEE_USER/geek-tech-short-skill.git -a cursor -y
```

## 验证安装

```bash
npx skills add ./geek-tech-short-skill -a cursor -y   # 也可先测本地路径
# 新开 Cursor Agent 对话 → 「按 geek-tech-short 做一条技术短视频」
```
