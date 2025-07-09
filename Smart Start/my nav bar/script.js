// Navigation functionality with fade animations
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('#hamburger');
    const mobileMenu = document.querySelector('#mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navbar = document.querySelector('#navbar');
    const fadeElements = document.querySelectorAll('.fade-element');

    // Initialize fade-in animations
    function initFadeAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Staggered fade-in for navigation elements
    function fadeInNavElements() {
        const navElements = document.querySelectorAll('.nav-menu .fade-element');
        navElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 100);
        });

        // Fade in logo and hamburger
        setTimeout(() => {
            document.querySelector('.nav-logo').classList.add('fade-in');
        }, 50);

        setTimeout(() => {
            const hamburgerElement = document.querySelector('.hamburger');
            if (hamburgerElement) {
                hamburgerElement.classList.add('fade-in');
            }
        }, 600);
    }

    // Toggle mobile menu with fade animation
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';

        // Animate mobile menu items
        if (mobileMenu.classList.contains('active')) {
            const menuItems = mobileMenu.querySelectorAll('.mobile-menu-item');
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        }
    });

    // Handle mobile submenu toggles with fade effects
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const submenu = this.nextElementSibling;
            const isActive = submenu.classList.contains('active');

            // Close all other submenus with fade out
            document.querySelectorAll('.mobile-submenu').forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove('active');
                }
            });
            document.querySelectorAll('.mobile-link').forEach(link => {
                if (link !== this) {
                    link.classList.remove('active');
                }
            });

            // Toggle current submenu with fade animation
            if (!isActive) {
                submenu.classList.add('active');
                this.classList.add('active');

                // Fade in submenu items
                const sublinks = submenu.querySelectorAll('.mobile-sublink');
                sublinks.forEach((sublink, index) => {
                    sublink.style.opacity = '0';
                    sublink.style.transform = 'translateX(-10px)';
                    setTimeout(() => {
                        sublink.style.transition = 'all 0.3s ease';
                        sublink.style.opacity = '1';
                        sublink.style.transform = 'translateX(0)';
                    }, index * 50);
                });
            } else {
                // Fade out submenu items before closing
                const sublinks = submenu.querySelectorAll('.mobile-sublink');
                sublinks.forEach((sublink, index) => {
                    setTimeout(() => {
                        sublink.style.opacity = '0';
                        sublink.style.transform = 'translateX(-10px)';
                    }, index * 30);
                });

                setTimeout(() => {
                    submenu.classList.remove('active');
                    this.classList.remove('active');
                }, sublinks.length * 30 + 100);
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navbar scroll effect with blur enhancement
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class for enhanced blur
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Auto-hide navbar on scroll down
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.opacity = '0';
        } else {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
        }

        lastScrollTop = scrollTop;
    });

    // Enhanced dropdown hover effects
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        let hoverTimeout;
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = menu.querySelectorAll('.dropdown-item');

        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);

            // Fade in dropdown menu
            menu.style.display = 'block';
            setTimeout(() => {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateX(-50%) translateY(0) scale(1)';
            }, 10);

            // Stagger fade in dropdown items
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        });

        dropdown.addEventListener('mouseleave', function() {
            // Fade out dropdown items
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                }, index * 20);
            });

            hoverTimeout = setTimeout(() => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateX(-50%) translateY(-10px) scale(0.95)';
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 300);
            }, 200);
        });
    });

    // Parallax effect for demo background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const background = document.querySelector('.demo-background');
        const rate = scrolled * -0.5;
        background.style.transform = `translateY(${rate}px)`;
    });

    // Initialize all animations
    initFadeAnimations();

    // Fade in navigation elements on load
    setTimeout(() => {
        fadeInNavElements();
    }, 100);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Trigger content fade-in
        setTimeout(() => {
            const contentElements = document.querySelectorAll('.main-content .fade-element');
            contentElements.forEach(element => {
                element.classList.add('fade-in');
            });
        }, 500);
    });
});