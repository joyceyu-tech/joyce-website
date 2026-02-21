# Joyce's Portfolio Website

个人作品集网站，使用 HTML、CSS 和 JavaScript 构建，展示我的 Java 后端开发项目和技术能力。

**关于技术选型**：本仓库为个人项目，当前版本使用前端三件套（HTML、CSS、JavaScript）实现；后续会改造成 React + TypeScript，并逐步接触企业项目中常见的前端技术栈与工程化实践。

## 技术栈
- Frontend: HTML5、CSS3、JavaScript
- Backend Projects: Java、Spring Boot、Spring Cloud、MySQL、Redis、RabbitMQ

## 网站内容
- 个人简介与工作经历
- 技术能力展示
- 3个后端项目（红包雨抽奖系统、外卖管理系统、拼车平台）

## 主要项目

### 红包雨抽奖系统
企业级抽奖活动管理平台。  
[**Gitee 仓库**](https://gitee.com/joyceyu434840/lottery-system.git)  
技术：Spring Boot、MyBatis-Plus、MySQL、Redis、RabbitMQ、MinIO

### 外卖管理系统
餐饮商家后台与用户小程序。  
[**Gitee 仓库**](https://gitee.com/joyceyu434840/sky-take-out.git)  
技术：Spring Boot、MyBatis、MySQL、Redis、AliOSS

### O2O拼车平台
微服务架构的城市拼车系统。  
[**Gitee 仓库**](https://gitee.com/joyceyu434840/city-ride.git)  
技术：Spring Cloud、Redis、RabbitMQ、MongoDB、WebSocket

---

## 使用说明

> 如何访问本站、在什么设备/环境下打开、如何切换语言。

**访问与自适应**：本站主要针对 PC/桌面浏览器，并对平板与手机做了自适应（断点 1024px、768px、480px 等）。在实现上考虑了电脑端与手机端的布局差异，针对导航、首屏、内容区、字体与间距等做了分别的样式与视觉布局调整，以适配不同屏幕与交互方式。

- **电脑浏览器**：推荐，完整布局与最佳体验。
- **手机浏览器**：支持，窄屏自适应，Safari/Chrome 等直接打开。
- **微信内打开**：支持；异常时可点右上角「…」→「在浏览器中打开」。

**语言**：默认为英文；页面右上方可点击「中文」/「EN」切换。实现：`content.json`（en/zh）→ `build.js` 生成 `translations.js`，`script.js` 按 `?lang=` 或本地偏好切换并记存。

---

## 构建说明

- **本地预览**：在浏览器中直接打开根目录下的 `index.html` 即可。
- **部署**：代码推送至 GitHub 后，由 GitHub Pages 托管，配合 Cloudflare CDN 与自定义域名访问。
- **文案修改**：网站内容由 `content.json` 驱动，改文案只需编辑该文件。之后可任选其一：
  - **方式 1（推荐）**：本地执行 `npm run build`（即 `node build.js`）构建，将生成的 `index.html`、`translations.js` 一并 commit 并 push。符合工程习惯。
  - **方式 2（兜底）**：直接 commit 并 push，由 [GitHub Actions](.github/workflows/build.yml) 在 push 后自动构建并写回仓库。适用于忘记本地 build 或仅修改 content.json 的情况。

## 📧 Contact

**Joyce Yu**

- 📧 Email: [joyceyu434840@163.com](mailto:joyceyu434840@163.com)
- 🐙 GitHub: [@joyceyu-tech](https://github.com/joyceyu-tech)
- 🦊 Gitee: [@joyceyu434840](https://gitee.com/joyceyu434840)
