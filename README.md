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


## 访问与自适应说明

本站**主要针对 PC / 桌面浏览器**进行设计与排版，同时通过媒体查询对平板和手机做了样式自适应（如 1024px、768px、480px 等断点）。

| 使用场景 | 说明 |
|---------|------|
| **电脑浏览器** | 推荐。完整布局与最佳阅读体验。 |
| **手机浏览器** | 支持。页面会自适应窄屏，可直接在 Safari、Chrome 等手机浏览器中打开。 |
| **微信内打开** | 支持。在微信中打开链接即可浏览；若遇排版或交互异常，可点击右上角「…」选择「在浏览器中打开」以获得更好体验。 |

站点**默认为英文**；可在页面**右上方**点击「中文」/「EN」随时切换语言。

实现：`content.json`（en/zh）→ `build.js` 生成 `translations.js`；`script.js` 默认英文，按 `?lang=` 或本地存储的偏好显示语言，点击切换时用选择器替换文案并记存。

## 构建说明

- 本地预览：直接打开 `index.html`
- 部署：推送至 GitHub，GitHub Pages 构建，Cloudflare CDN 加速，自定义域名
- 文案修改：编辑 `content.json` 后运行 `node build.js` 生成 `index.html` 和 `translations.js`

## 📧 Contact

**Joyce Yu**

- 📧 Email: [joyceyu434840@163.com](mailto:joyceyu434840@163.com)
- 🐙 GitHub: [@joyceyu-tech](https://github.com/joyceyu-tech)
- 🦊 Gitee: [@joyceyu434840](https://gitee.com/joyceyu434840)
