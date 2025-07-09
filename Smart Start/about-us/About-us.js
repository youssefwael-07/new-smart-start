// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger")
    const mobileMenu = document.getElementById("mobileMenu")
    const navbar = document.getElementById("navbar")
    const mobileDropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle")

    // Ensure navbar is always visible
    function ensureNavbarVisibility() {
        navbar.style.display = "block"
        navbar.style.visibility = "visible"
        navbar.style.opacity = "1"
        navbar.style.transform = "translateY(0)"
    }

    // Call on load and resize
    ensureNavbarVisibility()
    window.addEventListener("resize", ensureNavbarVisibility)

    // Mobile menu toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation()
            hamburger.classList.toggle("active")
            mobileMenu.classList.toggle("active")

            // Prevent body scroll when mobile menu is open
            if (mobileMenu.classList.contains("active")) {
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = "auto"
            }
        })
    }

    // Mobile dropdown toggles
    mobileDropdownToggles.forEach((toggle) => {
        toggle.addEventListener("click", function(e) {
            e.preventDefault()
            e.stopPropagation()

            const submenu = this.nextElementSibling
            const isActive = this.classList.contains("active")

            // Close all other dropdowns
            mobileDropdownToggles.forEach((otherToggle) => {
                if (otherToggle !== toggle) {
                    otherToggle.classList.remove("active")
                    const otherSubmenu = otherToggle.nextElementSibling
                    if (otherSubmenu) {
                        otherSubmenu.classList.remove("active")
                    }
                }
            })

            // Toggle current dropdown
            if (!isActive) {
                this.classList.add("active")
                if (submenu) {
                    submenu.classList.add("active")
                }
            } else {
                this.classList.remove("active")
                if (submenu) {
                    submenu.classList.remove("active")
                }
            }
        })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (mobileMenu && mobileMenu.classList.contains("active")) {
            if (!navbar.contains(e.target)) {
                hamburger.classList.remove("active")
                mobileMenu.classList.remove("active")
                document.body.style.overflow = "auto"
            }
        }
    })

    // Close mobile menu when window is resized to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove("active")
            if (mobileMenu) mobileMenu.classList.remove("active")
            document.body.style.overflow = "auto"

            // Close all mobile dropdowns
            mobileDropdownToggles.forEach((toggle) => {
                toggle.classList.remove("active")
                const submenu = toggle.nextElementSibling
                if (submenu) {
                    submenu.classList.remove("active")
                }
            })
        }
    })

    // Navbar scroll effect
    let lastScrollTop = 0
    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add("scrolled")
        } else {
            navbar.classList.remove("scrolled")
        }

        // Always keep navbar visible (remove any hide-on-scroll behavior)
        navbar.style.transform = "translateY(0)"
        navbar.style.opacity = "1"

        lastScrollTop = scrollTop
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

    // Intersection Observer for animations
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll(".feature-card, .team-member, .mv-card, .stat")
    animateElements.forEach((el) => {
        el.classList.add("fade-in")
        observer.observe(el)
    })

    // Counter animation for stats
    function animateCounters() {
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

    // Ensure all navigation elements are properly initialized
    function initializeNavigation() {
        // Make sure navbar is visible
        if (navbar) {
            navbar.style.display = "block"
            navbar.style.position = "fixed"
            navbar.style.top = "0"
            navbar.style.left = "0"
            navbar.style.width = "100%"
            navbar.style.zIndex = "9999"
        }

        // Initialize mobile menu state
        if (mobileMenu) {
            mobileMenu.classList.remove("active")
        }

        if (hamburger) {
            hamburger.classList.remove("active")
        }

        // Reset body overflow
        document.body.style.overflow = "auto"
    }

    // Initialize navigation on load
    initializeNavigation()

    // Re-initialize on window load (in case of any conflicts)
    window.addEventListener("load", initializeNavigation)

    console.log("Navigation initialized successfully!")
})