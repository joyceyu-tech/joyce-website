# Joyce 的个人网站

*Joyce's Portfolio — About me, my work, and what I'm building.*

这是我的个人作品集网站，用一页介绍我的职业背景、技术方向、项目实践与工作经历。网站默认使用英文，支持一键切换中文。

我目前在汇丰从事软件测试工作，持有 ISTQB 认证。测试与质量保障是我的职业基础，Java / Spring 是我开展后端项目实践的主要技术栈。在此基础上，我正逐步深入 AI 应用开发，通过 Spring AI、RAG、知识库问答与模型服务接入等项目积累实践经验，并继续探索 Agent 与 AI 工程化流程。

个人项目与学习实践会持续更新至 [Gitee](https://gitee.com/joyceyu434840)，网站也会同步补充项目成果与学习进展。

**在线访问：[joyceyu.dpdns.org](https://joyceyu.dpdns.org/)**

## 网站内容

- **关于我**：测试与质量保障背景、Java 后端基础，以及 AI 应用开发方向。
- **技术能力**：测试交付、Java / Spring 后端、AI 应用与 RAG、微服务与分布式基础，以及银行信用卡业务经验。
- **个人项目**：目前展示 7 个 Gitee 项目，分为「AI 应用与智能体项目」「微服务与分布式系统」「业务后端项目」三类。
- **工作经历**：在汇丰软件开发与科华数据工作期间参与的测试项目及主要职责。
- **联系方式**：邮箱、GitHub 与 Gitee。

## 浏览建议

- **电脑浏览器**：推荐使用，便于查看项目介绍与架构图。
- **手机浏览器**：支持自适应布局，可直接访问。
- **微信内置浏览器**：部分环境下可能出现加载异常或访问受限。如遇问题，可通过右上角「…」选择「在浏览器中打开」，或复制链接至 Safari、Chrome 等浏览器访问。

## 本地预览与维护

本站使用 **HTML、CSS 和 JavaScript** 构建，以 `content.json` 统一维护文案、项目列表及中英文内容，通过 `build.js` 生成 `index.html` 与 `translations.js`。

### 本地预览

安装 Node.js 后，在仓库根目录执行：

```bash
npm run build
npm run preview
```

然后在浏览器中打开 [localhost:4173](http://localhost:4173/)。修改内容后，重新运行 `npm run build` 并刷新页面即可查看。

### 内容更新

- **文案与项目**：编辑 `content.json`，统一维护中英文内容。
- **页面结构**：编辑 `index.template.html`，然后重新构建。
- **构建产物**：`index.html` 与 `translations.js` 由脚本生成，请在源文件中修改对应内容。

修改完成后，运行 `npm run build` 并提交源文件与生成文件。仓库也配置了 GitHub Actions：推送至 `main` 或 `master` 分支后，会自动构建并将有变化的生成文件提交回仓库。

### 项目图片轮播

在项目的 `architecture` 中设置 `presentation: "carousel"` 即可启用轮播。项目封面 `image` 作为第一张图片，后续图片按 `architecture.diagrams` 的顺序展示。

轮播支持按钮、圆点、键盘和手机横滑切换，也支持点击图片放大。新增图解时，请同时填写中英文 `title` 与 `alt`。目前 CampusAI 展示 4 张图片，AI Agent Scaffold Lite 展示 3 张图片。

## 联系方式

**Joyce Yu**

- Email：[joyceyu434840@163.com](mailto:joyceyu434840@163.com)
- GitHub：[@joyceyu-tech](https://github.com/joyceyu-tech)
- Gitee：[@joyceyu434840](https://gitee.com/joyceyu434840)
