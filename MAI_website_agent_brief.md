# MAI 宣传网站建设说明 / Agent 执行文档

> 目标：为 MAI 新建一个独立宣传网站仓库，使用 Astro 等现代化成熟方案实现一个可部署到腾讯云 EdgeOne Pages 的站点。网站需要覆盖 MAI 的主要产品能力，尤其是当前重点方向 **Story World / 故事世界**，同时保留 **多模型讨论室** 的核心介绍。视觉风格需要与 MAI App 保持一致：清新、简洁、mint teal / clear-water blue、冷白背景、少量 coral 警示色。

---

## 1. 背景与目标

MAI 本体仓库：

```text
https://github.com/Astroite/MAI
```

MAI 当前产品形态包括：

- 本地优先的多模型协作讨论平台
- 多 AI 人设进入同一讨论室
- 阶段 / 赛制 / 配方驱动的结构化讨论
- 书记官、主持信号、裁决、子讨论等可追溯机制
- Story Mode：AI 持续按角色演出，直到用户喊停
- Story World：世界、场景、角色记忆与跨场景连续创作

本次任务不是修改 MAI App 本体，而是新建一个独立的宣传网站仓库，用于：

1. 对外介绍 MAI 是什么。
2. 展示 Story World / 故事模式的核心价值。
3. 展示讨论室、多模型协作、书记官、主持、裁决、MCP 工具等能力。
4. 提供最新 Release 下载入口。
5. 保证大陆用户可访问，并尽量保证下载链路稳定。
6. 形成一个后续可持续维护的官网工程。

---

## 2. 项目定位

### 2.1 网站一句话定位

MAI 是一个让多个 AI 角色在同一个世界中持续互动、推演故事，并支持多模型协作讨论的本地优先 AI 工作台。

### 2.2 网站主叙事

官网不应只把 MAI 描述成“多模型聊天工具”，而应突出：

```text
从 AI 写作，到 AI 群演；
从单次对话，到可延续的故事世界；
从单模型回答，到多角色、多模型、可复盘的协作讨论。
```

### 2.3 目标用户

网站内容需要面向：

- 故事创作者
- 剧本 / 世界观创作者
- AI 角色扮演爱好者
- 产品经理 / 研发 / 决策者
- 多模型工作流和本地优先工具用户
- 开源项目使用者和贡献者

---

## 3. 技术方案

### 3.1 推荐技术栈

优先使用：

```text
Astro
TypeScript
React Islands / Astro Components
Tailwind CSS 或项目内轻量 CSS 变量体系
lucide-react 或 lucide 图标
```

说明：

- Astro 适合内容型官网、产品介绍页、文档型页面和静态部署。
- 网站可以表现为 SPA 风格体验，但不要为了 SPA 牺牲首屏速度和 SEO。
- 如果需要平滑页面切换，可以使用 Astro View Transitions / ClientRouter。
- 如果页面主要是单页宣传网站，可以先做成单页长页面。
- 如果需要多页面，例如 `/download`、`/docs`、`/privacy`，也可以使用 Astro 文件路由。
- 站点应尽量静态化，部署到 EdgeOne Pages 的 `dist/` 目录。

### 3.2 SPA 形式建议

这里的“SPA 应用”建议理解为：

```text
用户体验上像一个流畅的单页应用；
技术上优先使用 Astro 静态生成 + 少量客户端交互；
需要页面切换时使用 Astro ClientRouter / View Transitions。
```

不建议一开始做成纯 React SPA，因为官网需要：

- SEO
- 快速首屏
- 良好的分享预览
- 低维护成本
- 静态部署友好

如果后续需要复杂交互，可在局部使用 React Island。

### 3.3 包管理器

推荐使用：

```text
pnpm
```

基础脚本：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint .",
    "typecheck": "astro check"
  }
}
```

---

## 4. 新仓库建议结构

建议新建仓库名：

```text
MAI-Website
```

或：

```text
mai-website
```

推荐目录结构：

```text
mai-website/
  public/
    favicon.svg
    og/
      og-cover.png
    screenshots/
      app-home.png
      story-world.png
      debate-room.png
    downloads/
      latest.json              # 可选：构建时生成的 release 元数据
  src/
    assets/
      brand/
      illustrations/
    components/
      layout/
        Header.astro
        Footer.astro
        SiteShell.astro
      sections/
        HeroSection.astro
        StoryWorldSection.astro
        StoryModeSection.astro
        DiscussionRoomSection.astro
        FeaturesGrid.astro
        DownloadSection.tsx
        OpenSourceSection.astro
        FaqSection.astro
      ui/
        Button.astro
        StatusChip.astro
        FeatureCard.astro
        GlassCard.astro
        SectionHeader.astro
    data/
      features.ts
      nav.ts
      releases.generated.json  # 推荐：由脚本生成并提交或作为构建产物
    lib/
      release.ts
      constants.ts
    pages/
      index.astro
      download.astro
      privacy.astro
      changelog.astro
    styles/
      globals.css
      tokens.css
  scripts/
    sync-release.mjs
    mirror-release-assets.mjs
  .github/
    workflows/
      sync-release.yml
      deploy-preview.yml       # 可选
  astro.config.mjs
  package.json
  tsconfig.json
  README.md
```

---

## 5. 视觉设计规范

网站 UI 需要延续 MAI App 的视觉气质。

### 5.1 关键词

```text
清新
简洁
冷白
mint teal
clear-water blue
轻量卡片
故事导演台
本地优先
可控
可追溯
```

### 5.2 色彩建议

建议在 `src/styles/tokens.css` 中定义：

```css
:root {
  --mai-bg: #f8fcfd;
  --mai-surface: #ffffff;
  --mai-surface-soft: #eefafa;
  --mai-border: #d7eef0;

  --mai-mint: #16a69a;
  --mai-mint-strong: #07887f;
  --mai-mint-soft: #dff7f4;

  --mai-blue: #62bfe5;
  --mai-blue-soft: #e6f6fc;

  --mai-coral: #f26b5b;
  --mai-coral-soft: #fff0ed;

  --mai-text: #10212b;
  --mai-text-muted: #5d7280;
  --mai-text-soft: #8aa0aa;

  --mai-shadow-card: 0 12px 30px rgba(28, 110, 120, 0.08);
}
```

### 5.3 组件风格

- 圆角不超过 8px，官网 hero 可在局部使用 12px，但整体应与 App 保持克制。
- 使用 1px 浅色分割线。
- 轻阴影，不做厚重 SaaS 卡片。
- 状态 chip 使用低饱和色。
- 大面积背景保持冷白。
- 不使用深色科技风。
- 不使用复杂 3D 插画。
- 插画方向可以是水墨、清水、轻量 UI mockup、角色卡片、世界卡片。

### 5.4 页面气质

官网应像：

```text
清澈的 AI 创作工具官网
```

而不是：

```text
游戏发行官网
赛博朋克落地页
传统企业 SaaS 后台
AI 套壳工具站
```

---

## 6. 页面信息架构

### 6.1 MVP 推荐：单页官网

第一版建议先做单页官网，路径为：

```text
/
```

页面结构：

1. Header
2. Hero
3. Story World / 故事世界
4. Story Mode / AI 角色群演
5. Discussion Room / 多模型讨论室
6. Product Features / 核心功能
7. Local-first & Open Source / 本地优先与开源
8. Download / 下载
9. FAQ
10. Footer

### 6.2 后续可扩展页面

后续可以拆出：

```text
/download
/changelog
/docs
/privacy
```

---

## 7. 页面内容要求

### 7.1 Header

导航项：

```text
故事世界
讨论室
特性
下载
GitHub
```

按钮：

```text
下载 MAI
```

GitHub 链接：

```text
https://github.com/Astroite/MAI
```

### 7.2 Hero Section

目标：第一屏让用户理解 MAI 的核心价值。

推荐标题：

```text
让 AI 角色活在同一个世界里
```

推荐副标题：

```text
MAI 是一个本地优先的 AI 故事导演台。创建世界，召唤角色，开启场景，让多个 AI 角色持续互动、积累记忆，并在你的掌控下推动故事发展。
```

辅助文案：

```text
也可以用于多模型讨论、产品决策、方案评审和复杂问题推演。
```

CTA：

```text
立即下载
查看 GitHub
```

Hero 视觉：

- 右侧展示一个 MAI 风格的 App Mockup：
  - 左侧世界列表
  - 中间当前场景
  - 右侧角色记忆 / 导演面板
- 背景使用淡 clear-water blue / mint 光晕。
- 可以加入轻量山水、水面、世界卡片、角色头像等元素。
- 不要做夸张游戏宣传图。

### 7.3 Story World Section

标题：

```text
从一次对话，到一个持续发展的故事世界
```

文案：

```text
Story World 把单次房间扩展成一个世界。世界包含设定、角色、场景和跨场景记忆。每一幕结束后，MAI 可以把关键事件、关系变化、承诺和印象整理成角色记忆，让下一幕从过去继续。
```

功能点：

- World：承载世界观、背景、时间线
- Scene：每一幕都是一个可控制的房间
- Character：AI 角色和用户角色共存
- Memory：角色拥有跨场景记忆
- Scene-end Inspector：封幕后检查和整理记忆

卡片标题示例：

```text
世界不是一次性设定
角色不是一次性 NPC
每一幕都能沉淀为记忆
```

### 7.4 Story Mode Section

标题：

```text
不是让 AI 续写，而是让角色共同演出
```

文案：

```text
在故事模式中，每个 AI 只扮演自己。它会说自己的台词，描述自己的动作，保持自己的身份和关系，不替其他角色发言，也不会变成全知旁白。
```

功能点：

- 多角色持续接力
- 用户可随时喊停
- AI 保持角色身份
- 用户可以作为导演旁白
- 用户也可以扮演自己的角色入场
- 支持沉默、试探、冲突、承诺等自然互动

视觉建议：

- 展示一个场景对话 UI。
- 每个角色有独立头像、主题色和台词气泡。
- 显示「旁白模式 / 扮演模式」切换。

### 7.5 Discussion Room Section

标题：

```text
当你需要判断，不只问一个 AI
```

文案：

```text
MAI 的讨论室让多个 AI 人设进入同一个问题现场。它们共享上下文，按阶段和赛制发言、质询、反驳和总结。用户始终拥有冻结、推进、裁决和配置模型的最终控制权。
```

功能点：

- 多模型 / 多人设协作
- 阶段模板
- 赛制
- 配方
- 书记官 Scribe
- 主持 Facilitator
- 裁决 Judge
- 子讨论
- 工具与 MCP
- Append-only 可追溯记录

可使用场景：

```text
技术方案评审
产品决策圆桌
发散头脑风暴
假设压力测试
角色原型访谈
```

### 7.6 Feature Grid

建议展示 8 个特性：

1. 故事世界
2. 角色记忆
3. AI 角色群演
4. 多模型讨论室
5. 阶段与赛制
6. 书记官与主持
7. 本地优先
8. MCP 工具扩展

每个特性使用：

- lucide 图标
- 标题
- 1-2 句说明
- mint / blue 浅色卡片

### 7.7 Local-first & Open Source Section

标题：

```text
本地优先，开源可控
```

文案：

```text
MAI 以本地优先为核心。你可以在自己的环境中运行、配置模型 Provider 和 API Key，并根据需要选择 OpenAI、Anthropic、Gemini、OpenRouter 或兼容 LiteLLM 的自定义模型。
```

要点：

- 本地运行
- SQLite 默认数据
- 可配置模型 Provider
- 开源仓库
- 用户掌控数据和 API 配置
- 适合高阶用户与创作者长期使用

链接：

```text
https://github.com/Astroite/MAI
```

### 7.8 Download Section

标题：

```text
下载最新版 MAI
```

文案：

```text
网站会自动同步 MAI GitHub Release，并提供适合大陆访问的下载入口。
```

需要展示：

- 最新版本号
- 发布时间
- Release Notes 摘要或链接
- Windows 下载按钮
- 其他平台资产，如存在则展示
- GitHub Release 原始链接
- 镜像下载链接，如已配置

下载按钮示例：

```text
下载 Windows 安装包
查看全部 Release
```

状态：

- 正在检查最新版本
- 已是最新 Release
- 暂无可下载资产
- 镜像同步中
- 镜像不可用，使用 GitHub 下载

### 7.9 FAQ Section

建议问题：

1. MAI 是在线服务吗？
2. MAI 支持哪些模型？
3. 故事世界和普通讨论室有什么区别？
4. AI 会不会替其他角色说话？
5. 角色记忆会自动写入吗？
6. 数据保存在本地吗？
7. 大陆用户如何下载？
8. 如何参与开源贡献？

---

## 8. 下载与 Release 同步方案

这是本项目的关键点。

### 8.1 不推荐的方案

不建议只在前端直接请求：

```text
https://api.github.com/repos/Astroite/MAI/releases/latest
```

原因：

- 大陆用户访问 GitHub API 不稳定。
- GitHub Release 资产下载也可能不稳定。
- 前端实时请求会受限于网络、CORS、速率限制和用户环境。

### 8.2 MVP 方案

第一阶段可以实现：

1. 网站构建时运行脚本 `scripts/sync-release.mjs`。
2. 脚本请求 GitHub Releases API。
3. 获取最新 Release 元数据。
4. 生成：

```text
src/data/releases.generated.json
```

或：

```text
public/downloads/latest.json
```

5. 前端读取本地 JSON 展示下载信息。
6. 下载链接先指向 GitHub Release 原始 asset URL。

优点：

- 实现简单。
- 页面展示不依赖用户端访问 GitHub API。
- 适合快速上线。

缺点：

- 真实下载仍然依赖 GitHub。
- 不能完全保证大陆下载稳定。

### 8.3 推荐可靠方案：Release 资产镜像

为保证大陆用户下载，推荐实现 Release 资产镜像。

流程：

1. 在新网站仓库配置 GitHub Actions。
2. 定时执行或手动触发：
   - `schedule`
   - `workflow_dispatch`
   - 当 MAI 主仓库 release 更新时可手动触发。
3. Action 请求 MAI 主仓库最新 Release。
4. 下载 Release assets。
5. 将 assets 上传到大陆可访问的对象存储，例如：
   - 腾讯云 COS
   - EdgeOne Pages 可公开访问资源目录
   - 其他大陆可稳定访问的镜像存储
6. 生成 `latest.json`：
   - version
   - releaseName
   - publishedAt
   - body
   - originalGitHubUrl
   - assets[]
   - mirrorUrl
   - githubUrl
   - size
   - platform
   - checksum，如可获得
7. 网站 Download Section 优先展示 mirrorUrl。
8. 如果 mirrorUrl 不存在，再 fallback 到 githubUrl。

推荐字段：

```json
{
  "version": "v0.6.0",
  "name": "MAI v0.6.0",
  "publishedAt": "2026-05-10T00:00:00Z",
  "htmlUrl": "https://github.com/Astroite/MAI/releases/tag/v0.6.0",
  "body": "Release notes...",
  "assets": [
    {
      "name": "MAI_0.6.0_x64-setup.exe",
      "platform": "windows",
      "size": 123456789,
      "githubUrl": "https://github.com/Astroite/MAI/releases/download/...",
      "mirrorUrl": "https://download.example.com/mai/v0.6.0/MAI_0.6.0_x64-setup.exe",
      "sha256": ""
    }
  ],
  "syncedAt": "2026-05-10T00:00:00Z"
}
```

### 8.4 GitHub Actions 示例

创建：

```text
.github/workflows/sync-release.yml
```

示例：

```yaml
name: Sync MAI Release

on:
  workflow_dispatch:
  schedule:
    - cron: "0 */6 * * *"

permissions:
  contents: write

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout website repo
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Enable pnpm
        run: corepack enable

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Sync latest release metadata
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          MAI_REPO: Astroite/MAI
        run: node scripts/sync-release.mjs

      # 可选：上传资产到腾讯云 COS
      # - name: Mirror assets to COS
      #   env:
      #     COS_SECRET_ID: ${{ secrets.COS_SECRET_ID }}
      #     COS_SECRET_KEY: ${{ secrets.COS_SECRET_KEY }}
      #     COS_BUCKET: ${{ secrets.COS_BUCKET }}
      #     COS_REGION: ${{ secrets.COS_REGION }}
      #   run: node scripts/mirror-release-assets.mjs

      - name: Commit generated release data
        run: |
          git config user.name "mai-release-bot"
          git config user.email "actions@github.com"
          git add src/data/releases.generated.json public/downloads/latest.json || true
          git diff --cached --quiet || git commit -m "chore: sync MAI latest release"
          git push
```

### 8.5 `sync-release.mjs` 要求

脚本职责：

- 请求 `https://api.github.com/repos/Astroite/MAI/releases/latest`
- 解析 release：
  - tag_name
  - name
  - published_at
  - html_url
  - body
  - assets
- 根据 asset 名称推断平台：
  - windows
  - macos
  - linux
  - source
  - unknown
- 输出稳定 JSON。
- 如果 API 失败：
  - 不删除旧 JSON。
  - 输出错误日志。
  - CI 失败或保留旧数据，视配置决定。
- 不要在前端运行 token。
- 不要把 GitHub token 写进静态产物。

伪代码：

```js
const repo = process.env.MAI_REPO || "Astroite/MAI";
const token = process.env.GITHUB_TOKEN;

const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
  headers: token ? { Authorization: `Bearer ${token}` } : {}
});

if (!res.ok) {
  throw new Error(`GitHub release fetch failed: ${res.status}`);
}

const release = await res.json();

const data = {
  version: release.tag_name,
  name: release.name,
  publishedAt: release.published_at,
  htmlUrl: release.html_url,
  body: release.body || "",
  assets: release.assets.map(asset => ({
    name: asset.name,
    size: asset.size,
    downloadCount: asset.download_count,
    githubUrl: asset.browser_download_url,
    mirrorUrl: "",
    platform: inferPlatform(asset.name)
  })),
  syncedAt: new Date().toISOString()
};
```

---

## 9. EdgeOne Pages 部署方案

### 9.1 部署方式

推荐使用 EdgeOne Pages 的 Git 仓库集成。

基础配置：

```text
Framework: Astro
Install Command: pnpm install --frozen-lockfile
Build Command: pnpm build
Output Directory: dist
Production Branch: main
```

如果 EdgeOne Pages 没有自动识别 Astro，则手动配置上述参数。

### 9.2 环境变量

MVP 阶段可不需要运行时环境变量。

如果构建时同步 release：

```text
MAI_REPO=Astroite/MAI
```

如果使用 GitHub token：

```text
GITHUB_TOKEN
```

注意：

- 不要把 `GITHUB_TOKEN` 暴露到客户端。
- 如果使用 GitHub Actions 同步并提交 JSON，EdgeOne Pages 构建时不需要 GitHub token。
- 如果 EdgeOne Pages 构建阶段直接请求 GitHub API，需要配置构建环境变量，但仍不应注入前端。

### 9.3 SPA / 路由回退

如果使用 Astro 多页面静态站，不需要复杂 rewrite。

如果实现纯客户端路由，需要配置 fallback：

```text
所有未知路径回退到 /index.html
```

Agent 需要检查 EdgeOne Pages 是否支持路由重写规则。如支持，请配置：

```text
/* -> /index.html
```

但推荐第一版采用 Astro 文件路由 + ClientRouter 的方式，减少 fallback 依赖。

### 9.4 自定义域名

建议后续绑定：

```text
mai.example.com
```

或项目实际域名。

需要配置：

- HTTPS
- 国内访问测试
- www / apex 跳转策略
- SEO canonical

---

## 10. 内容文案草案

### 10.1 Hero

```text
让 AI 角色活在同一个世界里

MAI 是一个本地优先的 AI 故事导演台。创建世界，召唤角色，开启场景，让多个 AI 角色持续互动、积累记忆，并在你的掌控下推动故事发展。

也可以用于多模型讨论、产品决策、方案评审和复杂问题推演。
```

CTA：

```text
下载最新版
查看 GitHub
```

### 10.2 Story World

```text
从一次对话，到一个持续发展的故事世界

Story World 把单次房间扩展成一个世界。世界包含设定、角色、场景和跨场景记忆。每一幕结束后，MAI 会把关键事件、关系变化、承诺和印象整理成角色记忆，让下一幕从过去继续。
```

### 10.3 Story Mode

```text
不是让 AI 续写，而是让角色共同演出

在故事模式中，每个 AI 只扮演自己。它会说自己的台词，描述自己的动作，保持自己的身份和关系，不替其他角色发言，也不会变成全知旁白。
```

### 10.4 Discussion Room

```text
当你需要判断，不只问一个 AI

MAI 的讨论室让多个 AI 人设进入同一个问题现场。它们共享上下文，按阶段和赛制发言、质询、反驳和总结。用户始终拥有冻结、推进、裁决和配置模型的最终控制权。
```

### 10.5 Local-first

```text
本地优先，开源可控

MAI 以本地优先为核心。你可以在自己的环境中运行、配置模型 Provider 和 API Key，并根据需要选择不同模型供应商或兼容 LiteLLM 的自定义模型。
```

### 10.6 Download

```text
下载最新版 MAI

网站会自动同步 MAI GitHub Release，并优先提供适合大陆访问的镜像下载入口。如果镜像暂不可用，也会保留 GitHub 原始下载链接。
```

---

## 11. 组件实现建议

### 11.1 组件列表

```text
SiteHeader
SiteFooter
HeroSection
ProductMockup
StoryWorldSection
StoryModeSection
DiscussionRoomSection
FeatureGrid
FeatureCard
DownloadSection
ReleaseAssetButton
OpenSourceSection
FaqSection
BackgroundGlow
StatusChip
```

### 11.2 交互

第一版只需要轻量交互：

- Header 锚点滚动
- 下载区域根据 release JSON 渲染按钮
- FAQ 折叠
- 小范围 hover / active 状态
- 可选：页面切换 View Transition
- 可选：下载平台 tab

不要实现复杂后台、不接入 MAI App 账号、不接入在线服务。

---

## 12. SEO 与分享

必须实现：

- `<title>`
- `<meta name="description">`
- Open Graph
- Twitter Card
- favicon
- canonical
- sitemap
- robots.txt

推荐信息：

```text
Title:
MAI - AI 故事导演台与多模型讨论室

Description:
MAI 是一个本地优先的 AI 故事导演台。创建世界，召唤角色，开启场景，让多个 AI 角色持续互动、积累记忆；也支持多模型协作讨论、方案评审和可追溯决策。
```

OG 图建议：

```text
public/og/og-cover.png
```

OG 图内容：

- MAI Logo
- 标题：让 AI 角色活在同一个世界里
- App mockup / 世界卡片
- mint teal / clear-water blue 风格

---

## 13. 性能要求

目标：

- 首屏快
- 图片懒加载
- 静态资源压缩
- 不加载大型运行时
- 不引入重量级动画库
- 首屏 mockup 尽量使用静态图片或轻量 CSS

建议：

- 图片使用 WebP / AVIF。
- 截图资源控制大小。
- 不使用视频作为首屏背景。
- 如需要动画，使用 CSS transition 或少量 Web Animations。

---

## 14. 可访问性要求

- 所有按钮可键盘访问。
- 图片有 alt。
- 文本对比度足够。
- 下载按钮不要只依赖颜色表达状态。
- FAQ 使用语义化 button。
- Header nav 使用语义化 nav。
- prefers-reduced-motion 下减少动画。

---

## 15. Agent 执行步骤

### Step 1：初始化项目

```bash
pnpm create astro@latest mai-website
cd mai-website
pnpm add -D typescript
pnpm add lucide-react
```

如使用 React Island：

```bash
pnpm astro add react
```

如使用 Tailwind：

```bash
pnpm astro add tailwind
```

也可以不用 Tailwind，使用普通 CSS + CSS variables。

### Step 2：建立基础结构

创建：

```text
src/styles/tokens.css
src/styles/globals.css
src/components
src/data
src/pages/index.astro
```

### Step 3：实现单页官网

按以下顺序实现：

1. Header
2. Hero
3. Story World
4. Story Mode
5. Discussion Room
6. Features
7. Open Source
8. Download
9. FAQ
10. Footer

### Step 4：实现 Release 数据

创建：

```text
scripts/sync-release.mjs
src/data/releases.generated.json
```

先实现 metadata 同步。

### Step 5：实现下载区

DownloadSection 读取 generated JSON。

展示：

- version
- publishedAt
- asset list
- mirror 优先
- GitHub fallback

### Step 6：实现 GitHub Actions

添加：

```text
.github/workflows/sync-release.yml
```

先实现元数据同步。镜像资产上传可作为第二阶段。

### Step 7：部署到 EdgeOne Pages

配置：

```text
Build Command: pnpm build
Output Directory: dist
Production Branch: main
```

### Step 8：验收

运行：

```bash
pnpm build
pnpm preview
```

检查：

- 首页视觉
- 下载区 release 数据
- 移动端基本排版
- SEO 标签
- 外链
- EdgeOne Pages 部署结果
- 大陆网络访问与下载链路

---

## 16. 验收标准

### 16.1 视觉验收

- 与 MAI App 风格一致。
- 冷白背景、mint teal / clear-water blue 主色明确。
- 不像传统后台。
- 不像游戏宣发页。
- 卡片轻量、干净、有呼吸感。
- Story World 是主角，讨论室是重要能力之一。

### 16.2 内容验收

首页至少覆盖：

- Story World
- Story Mode
- 多模型讨论室
- 角色记忆
- 阶段 / 赛制 / 配方
- 书记官 / 主持 / 裁决
- 本地优先
- 开源
- 下载最新版

### 16.3 下载验收

- 能展示最新 Release 版本。
- 能展示 Release 发布时间。
- 能展示可下载资产。
- 镜像链接优先。
- GitHub 链接 fallback。
- GitHub API 不应在用户浏览器中作为唯一数据来源。
- 同步失败时不能把旧下载信息清空。

### 16.4 技术验收

- Astro 项目可本地运行。
- `pnpm build` 成功。
- 输出目录为 `dist`。
- EdgeOne Pages 可部署。
- 不需要服务端常驻进程。
- 不泄露 token。
- 不把 MAI App 本体代码复制进网站仓库。
- 网站仓库独立维护。

### 16.5 访问验收

- EdgeOne Pages 线上地址可访问。
- 主要资源能在大陆网络下正常加载。
- 下载入口在大陆可用或提供明确 fallback。
- GitHub 外链保留，但不能作为唯一下载路径。

---

## 17. 第二阶段增强

可在 MVP 后继续做：

1. 中文 / 英文双语。
2. Changelog 页面。
3. 在线文档入口。
4. 自动生成 Release 摘要。
5. 版本历史页。
6. 下载统计。
7. 贡献指南页。
8. 嵌入产品截图轮播。
9. 使用 EdgeOne Functions 做 release proxy。
10. 使用 COS / EdgeOne KV 做 release asset mirror。
11. 添加一键部署按钮。
12. 添加站点地图和结构化数据。
13. 为不同平台展示不同下载按钮。

---

## 18. 注意事项

1. 不要把官网做成 MAI App 的替代品。
2. 不要实现登录、在线使用、云端同步等未规划功能。
3. 不要承诺“完全免费调用模型”等不准确表述。
4. 不要把 GitHub Release 作为大陆唯一下载来源。
5. 不要引入大型 UI 框架。
6. 不要使用与 MAI App 明显割裂的品牌风格。
7. 不要将 GitHub token、COS Secret 等密钥打包进前端。
8. 不要从 MAI 主仓库复制大量业务代码。
9. 不要让宣传内容偏离当前真实能力。
10. 不要忽略 Story World，它是官网第一主角。

---

## 19. 给 Agent 的一句话任务

```text
请为 MAI 新建一个独立 Astro 官网仓库，采用 MAI App 的 mint teal / clear-water blue / 冷白工作台视觉风格，实现一个以 Story World 为主叙事、同时介绍多模型讨论室能力的宣传网站，并部署到腾讯云 EdgeOne Pages。网站需要自动同步 Astroite/MAI 的最新 GitHub Release，在页面中提供下载入口；第一版可展示 GitHub 下载链接，但架构上要预留大陆可访问的镜像下载方案，推荐后续将 release assets 同步到腾讯云 COS 或其他大陆可稳定访问的存储。
```

---

## 20. 参考链接

```text
MAI 本体仓库:
https://github.com/Astroite/MAI

MAI Releases:
https://github.com/Astroite/MAI/releases

Astro:
https://astro.build
https://docs.astro.build

EdgeOne Pages:
https://pages.edgeone.ai
https://pages.edgeone.ai/document/deployment-overview
```
