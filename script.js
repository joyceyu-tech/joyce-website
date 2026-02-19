// ==================== Joyce Portfolio Interactive Features ====================

document.addEventListener('DOMContentLoaded', function() {
    const isMobileViewport = window.matchMedia('(max-width: 768px)');
    const langZhButton = document.getElementById('langZh');
    const langEnButton = document.getElementById('langEn');

    const translations = {
        en: {
            title: 'Joyce | Portfolio',
            hiddenTitle: '👋 Come back soon! - Joyce Portfolio',
            metaDescription: "Joyce's portfolio: HSBC software testing professional, ISTQB Certified Tester, and aspiring full-stack engineer with strong Java backend foundations.",
            ogTitle: 'Joyce | Portfolio',
            ogDescription: 'HSBC Software Testing | ISTQB Certified Tester | Aspiring Full-Stack Engineer',
            twitterTitle: 'Joyce | Portfolio',
            twitterDescription: 'HSBC Software Testing | ISTQB Certified Tester | Aspiring Full-Stack Engineer',
            text: {
                '.skip-link': 'Skip to main content',
                '.hero-badge': 'Open to Software Engineer opportunities',
                'header h1': "Hi, I'm Joyce",
                '.subtitle': 'Software Testing Professional at HSBC · Aspiring Full-Stack Engineer',
                '.tagline': 'I build reliable systems with a testing mindset and backend-first foundation, and I am actively growing into frontend engineering with React and TypeScript.',
                '.hero-btn-primary': 'View Projects',
                '.hero-btn-secondary': 'Contact Me',
                '.hero-stat:nth-child(1) span': 'Years of Testing Experience',
                '.hero-stat:nth-child(2) span': 'Backend Projects',
                '.hero-stat:nth-child(3) span': 'Certified Tester',
                '.nav-bar a[href="#about"]': 'About Me',
                '.nav-bar a[href="#skills"]': 'Skills',
                '.nav-bar a[href="#projects"]': 'Projects',
                '.nav-bar a[href="#experience"]': 'Experience',
                '#about > h2': 'About Me',
                '#about > .section-intro': 'Testing by profession, engineering by mindset. I deliver reliable software while steadily expanding my end-to-end engineering capability.',
                '.about-summary p:nth-child(1)': 'I am a software testing professional at HSBC and an ISTQB Certified Tester, with a Master’s degree in Technology and Engineering Management. My daily work covers end-to-end testing across banking systems, where precision, data consistency, and customer impact matter.',
                '.about-summary p:nth-child(2)': 'Beyond testing delivery, my core technical background is Java backend development. I continue strengthening engineering fundamentals through hands-on work with Spring Boot and related backend practices.',
                '.about-focus h3': 'Current Growth Focus',
                '.about-list li:nth-child(1)': 'Deepening Java backend capabilities and system design thinking',
                '.about-list li:nth-child(2)': 'Learning Spring AI and AI application development',
                '.about-list li:nth-child(3)': "Learning React and TypeScript as a complementary direction, inspired by my department's AI team's frontend stack",
                '#skills > h2': 'Technical Skills',
                '#skills > .section-intro': 'A balanced skill profile across software quality, backend implementation, and domain understanding.',
                '#skills .skill-card:nth-child(1) h3': 'Backend Engineering',
                '#skills .skill-card:nth-child(1) p': 'Java, Spring Boot, and practical backend architecture skills from personal projects.',
                '#skills .skill-card:nth-child(2) h3': 'Database & Caching',
                '#skills .skill-card:nth-child(2) p': 'Hands-on with MySQL and Redis for data modeling, caching, and performance optimization.',
                '#skills .skill-card:nth-child(3) h3': 'Microservices & API',
                '#skills .skill-card:nth-child(3) p': 'Spring Cloud, API development and integration, with practical message queue usage.',
                '#skills .skill-card:nth-child(4) h3': 'Banking Domain Knowledge',
                '#skills .skill-card:nth-child(4) p': 'Deep familiarity with credit card workflows, rewards systems, and payment validation.',
                '#skills .skill-card:nth-child(5) h3': 'Quality Assurance',
                '#skills .skill-card:nth-child(5) p': 'Strong E2E test design, data validation, and multi-system integration verification capability.',
                '#skills .skill-card:nth-child(6) h3': 'Learning Agility',
                '#skills .skill-card:nth-child(6) p': 'Actively learning React, TypeScript, and AI-related product engineering practices.',
                '#projects > h2': 'Personal Projects',
                '#projects > .section-intro': 'Projects that demonstrate backend depth, distributed thinking, and production-oriented engineering decisions.',
                '#projects .project-card:nth-of-type(1) .project-type': 'Monolithic',
                '#projects .project-card:nth-of-type(1) .project-content h3': 'Red Packet Rain Lottery System',
                '#projects .project-card:nth-of-type(1) .project-description': 'Enterprise-level lottery activity management platform, supporting red packet rain, lottery events, prizes, and member management. Suitable for high-concurrency scenarios such as corporate annual meetings and holiday events.',
                '#projects .project-card:nth-of-type(1) .project-features h4': 'Key Achievements:',
                '#projects .project-card:nth-of-type(1) .project-features li:nth-child(1)': 'Developed User and Activity modules with accurate real-time data display for frontend',
                '#projects .project-card:nth-of-type(1) .project-features li:nth-child(2)': 'Optimized high-concurrency using Redis preloading and token bucket + Lua scripts to prevent overselling',
                '#projects .project-card:nth-of-type(1) .project-features li:nth-child(3)': 'Implemented asynchronous lottery processing with RabbitMQ for improved system stability',
                '#projects .project-card:nth-of-type(1) .project-features li:nth-child(4)': 'Achieved QPS of 2312 on core interfaces through JMeter performance testing',
                '#projects .project-card:nth-of-type(1) .btn-primary': 'View on Gitee',
                '#projects .project-card:nth-of-type(2) .project-type': 'Monolithic',
                '#projects .project-card:nth-of-type(2) .project-content h3': 'Sky Take Out System',
                '#projects .project-card:nth-of-type(2) .project-description': 'A catering management system with frontend-backend separation, including a merchant backend management system and a user mini program. Supports dishes, set meals, categories, and orders, optimizing user ordering experience and merchant management efficiency.',
                '#projects .project-card:nth-of-type(2) .project-features h4': 'Key Achievements:',
                '#projects .project-card:nth-of-type(2) .project-features li:nth-child(1)': 'Developed merchant backend managing employees, dishes, categories, and set meals with pagination',
                '#projects .project-card:nth-of-type(2) .project-features li:nth-child(2)': 'Implemented mini-program caching for dishes and set meals, improving frontend interaction efficiency',
                '#projects .project-card:nth-of-type(2) .project-features li:nth-child(3)': 'Built shopping cart management (add, view, clear) and order submission workflow',
                '#projects .project-card:nth-of-type(2) .project-features li:nth-child(4)': 'Designed payment flow with simulated WeChat Pay integration for smooth user ordering experience',
                '#projects .project-card:nth-of-type(2) .btn-primary': 'View on Gitee',
                '#projects .project-card:nth-of-type(3) .project-type': 'Microservices',
                '#projects .project-card:nth-of-type(3) .project-content h3': 'O2O City Ride System',
                '#projects .project-card:nth-of-type(3) .project-description': 'A city-based carpooling platform supporting drivers posting trips, passenger route matching, order generation, and message notifications. Based on microservices architecture with high availability and real-time communication, covering registration, trip publishing, ride invitations, and complete payment workflow.',
                '#projects .project-card:nth-of-type(3) .project-features h4': 'Key Achievements:',
                '#projects .project-card:nth-of-type(3) .project-features li:nth-child(1)': 'Developed User module with personal info, password modification, and document uploads',
                '#projects .project-card:nth-of-type(3) .project-features li:nth-child(2)': 'Integrated Baidu OCR for automatic vehicle and identity document recognition',
                '#projects .project-card:nth-of-type(3) .project-features li:nth-child(3)': 'Designed trip fare calculation algorithm using Decorator pattern with map API integration',
                '#projects .project-card:nth-of-type(3) .project-features li:nth-child(4)': 'Implemented order timeout handling and WebSocket real-time push for smooth user interaction',
                '#projects .project-card:nth-of-type(3) .btn-primary': 'View on Gitee',
                '#experience > h2': 'Work Experience',
                '#experience > .section-intro': 'Delivering quality in complex banking systems while growing toward end-to-end engineering impact.',
                '.experience-header h3': 'Software Testing Professional',
                '.role-note': 'Focus on testing strategy, cross-system validation, and stable release quality.',
                '.duration': 'Jan 2024 - Present',
                '.experience-item .project:nth-of-type(1) h4': 'Project 1: Hang Seng Bank MECP (Major Enhancement on Card Protection) - Credit Limit Management',
                '.experience-item .project:nth-of-type(2) h4': 'Project 2: Hang Seng Bank P Loan Universal Form MVP1+MVP2',
                '.experience-item .project:nth-of-type(3) h4': 'Project 3: Hang Seng Bank FUN Center Credit Card Reward Mall',
                'footer p': '© 2026 Joyce. All rights reserved.',
                '.contact-card h3': 'Quick Contact',
                '.contact-card .contact-item:nth-of-type(1) a': 'Contact Me'
            },
            html: {
                '.experience-item .project:nth-of-type(1) .project-overview': '<strong>Situation:</strong> Credit limit processing involved strict compliance rules and cross-system data dependencies.',
                '.experience-item .project:nth-of-type(1) li:nth-child(1)': '<strong>Task:</strong> Ensure end-to-end reliability of credit limit increase journeys and prevent non-compliant applications from passing.',
                '.experience-item .project:nth-of-type(1) li:nth-child(2)': '<strong>Action:</strong> Designed cross-system E2E scenarios, validated business rules and notifications, and verified critical data consistency across request, customer, and backend records.',
                '.experience-item .project:nth-of-type(1) li:nth-child(3)': '<strong>Result:</strong> Improved release confidence for credit limit features and strengthened risk control in sensitive banking workflows.',
                '.experience-item .project:nth-of-type(2) .project-overview': '<strong>Situation:</strong> Loan application optimization required high correctness across mobile, web, and backend integrations.',
                '.experience-item .project:nth-of-type(2) li:nth-child(1)': '<strong>Task:</strong> Validate end-to-end loan submission quality across channels while maintaining business rule correctness.',
                '.experience-item .project:nth-of-type(2) li:nth-child(2)': '<strong>Action:</strong> Built comprehensive scenario suites (including edge cases), validated OBS data extraction and downstream API submission behavior on both mobile and web.',
                '.experience-item .project:nth-of-type(2) li:nth-child(3)': '<strong>Result:</strong> Increased confidence in multi-channel loan workflow stability and reduced risk of data transformation defects before release.',
                '.experience-item .project:nth-of-type(3) .project-overview': '<strong>Situation:</strong> Rewards mall flows combined high-traffic user interactions, multi-module dependencies, and strict data correctness needs.',
                '.experience-item .project:nth-of-type(3) li:nth-child(1)': '<strong>Task:</strong> Guarantee correctness and stability for points, redemption, payment, and reporting workflows.',
                '.experience-item .project:nth-of-type(3) li:nth-child(2)': '<strong>Action:</strong> Executed end-to-end validation from mobile app to API to database, and designed report verification cases for daily/monthly statistics integrity.',
                '.experience-item .project:nth-of-type(3) li:nth-child(3)': '<strong>Result:</strong> Improved consistency of rewards and payment-related data, supporting smoother user experience and more reliable business reporting.'
            },
            aria: {
                '#backToTop': 'Back to top',
                '#contactToggle': 'Toggle contact panel',
                '#toggleContactBtn': 'Toggle contact panel'
            }
        },
        zh: {
            title: 'Joyce | 个人作品集',
            hiddenTitle: '👋 记得回来看看 - Joyce 作品集',
            metaDescription: 'Joyce 的个人作品集：汇丰软件测试从业者，ISTQB 认证测试工程师，具备扎实 Java 后端基础并持续成长为全栈工程师。',
            ogTitle: 'Joyce | 个人作品集',
            ogDescription: '汇丰软件测试 | ISTQB 认证测试工程师 | 全栈工程方向',
            twitterTitle: 'Joyce | 个人作品集',
            twitterDescription: '汇丰软件测试 | ISTQB 认证测试工程师 | 全栈工程方向',
            text: {
                '.skip-link': '跳转到主要内容',
                '.hero-badge': '正在寻找软件工程师机会',
                'header h1': '你好，我是 Joyce',
                '.subtitle': '汇丰软件测试从业者 · 全栈工程方向',
                '.tagline': '我以测试思维和后端基础构建可靠系统，同时持续学习 React 与 TypeScript，提升端到端工程能力。',
                '.hero-btn-primary': '查看项目',
                '.hero-btn-secondary': '联系我',
                '.hero-stat:nth-child(1) span': '测试经验',
                '.hero-stat:nth-child(2) span': '后端项目',
                '.hero-stat:nth-child(3) span': '认证测试工程师',
                '.nav-bar a[href="#about"]': '关于我',
                '.nav-bar a[href="#skills"]': '技能',
                '.nav-bar a[href="#projects"]': '项目',
                '.nav-bar a[href="#experience"]': '工作经历',
                '#about > h2': '关于我',
                '#about > .section-intro': '以测试为职业，以工程为思维。我专注于交付高可靠软件，并持续提升端到端工程能力。',
                '.about-summary p:nth-child(1)': '我目前在汇丰从事软件测试工作，并持有 ISTQB 认证，同时拥有技术与工程管理硕士学位。日常工作覆盖银行多系统端到端测试，关注精度、数据一致性与客户影响。',
                '.about-summary p:nth-child(2)': '在测试交付之外，我的核心技术背景是 Java 后端开发。我通过 Spring Boot 等实践持续强化系统设计与工程实现能力。',
                '.about-focus h3': '当前成长方向',
                '.about-list li:nth-child(1)': '深化 Java 后端能力与系统设计思维',
                '.about-list li:nth-child(2)': '学习 Spring AI 与 AI 应用开发',
                '.about-list li:nth-child(3)': '结合部门 AI 团队使用的 React + TypeScript 技术栈，拓展前端能力',
                '#skills > h2': '技术能力',
                '#skills > .section-intro': '能力覆盖软件质量、后端实现与业务领域理解，形成相对均衡的技术结构。',
                '#skills .skill-card:nth-child(1) h3': '后端工程',
                '#skills .skill-card:nth-child(1) p': '掌握 Java、Spring Boot，并通过个人项目沉淀后端架构实践能力。',
                '#skills .skill-card:nth-child(2) h3': '数据库与缓存',
                '#skills .skill-card:nth-child(2) p': '具备 MySQL 与 Redis 实践经验，覆盖建模、缓存与性能优化场景。',
                '#skills .skill-card:nth-child(3) h3': '微服务与 API',
                '#skills .skill-card:nth-child(3) p': '理解 Spring Cloud 架构，具备 API 开发与消息队列落地经验。',
                '#skills .skill-card:nth-child(4) h3': '银行业务理解',
                '#skills .skill-card:nth-child(4) p': '熟悉信用卡业务流程、权益活动与支付校验链路。',
                '#skills .skill-card:nth-child(5) h3': '软件测试能力',
                '#skills .skill-card:nth-child(5) p': '擅长端到端测试设计、数据校验与多系统集成验证。',
                '#skills .skill-card:nth-child(6) h3': '持续学习能力',
                '#skills .skill-card:nth-child(6) p': '持续学习 React、TypeScript 与 AI 应用工程实践。',
                '#projects > h2': '个人项目',
                '#projects > .section-intro': '项目体现了我在后端深度、分布式思维与生产可用性决策方面的工程能力。',
                '#projects .project-card:nth-of-type(1) .project-type': '单体架构',
                '#projects .project-card:nth-of-type(1) .project-content h3': '红包雨抽奖系统',
                '#projects .project-card:nth-of-type(1) .project-description': '面向企业活动场景的抽奖管理平台，支持红包雨、奖品管理与会员管理，适用于年会与节日等高并发活动。',
                '#projects .project-card:nth-of-type(1) .project-features h4': '关键成果：',
                '#projects .project-card:nth-of-type(1) .project-features li:nth-child(1)': '完成用户与活动模块开发，保障前端实时数据展示准确',
                '#projects .project-card:nth-of-type(1) .project-features li:nth-child(2)': '通过 Redis 预热与令牌桶 + Lua 脚本优化并发，避免超卖',
                '#projects .project-card:nth-of-type(1) .project-features li:nth-child(3)': '引入 RabbitMQ 异步抽奖流程，提升系统稳定性',
                '#projects .project-card:nth-of-type(1) .project-features li:nth-child(4)': '核心接口压测达到 2312 QPS',
                '#projects .project-card:nth-of-type(1) .btn-primary': '查看 Gitee',
                '#projects .project-card:nth-of-type(2) .project-type': '单体架构',
                '#projects .project-card:nth-of-type(2) .project-content h3': '苍穹外卖系统',
                '#projects .project-card:nth-of-type(2) .project-description': '前后端分离的餐饮管理系统，包含商家后台与用户端小程序，覆盖菜品、套餐、分类与订单等核心流程。',
                '#projects .project-card:nth-of-type(2) .project-features h4': '关键成果：',
                '#projects .project-card:nth-of-type(2) .project-features li:nth-child(1)': '实现商家端员工、菜品、分类与套餐管理，并支持分页查询',
                '#projects .project-card:nth-of-type(2) .project-features li:nth-child(2)': '实现菜品与套餐缓存，优化用户端交互响应效率',
                '#projects .project-card:nth-of-type(2) .project-features li:nth-child(3)': '完成购物车与下单流程开发，打通关键交易链路',
                '#projects .project-card:nth-of-type(2) .project-features li:nth-child(4)': '设计模拟微信支付流程，提升下单体验完整性',
                '#projects .project-card:nth-of-type(2) .btn-primary': '查看 Gitee',
                '#projects .project-card:nth-of-type(3) .project-type': '微服务架构',
                '#projects .project-card:nth-of-type(3) .project-content h3': '同城拼车系统',
                '#projects .project-card:nth-of-type(3) .project-description': '基于微服务的同城拼车平台，支持行程发布、路线匹配、订单处理与消息通知，覆盖从注册到支付的完整流程。',
                '#projects .project-card:nth-of-type(3) .project-features h4': '关键成果：',
                '#projects .project-card:nth-of-type(3) .project-features li:nth-child(1)': '完成用户模块开发，支持资料维护、密码修改与证件上传',
                '#projects .project-card:nth-of-type(3) .project-features li:nth-child(2)': '接入百度 OCR，实现证件信息自动识别',
                '#projects .project-card:nth-of-type(3) .project-features li:nth-child(3)': '使用装饰器模式实现计价算法，并结合地图 API 完成路径计算',
                '#projects .project-card:nth-of-type(3) .project-features li:nth-child(4)': '实现订单超时处理与 WebSocket 实时推送，提升交互体验',
                '#projects .project-card:nth-of-type(3) .btn-primary': '查看 Gitee',
                '#experience > h2': '工作经历',
                '#experience > .section-intro': '在复杂银行系统中持续交付质量，同时向端到端工程影响力演进。',
                '.experience-header h3': '软件测试从业者',
                '.role-note': '聚焦测试策略、跨系统验证与稳定发布质量。',
                '.duration': '2024.01 - 至今',
                '.experience-item .project:nth-of-type(1) h4': '项目一：恒生银行 MECP（信用卡额度管理）',
                '.experience-item .project:nth-of-type(2) h4': '项目二：恒生银行 P Loan Universal Form MVP1+MVP2',
                '.experience-item .project:nth-of-type(3) h4': '项目三：恒生银行 FUN Center 信用卡积分商城',
                'footer p': '© 2026 Joyce. 保留所有权利。',
                '.contact-card h3': '快速联系',
                '.contact-card .contact-item:nth-of-type(1) a': '联系我'
            },
            html: {
                '.experience-item .project:nth-of-type(1) .project-overview': '<strong>背景：</strong>额度流程涉及严格合规规则与多系统数据依赖。',
                '.experience-item .project:nth-of-type(1) li:nth-child(1)': '<strong>任务：</strong>保障提额流程端到端稳定，并拦截不合规申请。',
                '.experience-item .project:nth-of-type(1) li:nth-child(2)': '<strong>行动：</strong>设计跨系统 E2E 场景，验证规则与通知链路，并核对请求、客户与后端记录的数据一致性。',
                '.experience-item .project:nth-of-type(1) li:nth-child(3)': '<strong>结果：</strong>提升额度功能发布信心，并强化高敏感业务的风险控制能力。',
                '.experience-item .project:nth-of-type(2) .project-overview': '<strong>背景：</strong>贷款流程优化需同时保证移动端、Web 与后端集成的高正确性。',
                '.experience-item .project:nth-of-type(2) li:nth-child(1)': '<strong>任务：</strong>验证多端贷款提交流程质量，并确保业务规则准确。',
                '.experience-item .project:nth-of-type(2) li:nth-child(2)': '<strong>行动：</strong>构建覆盖边界场景的测试集，验证 OBS 数据抽取与下游 API 提交流程。',
                '.experience-item .project:nth-of-type(2) li:nth-child(3)': '<strong>结果：</strong>提升多渠道贷款流程稳定性，降低发布前数据转换缺陷风险。',
                '.experience-item .project:nth-of-type(3) .project-overview': '<strong>背景：</strong>积分商城涉及高流量交互、多模块依赖与严格数据正确性要求。',
                '.experience-item .project:nth-of-type(3) li:nth-child(1)': '<strong>任务：</strong>保障积分、兑换、支付与报表链路的正确性与稳定性。',
                '.experience-item .project:nth-of-type(3) li:nth-child(2)': '<strong>行动：</strong>完成从 App 到 API 再到数据库的端到端验证，并设计日报/月报口径与完整性校验用例。',
                '.experience-item .project:nth-of-type(3) li:nth-child(3)': '<strong>结果：</strong>提升奖励与支付数据一致性，支撑更顺畅的用户体验与更可靠的业务报表。'
            },
            aria: {
                '#backToTop': '返回顶部',
                '#contactToggle': '切换联系面板',
                '#toggleContactBtn': '切换联系面板'
            }
        }
    };

    let currentLanguage = 'en';

    function applyTexts(map) {
        Object.entries(map).forEach(([selector, value]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = value;
            }
        });
    }

    function applyHtml(map) {
        Object.entries(map).forEach(([selector, value]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = value;
            }
        });
    }

    function applyAria(map) {
        Object.entries(map).forEach(([selector, value]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute('aria-label', value);
            }
        });
    }

    function applyLanguage(language) {
        const lang = translations[language] ? language : 'en';
        const t = translations[lang];
        currentLanguage = lang;

        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.body.classList.toggle('lang-zh', lang === 'zh');
        document.body.classList.toggle('lang-en', lang === 'en');
        document.title = t.title;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) metaDescription.setAttribute('content', t.metaDescription);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', t.ogTitle);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', t.ogDescription);

        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', t.twitterTitle);

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) twitterDescription.setAttribute('content', t.twitterDescription);

        applyTexts(t.text);
        applyHtml(t.html);
        applyAria(t.aria);

        if (langZhButton && langEnButton) {
            langZhButton.classList.toggle('active', lang === 'zh');
            langEnButton.classList.toggle('active', lang === 'en');
        }
    }

    const savedLanguage = localStorage.getItem('language');
    const browserIsChinese = navigator.language.toLowerCase().startsWith('zh');
    const initialLanguage = savedLanguage || (browserIsChinese ? 'zh' : 'en');
    applyLanguage(initialLanguage);

    if (langZhButton) {
        langZhButton.addEventListener('click', function() {
            applyLanguage('zh');
            localStorage.setItem('language', 'zh');
        });
    }

    if (langEnButton) {
        langEnButton.addEventListener('click', function() {
            applyLanguage('en');
            localStorage.setItem('language', 'en');
        });
    }

    // ==================== 1. 联系侧边栏功能 ====================
    const contactToggle = document.getElementById('contactToggle');
    const contactSidebar = document.getElementById('contactSidebar');

    if (contactSidebar) {
        contactSidebar.classList.add('hidden');
    }

    if (contactToggle && contactSidebar) {
        contactToggle.addEventListener('click', function() {
            contactSidebar.classList.toggle('hidden');
        });
    }

    const toggleContactBtn = document.getElementById('toggleContactBtn');
    if (toggleContactBtn && contactSidebar) {
        toggleContactBtn.addEventListener('click', function() {
            contactSidebar.classList.add('hidden');
        });
    }

    if (contactSidebar) {
        contactSidebar.addEventListener('click', function(e) {
            if (e.target === this && isMobileViewport.matches) {
                this.classList.add('hidden');
            }
        });
    }

    // ==================== 2. 平滑滚动功能 ====================
    const navLinks = document.querySelectorAll('.nav-bar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==================== 3. 导航栏高亮功能 ====================
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-bar a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // ==================== 4. 滚动进度条 ====================
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    // ==================== 5. 返回顶部按钮 ====================
    const backToTopButton = document.getElementById('backToTop');
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== 6. 技能卡片随机颜色边框 ====================
    const skillCards = document.querySelectorAll('.skill-card');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    skillCards.forEach((card, index) => {
        const borderColorByIndex = colors[index % colors.length];
        card.style.borderLeftColor = borderColorByIndex;
    });

    // ==================== 滚动事件监听 ====================
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateActiveNav();
                updateScrollProgress();
                toggleBackToTop();
                scrollTimeout = null;
            }, 100);
        }
    }, { passive: true });

    // ==================== 页面可见性变化检测 ====================
    document.addEventListener('visibilitychange', function() {
        const t = translations[currentLanguage] || translations.en;
        document.title = document.hidden ? t.hiddenTitle : t.title;
    });

    // ==================== 页面初始化 ====================
    updateActiveNav();
    updateScrollProgress();

    console.log('%c👋 Welcome to Joyce\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
});
