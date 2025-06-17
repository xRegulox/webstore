/**
 * OPAF ARK Server Website - Interactive JavaScript
 * Gaming-themed animations and smooth user experience
 */

// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupActiveSection();
    }
    
    setupScrollEffect() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add background blur when scrolled
            if (currentScroll > 50) {
                this.navbar.style.background = 'rgba(10, 14, 26, 0.98)';
                this.navbar.style.backdropFilter = 'blur(15px)';
            } else {
                this.navbar.style.background = 'rgba(10, 14, 26, 0.95)';
                this.navbar.style.backdropFilter = 'blur(10px)';
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.hamburger.querySelectorAll('span');
            if (this.hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
                
                const spans = this.hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupActiveSection() {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
}

// ===================================
// CARD ANIMATIONS
// ===================================
class CardAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
        this.setupParallaxEffect();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for grid items
                    if (entry.target.parentElement.classList.contains('ranks-grid') ||
                        entry.target.parentElement.classList.contains('points-grid') ||
                        entry.target.parentElement.classList.contains('boost-grid')) {
                        
                        const siblings = Array.from(entry.target.parentElement.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                        entry.target.classList.add('animate-in');
                    }
                }
            });
        }, observerOptions);
        
        // Observe all cards and sections
        const elementsToObserve = document.querySelectorAll('.rank-card, .points-card, .boost-card, .info-card, .section-header');
        elementsToObserve.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    setupHoverEffects() {
        // Rank cards
        const rankCards = document.querySelectorAll('.rank-card');
        rankCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                this.addParticleEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Points cards
        const pointsCards = document.querySelectorAll('.points-card');
        pointsCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.points-icon');
                icon.style.transform = 'scale(1.1) rotateY(180deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.points-icon');
                icon.style.transform = 'scale(1) rotateY(0deg)';
            });
        });
        
        // Boost cards
        const boostCards = document.querySelectorAll('.boost-card');
        boostCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.boost-icon');
                icon.style.animation = 'rocket-boost 0.5s ease-in-out';
            });
        });
    }
    
    addParticleEffect(element) {
        // Create floating particles on hover
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#00d4ff';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10';
            
            const rect = element.getBoundingClientRect();
            particle.style.left = Math.random() * rect.width + 'px';
            particle.style.top = Math.random() * rect.height + 'px';
            
            element.style.position = 'relative';
            element.appendChild(particle);
            
            // Animate particle
            particle.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-50px) scale(0)', opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out'
            }).onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
    }
    
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-visual, .floating-particles');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// ===================================
// PRICE MANAGEMENT SYSTEM
// ===================================
class PriceManager {
    constructor() {
        this.prices = {
            vip: { monthly: '16€', permanent: '80€' },
            mvp: { monthly: '25€', permanent: '100€' },
            mvpPlus: { permanent: '140€' },
            mvpUltra: { permanent: '290€' },
            points: { '2k': '8€', '5k': '15€', '20k': '25€' }
        };
        
        this.init();
    }
    
    init() {
        this.updatePriceDisplay();
        this.setupPriceAnimations();
    }
    
    updatePriceDisplay() {
        // This method can be called to update prices dynamically
        // Prices are controlled via CSS variables for easy management
        console.log('Price display system initialized');
        console.log('To update prices, modify the CSS variables at the top of styles.css');
    }
    
    setupPriceAnimations() {
        const priceElements = document.querySelectorAll('.price, .points-price');
        
        priceElements.forEach(price => {
            price.addEventListener('mouseenter', () => {
                price.style.transform = 'scale(1.1)';
                price.style.textShadow = '0 0 20px currentColor';
            });
            
            price.addEventListener('mouseleave', () => {
                price.style.transform = 'scale(1)';
                price.style.textShadow = 'none';
            });
        });
    }
    
    // Method to programmatically update prices (for future use)
    updatePrice(section, type, newPrice) {
        const root = document.documentElement;
        const variableName = `--${section}-${type}`;
        root.style.setProperty(variableName, `"${newPrice}"`);
        
        console.log(`Updated ${variableName} to ${newPrice}`);
    }
}

// ===================================
// LANGUAGE SYSTEM
// ===================================
class LanguageSystem {
    constructor() {
        this.currentLanguage = 'en';
        this.langButtons = document.querySelectorAll('.lang-btn');
        this.translatableElements = document.querySelectorAll('[data-en][data-es]');
        
        this.init();
    }
    
    init() {
        this.setupLanguageButtons();
        this.loadSavedLanguage();
    }
    
    setupLanguageButtons() {
        this.langButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }
    
    switchLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        this.currentLanguage = lang;
        
        // Update button states
        this.langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update all translatable elements
        this.translatableElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Save language preference
        localStorage.setItem('preferred-language', lang);
        
        // Add visual feedback
        this.showLanguageChangeEffect();
    }
    
    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
            this.switchLanguage(savedLang);
        }
    }
    
    showLanguageChangeEffect() {
        // Add a subtle animation to indicate language change
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.9';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        }, 150);
    }
}

// ===================================
// SPECIAL EFFECTS
// ===================================
class SpecialEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupGlitchEffect();
        this.setupFloatingElements();
        this.setupButtonEffects();
        this.setupTypewriterEffect();
    }
    
    setupGlitchEffect() {
        const glitchElement = document.querySelector('.glitch');
        
        if (glitchElement) {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    glitchElement.style.animation = 'none';
                    setTimeout(() => {
                        glitchElement.style.animation = 'glitch 2s infinite';
                    }, 100);
                }
            }, 3000);
        }
    }
    
    setupFloatingElements() {
        // Create additional floating elements
        const hero = document.querySelector('.hero');
        
        for (let i = 0; i < 10; i++) {
            const floater = document.createElement('div');
            floater.style.position = 'absolute';
            floater.style.width = Math.random() * 10 + 5 + 'px';
            floater.style.height = floater.style.width;
            floater.style.background = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
            floater.style.borderRadius = '50%';
            floater.style.opacity = '0.3';
            floater.style.pointerEvents = 'none';
            floater.style.left = Math.random() * 100 + '%';
            floater.style.top = Math.random() * 100 + '%';
            floater.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
            
            if (hero) {
                hero.appendChild(floater);
            }
        }
    }
    
    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = (e.clientX - button.offsetLeft) + 'px';
                ripple.style.top = (e.clientY - button.offsetTop) + 'px';
                ripple.style.width = '10px';
                ripple.style.height = '10px';
                
                button.style.position = 'relative';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
    }
    
    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        });
    }
}

// ===================================
// PERFORMANCE MONITORING
// ===================================
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        this.monitorFrameRate();
        this.optimizeAnimations();
    }
    
    monitorFrameRate() {
        let lastTime = performance.now();
        let frames = 0;
        
        const checkFPS = (currentTime) => {
            frames++;
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                
                // Reduce animations if FPS is low
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                } else {
                    document.body.classList.remove('low-performance');
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        requestAnimationFrame(checkFPS);
    }
    
    optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduce-motion');
        }
    }
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    const navigation = new Navigation();
    const cardAnimations = new CardAnimations();
    const priceManager = new PriceManager();
    const languageSystem = new LanguageSystem();
    const specialEffects = new SpecialEffects();
    const performanceMonitor = new PerformanceMonitor();
    
    // Add CSS for ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .low-performance * {
            animation-duration: 0.1s !important;
        }
        
        .reduce-motion * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Performance optimization
    const observerOptions = {
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe elements for lazy loading
    document.querySelectorAll('.rank-card, .points-card, .boost-card').forEach(el => {
        lazyLoadObserver.observe(el);
    });
    
    console.log('OPAF ARK Server website initialized successfully!');
    console.log('All systems online - Navigation, Animations, Pricing, Language System, and Special Effects');
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(smoothScrollPolyfill);
}
