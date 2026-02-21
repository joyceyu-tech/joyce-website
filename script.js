// ==================== Joyce Portfolio Interactive Features ====================

document.addEventListener('DOMContentLoaded', function() {
    const isMobileViewport = window.matchMedia('(max-width: 768px)');
    const langZhButton = document.getElementById('langZh');
    const langEnButton = document.getElementById('langEn');
    const langSwitchFloating = document.querySelector('.lang-switch-floating');
    const storage = {
        get(key) {
            try {
                return localStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (error) {
                // Ignore storage failures in restricted webviews (e.g., some in-app browsers).
            }
        }
    };

    function onMediaQueryChange(mediaQueryList, handler) {
        if (!mediaQueryList || typeof handler !== 'function') return;
        if (typeof mediaQueryList.addEventListener === 'function') {
            mediaQueryList.addEventListener('change', handler);
            return;
        }
        if (typeof mediaQueryList.addListener === 'function') {
            mediaQueryList.addListener(handler);
        }
    }

    const translations = (typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS : {});

    /* Translations loaded from translations.js */
    if (Object.keys(translations).length === 0) {
        console.warn('Translations not loaded. Ensure translations.js is loaded before script.js.');
    }


    let currentLanguage = 'en';

    function applyTexts(map) {
        Object.entries(map).forEach(([selector, value]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.textContent = value;
            });
        });
    }

    function applyHtml(map) {
        Object.entries(map).forEach(([selector, value]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.innerHTML = value;
            });
        });
    }

    function applyAria(map) {
        Object.entries(map).forEach(([selector, value]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.setAttribute('aria-label', value);
            });
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

    const queryLanguage = new URLSearchParams(window.location.search).get('lang');
    const normalizedQueryLanguage = queryLanguage === 'zh' || queryLanguage === 'en' ? queryLanguage : null;
    if (normalizedQueryLanguage) {
        storage.set('language', normalizedQueryLanguage);
    }
    const savedLanguage = storage.get('language');
    const initialLanguage = normalizedQueryLanguage || savedLanguage || 'en';
    applyLanguage(initialLanguage);

    function attachLangFeedback(button, language) {
        if (!button) return;
        button.addEventListener('click', function(e) {
            e.preventDefault();
            storage.set('language', language);
            applyLanguage(language);
            // 更新 URL 便于分享/书签，但不触发页面重载。
            // 微信 WebView 对 query 参数变化的页面跳转会命中缓存导致语言未切换，
            // 原地切换 + history.pushState 是最可靠的跨环境方案。
            try {
                history.pushState(null, '', '?lang=' + language);
            } catch (err) {
                // 降级：忽略，语言已原地切换成功
            }
        });
    }

    attachLangFeedback(langZhButton, 'zh');
    attachLangFeedback(langEnButton, 'en');

    // ==================== 手机/微信仅显示顶部 Banner ====================
    // 仅在小屏或微信内显示顶部「推荐电脑访问」横幅，可关闭，sessionStorage 记住本会话不再显示；不再使用首次弹窗。
    const topBanner = document.getElementById('topBanner');
    const topBannerClose = document.getElementById('topBannerClose');
    const narrowViewport = window.matchMedia('(max-width: 768px)');
    const isWeChat = /MicroMessenger/i.test(navigator.userAgent);

    function getBannerDismissed() {
        try { return sessionStorage.getItem('joyce-banner-dismissed'); } catch (e) { return null; }
    }
    function setBannerDismissed() {
        try { sessionStorage.setItem('joyce-banner-dismissed', '1'); } catch (e) {}
    }

    function shouldShowBanner() {
        return (narrowViewport.matches || isWeChat) && !getBannerDismissed();
    }
    function maybeShowBanner() {
        if (!topBanner || !shouldShowBanner()) return;
        topBanner.removeAttribute('hidden');
    }
    function hideBanner() {
        if (topBanner) topBanner.setAttribute('hidden', '');
    }

    // 仅在小屏（手机/平板）或微信内显示顶部 Banner；不显示首次弹窗
    if (shouldShowBanner()) maybeShowBanner();
    onMediaQueryChange(narrowViewport, function() {
        if (!shouldShowBanner()) hideBanner(); else maybeShowBanner();
    });
    if (topBannerClose && topBanner) {
        topBannerClose.addEventListener('click', function() {
            setBannerDismissed();
            hideBanner();
        });
    }

    // ==================== 1. 联系侧边栏功能 ====================
    const contactToggle = document.getElementById('contactToggle');
    const contactSidebar = document.getElementById('contactSidebar');

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

        // 先清除所有按钮的 active，回到顶部时全部恢复为未点击的白色状态
        navLinks.forEach(link => link.classList.remove('active'));

        // 还在顶部（未滚入第一个 section）时，不再高亮任何一项
        const firstSectionTop = sections.length ? sections[0].offsetTop : 0;
        if (scrollPosition < firstSectionTop) return;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

    function updateLangSwitchVisibility() {
        if (!langSwitchFloating) return;
        const shouldShow = isMobileViewport.matches ? true : window.scrollY <= 16;
        langSwitchFloating.classList.toggle('hidden', !shouldShow);
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

    // ==================== 7. 项目图片（手机端不提供点击放大，用户可直接双指缩放页面） ====================
    // 已移除 lightbox 相关逻辑

    // ==================== 滚动事件监听 ====================
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateActiveNav();
                updateScrollProgress();
                toggleBackToTop();
                updateLangSwitchVisibility();
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
    updateLangSwitchVisibility();

    console.log('%c👋 Welcome to Joyce\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
});
