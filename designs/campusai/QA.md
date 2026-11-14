GATE: OPEN 60 (rounds used up)

# CampusAI 展示图验收

本次交付是已有软件作品集中的 CampusAI 展示素材与轮播；未宣称全站通过 design-taste-frontend。全站检查已按 skill 用完三轮，下列未通过项保留记录。没有添加豁免，也未修改检查器。第三轮结束后的窄屏控制条微调通过 320/390 截图复查，未宣称再次通过整页 gate。

## 已完成的检查

- `npm run build`、JavaScript 语法检查与 `git diff --check` 均通过。
- 使用 skill 的 `shoot.mjs` 生成并查看 1440、1024、820、768、390、320 宽度截图。
- 检查四张 1600×1000 PNG 及 SVG：文本、连线、配色与画面完整性。
- 320 与 390 宽度复查最终轮播：图片完整显示；按钮与圆点点击区域 44px，窄卡片控制条分两行，不挤压图像。
- 构建结果中无视频播放器，CampusAI 共四张手动轮播图。
- 交互包含切换、页码、方向键、触屏指针手势和放大；本次截图检查不等于真实手机触屏测试。
- 全站布局 checker 的结果已包含在下方；性能脚本结果见 `.taste-skill/carousel-perf.log`：2 FAIL、2 WARN，未通过项是图片缺少 width/height 属性；390px 传输量约 265.6 KiB，无请求失败，CLS 为 0。

## 设计与素材来源

类型 software。局部设计沿用 CampusAI 深青与薄荷绿系统，采用中文界面和分层技术图；产品 UI 是基于仓库功能重绘的设计演示。没有新建品牌名、假设价格、商用指标或使用外部照片。本次未重建全站 hero、moment 或特效系统；原作品集的相关检查项因此仍列在结果中。

已核对 Gitee README，以及 `campusai/controller/NoticeController.java`、`MaterialsController.java`、`RabbitSendService.java`、报名实体等源码。AI 前台服务的实际模型调用和消息消费未启动验证。

## 全站未通过项

1. **flush** — section#about > div.about-grid > div.about-content.about-summary "I work in software testing at HSBC Softw"
   its last line sits 0px above the lower edge of section#about, where the ground changes to section#skills
   建议：give the section its padding at the edge where the ground changes (the closing call keeps a clear gap above the footer)

2. **flush** — section#skills > div.skills-grid > div.skill-card:nth-of-type(4) "Redis & RabbitMQ Familiar with Redis and"
   its last line sits 0px above the lower edge of section#skills, where the ground changes to section#experience
   建议：give the section its padding at the edge where the ground changes (the closing call keeps a clear gap above the footer)

3. **flush** — section#experience > div.experience-item:nth-of-type(2) "Software Testing Kehua Data Co., Ltd. Oc"
   its last line sits 0px above the lower edge of section#experience, where the ground changes to section#projects
   建议：give the section its padding at the edge where the ground changes (the closing call keeps a clear gap above the footer)

4. **nav** — (the first screen)
   no nav bar across the top of the first screen (a header with the brand, the section links and the main action)
   建议：make the nav one bar from the content's left edge to its right edge, with every link and action inside it

5. **nav-covers** — button#backToTop
   sits on top of the text "Credit Card & Banking Domain" while the page scrolls: part of the line shows beside it
   建议：make the fixed nav one opaque band across the whole screen, or let it scroll away with the page

6. **no-visual** — section#about "About Me"
   no picture, effect or mock in this section; a feature section needs a visual
   建议：give the section a visual: a UI fragment on a ground, real icons, or a photograph that fits

7. **no-visual** — section#experience "Work Experience"
   no picture, effect or mock in this section; a feature section needs a visual
   建议：give the section a visual: a UI fragment on a ground, real icons, or a photograph that fits

8. **button-styles** — (the page)
   3 button styles on the page: soft, fill #ffffff, outline #c4cdef x3 ("中文"); soft, fill #445cc7, outline #445cc7 x9 ("EN"); square, fill #667eea x4 ("About Me")
   建议：one primary and one secondary button: one shape, one height per size, one label size

9. **cta** — section#about
   the hero has no button (the nav's does not count)
   建议：add the action: a button in the hero, one on every priced item, one in the closing section

10. **copy-headline** — div.header-content > div.hero-grid > div.hero-text > h1 "Hi, I'm Joyce"
   "Hi, I'm Joyce" does not name what is sold (personal project portfolio, personal, project, portfolio, from flags)
   建议：put the category noun in the h1 (and who it is for, or where), in 2 to 8 words

11. **copy-headings** — section#skills > h2 "Technical Skills"
   "Technical Skills" names no product, part, place or section (3 headings like it; at most one brand line per page) (and 2 more like it: "Work Experience", "Business QA")
   建议：name the thing in every heading: the product, a part, the place or a section noun

12. **off-grid** — div#project-smart-campus-ai "01 / 04 CampusAI Campus AI Assistant A c"
   left edge at 270px, 20px off the page margin at 250px (8 elements)
   建议：move it onto the page margin, or the column edge its section uses

13. **contrast** — div.header-content > div.hero-grid > div.hero-text > p.hero-badge "Open to Software Engineer opportunities"
   body text over a effect reads at 2.9:1 at its worst tenth (needs 4.5:1) (and 39 more like it: "I bring a testing mindse", "AI Applications & Agents", "Testing & Quality Assura", "Java & Spring Backend", ...)
   建议：put the text on a calm part of the picture, or on a solid panel

14. **contrast** — section#skills > div.skills-grid > div.skill-card:nth-of-type(6) > h3 "Credit Card & Banking Domain"
   body text over a effect reads at 3.6:1 at its worst tenth (needs 4.5:1), on a busy ground
   建议：put the text on a calm part of the picture, or on a solid panel

15. **text-contrast** — section#about > p.section-intro "Testing is my craft; Java engineering is"
   body text in #5f6c7b on #f4f6fb reads 4.96:1 (needs 7:1); 2 like it, like "AI application develop"
   建议：body text in the ink at 7:1 or more; grey (4.5:1 or more) only for captions and labels

16. **text-contrast** — div.about-grid > div.about-content.about-focus > ul.about-list > li:nth-of-type(1) "Focusing on AI application development w"
   body text in #4d5d6d on #ffffff reads 6.77:1 (needs 7:1); 2 like it, like "Continuing Java backen"
   建议：body text in the ink at 7:1 or more; grey (4.5:1 or more) only for captions and labels

17. **text-contrast** — div.experience-item:nth-of-type(1) > div.experience-header > div > p.company "HSBC Software Development (Guangdong) Co"
   a caption, label or muted line in #667eea on #f8faff reads 3.5:1 (needs 4.5:1); 2 like it, like "Kehua Data Co., Ltd."
   建议：body text in the ink at 7:1 or more; grey (4.5:1 or more) only for captions and labels

18. **text-contrast** — section#experience > div.experience-item:nth-of-type(1) > div.experience-header > p.duration "Jan 2024 - Present"
   a caption, label or muted line in #7f8c8d on #f0f2f5 reads 3.1:1 (needs 4.5:1); 2 like it, like "Oct 2022 - Jul 2023"
   建议：body text in the ink at 7:1 or more; grey (4.5:1 or more) only for captions and labels

19. **text-contrast** — section#projects > p.section-intro "Selected projects across AI applications"
   body text in #657286 on #f8f9fa reads 4.63:1 (needs 7:1)
   建议：body text in the ink at 7:1 or more; grey (4.5:1 or more) only for captions and labels

20. **text-contrast** — div.projects-showcase > section.project-category:nth-of-type(1) > div.project-category-header > p.project-category-description "Spring AI · AI Agents · Tool Calling · R"
   body text in #667085 on #f8f9fa reads 4.72:1 (needs 7:1); 3 like it, like "Multi-module backend s", "Spring Boot business s"
   建议：body text in the ink at 7:1 or more; grey (4.5:1 or more) only for captions and labels

21. **text-contrast** — div#project-tianjixuetang > div.project-content > div.project-features > h4 "KEY ACHIEVEMENTS:"
   a caption, label or muted line in #667eea on #f8f9fa reads 3.47:1 (needs 4.5:1); 5 like it, like "KEY ACHIEVEMENTS:", "KEY ACHIEVEMENTS:", "KEY ACHIEVEMENTS:"
   建议：body text in the ink at 7:1 or more; grey (4.5:1 or more) only for captions and labels

22. **section-gaps** — section#experience / section#projects
   116px between these sections, +76% against the median 66px
   建议：use one gap between sections (all within 25% of each other)

23. **section-gaps** — section#projects / footer
   202px between these sections, +122% against the median 91px of gaps at a change of ground
   建议：use one gap between sections (all within 25% of each other)

24. **focus-visible** — div#project-smart-campus-ai > div.project-gallery:nth-of-type(1) > div.project-gallery-stage:nth-of-type(1) > button.project-gallery-slide:nth-of-type(1) "Enlarge: Project overview"
   Tab stop 10, button "Enlarge: Project overview": the focus lands on something you cannot see
   建议：keep the kit's ring (system.css :focus-visible, 2px in --action, there at once); a control that hides itself shows on focus

25. **focus-visible** — div.project-gallery:nth-of-type(1) > div.project-gallery-controls:nth-of-type(2) > div.project-gallery-dots:nth-of-type(1) > button.project-gallery-dot:nth-of-type(1) "Show image 1: Project overview"
   Tab stop 11, button "Show image 1: Project overview": the focus lands on something you cannot see
   建议：keep the kit's ring (system.css :focus-visible, 2px in --action, there at once); a control that hides itself shows on focus

26. **focus-visible** — div.project-gallery:nth-of-type(1) > div.project-gallery-controls:nth-of-type(2) > div.project-gallery-dots:nth-of-type(1) > button.project-gallery-dot:nth-of-type(2) "Show image 2: Service architecture"
   Tab stop 12, button "Show image 2: Service architecture": the focus lands on something you cannot see
   建议：keep the kit's ring (system.css :focus-visible, 2px in --action, there at once); a control that hides itself shows on focus

27. **focus-visible** — div.project-gallery:nth-of-type(1) > div.project-gallery-controls:nth-of-type(2) > div.project-gallery-dots:nth-of-type(1) > button.project-gallery-dot:nth-of-type(3) "Show image 3: Tool calling loop"
   Tab stop 13, button "Show image 3: Tool calling loop": the focus lands on something you cannot see
   建议：keep the kit's ring (system.css :focus-visible, 2px in --action, there at once); a control that hides itself shows on focus

28. **moment-none** — (the page)
   a software page (--type) deals no moment: every kind carries one, two on a long page (moments.md)
   建议：deal one (moments.mjs pick --page software) and mount it in its own section

29. **hero-screen** — section#about "About Me Testing is my craft; Java engin"
   the hero ends at 1087px on a 900px screen, 187px below the fold: it ends at the fold, 1px either way (SR-1)
   建议：make the hero exactly one screen (height: 100svh, its content fitted inside), never taller or shorter

30. **section-height** — section#projects "Personal Projects Selected projects acro"
   the section is 4198px tall (4.7 screens), 2398px over two screens (1800px): every section after the hero is one screen or two, 2px either way (SR-2)
   建议：set the section to one screen or two (height: calc(var(--h,1) * 100vh), --h 1 or 2) and cut or split its content to fit

31. **section-height** — footer "© 2026 Joyce. All rights reserved."
   the section is 82px tall (0.1 screens), 818px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)
   建议：set the section to one screen or two (height: calc(var(--h,1) * 100vh), --h 1 or 2) and cut or split its content to fit

32. **section-height** — section#skills "Technical Skills AI application developm"
   the section is 606px tall (0.7 screens), 294px short of one screen (900px): every section after the hero is one screen or two, 2px either way (and 1 more like it: "Work Experience Testing ") (SR-2)
   建议：set the section to one screen or two (height: calc(var(--h,1) * 100vh), --h 1 or 2) and cut or split its content to fit

33. **section-height** — section#about "About Me Testing is my craft; Java engin"
   the section starts at 556px, 344px above the screen grid (1 x 900px): sections start on whole screens (SR-2)
   建议：make every section above it exactly one or two screens tall, so this one starts on a whole screen

34. **section-air** — section#skills > h2 "Technical Skills"
   a bottom border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)
   建议：take the rule out: sections and their parts are parted by their ground and the air between them

35. **section-air** — section#experience > h2 "Work Experience"
   a bottom border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)
   建议：take the rule out: sections and their parts are parted by their ground and the air between them

36. **section-air** — section#projects > h2 "Personal Projects"
   a bottom border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)
   建议：take the rule out: sections and their parts are parted by their ground and the air between them

37. **one-section** — section#skills > h2 "Technical Skills"
   the screen at scroll 556px (the top of section 1) shows 309px of section 2 and the heading of section 2 whole and the content of 2 sections, over 24px each beside section 1: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
   建议：make each section exactly one screen or two, so a screen shows one section and no neighbour peeks

38. **one-section** — section#experience "Work Experience Testing and project work"
   the screen at scroll 2700px (stride 3) shows 302px of section 3 and the content of 2 sections, over 24px each beside section 4: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
   建议：make each section exactly one screen or two, so a screen shows one section and no neighbour peeks

39. **one-section** — div#exp-project-1 "Hang Seng Bank FUN Center Credit Card Po"
   a band: a box 90% of the section wide on a ground of its own that holds only text: the section's own ground is the band (and 4 more like it: "P Loan Participated in f", "Software Testing Kehua D", "Software Testing Kehua D") (SR-4)
   建议：put every block of <main> in a <section>, and give a band its own section instead of a ground inside one

40. **one-heading** — section#about > h2 "About Me"
   the hero holds an h2 (1): its heading is the h1, and an h2 opens the next section (SR-5)
   建议：give each section one h2, first in its .wrap, and the hero only its h1

41. **one-heading** — section#skills > h2 "Technical Skills"
   headings of two sections show whole on one screen at 8 of 131 scroll positions (6.1%; at scroll 350, 400, 450, 500px), here with "About Me": at most 3% on a desktop (SR-5)
   建议：make the sections one screen tall so their headings sit a screen apart and two never share one

42. **container-edges** — section#about "About Me Testing is my craft; Java engin"
   the content of section 1 runs 340px from the left and 120px from the right (read from its outermost blocks: no .wrap): the page's container starts at 240px; 340 and 120px are not one margin; the margin is 64-120px at 1440px (one container, equal margins, 2px either way) (SR-6)
   建议：use one container on every section and the nav (.wrap): one margin left and right, 64-120px on a desktop, 16-24px on a phone

43. **container-edges** — section#skills "Technical Skills AI application developm"
   the content of section 2 runs 250px from the left and 30px from the right (read from its outermost blocks: no .wrap): the page's container starts at 240px; 250 and 30px are not one margin; the margin is 64-120px at 1440px (one container, equal margins, 2px either way) (and 3 more like it: "Work Experience Testing ", "Personal Projects Select", "© 2026 Joyce. All rights") (SR-6)
   建议：use one container on every section and the nav (.wrap): one margin left and right, 64-120px on a desktop, 16-24px on a phone

44. **container-edges** — header "中文 EN Open to Software Engineer opportun"
   a <header> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)
   建议：build the page as header.nav, a main of sections (each one in-flow .wrap plus background layers) and footer.closing

45. **container-edges** — nav.nav-bar "About Me Skills Experience Portfolio"
   a <nav> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (and 8 more like it: "© 2026 Joyce. All rights", div.scroll-progress, "Toggle contact panel") (SR-6)
   建议：build the page as header.nav, a main of sections (each one in-flow .wrap plus background layers) and footer.closing

46. **container-edges** — footer > p.footer-copyright "© 2026 Joyce. All rights reserved."
   1 text block starts on a left line at x 725, 485px from the container's left: text starts on the container's left, or on one split line (x 742, 842, 942) (SR-6)
   建议：start the text on the container's left, or on the one split line every split shares

47. **container-edges** — section#projects > h2 "Personal Projects"
   1 text block starts on a left line at x 690, 450px from the container's left: text starts on the container's left, or on one split line (x 742, 842, 942) (and 8 more like it: "Personal Projects", x 669, x 634) (SR-6)
   建议：start the text on the container's left, or on the one split line every split shares

48. **row-lines** — section#projects > div.projects-showcase > section.project-category:nth-of-type(1) > div.projects-grid "01 / 04 CampusAI Campus AI Assistant A c"
   a row of 2 items: its first item starts at 270px, the container's left line at 240px; its last item ends at 1390px, the container's right line at 1420px (2px either way) (SR-7)
   建议：start the row's first item on the container's left line and end its last on the right line, every item one height

49. **row-lines** — section#projects > div.projects-showcase > section.project-category:nth-of-type(2) > div.projects-grid "Tianjixuetang Online Education Platform "
   a row of 2 items: its first item starts at 270px, the container's left line at 240px; its last item ends at 1390px, the container's right line at 1420px (2px either way) (SR-7)
   建议：start the row's first item on the container's left line and end its last on the right line, every item one height

50. **row-lines** — section#projects > div.projects-showcase > section.project-category:nth-of-type(3) > div.projects-grid "Xiaozhong Dianping Local Life Review Sys"
   a row of 3 items: its first item starts at 270px, the container's left line at 240px; its last item ends at 1390px, the container's right line at 1420px (2px either way) (SR-7)
   建议：start the row's first item on the container's left line and end its last on the right line, every item one height

51. **nav-covers** — button#contactToggle
   sits on top of the text "AI application development is my current" while the page scrolls: part of the line shows beside it
   建议：make the fixed nav one opaque band across the whole screen, or let it scroll away with the page

52. **collide** — div#topBanner "Best viewed on desktop Got it"
   at the top of the page the fixed bar covers "中文": nothing scrolls it out from under the bar
   建议：on a phone nothing lies on anything else: let the section grow with its content (min-height for its screens, never a fixed height; --hm: 2 when it needs two) or cut what it holds; keep pictures and cards off the buttons; pad the page under a fixed bar by the bar's height (top: the first section; end: the footer)

53. **scroll-reveal** — div#project-smart-campus-ai > div.project-gallery "01 / 04"
   starts "color" (0.1 s) the moment it is scrolled into view (an IntersectionObserver) on button.ui-button.ui-button--secondary:nth-of-type(1)
   建议：show it at rest: no fade, rise or unmask when it is scrolled into view

54. **off-grid** — section#about > div.about-grid > div.about-content.about-summary > p:nth-of-type(1) "I work in software testing at HSBC Softw"
   left edge at 27px, 18px off the page margin at 45px (9 elements, like li:nth-of-type(1)); 2 more in this section off the grid too (p:nth-of-type(2) at 27px, h3 at 27px)
   建议：move it onto the page margin, or the column edge its section uses

55. **off-grid** — section#skills > div.skills-grid > div.skill-card:nth-of-type(1) > h3 "AI Applications & Agents"
   left edge at 36px, 9px off the page margin at 45px (9 elements); 11 more in this section off the grid too (p at 36px, h3 at 36px, p at 36px, h3 at 36px, ...)
   建议：move it onto the page margin, or the column edge its section uses

56. **off-grid** — div#exp-project-1 "Hang Seng Bank FUN Center Credit Card Po"
   left edge at 26px, 19px off the page margin at 45px (9 elements, like p.duration); 2 more in this section off the grid too (div#exp-project-2 at 26px, div#exp-project-4 at 26px)
   建议：move it onto the page margin, or the column edge its section uses

57. **contrast** — section#skills > p.section-intro "AI application development is my current"
   body text over a effect reads at 1.2:1 at its worst tenth (needs 4.5:1), on a busy ground (and 1 more like it: "Selected projects across")
   建议：put the text on a calm part of the picture, or on a solid panel

58. **text-contrast** — nav.nav-bar > a:nth-of-type(1) "About Me"
   a caption, label or muted line in #667eea on #ffffff reads 3.66:1 (needs 4.5:1); 4 like it, like "Skills", "Experience", "Portfolio"
   建议：body text in the ink at 7:1 or more; grey (4.5:1 or more) only for captions and labels

59. **off-viewport** — div#contactSidebar "Quick Contact Contact Me Gitee GitHub"
   at 320px wide it runs 320px past the screen's right edge (cut there: the page clips what runs past it)
   建议：keep it inside the screen at this width: let it shrink, wrap or stack

60. **container** — page
   no .wrap
   建议：put the content in one .wrap

## 保留的 WARN

这些是检查器的原始提示，未通过改文案或隐藏元素规避。完整原始记录见 `.taste-skill/gate.json`。

- **fold-cut** — section#about > div.about-grid > div.about-content.about-summary > p:nth-of-type(1) "I work in software testing at HSBC Softw": a line of the hero text is sliced by the bottom of the first screen
- **fold-cut** — div.about-grid > div.about-content.about-focus > ul.about-list > li:nth-of-type(2) "Continuing Java backend practice through": a line of the hero text is sliced by the bottom of the first screen
- **no-visual** — section#projects "Personal Projects": pictures, effects and mocks cover 23% of this section; a feature section needs a visual (about 25% or more)
- **copy-headings** — section#skills > div.skills-grid > div.skill-card:nth-of-type(1) > h3 "AI Applications & Agents": the card title "AI Applications & Agents" names no product, part, place or section (3 card titles like it) (and 2 more like it: "Redis & RabbitMQ", "Credit Card & Banking Do")
- **copy-buttons** — a#langEn "EN": "EN" does not start with a verb (book, buy, try, start, get, see...) (and 3 more like it: "Work experience", "GitHub", "Gitee")
- **copy-actions** — div#project-smart-campus-ai > div.project-content > div.project-links > a.ui-button.ui-button--primary "Gitee": "Gitee" on 7 buttons that go to 7 different places
- **copy-actions** — (the page): the main action "View repository" does not read word for word the same in the nav or hero and the closing section
- **off-grid** — div#project-tianjixuetang "Tianjixuetang Online Education Platform ": left edge at 270px, 20px off the page margin at 250px (8 elements, none of them near it); 1 more in this section off the grid too (div#project-xiaozhong-dianping at 270px)
- **body-size** — div.projects-showcase > section.project-category:nth-of-type(1) > div.project-category-header > p.project-category-description "Spring AI · AI Agents · Tool Calling · R": 42 of 47 paragraphs of running text are set under 16px (13, 14, 15px)
- **section-gaps** — section#projects / footer: uneven space at the edge of a band: 170px outside its edge, 32px inside it (the space on either side of a change of ground reads as one gap only when the two match)
- **photo-set** — img#avatar "avatar.jpg": 3 photographs in more than one look: lightness from 0.23 to 0.72; the odd one out is avatar.jpg
- **heading-align** — section#projects > h2 "Personal Projects": 3 section headings sit on the left, 1 centred: "Personal Projects"
- **label-centre** — nav.nav-bar > a.active "About Me": its label sits 76px off-centre (34px of room at the left, 110px at the right) (and 3 more like it: "Skills", "Experience", "Portfolio")
- **fake-button** — div#project-smart-campus-ai > div.project-content > div.tech-stack > span.tech-tag:nth-of-type(1) "Spring Boot": "Spring Boot" looks like a button (soft, fill #edf6f2, outline #d5e7df, the same look as the page's buttons) but is not a link or a button (13 like it)
- **copy-length** — section#skills "Technical Skills": 4 sections over 90 words a screen outside the UI mocks ("Technical Skills" 180, "Work Experience" 164, "Personal Projects" 164); 164 words a screen across the page (1308 words in 8 screens): a tech page says it in about 80 or fewer
- **nav-current** — nav.nav-bar: the nav stays on screen with 3 links to the page's sections, but never marks the one you are in (no link changes as the page scrolls)
- **one-screen** — section#skills "Technical Skills": 1 section is shorter than the screen, so the next one's heading or picture shows with it: "Technical Skills" is 606px of the 760px under the nav, and "Work Experience" shows below it
- **visual-caption** — div#project-smart-campus-ai > div.project-gallery > div.project-gallery-controls > span.project-gallery-count "01 / 04": a muted 12px line of 1 row sits 22px under the picture campusai-product-showcase.svg: it reads as a caption: "01 / 04"; no caption or description under any image, render or visual (house rule)
- **visual-caption** — div#project-ai-agent-scaffold-lite > div.project-gallery > div.project-gallery-controls > span.project-gallery-count "01 / 03": a muted 12px line of 1 row sits 22px under the picture project-ai-agent-scaffold-lite.svg: it reads as a caption: "01 / 03"; no caption or description under any image, render or visual (house rule)
- **skip-link** — a#langZh "切换到中文": the first Tab stop is "切换到中文", not a skip link: a keyboard user tabs through the whole nav on every visit
- **share-meta** — head: the head lacks theme-color: a shared link shows no picture or title of its own
- **hidden-content** — a#langZh "中文": with reduced motion asked for 2 lines stay hidden on screen 2, 0.7 s after it was scrolled to (opacity 0) inside a drawn mock: "EN": the page shows it only when a script reveals it
- **section-air** — section#skills / section#experience: 94px of air between the content of these two sections: 128-480px (64-600px WARN) (SR-3)
- **tap-size** — nav.nav-bar > a:nth-of-type(1) "About Me": a 82x37px tap target (and 3 more like it on this screen): under the 44px a phone needs
- **cta** — section#skills "Technical Skills": a section over 1.5 screens long with no link or button in it
- **cta** — section#experience "Work Experience": a section over 1.5 screens long with no link or button in it
- **heading-scale** — section#about > div.about-grid > div.about-content.about-focus > h3 "Current Growth Focus": the h3s (18px) are only 1.22x smaller than the h2s (22px): one level a clear step (1.3x or more) below the other
- **body-size** — div#project-smart-campus-ai > div.project-content > p.project-description "A campus assistant built with Spring AI,": 30 of 30 paragraphs of running text are set under 16px (13px)
- **fold-cut** — section#about > h2 "About Me": a 22px line is sliced by the bottom of the first screen (14px of it below the fold)
- **copy-em-dash** — (the copy): 5 em dashes in the body (budget 2)
