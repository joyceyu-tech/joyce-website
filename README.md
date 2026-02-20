# Joyce's Portfolio Website

个人作品集网站，使用 HTML、CSS 和 JavaScript 构建，展示我的 Java 后端开发项目和技术能力。

## 技术栈
- Frontend: HTML5、CSS3、JavaScript
- Backend Projects: Java、Spring Boot、Spring Cloud、MySQL、Redis、RabbitMQ

## 网站内容
- 个人简介与工作经历
- 技术能力展示
- 3个后端项目（红包雨抽奖系统、外卖管理系统、拼车平台）

## 主要项目

### 红包雨抽奖系统
企业级抽奖活动管理平台 · [**Gitee 仓库 →**](https://gitee.com/joyceyu434840/lottery-system.git)  
技术：Spring Boot、MyBatis-Plus、MySQL、Redis、RabbitMQ、MinIO

### 外卖管理系统  
餐饮商家后台与用户小程序 · [**Gitee 仓库 →**](https://gitee.com/joyceyu434840/sky-take-out.git)  
技术：Spring Boot、MyBatis、MySQL、Redis、AliOSS

### O2O拼车平台
微服务架构的城市拼车系统 · [**Gitee 仓库 →**](https://gitee.com/joyceyu434840/city-ride.git)  
技术：Spring Cloud、Redis、RabbitMQ、MongoDB、WebSocket

---

## 使用说明

> 如何访问本站、在什么设备/环境下打开、如何切换语言。

**访问与自适应**：本站主要针对 PC/桌面浏览器，并对平板与手机做了自适应（断点 1024px、768px、480px 等）。

| 使用场景     | 说明 |
|-------------|------|
| 电脑浏览器   | 推荐，完整布局与最佳体验。 |
| 手机浏览器   | 支持，窄屏自适应，Safari/Chrome 等直接打开。 |
| 微信内打开   | 支持；异常时可点右上角「…」→「在浏览器中打开」。 |

**语言**：默认为英文；页面右上方可点击「中文」/「EN」切换。实现：`content.json`（en/zh）→ `build.js` 生成 `translations.js`，`script.js` 按 `?lang=` 或本地偏好切换并记存。

---

## 构建说明

- 本地预览：直接打开 `index.html`
- 部署：推送至 GitHub，GitHub Pages 构建，Cloudflare CDN 加速，自定义域名
- **文案修改**：只改 `content.json` 即可。构建方式任选其一：
  - **推荐**：改完 `content.json` 后直接 **commit + push**。GitHub Actions 会在 push 后自动执行 `npm run build` 并把生成的 `index.html`、`translations.js` 写回仓库，网站即更新（见 `.github/workflows/build.yml`）。
  - **本地构建**：在项目根目录执行 `npm run build`，再把生成的 `index.html`、`translations.js` 一起 commit 并 push。
  - **提交时本地构建**：执行一次 `npm run hook:install`，之后每次 `git commit` 会在本地自动跑构建并把生成文件加入本次提交。

## 📧 Contact

**Joyce Yu**

- 📧 Email: [joyceyu434840@163.com](mailto:joyceyu434840@163.com)
- 🐙 GitHub: [@joyceyu-tech](https://github.com/joyceyu-tech)
- 🦊 Gitee: [@joyceyu434840](https://gitee.com/joyceyu434840)
