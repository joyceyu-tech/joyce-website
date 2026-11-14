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

    function applyGalleryLanguage() {
        const suffix = currentLanguage === 'zh' ? 'Zh' : 'En';
        document.querySelectorAll('[data-gallery-label-en]').forEach(element => {
            element.setAttribute('aria-label', element.dataset[`galleryLabel${suffix}`]);
        });
        document.querySelectorAll('[data-gallery-alt-en]').forEach(img => {
            img.alt = img.dataset[`galleryAlt${suffix}`];
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
        applyGalleryLanguage();

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

    // ==================== 7. 架构图查看体验 ====================
    const architectureSections = document.querySelectorAll('.project-architecture, .project-gallery');
    const visibleArchitectureSections = new Set();
    const imagePreview = document.getElementById('imagePreview');
    const imagePreviewImg = document.getElementById('imagePreviewImg');
    const imagePreviewClose = document.getElementById('imagePreviewClose');
    const imagePreviewBackdrop = document.querySelector('.image-preview-backdrop');
    const imagePreviewNavigation = document.getElementById('imagePreviewNavigation');
    const imagePreviewCount = document.getElementById('imagePreviewCount');
    const imagePreviewPrev = document.getElementById('imagePreviewPrev');
    const imagePreviewNext = document.getElementById('imagePreviewNext');
    const architectureImages = document.querySelectorAll('.project-architecture-figure img');
    let previewGallery = null;
    let previewReturnFocus = null;

    function closeImagePreview() {
        if (!imagePreview || !imagePreviewImg) return;
        const wasOpen = !imagePreview.classList.contains('hidden');
        const focusTarget = previewGallery ? previewGallery.currentSlide() : previewReturnFocus;
        imagePreview.classList.add('hidden');
        imagePreview.setAttribute('aria-hidden', 'true');
        imagePreviewImg.removeAttribute('src');
        imagePreviewImg.setAttribute('alt', '');
        delete imagePreviewImg.dataset.galleryAltEn;
        delete imagePreviewImg.dataset.galleryAltZh;
        document.body.classList.remove('preview-open');
        previewGallery = null;
        if (wasOpen && focusTarget) focusTarget.focus({ preventScroll: true });
    }

    function setPreviewImage(img) {
        const canvas = imagePreviewImg.closest('.image-preview-canvas');
        if (canvas) canvas.scrollTo(0, 0);
        imagePreviewImg.src = img.currentSrc || img.src;
        imagePreviewImg.alt = img.alt;
        if (img.dataset.galleryAltEn) {
            imagePreviewImg.dataset.galleryAltEn = img.dataset.galleryAltEn;
            imagePreviewImg.dataset.galleryAltZh = img.dataset.galleryAltZh;
        }
        if (imagePreviewCount && previewGallery) {
            imagePreviewCount.textContent = previewGallery.position();
        }
    }

    function openImagePreview(img, gallery = null) {
        if (!imagePreview || !imagePreviewImg || !img) return;
        previewReturnFocus = document.activeElement;
        previewGallery = gallery;
        if (imagePreviewNavigation) imagePreviewNavigation.hidden = !gallery;
        setPreviewImage(img);
        imagePreview.classList.remove('hidden');
        imagePreview.setAttribute('aria-hidden', 'false');
        document.body.classList.add('preview-open');
        if (imagePreviewClose) {
            imagePreviewClose.focus();
        }
    }

    function movePreview(direction) {
        if (!previewGallery) return;
        previewGallery.move(direction);
        setPreviewImage(previewGallery.currentSlide().querySelector('img'));
    }

    document.querySelectorAll('.project-gallery').forEach(gallery => {
        const slides = Array.from(gallery.querySelectorAll('[data-gallery-slide]'));
        const dots = Array.from(gallery.querySelectorAll('[data-gallery-index]'));
        const count = gallery.querySelector('[data-gallery-current]');
        const stage = gallery.querySelector('.project-gallery-stage');
        let current = 0;
        let pointerStart = null;
        let swiped = false;

        function show(index) {
            const next = (index + slides.length) % slides.length;
            const focusedSlide = document.activeElement === slides[current];
            slides[current].hidden = true;
            current = next;
            slides[current].hidden = false;
            dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
            count.textContent = String(current + 1).padStart(2, '0');
            if (focusedSlide) slides[current].focus({ preventScroll: true });
        }

        const state = {
            move: direction => show(current + direction),
            currentSlide: () => slides[current],
            position: () => `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`
        };
        gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => state.move(-1));
        gallery.querySelector('[data-gallery-next]').addEventListener('click', () => state.move(1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
        slides.forEach(slide => slide.addEventListener('click', event => {
            if (swiped) {
                event.preventDefault();
                swiped = false;
                return;
            }
            openImagePreview(slide.querySelector('img'), state);
        }));
        gallery.addEventListener('keydown', event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            if (event.key === 'Home') show(0);
            else if (event.key === 'End') show(slides.length - 1);
            else state.move(event.key === 'ArrowLeft' ? -1 : 1);
        });
        stage.addEventListener('pointerdown', event => {
            swiped = false;
            if (!event.isPrimary || event.pointerType === 'mouse') return;
            pointerStart = { x: event.clientX, y: event.clientY };
        });
        stage.addEventListener('pointercancel', () => { pointerStart = null; });
        stage.addEventListener('pointerup', event => {
            if (!pointerStart) return;
            const dx = event.clientX - pointerStart.x;
            const dy = event.clientY - pointerStart.y;
            pointerStart = null;
            if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) {
                swiped = true;
                state.move(dx < 0 ? 1 : -1);
            }
        });
        gallery.classList.add('is-ready');
    });

    architectureImages.forEach(img => {
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.addEventListener('click', function() {
            openImagePreview(this);
        });
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImagePreview(this);
            }
        });
    });

    if (imagePreviewPrev) imagePreviewPrev.addEventListener('click', () => movePreview(-1));
    if (imagePreviewNext) imagePreviewNext.addEventListener('click', () => movePreview(1));
    if (imagePreviewClose) {
        imagePreviewClose.addEventListener('click', closeImagePreview);
    }
    if (imagePreviewBackdrop) {
        imagePreviewBackdrop.addEventListener('click', closeImagePreview);
    }
    document.addEventListener('keydown', function(e) {
        if (!imagePreview || imagePreview.classList.contains('hidden')) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            closeImagePreview();
        } else if (previewGallery && ['ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            movePreview(e.key === 'ArrowLeft' ? -1 : 1);
        } else if (e.key === 'Tab') {
            const controls = Array.from(imagePreview.querySelectorAll('.image-preview-dialog button'))
                .filter(button => !button.closest('[hidden]'));
            const next = controls[controls.length - 1];
            if (e.shiftKey && document.activeElement === controls[0]) {
                e.preventDefault();
                next.focus();
            } else if (!e.shiftKey && document.activeElement === next) {
                e.preventDefault();
                controls[0].focus();
            }
        }
    });

    function updateArchitectureFocus(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.18) {
                visibleArchitectureSections.add(entry.target);
            } else {
                visibleArchitectureSections.delete(entry.target);
            }
        });
        document.body.classList.toggle('architecture-focus', isMobileViewport.matches && visibleArchitectureSections.size > 0);
    }

    if (architectureSections.length && 'IntersectionObserver' in window) {
        const architectureObserver = new IntersectionObserver(updateArchitectureFocus, {
            threshold: [0, 0.18, 0.5]
        });
        architectureSections.forEach(section => architectureObserver.observe(section));
        onMediaQueryChange(isMobileViewport, function() {
            document.body.classList.toggle('architecture-focus', isMobileViewport.matches && visibleArchitectureSections.size > 0);
        });
    }

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
