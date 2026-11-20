# AI Draw.io 项目展示同步记录

核对日期：2026-11-21。来源：[ai-agent-scaffold-lite](https://gitee.com/joyceyu434840/ai-agent-scaffold-lite)，核对版本 `43f3eeb4d2caf86d6abc347810b822fb875399f9`。本次只同步作品集展示，不修改或部署该业务仓库。

## 本次更新依据

- `affa460`：新增 Next.js 16 / React 19 / TypeScript 前端，通过 `react-drawio` 嵌入可编辑画布；API 客户端调用列表、创建会话与对话接口。
- `cc83d5e`：补充云部署、环境变量与启动失败处理；Compose 可在服务器本机构建前后端镜像。部署配置存在不等于已验证线上服务，本次不添加未经验证的演示地址。
- `ac99655`：加入 AI Draw.io 绘图场景。`agent-draw-io.yml` 中实际 Runner 指向 `sequential_draw_process`，依次执行 analyst、drawer、reviewer；循环优化仍是配置示例，并非当前主流程。
- `11134a7`：后端仍为 API、App、Domain、Infrastructure、Trigger、Types 六模块，目录已更名为 `ai-agent-scaffold-draw-io-*`，并新增独立前端目录。
- `3de09fc`：`DefaultToolSkillsCreateService` 支持 directory 与 resource 两种 Skills 来源，`ChatModelNode` 将其与 MCP 回调一起挂载。绘图配置本身未启用 Skills，不将其描述为绘图运行必经步骤。
- `AgentServiceController` 已实现列表、会话和对话 HTTP 入口，替换网站旧图中“Trigger 仅预留包结构”的表述。

## 展示边界

- `ChatService` 使用 `InMemoryRunner`，会话在内存中维护；`userSessions` 按 userId 复用会话。前端历史、消息与图 XML 保存在浏览器 `localStorage`，不声称是数据库持久化或多设备同步。
- 前端通过普通 `/chat` 请求处理 `user` / `drawio` 响应；后端存在流式接口，但前端当前未使用，不声称流式绘图。
- 画布可手动编辑，按需导出 XML 作为下次对话上下文，手动导出使用 `xmlsvg`（SVG）。
- Infrastructure 仍以包结构和依赖配置为主，不将 MySQL / Redis 描述成已实现的会话存储。
- 主 README 仍保留旧 `ai-agent-scaffold-lite-*` 模块名和部分旧路径，网站以实际代码与配置为准。该上游文档问题未在本次作品集同步中修改。

## 作品集修改

`content.json` 同步中英文标题、介绍、技术标签、能力与图片替代文字；保留仓库 URL 和 slug。更新封面、后端职责图和装配图，新增绘图流程图，轮播共四张。`index.html` 与 `translations.js` 由 `npm run build` 生成。

沿用网站已有深蓝 / 薄荷绿 SVG 图解与轮播结构，仅更新该项目展示，不重设计整站。文案以代码事实为依据，明确内存会话、浏览器历史和当前顺序流程的实现边界。无新增摄影、虚构指标或模拟产品截图。

构建、浏览器专项检查和整站审计结果见 [validation.md](validation.md)。
