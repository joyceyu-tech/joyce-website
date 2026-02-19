# Joyce's Portfolio Website

个人作品集网站，使用 HTML、CSS 和 JavaScript 构建，展示我的 Java 后端开发项目和技术能力。

## 文案更新（单一数据源）

项目采用 **单一数据源 + 构建时生成** 的业界方案：

- **唯一编辑入口**：`content.json` — 所有中英文文案集中在此
- **构建输出**：`node build.js` 会根据 `content.json` 自动生成 `index.html` 和 `translations.js`

**修改文案流程：**

1. 编辑 `content.json` 中的 `en`（英文）或 `zh`（中文）对应内容
2. 运行 `node build.js` 或 `npm run build`
3. 生成的 `index.html` 和 `translations.js` 会自动更新，无需手动同步

## 技术栈
- Frontend: HTML5、CSS3、JavaScript
- Backend Projects: Java、Spring Boot、Spring Cloud、MySQL、Redis、RabbitMQ

## 网站内容
- 个人简介与工作经历
- 技术能力展示
- 3个后端项目（红包雨抽奖系统、外卖管理系统、拼车平台）

## 主要项目

### 红包雨抽奖系统
企业级抽奖活动管理平台 | [Gitee](https://gitee.com/joyceyu434840/lottery-system.git)  
技术：Spring Boot、MyBatis-Plus、MySQL、Redis、RabbitMQ、MinIO

### 外卖管理系统  
餐饮商家后台与用户小程序 | [Gitee](https://gitee.com/joyceyu434840/sky-take-out.git)  
技术：Spring Boot、MyBatis、MySQL、Redis、AliOSS

### O2O拼车平台
微服务架构的城市拼车系统 | [Gitee](https://gitee.com/joyceyu434840/city-ride.git)  
技术：Spring Cloud、Redis、RabbitMQ、MongoDB、WebSocket


## 📧 Contact

**Joyce Yu**

- 📧 Email: [joyceyu434840@163.com](mailto:joyceyu434840@163.com)
- 📱 Phone: +86 137 1053 1043
- 🐙 GitHub: [@joyceyu-tech](https://github.com/joyceyu-tech)
- 🦊 Gitee: [@joyceyu434840](https://gitee.com/joyceyu434840)
