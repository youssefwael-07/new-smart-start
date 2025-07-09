// Enhanced SmartStart Website JavaScript with Debug
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 SmartStart JavaScript loaded successfully")

  // DOM Elements
  const hamburger = document.getElementById("hamburger")
  const mobileMenu = document.getElementById("mobileMenu")
  const navbar = document.getElementById("navbar")

  // Auth buttons
  const loginBtns = document.querySelectorAll("#loginBtn, #mobileLoginBtn, #heroLoginBtn")
  const signupBtns = document.querySelectorAll("#signupBtn, #mobileSignupBtn, #heroSignupBtn, #ctaSignupBtn")

  // Modals
  const loginModal = document.getElementById("loginModal")
  const signupModal = document.getElementById("signupModal")
  const closeLoginModal = document.getElementById("closeLoginModal")
  const closeSignupModal = document.getElementById("closeSignupModal")

  // Modal switches
  const switchToSignup = document.getElementById("switchToSignup")
  const switchToLogin = document.getElementById("switchToLogin")

  // Forms
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")
  const userTypeSelect = document.getElementById("userType")
  const studentFields = document.getElementById("studentFields")
  const mentorFields = document.getElementById("mentorFields")

  // Interactive elements
  const demoTabs = document.querySelectorAll(".demo-tab")
  const demoPanels = document.querySelectorAll(".demo-panel")
  const pricingToggle = document.getElementById("pricingToggle")

  // Password toggles
  const toggleLoginPassword = document.getElementById("toggleLoginPassword")
  const toggleSignupPassword = document.getElementById("toggleSignupPassword")

  // Debug function
  function debugLog(message, data = null) {
    console.log(`🔍 DEBUG: ${message}`, data || "")
  }

  // Initialize everything
  function initialize() {
    debugLog("Initializing SmartStart...")
    setupNavigation()
    setupModals()
    setupForms()
    setupInteractiveElements()
    setupAnimations()
    setupPasswordToggles()
    initializeScrollAnimations()
    initializeSmoothScroll()
    initializeScrollEffects()
    createParticles()

    // Start animations after setup
    setTimeout(initializeAnimations, 200)
    debugLog("SmartStart initialized successfully")
  }

  // Navigation Setup
  function setupNavigation() {
    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        mobileMenu.classList.toggle("active")
        document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto"
      })
    }

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll(".mobile-link")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (hamburger) hamburger.classList.remove("active")
        if (mobileMenu) mobileMenu.classList.remove("active")
        document.body.style.overflow = "auto"
      })
    })
  }

  // Modal Setup
  function setupModals() {
    debugLog("Setting up modals...")

    // Login modal
    loginBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        debugLog("Login button clicked")
        if (loginModal) {
          loginModal.classList.add("active")
          document.body.style.overflow = "hidden"
        }
      })
    })

    // Signup modal
    signupBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        debugLog("Signup button clicked")
        if (signupModal) {
          signupModal.classList.add("active")
          document.body.style.overflow = "hidden"
        }
      })
    })

    // Close modals
    if (closeLoginModal) {
      closeLoginModal.addEventListener("click", () => {
        loginModal.classList.remove("active")
        document.body.style.overflow = "auto"
      })
    }

    if (closeSignupModal) {
      closeSignupModal.addEventListener("click", () => {
        signupModal.classList.remove("active")
        document.body.style.overflow = "auto"
      })
    }
    // Close modals when clicking overlay
    ;[loginModal, signupModal].forEach((modal) => {
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal || e.target.classList.contains("modal-overlay")) {
            modal.classList.remove("active")
            document.body.style.overflow = "auto"
          }
        })
      }
    })

    // Switch between modals
    if (switchToSignup) {
      switchToSignup.addEventListener("click", (e) => {
        e.preventDefault()
        if (loginModal) loginModal.classList.remove("active")
        if (signupModal) signupModal.classList.add("active")
      })
    }

    if (switchToLogin) {
      switchToLogin.addEventListener("click", (e) => {
        e.preventDefault()
        if (signupModal) signupModal.classList.remove("active")
        if (loginModal) loginModal.classList.add("active")
      })
    }
  }

  // Form Setup
  function setupForms() {
    debugLog("Setting up forms...")

    // User type conditional fields
    if (userTypeSelect && studentFields && mentorFields) {
      userTypeSelect.addEventListener("change", () => {
        const value = userTypeSelect.value
        debugLog("User type changed to:", value)
        studentFields.classList.toggle("active", value === "student")
        mentorFields.classList.toggle("active", value === "mentor")
      })
    }

    // Login form submission
    if (loginForm) {
      loginForm.addEventListener("submit", handleLoginSubmit)
      debugLog("Login form event listener added")
    }

    // Signup form submission
    if (signupForm) {
      signupForm.addEventListener("submit", handleSignupSubmit)
      debugLog("Signup form event listener added")
    }

    // Real-time form validation
    setupFormValidation()
  }

  // Enhanced form validation
  function setupFormValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]')
    const passwordInputs = document.querySelectorAll('input[type="password"]')

    emailInputs.forEach((input) => {
      input.addEventListener("blur", validateEmail)
      input.addEventListener("input", clearValidation)
    })

    passwordInputs.forEach((input) => {
      input.addEventListener("input", validatePassword)
    })
  }

  function validateEmail(e) {
    const input = e.target
    const feedback = input.parentNode.querySelector(".input-feedback")
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)

    if (input.value && !isValid) {
      input.style.borderColor = "var(--error)"
      if (feedback) {
        feedback.textContent = "Please enter a valid email address"
        feedback.className = "input-feedback error"
      }
    } else if (input.value && isValid) {
      input.style.borderColor = "var(--success)"
      if (feedback) {
        feedback.textContent = "Email looks good!"
        feedback.className = "input-feedback success"
      }
    }
  }

  function validatePassword(e) {
    const input = e.target
    const feedback = input.parentNode.parentNode.querySelector(".input-feedback")
    const strengthBar = input.parentNode.parentNode.querySelector(".strength-fill")
    const strengthText = input.parentNode.parentNode.querySelector(".strength-text")
    const password = input.value

    if (!password) {
      clearPasswordValidation(input)
      return
    }

    const strength = calculatePasswordStrength(password)

    if (strengthBar && strengthText) {
      strengthBar.style.width = `${strength.percentage}%`
      strengthBar.style.background = strength.color
      strengthText.textContent = strength.text
    }

    if (feedback) {
      if (password.length < 6) {
        feedback.textContent = "Password must be at least 6 characters"
        feedback.className = "input-feedback error"
        input.style.borderColor = "var(--error)"
      } else if (strength.score >= 3) {
        feedback.textContent = "Strong password!"
        feedback.className = "input-feedback success"
        input.style.borderColor = "var(--success)"
      } else {
        feedback.textContent = "Consider adding numbers, symbols, or mixed case"
        feedback.className = "input-feedback"
        input.style.borderColor = "var(--warning)"
      }
    }
  }

  function calculatePasswordStrength(password) {
    let score = 0

    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    const strengths = [
      { text: "Very Weak", color: "var(--error)", percentage: 20 },
      { text: "Weak", color: "var(--error)", percentage: 40 },
      { text: "Fair", color: "var(--warning)", percentage: 60 },
      { text: "Good", color: "var(--primary)", percentage: 80 },
      { text: "Strong", color: "var(--success)", percentage: 100 },
    ]

    return { ...(strengths[score] || strengths[0]), score }
  }

  function clearValidation(e) {
    const input = e.target
    const feedback = input.parentNode.querySelector(".input-feedback")
    input.style.borderColor = ""
    if (feedback) {
      feedback.textContent = ""
      feedback.className = "input-feedback"
    }
  }

  function clearPasswordValidation(input) {
    const feedback = input.parentNode.parentNode.querySelector(".input-feedback")
    const strengthBar = input.parentNode.parentNode.querySelector(".strength-fill")
    const strengthText = input.parentNode.parentNode.querySelector(".strength-text")

    input.style.borderColor = ""
    if (feedback) {
      feedback.textContent = ""
      feedback.className = "input-feedback"
    }
    if (strengthBar) strengthBar.style.width = "0%"
    if (strengthText) strengthText.textContent = "Password strength"
  }

  // Password toggle functionality
  function setupPasswordToggles() {
    ;[toggleLoginPassword, toggleSignupPassword].forEach((toggle) => {
      if (toggle) {
        toggle.addEventListener("click", (e) => {
          e.preventDefault()
          const input = toggle.parentNode.querySelector('input[type="password"], input[type="text"]')
          const icon = toggle.querySelector("i")

          if (input.type === "password") {
            input.type = "text"
            icon.className = "fas fa-eye-slash"
          } else {
            input.type = "password"
            icon.className = "fas fa-eye"
          }
        })
      }
    })
  }

  // Form submission handlers
  async function handleLoginSubmit(e) {
    e.preventDefault()
    debugLog("Login form submitted")

    const submitBtn = e.target.querySelector('button[type="submit"]')
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    debugLog("Login data:", { email, password: "***" })

    if (!email || !password) {
      showNotification("Please fill in all fields", "error")
      return
    }

    setButtonLoading(submitBtn, true)

    try {
      // Create form data for login
      const formData = new FormData()
      formData.append("loginEmail", email)
      formData.append("loginPassword", password)

      debugLog("Sending login request to login.php")

      const response = await fetch("login.php", {
        method: "POST",
        body: formData,
      })

      debugLog("Login response status:", response.status)

      const result = await response.text()
      debugLog("Login response text:", result)

      if (result.trim() === "success") {
        setButtonSuccess(submitBtn)
        setTimeout(() => {
          showNotification(`Welcome back! Login successful.`, "success")
          loginModal.classList.remove("active")
          document.body.style.overflow = "auto"
          loginForm.reset()
          resetButton(submitBtn, '<span class="btn-text">Log In</span><i class="fas fa-sign-in-alt btn-icon"></i>')
        }, 1000)
      } else {
        throw new Error(result)
      }
    } catch (error) {
      debugLog("Login error:", error)
      showNotification("Login failed: " + error.message, "error")
      setButtonError(submitBtn)
      setTimeout(() => {
        resetButton(submitBtn, '<span class="btn-text">Log In</span><i class="fas fa-sign-in-alt btn-icon"></i>')
      }, 2000)
    }
  }

  async function handleSignupSubmit(e) {
    e.preventDefault()
    debugLog("Signup form submitted")

    const submitBtn = e.target.querySelector('button[type="submit"]')
    const name = document.getElementById("signupName").value
    const email = document.getElementById("signupEmail").value
    const password = document.getElementById("signupPassword").value
    const userType = document.getElementById("userType").value
    const agreeTerms = document.getElementById("agreeTerms").checked

    debugLog("Signup data:", { name, email, userType, agreeTerms, password: "***" })

    // Validation
    if (!name || !email || !password || !userType) {
      showNotification("Please fill in all required fields", "error")
      debugLog("Validation failed: missing required fields")
      return
    }

    if (!agreeTerms) {
      showNotification("Please agree to the Terms of Service", "error")
      debugLog("Validation failed: terms not agreed")
      return
    }

    if (password.length < 6) {
      showNotification("Password must be at least 6 characters long", "error")
      debugLog("Validation failed: password too short")
      return
    }

    setButtonLoading(submitBtn, true)

    try {
      // Create FormData from the form
      const formData = new FormData(signupForm)

      debugLog("FormData contents:")
      for (const [key, value] of formData.entries()) {
        debugLog(`${key}: ${key.includes("password") ? "***" : value}`)
      }

      debugLog("Sending signup request to signup.php")

      // Send actual request to signup.php
      const response = await fetch("signup.php", {
        method: "POST",
        body: formData,
      })

      debugLog("Signup response status:", response.status)
      debugLog("Signup response headers:", response.headers)

      const result = await response.text()
      debugLog("Signup response text:", result)

      if (result.trim() === "success") {
        setButtonSuccess(submitBtn)
        setTimeout(() => {
          showNotification(
            `Welcome to SmartStart, ${name}! Your ${userType} account has been created successfully.`,
            "success",
          )
          signupModal.classList.remove("active")
          document.body.style.overflow = "auto"
          signupForm.reset()
          resetButton(
            submitBtn,
            '<span class="btn-text">Create Account</span><i class="fas fa-user-plus btn-icon"></i>',
          )

          // Reset conditional fields
          if (studentFields) studentFields.classList.remove("active")
          if (mentorFields) mentorFields.classList.remove("active")
        }, 1000)
      } else {
        throw new Error(result)
      }
    } catch (error) {
      debugLog("Signup error:", error)
      showNotification("Registration failed: " + error.message, "error")
      setButtonError(submitBtn)
      setTimeout(() => {
        resetButton(submitBtn, '<span class="btn-text">Create Account</span><i class="fas fa-user-plus btn-icon"></i>')
      }, 2000)
    }
  }

  // Button state management
  function setButtonLoading(button, loading) {
    if (loading) {
      button.classList.add("loading")
      button.disabled = true
    } else {
      button.classList.remove("loading")
      button.disabled = false
    }
  }

  function setButtonSuccess(button) {
    button.classList.remove("loading")
    button.innerHTML = '<span class="btn-text">Success!</span><i class="fas fa-check btn-icon"></i>'
    button.style.background = "var(--success)"
  }

  function setButtonError(button) {
    button.classList.remove("loading")
    button.innerHTML = '<span class="btn-text">Error</span><i class="fas fa-times btn-icon"></i>'
    button.style.background = "var(--error)"
  }

  function resetButton(button, originalHTML) {
    button.innerHTML = originalHTML
    button.style.background = ""
    button.disabled = false
    button.classList.remove("loading")
  }

  // Interactive Elements Setup
  function setupInteractiveElements() {
    // Demo tabs
    demoTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetTab = tab.dataset.tab

        demoTabs.forEach((t) => t.classList.remove("active"))
        demoPanels.forEach((p) => p.classList.remove("active"))

        tab.classList.add("active")
        document.getElementById(targetTab).classList.add("active")

        animateDemoContent()
      })
    })

    // Pricing toggle
    if (pricingToggle) {
      let isAnnual = false

      pricingToggle.addEventListener("click", () => {
        isAnnual = !isAnnual
        pricingToggle.classList.toggle("active", isAnnual)

        const amounts = document.querySelectorAll(".amount")
        amounts.forEach((amount) => {
          const monthly = Number.parseInt(amount.dataset.monthly)
          const annual = Number.parseInt(amount.dataset.annual)

          if (monthly && annual) {
            const targetValue = isAnnual ? annual : monthly
            animateCounter(amount, targetValue, 500)
          }
        })
      })
    }
  }

  // Animation Setup
  function setupAnimations() {
    initializeScrollAnimations()
    initializeSmoothScroll()
    initializeScrollEffects()
  }

  function initializeAnimations() {
    const heroElements = document.querySelectorAll(".animate-fade-up")
    heroElements.forEach((element, index) => {
      const delay = element.dataset.delay || index * 200
      setTimeout(() => {
        element.classList.add("visible")
      }, delay)
    })

    initializeCounters()
  }

  function initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number.parseInt(entry.target.dataset.delay) || 0
          setTimeout(() => {
            entry.target.classList.add("visible")

            if (entry.target.classList.contains("feature-card")) {
              animateFeatureCard(entry.target)
            }

            if (entry.target.querySelector(".stat-number")) {
              animateCounters(entry.target)
            }
          }, delay)

          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    document.querySelectorAll(".animate-on-scroll, .animate-fade-up").forEach((element) => {
      observer.observe(element)
    })
  }

  function initializeCounters() {
    const counters = document.querySelectorAll(".stat-number, .widget-number, .animate-counter")
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.dataset.count) || Number.parseInt(counter.textContent)
      animateCounter(counter, target)
    })
  }

  function animateCounter(element, target, duration = 2000) {
    const start = 0
    const startTime = performance.now()

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const current = Math.floor(start + (target - start) * progress)
      element.textContent = current.toLocaleString()

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target.toLocaleString()
      }
    }

    requestAnimationFrame(updateCounter)
  }

  function animateCounters(container) {
    const counters = container.querySelectorAll(".stat-number, .widget-number, .animate-counter")
    counters.forEach((counter, index) => {
      setTimeout(() => {
        const target = Number.parseInt(counter.dataset.count) || Number.parseInt(counter.textContent)
        animateCounter(counter, target)
      }, index * 200)
    })
  }

  function animateFeatureCard(card) {
    const progressBar = card.querySelector(".progress-bar")
    if (progressBar) {
      const progress = progressBar.dataset.progress
      if (progress) {
        setTimeout(() => {
          progressBar.style.setProperty("--progress-width", progress + "%")
        }, 300)
      }
    }

    const icon = card.querySelector(".feature-icon")
    if (icon) {
      icon.style.transform = "scale(1.1)"
      setTimeout(() => {
        icon.style.transform = "scale(1)"
      }, 300)
    }
  }

  function animateDemoContent() {
    const activePanel = document.querySelector(".demo-panel.active")
    if (!activePanel) return

    // Animate widgets
    const widgets = activePanel.querySelectorAll(".widget")
    widgets.forEach((widget, index) => {
      widget.style.opacity = "0"
      widget.style.transform = "translateY(20px)"
      setTimeout(() => {
        widget.style.transition = "all 0.5s ease"
        widget.style.opacity = "1"
        widget.style.transform = "translateY(0)"
      }, index * 100)
    })

    // Animate course cards
    const courseCards = activePanel.querySelectorAll(".course-card")
    courseCards.forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "translateX(-20px)"
      setTimeout(() => {
        card.style.transition = "all 0.5s ease"
        card.style.opacity = "1"
        card.style.transform = "translateX(0)"
      }, index * 150)
    })

    // Animate mentor cards
    const mentorCards = activePanel.querySelectorAll(".mentor-card")
    mentorCards.forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "scale(0.9)"
      setTimeout(() => {
        card.style.transition = "all 0.5s ease"
        card.style.opacity = "1"
        card.style.transform = "scale(1)"
      }, index * 200)
    })
  }

  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          const offsetTop = target.offsetTop - 100
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }

  function initializeScrollEffects() {
    let ticking = false

    function updateScrollEffects() {
      const scrolled = window.pageYOffset

      // Navbar effects
      if (scrolled > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }

      // Parallax effects
      const parallaxElements = document.querySelectorAll(".shape")
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.2
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
      })

      ticking = false
    }

    function requestScrollUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects)
        ticking = true
      }
    }

    window.addEventListener("scroll", requestScrollUpdate)
  }

  function createParticles() {
    const particleContainer = document.querySelector(".floating-particles")
    if (!particleContainer) return

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary);
                border-radius: 50%;
                opacity: 0.6;
                animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `
      particleContainer.appendChild(particle)
    }
  }

  // Notification system
  function showNotification(message, type = "info") {
    debugLog("Showing notification:", { message, type })

    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
                <span>${message}</span>
            </div>
        `

    // Add notification styles if not already present
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style")
      style.id = "notification-styles"
      style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--card);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 1rem 1.5rem;
                    z-index: 3000;
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                .notification.success { border-left: 4px solid var(--success); }
                .notification.error { border-left: 4px solid var(--error); }
                .notification.info { border-left: 4px solid var(--primary); }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--foreground);
                }
                .notification.success i { color: var(--success); }
                .notification.error i { color: var(--error); }
                .notification.info i { color: var(--primary); }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `
      document.head.appendChild(style)
    }

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 4000)
  }

  // Add particle animation keyframes
  const style = document.createElement("style")
  style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (loginModal && loginModal.classList.contains("active")) {
        loginModal.classList.remove("active")
        document.body.style.overflow = "auto"
      }
      if (signupModal && signupModal.classList.contains("active")) {
        signupModal.classList.remove("active")
        document.body.style.overflow = "auto"
      }
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        hamburger.classList.remove("active")
        mobileMenu.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    }
  })

  // Window resize handler
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      if (hamburger) hamburger.classList.remove("active")
      if (mobileMenu) mobileMenu.classList.remove("active")
      document.body.style.overflow = "auto"
    }
  })

  // Initialize everything
  initialize()

  // Console welcome message
  console.log(`
🎓 SmartStart Enhanced Website
✨ Fully organized and enhanced
🎨 Beautiful login/signup modals
📱 Responsive design
🚀 Smooth animations
💫 Interactive elements
🔍 Debug mode enabled
    `)
})
