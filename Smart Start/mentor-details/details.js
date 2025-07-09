// Enhanced navigation functionality with improved positioning
document.addEventListener("DOMContentLoaded", () => {
        const hamburger = document.querySelector("#hamburger")
        const mobileMenu = document.querySelector("#mobileMenu")
        const mobileLinks = document.querySelectorAll(".mobile-link")
        const navbar = document.querySelector("#navbar")
        const fadeElements = document.querySelectorAll(".fade-element")

        // Initialize fade-in animations
        function initFadeAnimations() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const delay = entry.target.dataset.delay || 0
                            setTimeout(() => {
                                entry.target.classList.add("fade-in")
                            }, delay)
                            observer.unobserve(entry.target)
                        }
                    })
                }, {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px",
                },
            )

            fadeElements.forEach((element) => {
                observer.observe(element)
            })
        }

        // Staggered fade-in for navigation elements
        function fadeInNavElements() {
            const navElements = document.querySelectorAll(".nav-menu .fade-element")
            navElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add("fade-in")
                }, index * 100)
            })

            // Fade in logo and hamburger
            setTimeout(() => {
                document.querySelector(".nav-logo").classList.add("fade-in")
            }, 50)

            setTimeout(() => {
                const hamburgerElement = document.querySelector(".hamburger")
                if (hamburgerElement) {
                    hamburgerElement.classList.add("fade-in")
                }
            }, 600)
        }

        // Toggle mobile menu with enhanced animations
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active")
            mobileMenu.classList.toggle("active")
            document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto"

            // Animate mobile menu items
            if (mobileMenu.classList.contains("active")) {
                const menuItems = mobileMenu.querySelectorAll(".mobile-menu-item")
                menuItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`
                })
            }
        })

        // Handle mobile submenu toggles with fade effects
        mobileLinks.forEach((link) => {
            link.addEventListener("click", function(e) {
                e.preventDefault()

                const submenu = this.nextElementSibling
                const isActive = submenu.classList.contains("active")

                // Close all other submenus with fade out
                document.querySelectorAll(".mobile-submenu").forEach((menu) => {
                    if (menu !== submenu) {
                        menu.classList.remove("active")
                    }
                })
                document.querySelectorAll(".mobile-link").forEach((link) => {
                    if (link !== this) {
                        link.classList.remove("active")
                    }
                })

                // Toggle current submenu with fade animation
                if (!isActive) {
                    submenu.classList.add("active")
                    this.classList.add("active")

                    // Fade in submenu items
                    const sublinks = submenu.querySelectorAll(".mobile-sublink")
                    sublinks.forEach((sublink, index) => {
                        sublink.style.opacity = "0"
                        sublink.style.transform = "translateX(-10px)"
                        setTimeout(() => {
                            sublink.style.transition = "all 0.3s ease"
                            sublink.style.opacity = "1"
                            sublink.style.transform = "translateX(0)"
                        }, index * 50)
                    })
                } else {
                    // Fade out submenu items before closing
                    const sublinks = submenu.querySelectorAll(".mobile-sublink")
                    sublinks.forEach((sublink, index) => {
                        setTimeout(() => {
                            sublink.style.opacity = "0"
                            sublink.style.transform = "translateX(-10px)"
                        }, index * 30)
                    })

                    setTimeout(
                        () => {
                            submenu.classList.remove("active")
                            this.classList.remove("active")
                        },
                        sublinks.length * 30 + 100,
                    )
                }
            })
        })

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navbar.contains(e.target) && mobileMenu.classList.contains("active")) {
                hamburger.classList.remove("active")
                mobileMenu.classList.remove("active")
                document.body.style.overflow = "auto"
            }
        })

        // Handle window resize
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove("active")
                mobileMenu.classList.remove("active")
                document.body.style.overflow = "auto"
            }
        })

        // Enhanced navbar scroll effect with proper positioning
        let lastScrollTop = 0
        window.addEventListener("scroll", () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop

            // Add scrolled class for enhanced blur
            if (scrollTop > 50) {
                navbar.classList.add("scrolled")
            } else {
                navbar.classList.remove("scrolled")
            }

            // Keep navbar always visible at top (remove auto-hide for better UX)
            navbar.style.transform = "translateY(0)"
            navbar.style.opacity = "1"

            lastScrollTop = scrollTop
        })

        // Enhanced dropdown hover effects
        const dropdowns = document.querySelectorAll(".dropdown")

        dropdowns.forEach((dropdown) => {
            let hoverTimeout
            const menu = dropdown.querySelector(".dropdown-menu")
            const items = menu.querySelectorAll(".dropdown-item")

            dropdown.addEventListener("mouseenter", () => {
                clearTimeout(hoverTimeout)

                // Fade in dropdown menu
                menu.style.display = "block"
                setTimeout(() => {
                    menu.style.opacity = "1"
                    menu.style.visibility = "visible"
                    menu.style.transform = "translateX(-50%) translateY(0) scale(1)"
                }, 10)

                // Stagger fade in dropdown items
                items.forEach((item, index) => {
                    item.style.opacity = "0"
                    item.style.transform = "translateY(10px)"
                    setTimeout(() => {
                        item.style.transition = "all 0.3s ease"
                        item.style.opacity = "1"
                        item.style.transform = "translateY(0)"
                    }, index * 50)
                })
            })

            dropdown.addEventListener("mouseleave", () => {
                // Fade out dropdown items
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = "0"
                        item.style.transform = "translateY(-10px)"
                    }, index * 20)
                })

                hoverTimeout = setTimeout(() => {
                    menu.style.opacity = "0"
                    menu.style.visibility = "hidden"
                    menu.style.transform = "translateX(-50%) translateY(-10px) scale(0.95)"
                    setTimeout(() => {
                        menu.style.display = "none"
                    }, 300)
                }, 200)
            })
        })

        // Logo icon rotation on hover
        const logoIcon = document.querySelector(".logo-icon")
        if (logoIcon) {
            logoIcon.addEventListener("mouseenter", function() {
                this.style.transform = "rotate(360deg) scale(1.1)"
            })

            logoIcon.addEventListener("mouseleave", function() {
                this.style.transform = "rotate(0deg) scale(1)"
            })
        }

        // Initialize all animations
        initFadeAnimations()

        // Fade in navigation elements on load
        setTimeout(() => {
            fadeInNavElements()
        }, 100)

        // Add loading animation
        window.addEventListener("load", () => {
            document.body.classList.add("loaded")

            // Trigger content fade-in
            setTimeout(() => {
                const contentElements = document.querySelectorAll(".main-content .fade-element")
                contentElements.forEach((element) => {
                    element.classList.add("fade-in")
                })
            }, 500)
        })

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function(e) {
                e.preventDefault()
                const target = document.querySelector(this.getAttribute("href"))
                if (target) {
                    const offsetTop = target.offsetTop - 80 // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                    })
                }
            })
        })
    }) // Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
    })
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove("active")
            navMenu.classList.remove("active")
        }
    })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = "rgba(15, 23, 42, 0.98)"
            navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
        } else {
            navbar.style.background = "rgba(15, 23, 42, 0.95)"
            navbar.style.boxShadow = "none"
        }
    }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    })
})

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible")
        }
    })
}, observerOptions)

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll(".feature-card, .team-member, .mv-card, .stat")
animateElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
})

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll(".stat h4")

    counters.forEach((counter) => {
        const target = Number.parseInt(counter.textContent.replace(/[^\d]/g, ""))
        const increment = target / 100
        let current = 0

        const updateCounter = () => {
            if (current < target) {
                current += increment
                if (counter.textContent.includes("+")) {
                    counter.textContent = Math.ceil(current).toLocaleString() + "+"
                } else {
                    counter.textContent = Math.ceil(current).toLocaleString()
                }
                requestAnimationFrame(updateCounter)
            } else {
                if (counter.textContent.includes("+")) {
                    counter.textContent = target.toLocaleString() + "+"
                } else {
                    counter.textContent = target.toLocaleString()
                }
            }
        }

        updateCounter()
    })
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats")
if (statsSection) {
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounters()
                    statsObserver.unobserve(entry.target)
                }
            })
        }, { threshold: 0.5 },
    )

    statsObserver.observe(statsSection)
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-card")

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1
        element.style.transform = `translateY(${scrolled * speed}px)`
    })
})

// Button hover effects
document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0)"
    })
})

// Feature cards hover effect
document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0) scale(1)"
    })
})

// Team member cards interaction
document.querySelectorAll(".team-member").forEach((member) => {
    member.addEventListener("mouseenter", function() {
        const image = this.querySelector(".member-image")
        if (image) {
            image.style.transform = "scale(1.1) rotate(5deg)"
        }
    })

    member.addEventListener("mouseleave", function() {
        const image = this.querySelector(".member-image")
        if (image) {
            image.style.transform = "scale(1) rotate(0deg)"
        }
    })
})

// Form validation (if forms are added later)
const validateForm = (form) => {
    const inputs = form.querySelectorAll("input[required], textarea[required]")
    let isValid = true

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            input.classList.add("error")
            isValid = false
        } else {
            input.classList.remove("error")
        }
    })

    return isValid
}

// Scroll to top functionality
const createScrollToTop = () => {
    const scrollBtn = document.createElement("button")
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
    scrollBtn.className = "scroll-to-top"
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `

    document.body.appendChild(scrollBtn)

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = "1"
            scrollBtn.style.visibility = "visible"
        } else {
            scrollBtn.style.opacity = "0"
            scrollBtn.style.visibility = "hidden"
        }
    })

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    })
}





// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        // Re-animate elements when page becomes visible
        const animateElements = document.querySelectorAll(".feature-card, .team-member, .mv-card")
        animateElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transform = "translateY(-5px)"
                setTimeout(() => {
                    element.style.transform = "translateY(0)"
                }, 200)
            }, index * 50)
        })
    }
})

// Console welcome message
console.log(`
🎓 Welcome to Smart Start About Page!
🚀 Empowering students through smart mentorship
💡 Built with modern web technologies
📧 Contact us for more information
`)
    // ===== MAIN WEBSITE CLASS =====
class SmartStartWebsite {
    constructor() {
        this.init();
    }

    // Custom Alert System
    showAlert(type, title, message, duration = 5000) {
        const alertContainer = document.getElementById('alertContainer');

        const alertElement = document.createElement('div');
        alertElement.className = `custom-alert ${type}`;

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        alertElement.innerHTML = `
        <div class="alert-icon">
            <i class="${icons[type]}"></i>
        </div>
        <div class="alert-content">
            <div class="alert-title">${title}</div>
            <div class="alert-message">${message}</div>
        </div>
        <button class="alert-close" onclick="closeAlert(this)">
            <i class="fas fa-times"></i>
        </button>
        <div class="alert-progress"></div>
    `;

        alertContainer.appendChild(alertElement);

        // Auto remove after duration
        setTimeout(() => {
            this.removeAlert(alertElement);
        }, duration);

        return alertElement;
    }

    closeAlert(closeButton) {
        const alertElement = closeButton.closest('.custom-alert');
        this.removeAlert(alertElement);
    }

    removeAlert(alertElement) {
        if (alertElement && alertElement.parentNode) {
            alertElement.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (alertElement.parentNode) {
                    alertElement.parentNode.removeChild(alertElement);
                }
            }, 300);
        }
    }

    // Navigation functionality
    toggleMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    // Typing effect for profile title
    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Time slot selection
    selectTimeSlot(slot) {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
    }

    // Add ripple effect to buttons
    createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // You may want to move the rest of the code (event listeners, etc.) into an init() method or outside the class.
}
document.addEventListener("DOMContentLoaded", function() {
    let selectedSessionType = "free";
    let selectedTimeSlot = "";

    const sessionTypeInput = document.getElementById("sessionTypeInput");
    const timeSlotInput = document.getElementById("timeSlotInput");

    // افتراضي
    sessionTypeInput.value = "free";

    document.querySelectorAll(".session-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelectorAll(".session-option").forEach(o => o.classList.remove("active"));
            option.classList.add("active");
            selectedSessionType = option.dataset.type;
            sessionTypeInput.value = selectedSessionType;
        });
    });

    document.querySelectorAll(".time-slot").forEach(slot => {
        slot.addEventListener("click", () => {
            document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
            slot.classList.add("selected");
            selectedTimeSlot = slot.textContent.trim();
            timeSlotInput.value = selectedTimeSlot;
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const sessionTypeInput = document.getElementById("sessionTypeInput");
    const timeSlotInput = document.getElementById("timeSlotInput");

    // حدد النوع الافتراضي تلقائيًا
    sessionTypeInput.value = "free";

    // جلسات الحجز
    document.querySelectorAll(".session-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelectorAll(".session-option").forEach(o => o.classList.remove("active"));
            option.classList.add("active");

            // تحديد القيمة
            sessionTypeInput.value = option.getAttribute("data-type");
        });
    });

    // الوقت
    document.querySelectorAll(".time-slot").forEach(slot => {
        slot.addEventListener("click", () => {
            document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
            slot.classList.add("selected");

            // حفظ الوقت في الحقل المخفي
            timeSlotInput.value = slot.textContent.trim();
        });
    });

    // تحقق قبل الإرسال (اختياري لكن مفيد)
    document.getElementById("bookingForm").addEventListener("submit", function(e) {
        if (timeSlotInput.value === "") {
            e.preventDefault(); // منع الإرسال
            alert("Please select a time slot.");
        }
    });
});