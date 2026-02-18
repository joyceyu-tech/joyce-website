// ==================== Joyce Portfolio Interactive Features ====================

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 1. 联系侧边栏 Toggle 功能 ====================
    const toggleContactBtn = document.getElementById('toggleContactBtn');
    const contactToggle = document.getElementById('contactToggle');
    const contactSidebar = document.getElementById('contactSidebar');
    
    // 默认状态：联系侧边栏是隐藏的
    if (contactSidebar) {
        contactSidebar.classList.add('hidden');
    }
    
    // 显示 toggle 按钮（桌面端与移动端都可用）
    function updateContactToggleVisibility() {
        if (contactToggle) {
            contactToggle.classList.add('visible');
        }
    }
    
    // 关闭按钮点击事件 - 隐藏侧边栏
    if (toggleContactBtn && contactSidebar) {
        toggleContactBtn.addEventListener('click', function() {
            contactSidebar.classList.add('hidden');
        });
    }
    
    // Toggle 按钮点击事件 - 显示/隐藏侧边栏
    if (contactToggle && contactSidebar) {
        contactToggle.addEventListener('click', function() {
            contactSidebar.classList.toggle('hidden');
        });
    }
    
    // 关闭overlay点击事件
    if (contactSidebar) {
        contactSidebar.addEventListener('click', function(e) {
            if (e.target === this && window.innerWidth <= 768) {
                this.classList.add('hidden');
            }
        });
    }
    
    // 初始化 toggle 按钮可见性
    updateContactToggleVisibility();
    
    // 窗口大小改变时更新 toggle 按钮可见性
    window.addEventListener('resize', updateContactToggleVisibility);

    
    // ==================== 2. 平滑滚动功能 ====================
    const navLinks = document.querySelectorAll('.nav-bar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 20; // 顶部留一点间距
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    // ==================== 3. 导航栏高亮功能 ====================
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100; // 偏移量
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 移除所有激活状态
                navLinks.forEach(link => link.classList.remove('active'));
                
                // 添加当前激活状态
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

    
    // ==================== 6. 项目卡片悬停效果增强 ====================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    
    // ==================== 7. 技能卡片随机颜色边框 ====================
    const skillCards = document.querySelectorAll('.skill-card');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    
    skillCards.forEach((card, index) => {
        const randomColor = colors[index % colors.length];
        card.style.borderLeftColor = randomColor;
    });

    
    // ==================== 监听滚动事件 ====================
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        // 使用节流优化性能
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateActiveNav();
                updateScrollProgress();
                toggleBackToTop();
                scrollTimeout = null;
            }, 10);
        }
    });

    
    // ==================== 页面加载时初始化 ====================
    updateActiveNav();
    updateScrollProgress();
    
    
    // ==================== 添加平滑过渡效果 ====================
    document.documentElement.style.scrollBehavior = 'smooth';
    
    
    // ==================== 控制台欢迎信息 ====================
    console.log('%c👋 Welcome to Joyce\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Built with passion for Software Engineering', 'color: #764ba2; font-size: 14px;');
    console.log('%c💼 Looking for opportunities to contribute and grow!', 'color: #43e97b; font-size: 14px;');
});


// ==================== 页面可见性变化检测 ====================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '👋 Come back soon! - Joyce Portfolio';
    } else {
        document.title = 'Joyce | Portfolio';
    }
});
