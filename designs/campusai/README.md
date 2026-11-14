# CampusAI 项目设计图

软件项目展示；主要入口是查看项目仓库。仅重做 CampusAI 的展示素材，沿用现有作品集的内容结构。

## 四张图

1. `images/campusai-product-showcase.svg`：智能客服界面、业务工具、会话记忆。
2. `images/campusai-system-architecture.svg`：用户端、AI 服务、若依后台、消息与存储。
3. `images/campusai-tool-calling-flow.svg`：模型提出调用请求，应用执行业务工具，结果回填并生成回答。
4. `images/campusai-notice-rag-flow.svg`：内容变更、索引维护、在线知识检索与回答。

每张图均提供 1600×1000 PNG。网站使用 SVG，缩放后文字依然清晰。设计统一使用深青色 `#102d31`、薄荷绿 `#a3edd5` 与浅灰绿 `#edf3f3`，通过字体大小、留白和线条建立层级。

界面是依据项目功能绘制的设计演示，不是运行中系统的截图。技术结构依据 Gitee 仓库 README，以及园区公告与资料控制器、消息发送服务、报名实体等公开源码；当前克隆未包含 README 所述 AI 前台服务源码，未验证真实模型调用或消息消费者运行。

## 展示方式

按用户要求取消视频，改为四张手动轮播图。覆盖 skill 默认不使用轮播的建议；不自动播放。复用网站的图片轮播组件，支持页码、左右按钮、圆点、方向键、Home/End、触屏横滑，以及图片放大后的继续切换。图片下不增加重复说明文案。

## 维护

```sh
node scripts/build-campusai-media.mjs
node scripts/render-campusai-media.mjs
npm run build
```

PNG 导出需要 Playwright 和 Chrome；可设置 `NODE_MODULES_PATH` 与 `CHROME_PATH`。导出脚本仅生成静态图片，不录制视频。

全站 design-taste 检查记录见仓库 `.taste-skill/`；现有作品集的整页结构、色彩、旧内容等结果不等同于这四张图的质量检查。
