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
`) // ===== MAIN WEBSITE CLASS =====
class SmartStartWebsite {
    constructor() {
        this.init()
    }

    init() {
        this.setupEventListeners()
        this.setupIntersectionObserver()
        this.setupFormValidation()
        this.setupSmoothScrolling()
        this.setupStatsAnimation()
        this.setupNavbarScroll()
    }

    setupEventListeners() {
        const contactForm = document.getElementById("contact-form")
        if (contactForm) {
            contactForm.addEventListener("submit", this.handleContactForm.bind(this))
        }

        const newsletterForm = document.getElementById("newsletter-form")
        if (newsletterForm) {
            newsletterForm.addEventListener("submit", this.handleNewsletterForm.bind(this))
        }

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", this.handleSmoothScroll.bind(this))
        })

        document.addEventListener("keydown", this.handleKeyboardNavigation.bind(this))
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-up")
                    this.updateActiveNavLink(entry.target.id)
                }
            })
        }, observerOptions)

        document.querySelectorAll("section[id]").forEach((section) => {
            observer.observe(section)
        })
    }

    updateActiveNavLink(sectionId) {
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active")
        })

        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
        if (activeLink) {
            activeLink.classList.add("active")
        }
    }

    setupFormValidation() {
        const forms = document.querySelectorAll("form")
        forms.forEach((form) => {
            const inputs = form.querySelectorAll("input, textarea, select")
            inputs.forEach((input) => {
                input.addEventListener("blur", () => this.validateField(input))
                input.addEventListener("input", () => this.clearFieldError(input))
            })
        })
    }

    validateField(field) {
        const value = field.value.trim()
        const fieldName = field.name
        let isValid = true
        let errorMessage = ""

        this.clearFieldError(field)

        if (field.hasAttribute("required") && !value) {
            isValid = false
            errorMessage = `${this.getFieldLabel(fieldName)} is required`
        }

        if (field.type === "email" && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(value)) {
                isValid = false
                errorMessage = "Please enter a valid email address"
            }
        }

        if (field.type === "tel" && value) {
            const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
            if (!phoneRegex.test(value.replace(/[\s\-()]/g, ""))) {
                isValid = false
                errorMessage = "Please enter a valid phone number"
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage)
        }

        return isValid
    }

    showFieldError(field, message) {
        const formGroup = field.closest(".form-group")
        const errorElement = formGroup.querySelector(".error-message")

        formGroup.classList.add("error")
        if (errorElement) {
            errorElement.textContent = message
        }

        field.setAttribute("aria-invalid", "true")
        field.setAttribute("aria-describedby", `${field.id}-error`)
    }

    clearFieldError(field) {
        const formGroup = field.closest(".form-group")
        const errorElement = formGroup.querySelector(".error-message")

        formGroup.classList.remove("error")
        if (errorElement) {
            errorElement.textContent = ""
        }

        field.removeAttribute("aria-invalid")
        field.removeAttribute("aria-describedby")
    }

    getFieldLabel(fieldName) {
        const labels = {
            name: "Name",
            email: "Email",
            phone: "Phone",
            service: "Service",
            message: "Message",
        }
        return labels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    }

    async handleContactForm(e) {
        e.preventDefault()

        const form = e.target
        const submitButton = form.querySelector('button[type="submit"]')
        const buttonText = submitButton.querySelector(".btn-text")
        const buttonLoading = submitButton.querySelector(".btn-loading")

        const inputs = form.querySelectorAll("input, textarea, select")
        let isFormValid = true

        inputs.forEach((input) => {
            if (!this.validateField(input)) {
                isFormValid = false
            }
        })

        if (!isFormValid) {
            this.showNotification("Please correct the errors above", "error")
            return
        }

        submitButton.disabled = true
        buttonText.style.display = "none"
        buttonLoading.style.display = "inline"

        try {
            await this.simulateAPICall(2000)
            this.showNotification("Message sent successfully! We'll get back to you soon.", "success")
            form.reset()
        } catch (error) {
            this.showNotification("Failed to send message. Please try again.", "error")
        } finally {
            submitButton.disabled = false
            buttonText.style.display = "inline"
            buttonLoading.style.display = "none"
        }
    }

    async handleNewsletterForm(e) {
        e.preventDefault()

        const form = e.target
        const emailInput = form.querySelector('input[type="email"]')
        const submitButton = form.querySelector('button[type="submit"]')

        if (!this.validateField(emailInput)) {
            return
        }

        const originalText = submitButton.textContent
        submitButton.textContent = "Subscribing..."
        submitButton.disabled = true

        try {
            await this.simulateAPICall(1500)
            this.showNotification("Successfully subscribed to newsletter!", "success")
            form.reset()
        } catch (error) {
            this.showNotification("Failed to subscribe. Please try again.", "error")
        } finally {
            submitButton.textContent = originalText
            submitButton.disabled = false
        }
    }

    simulateAPICall(delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve()
                } else {
                    reject(new Error("API Error"))
                }
            }, delay)
        })
    }

    showNotification(message, type = "info") {
        const existingNotifications = document.querySelectorAll(".notification")
        existingNotifications.forEach((notification) => notification.remove())

        const notification = document.createElement("div")
        notification.className = `notification notification-${type}`
        notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
      </div>
    `

        notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "var(--success)" : type === "error" ? "var(--error)" : "var(--accent)"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform var(--transition-normal);
      max-width: 400px;
    `

        document.body.appendChild(notification)

        setTimeout(() => {
            notification.style.transform = "translateX(0)"
        }, 100)

        setTimeout(() => {
            this.removeNotification(notification)
        }, 5000)

        const closeButton = notification.querySelector(".notification-close")
        closeButton.addEventListener("click", () => {
            this.removeNotification(notification)
        })
    }

    removeNotification(notification) {
        notification.style.transform = "translateX(100%)"
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification)
            }
        }, 300)
    }

    setupSmoothScrolling() {
        if (!("scrollBehavior" in document.documentElement.style)) {
            this.polyfillSmoothScrolling()
        }
    }

    handleSmoothScroll(e) {
        e.preventDefault()
        const targetId = e.currentTarget.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
            const navbarHeight = document.querySelector(".navbar").offsetHeight
            const targetPosition = targetSection.offsetTop - navbarHeight - 20

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            })
        }
    }

    setupStatsAnimation() {
        const statsNumbers = document.querySelectorAll(".stat-number")

        const animateStats = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = Number.parseInt(entry.target.dataset.target)
                    this.animateNumber(entry.target, target)
                    observer.unobserve(entry.target)
                }
            })
        }

        const statsObserver = new IntersectionObserver(animateStats, {
            threshold: 0.5,
        })

        statsNumbers.forEach((stat) => {
            statsObserver.observe(stat)
        })
    }

    animateNumber(element, target) {
        let current = 0
        const increment = target / 50
        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                current = target
                clearInterval(timer)
            }
            element.textContent = Math.floor(current)
        }, 40)
    }

    setupNavbarScroll() {
        const navbar = document.querySelector(".navbar")
        const progressBar = document.getElementById("nav-progress")

        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > 50) {
                navbar.classList.add("scrolled")
            } else {
                navbar.classList.remove("scrolled")
            }

            const scrollProgress = (currentScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            if (progressBar) {
                progressBar.style.width = `${Math.min(scrollProgress, 100)}%`
            }
        })
    }

    handleKeyboardNavigation(e) {
        if (e.key === "Escape") {
            const openDropdowns = document.querySelectorAll('.dropdown[aria-hidden="false"]')
            openDropdowns.forEach((dropdown) => {
                dropdown.setAttribute("aria-hidden", "true")
                const trigger = dropdown.previousElementSibling
                if (trigger) {
                    trigger.setAttribute("aria-expanded", "false")
                    trigger.focus()
                }
            })
        }

        if (e.key === "Tab") {
            const activeDropdown = document.querySelector('.dropdown[aria-hidden="false"]')
            if (activeDropdown) {
                const focusableElements = activeDropdown.querySelectorAll("a, button, input, select, textarea")
                const firstElement = focusableElements[0]
                const lastElement = focusableElements[focusableElements.length - 1]

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault()
                    lastElement.focus()
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement.focus()
                }
            }
        }
    }

    polyfillSmoothScrolling() {
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2
            if (t < 1) return (c / 2) * t * t + b
            t--
            return (-c / 2) * (t * (t - 2) - 1) + b
        }

        const smoothScrollTo = (to, duration) => {
            const start = window.pageYOffset
            const change = to - start
            const startTime = performance.now()

            const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime
                const newPosition = easeInOutQuad(elapsed, start, change, duration)

                window.scrollTo(0, newPosition)

                if (elapsed < duration) {
                    requestAnimationFrame(animateScroll)
                }
            }

            requestAnimationFrame(animateScroll)
        }

        window.scrollTo = (x, y) => {
            if (typeof x === "object" && x.behavior === "smooth") {
                smoothScrollTo(x.top, 500)
            } else {
                window.scroll(x, y)
            }
        }
    }
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
    // Initialize loading screen
    const fastLoader = new FastPremiumLoadingScreen({
        duration: 3000,
        onComplete: () => {
            console.log("⚡ Fast premium loading complete!")
        },
    })

    // Skip loading on repeat visits
    if (sessionStorage.getItem("hasVisited")) {
        fastLoader.skipToEnd()
    } else {
        sessionStorage.setItem("hasVisited", "true")
    }

    // Initialize navigation
    new Navigation()

    // Initialize main website functionality
    new SmartStartWebsite()
})

// ===== PERFORMANCE MONITORING =====
if ("performance" in window) {
    window.addEventListener("load", () => {
        const perfData = performance.getEntriesByType("navigation")[0]
        console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`)
    })
}

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error)
})

window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason)
    e.preventDefault()
})

// ===== EXPORT FOR EXTERNAL USE =====
if (typeof module !== "undefined" && module.exports) {
    module.exports = { FastPremiumLoadingScreen, Navigation, SmartStartWebsite }
}