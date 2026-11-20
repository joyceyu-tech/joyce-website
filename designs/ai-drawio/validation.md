GATE: FAIL 34 (round 1 of 3)

# 展示更新检查记录

本次为既有个人作品集中的单个项目内容同步；浏览器专项检查通过，整站通用设计审计未通过。未为清除整站审计结果而改动其它页面区域或既有样式。无新增豁免。

## 专项验证

- `npm run build` 成功，已生成 index.html、translations.js。
- Chrome 无头浏览器核对 1440、1024、768、390、320px 五种宽度，每种均核对英文和中文。
- 每种尺寸 / 语言的四张图片均加载；轮播切换、放大预览、方向键切图、Escape 关闭均通过。
- 实际点击语言切换按钮，项目能力文案同步正确。
- 项目卡片处无横向溢出，无页面脚本异常。
- 四份 SVG 均可解析、渲染，文字没有超出画布；人工检查了桌面 / 手机项目卡片和图解。
- 新增图解最后补充了澄清分支与迭代箭头，并缩小装配图中较长的节点名称，已再次渲染核对。
- 业务仓库仅核对代码与配置，未调用真实模型、验证线上部署或运行其完整后端。

## 整站通用设计审计

以下保留原始审计项，涉及既有页面结构、整屏节奏、容器、导航、动画和文字等；不是本次项目图片或脚本加载失败。部分规则针对产品落地页，与目前多项目个人作品集的布局目标不同。

- **no-visual** — section#about "About Me"：no picture, effect or mock in this section; a feature section needs a visual
- **no-visual** — section#experience "Quality Engineering Experience"：no picture, effect or mock in this section; a feature section needs a visual
- **button-styles** — (the page)：3 button styles on the page: soft, fill #ffffff, outline #c4cdef x3 ("中文"); soft, fill #3f56bd, outline #3f56bd x9 ("EN"); square, fill #667eea x4 ("About Me")
- **cta** — section#about：the hero has no button (the nav's does not count)
- **moment-none** — (the page)：a software page (--type) deals no moment: every kind carries one, two on a long page (moments.md)
- **hidden-content** — div#contactSidebar > div.contact-card > div.contact-item:nth-of-type(1) > a "Contact Me"：with scripts switched off (a blocked or failed script) 3 lines stay hidden on the first screen, 1.5 s after load (opacity 0): "Gitee", "GitHub": the page shows it only when a script reveals it
- **hidden-content** — div#contactSidebar > div.contact-card > div.contact-item:nth-of-type(2) > a "Gitee"：with reduced motion asked for 2 lines stay hidden on the first screen, 0.7 s after it was scrolled to (opacity 0): "GitHub": the page shows it only when a script reveals it
- **hero-screen** — section#about "About Me I focus on AI application devel"：the hero ends at 1110px on a 900px screen, 210px below the fold: it ends at the fold, 1px either way (SR-1)
- **section-height** — section#projects "Personal Projects Selected projects acro"：the section is 4998px tall (5.6 screens), 3198px over two screens (1800px): every section after the hero is one screen or two, 2px either way (SR-2)
- **section-height** — footer "© 2026 Joyce. All rights reserved."：the section is 82px tall (0.1 screens), 818px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)
- **section-height** — section#experience "Quality Engineering Experience Testing a"：the section is 1235px tall (1.4 screens), 335px over one screen (900px): every section after the hero is one screen or two, 2px either way (and 1 more like it: "AI & Engineering Skills ") (SR-2)
- **section-height** — section#about "About Me I focus on AI application devel"：the section starts at 587px, 313px above the screen grid (1 x 900px): sections start on whole screens (SR-2)
- **section-height** — section#skills "AI & Engineering Skills AI application d"：the section starts at 1170px, 270px below the screen grid (1 x 900px): sections start on whole screens (and 2 more like it: "Quality Engineering Expe", "© 2026 Joyce. All rights") (SR-2)
- **one-section** — section#experience "Quality Engineering Experience Testing a"：the screen at scroll 2700px (stride 3) shows 331px of section 3 and the content of 2 sections, over 24px each beside section 4: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
- **one-section** — section#skills > h2 "AI & Engineering Skills"：the screen at scroll 587px (the top of section 1) shows 317px of section 2 and the heading of section 2 whole and the content of 2 sections, over 24px each beside section 1: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
- **one-section** — div#exp-project-1 "Hang Seng Bank FUN Center Credit Card Po"：a band: a box 91% of the section wide on a ground of its own that holds only text: the section's own ground is the band (and 4 more like it: "P Loan Participated in f", "Software Testing Kehua D", "Software Testing Kehua D") (SR-4)
- **one-heading** — section#about > h2 "About Me"：the hero holds an h2 (1): its heading is the h1, and an h2 opens the next section (SR-5)
- **one-heading** — section#skills > h2 "AI & Engineering Skills"：headings of two sections show whole on one screen at 6 of 147 scroll positions (4.1%; at scroll 350, 400, 450, 500px), here with "About Me": at most 3% on a desktop (SR-5)
- **container-edges** — section#about "About Me I focus on AI application devel"：the content of section 1 runs 232px from the left and 232px from the right (read from its outermost blocks: no .wrap): the page's container starts at 112px; the margin is 64-120px at 1440px (one container, equal margins, 2px either way) (SR-6)
- **container-edges** — nav.nav-bar "About Me Skills Experience Portfolio"：a <nav> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)
- **container-edges** — header "中文 EN Open to Software Engineer opportun"：a <header> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)
- **container-edges** — footer "© 2026 Joyce. All rights reserved."：a <footer> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (and 5 more like it: "About Me I focus on AI a", "AI & Engineering Skills ", "Quality Engineering Expe") (SR-6)
- **container-edges** — footer > p.footer-copyright "© 2026 Joyce. All rights reserved."：1 text block starts on a left line at x 615, 503px from the container's left: text starts on the container's left, or on one split line (x 629, 732, 835) (SR-6)
- **container-edges** — section#projects > h2 "Personal Projects"：1 text block starts on a left line at x 580, 468px from the container's left: text starts on the container's left, or on one split line (x 629, 732, 835) (and 9 more like it: "Personal Projects", x 559, x 524) (SR-6)
- **row-lines** — section#projects > div.projects-showcase > section.project-category:nth-of-type(3) > div.projects-grid "01 / 04 Xiaozhong Dianping Local Life Re"：a row of 3 items: its first item starts at 144px, the container's left line at 112px; its last item ends at 1296px, the container's right line at 1328px (2px either way) (SR-7)
- **row-lines** — section#projects > div.projects-showcase > section.project-category:nth-of-type(1) > div.projects-grid "01 / 04 AI Agent Scaffold Lite / AI Draw"：a row of 2 items: its first item starts at 144px, the container's left line at 112px; its last item ends at 1296px, the container's right line at 1328px (2px either way) (SR-7)
- **row-lines** — section#projects > div.projects-showcase > section.project-category:nth-of-type(2) > div.projects-grid "01 / 04 Tianjixuetang Online Education P"：a row of 2 items: its first item starts at 144px, the container's left line at 112px; its last item ends at 1296px, the container's right line at 1328px (2px either way) (SR-7)
- **scroll-reveal** — div#project-ai-agent-scaffold-lite > div.project-gallery "01 / 04"：starts "color" (0.1 s) the moment it is scrolled into view (an IntersectionObserver) on button.ui-button.ui-button--secondary:nth-of-type(1)
- **off-grid** — section#about > div.about-grid > div.about-content.about-summary > p:nth-of-type(1) "I work in software testing at HSBC Softw"：left edge at 27px, 18px off the page margin at 45px (9 elements, like li:nth-of-type(1)); 2 more in this section off the grid too (p:nth-of-type(2) at 27px, h3 at 27px)
- **off-grid** — section#skills > div.skills-grid > div.skill-card:nth-of-type(1) > h3 "AI Applications & Agents"：left edge at 36px, 9px off the page margin at 45px (9 elements); 11 more in this section off the grid too (p at 36px, h3 at 36px, p at 36px, h3 at 36px, ...)
- **off-grid** — div#exp-project-1 "Hang Seng Bank FUN Center Credit Card Po"：left edge at 26px, 19px off the page margin at 45px (9 elements, like h3); 2 more in this section off the grid too (div#exp-project-2 at 26px, div#exp-project-4 at 26px)
- **contrast** — footer > p.footer-copyright "© 2026 Joyce. All rights reserved."：body text over a effect reads at 4.4:1 at its worst tenth (needs 4.5:1)
- **section-gaps** — section#experience / section#projects：109px between these sections, +127% against the median 48px
- **container** — page：no .wrap

## 警告与检查范围

审计另外记录 32 项非阻塞警告。保留既有文案与布局，未对其它项目、导航、联系方式和全站设计作重构。完整审计日志：`.taste-skill/ai-drawio-gate.log`；专项浏览器结果与截图：`.taste-skill/ai-drawio/`。

## 性能检查

`perf.mjs` 在 1440px 与 390px 完成，结果为 `3 FAIL, 1 WARN`。

- 桌面和手机均提示已有 7 张封面图片的 HTML 缺少显式 width / height。
- 桌面提示已有部分图片原始尺寸高于显示尺寸；手机同类提示为 WARN。工具也将可无损缩放的 SVG 按自然尺寸计入此项。
- 两种尺寸的请求加载、总传输体积、图片体积、JS / CSS 体积均通过；未发现失败请求或长任务，测得布局偏移为 0。
- 本次未修改全站图片渲染器或其它项目资源。完整原始输出保存在 `.taste-skill/ai-drawio/perf.log`。
