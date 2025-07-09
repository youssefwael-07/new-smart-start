// Enhanced Interactive Profile Management System
import { gsap, ScrollTrigger, TextPlugin } from "gsap/all"

class InteractiveProfileManager {
    constructor() {
        this.sampleVideos = [{
                id: 1,
                title: "Advanced JavaScript Concepts",
                thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=320&h=180&fit=crop",
                duration: "15:30",
                channel: "CodeMaster",
                views: "125K",
                uploadDate: "2 days ago",
                liked: true,
                saved: false,
                watchLater: true,
            },
            {
                id: 2,
                title: "React Hooks Deep Dive",
                thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop",
                duration: "22:45",
                channel: "React Pro",
                views: "89K",
                uploadDate: "1 week ago",
                liked: false,
                saved: true,
                watchLater: false,
            },
            {
                id: 3,
                title: "CSS Grid Layout Tutorial",
                thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&h=180&fit=crop",
                duration: "18:20",
                channel: "WebDesign Hub",
                views: "67K",
                uploadDate: "3 days ago",
                liked: true,
                saved: true,
                watchLater: true,
            },
            {
                id: 4,
                title: "Node.js Best Practices",
                thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=320&h=180&fit=crop",
                duration: "28:15",
                channel: "Backend Guru",
                views: "156K",
                uploadDate: "5 days ago",
                liked: false,
                saved: false,
                watchLater: true,
            },
            {
                id: 5,
                title: "Database Design Fundamentals",
                thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=320&h=180&fit=crop",
                duration: "35:40",
                channel: "Data Expert",
                views: "203K",
                uploadDate: "1 week ago",
                liked: true,
                saved: true,
                watchLater: false,
            },
            {
                id: 6,
                title: "Python Machine Learning",
                thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=320&h=180&fit=crop",
                duration: "42:15",
                channel: "AI Academy",
                views: "234K",
                uploadDate: "3 days ago",
                liked: false,
                saved: true,
                watchLater: true,
            },
        ]

        this.sampleMentors = [{
                id: 1,
                name: "Sarah Johnson",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
                expertise: "Frontend Development",
                students: 1250,
                courses: 15,
                rating: 4.9,
                active: true,
                favorite: true,
            },
            {
                id: 2,
                name: "Michael Chen",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                expertise: "Backend Architecture",
                students: 890,
                courses: 12,
                rating: 4.8,
                active: true,
                favorite: false,
            },
            {
                id: 3,
                name: "Emily Rodriguez",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
                expertise: "UI/UX Design",
                students: 2100,
                courses: 20,
                rating: 4.9,
                active: false,
                favorite: true,
            },
            {
                id: 4,
                name: "David Kim",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
                expertise: "Data Science",
                students: 756,
                courses: 8,
                rating: 4.7,
                active: true,
                favorite: false,
            },
            {
                id: 5,
                name: "Lisa Wang",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
                expertise: "Mobile Development",
                students: 1456,
                courses: 18,
                rating: 4.8,
                active: true,
                favorite: true,
            },
        ]

        this.sampleActivities = [{
                id: 1,
                type: "video",
                title: "Completed JavaScript Fundamentals",
                time: "2 hours ago",
                icon: "play-circle",
            },
            {
                id: 2,
                type: "achievement",
                title: "Earned 'Quick Learner' badge",
                time: "5 hours ago",
                icon: "trophy",
            },
            {
                id: 3,
                type: "mentor",
                title: "Connected with Sarah Johnson",
                time: "1 day ago",
                icon: "user-plus",
            },
            {
                id: 4,
                type: "course",
                title: "Started React Development course",
                time: "2 days ago",
                icon: "book-open",
            },
            {
                id: 5,
                type: "milestone",
                title: "Reached 100 hours of learning",
                time: "3 days ago",
                icon: "clock",
            },
        ]

        this.currentUser = {
            username: "John Doe",
            email: "john.doe@example.com",
            bio: "Content creator and lifelong learner. Passionate about technology and education.",
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            stats: {
                videosWatched: 127,
                saved: 23,
                mentors: 8,
                achievements: 156,
            },
        }

        this.currentTab = "dashboard"
        this.pendingImageFile = null

        this.init()
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                this.initializeComponents()
            })
        } else {
            this.initializeComponents()
        }
    }

    initializeComponents() {
        try {
            this.initializeAnimations()
            this.initializeNavigation()
            this.initializeTabs()
            this.initializeInteractiveElements()
            this.populateContent()
            this.setupEventListeners()
            this.createParticles()
            this.initializeMouseFollower()
            this.setupScrollAnimations()
            this.initializeToasts()
            this.setupAdvancedInteractions()
            this.initializeProgressBars()
        } catch (error) {
            console.error("Error initializing components:", error)
        }
    }

    // Initialize GSAP animations
    initializeAnimations() {
        if (typeof gsap === "undefined") {
            console.warn("GSAP not loaded, skipping animations")
            return
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger, TextPlugin)

        // Page load animation timeline
        const tl = gsap.timeline()

        tl.from(".navbar", {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            })
            .from(
                ".profile-avatar", {
                    scale: 0,
                    rotation: 180,
                    duration: 1,
                    ease: "back.out(1.7)",
                },
                "-=0.5",
            )
            .from(
                ".profile-name", {
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.3",
            )
            .from(
                ".stat-item", {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.5",
            )
            .from(
                ".tab-btn", {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.3",
            )

        // Animate numbers in stats
        this.animateNumbers()

        // Floating animation for profile avatar
        gsap.to(".profile-avatar", {
            y: -10,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
        })
    }

    // Animate counting numbers
    animateNumbers() {
        if (typeof gsap === "undefined") return

        const stats = document.querySelectorAll(".stat-number")
        stats.forEach((stat) => {
            const finalNumber = Number.parseInt(stat.dataset.target)
            if (finalNumber) {
                gsap.fromTo(
                    stat, { textContent: 0 }, {
                        textContent: finalNumber,
                        duration: 2,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        scrollTrigger: {
                            trigger: stat,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    },
                )
            }
        })
    }

    // Initialize progress bars
    initializeProgressBars() {
        const progressBars = document.querySelectorAll(".progress-bar, .progress-fill")
        progressBars.forEach((bar) => {
            const progress = bar.dataset.progress
            if (progress) {
                if (typeof gsap !== "undefined") {
                    gsap.to(bar, {
                        width: progress + "%",
                        duration: 1.5,
                        ease: "power2.out",
                        delay: 0.5,
                        scrollTrigger: {
                            trigger: bar,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    })
                } else {
                    // Fallback without GSAP
                    setTimeout(() => {
                        bar.style.width = progress + "%"
                    }, 500)
                }
            }
        })
    }

    // Setup advanced scroll-triggered animations
    setupScrollAnimations() {
        if (typeof gsap === "undefined") return

        // Animate dashboard cards
        gsap.utils.toArray(".dashboard-card").forEach((card, index) => {
            gsap.fromTo(
                card, { y: 60, opacity: 0, rotationY: 15 }, {
                    y: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                },
            )
        })

        // Animate video cards with stagger
        gsap.utils.toArray(".video-card").forEach((card, index) => {
            gsap.fromTo(
                card, { y: 80, opacity: 0, scale: 0.9 }, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                },
            )
        })

        // Animate mentor cards with 3D effect
        gsap.utils.toArray(".mentor-card").forEach((card, index) => {
            gsap.fromTo(
                card, { y: 100, opacity: 0, rotationX: 45 }, {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                },
            )
        })

        // Parallax effect for profile header
        gsap.to(".profile-header", {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: ".profile-header",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        })
    }

    // Setup advanced interactions
    setupAdvancedInteractions() {
        // Interactive button effects
        document.querySelectorAll(".interactive-btn").forEach((btn) => {
            btn.addEventListener("mouseenter", (e) => {
                if (typeof gsap !== "undefined") {
                    gsap.to(e.target, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out",
                    })
                }
            })

            btn.addEventListener("mouseleave", (e) => {
                if (typeof gsap !== "undefined") {
                    gsap.to(e.target, {
                        scale: 1,
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    })
                }
            })

            btn.addEventListener("mousemove", (e) => {
                if (typeof gsap !== "undefined") {
                    const rect = e.target.getBoundingClientRect()
                    const x = e.clientX - rect.left - rect.width / 2
                    const y = e.clientY - rect.top - rect.height / 2

                    gsap.to(e.target, {
                        x: x * 0.1,
                        y: y * 0.1,
                        duration: 0.3,
                        ease: "power2.out",
                    })
                }
            })
        })

        // Card hover effects
        document.querySelectorAll(".dashboard-card, .video-card, .mentor-card").forEach((card) => {
            card.addEventListener("mouseenter", (e) => {
                if (typeof gsap !== "undefined") {
                    gsap.to(e.target, {
                        y: -10,
                        duration: 0.3,
                        ease: "power2.out",
                    })
                }
            })

            card.addEventListener("mouseleave", (e) => {
                if (typeof gsap !== "undefined") {
                    gsap.to(e.target, {
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    })
                }
            })
        })
    }

    // Create floating particles
    createParticles() {
        const particlesContainer = document.getElementById("particlesContainer")
        if (!particlesContainer) return

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("div")
            particle.className = "particle"
            particle.style.left = Math.random() * 100 + "%"
            particle.style.animationDelay = Math.random() * 8 + "s"
            particle.style.animationDuration = Math.random() * 4 + 6 + "s"
            particlesContainer.appendChild(particle)
        }
    }

    // Initialize mouse follower
    initializeMouseFollower() {
        const follower = document.getElementById("mouseFollower")
        if (!follower) return

        let mouseX = 0,
            mouseY = 0
        let followerX = 0,
            followerY = 0

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        })

        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1
            followerY += (mouseY - followerY) * 0.1

            follower.style.left = followerX + "px"
            follower.style.top = followerY + "px"

            requestAnimationFrame(animateFollower)
        }

        animateFollower()

        // Scale follower on interactive elements
        document.querySelectorAll("a, button, .video-card, .mentor-card, .dashboard-card").forEach((element) => {
            element.addEventListener("mouseenter", () => {
                if (typeof gsap !== "undefined") {
                    gsap.to(follower, { scale: 2, duration: 0.3 })
                }
            })

            element.addEventListener("mouseleave", () => {
                if (typeof gsap !== "undefined") {
                    gsap.to(follower, { scale: 1, duration: 0.3 })
                }
            })
        })
    }

    // Enhanced navigation with animations
    initializeNavigation() {
        const hamburger = document.getElementById("hamburger")
        const mobileMenu = document.getElementById("mobileMenu")
        const navbar = document.getElementById("navbar")
        const navLogo = document.getElementById("navLogo")

        if (hamburger && mobileMenu) {
            hamburger.addEventListener("click", () => {
                hamburger.classList.toggle("active")
                mobileMenu.classList.toggle("active")
                document.body.classList.toggle("menu-open")

                // Animate mobile menu items
                if (mobileMenu.classList.contains("active") && typeof gsap !== "undefined") {
                    gsap.fromTo(
                        ".mobile-link", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                    )
                }
            })
        }

        // Logo click animation
        if (navLogo) {
            navLogo.addEventListener("click", () => {
                this.animateLogo()
            })
        }

        // Navbar scroll effect
        let lastScrollY = window.scrollY
        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > 100) {
                navbar.classList.add("scrolled")
            } else {
                navbar.classList.remove("scrolled")
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                if (typeof gsap !== "undefined") {
                    gsap.to(navbar, { y: -100, duration: 0.3 })
                }
            } else {
                if (typeof gsap !== "undefined") {
                    gsap.to(navbar, { y: 0, duration: 0.3 })
                }
            }

            lastScrollY = currentScrollY
        })

        // Mobile dropdown functionality
        document.querySelectorAll(".mobile-dropdown-toggle").forEach((toggle) => {
            toggle.addEventListener("click", (e) => {
                e.preventDefault()
                const submenu = toggle.nextElementSibling
                const arrow = toggle.querySelector(".mobile-arrow")

                toggle.classList.toggle("active")
                submenu.classList.toggle("active")

                if (typeof gsap !== "undefined") {
                    if (submenu.classList.contains("active")) {
                        gsap.to(arrow, { rotation: 180, duration: 0.3 })
                        gsap.fromTo(submenu, { height: 0 }, { height: "auto", duration: 0.3 })
                    } else {
                        gsap.to(arrow, { rotation: 0, duration: 0.3 })
                        gsap.to(submenu, { height: 0, duration: 0.3 })
                    }
                }
            })
        })

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove("active")
                mobileMenu.classList.remove("active")
                document.body.classList.remove("menu-open")
            }
        })
    }

    // Animate logo
    animateLogo() {
        if (typeof gsap === "undefined") return

        const logoIcon = document.querySelector(".logo-icon")
        const logoText = document.querySelector(".logo-text")

        gsap
            .timeline()
            .to(logoIcon, { rotation: 360, scale: 1.2, duration: 0.6, ease: "back.out(1.7)" })
            .to(logoText, { scale: 1.1, duration: 0.3, ease: "power2.out" }, "-=0.3")
            .to(logoIcon, { scale: 1, duration: 0.3, ease: "power2.out" })
            .to(logoText, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.3")
    }

    // Enhanced tab system
    initializeTabs() {
        const tabButtons = document.querySelectorAll(".tab-btn")
        const tabContents = document.querySelectorAll(".tab-content")

        tabButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetTab = button.dataset.tab

                // Remove active class from all tabs and contents
                tabButtons.forEach((btn) => btn.classList.remove("active"))
                tabContents.forEach((content) => content.classList.remove("active"))

                // Add active class to clicked tab and corresponding content
                button.classList.add("active")
                const targetContent = document.getElementById(targetTab)
                if (targetContent) {
                    targetContent.classList.add("active")
                    this.currentTab = targetTab

                    // Animate tab content
                    if (typeof gsap !== "undefined") {
                        gsap.fromTo(targetContent, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
                    }

                    // Load content for the active tab
                    this.loadTabContent(targetTab)
                }
            })
        })

        // Load initial tab content
        this.loadTabContent(this.currentTab)
    }

    // Load content for specific tab
    loadTabContent(tabName) {
        switch (tabName) {
            case "dashboard":
                this.populateDashboard()
                break
            case "history":
                this.populateHistory()
                break
            case "mentors":
                this.populateMentors()
                break
            case "liked":
                this.populateLiked()
                break
            case "saved":
                this.populateSaved()
                break
            case "settings":
                this.initializeSettings()
                break
        }
    }

    // Populate dashboard content
    populateDashboard() {
        const activityList = document.getElementById("activityList")
        if (!activityList) return

        activityList.innerHTML = ""

        this.sampleActivities.forEach((activity, index) => {
            const activityItem = document.createElement("div")
            activityItem.className = "activity-item"
            activityItem.innerHTML = `
        <div class="activity-icon">
          <i class="fas fa-${activity.icon}"></i>
        </div>
        <div class="activity-content">
          <div class="activity-title">${activity.title}</div>
          <div class="activity-time">${activity.time}</div>
        </div>
      `

            activityList.appendChild(activityItem)

            // Animate activity items
            if (typeof gsap !== "undefined") {
                gsap.fromTo(
                    activityItem, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, delay: index * 0.1, ease: "power2.out" },
                )
            }
        })
    }

    // Populate video grids
    populateVideoGrid(containerId, videos) {
        const container = document.getElementById(containerId)
        if (!container) return

        container.innerHTML = ""

        if (videos.length === 0) {
            container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-video"></i>
          <h3>No videos found</h3>
          <p>Start exploring to build your collection!</p>
        </div>
      `
            return
        }

        videos.forEach((video, index) => {
            const videoCard = this.createVideoCard(video)
            container.appendChild(videoCard)

            // Animate video cards
            if (typeof gsap !== "undefined") {
                gsap.fromTo(
                    videoCard, { y: 50, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: index * 0.1, ease: "back.out(1.7)" },
                )
            }
        })
    }

    // Create video card element
    createVideoCard(video) {
        const card = document.createElement("div")
        card.className = "video-card"
        card.innerHTML = `
      <div class="video-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
        <div class="video-duration">${video.duration}</div>
      </div>
      <div class="video-info">
        <h3 class="video-title">${video.title}</h3>
        <div class="video-meta">
          <div>${video.channel} • ${video.views} views • ${video.uploadDate}</div>
        </div>
        <div class="video-actions">
          <button class="action-btn ${video.liked ? "active" : ""}" data-action="like" data-video-id="${video.id}" title="Like">
            <i class="fas fa-heart"></i>
          </button>
          <button class="action-btn ${video.saved ? "active" : ""}" data-action="save" data-video-id="${video.id}" title="Save">
            <i class="fas fa-bookmark"></i>
          </button>
          <button class="action-btn ${video.watchLater ? "active" : ""}" data-action="watch-later" data-video-id="${video.id}" title="Watch Later">
            <i class="fas fa-clock"></i>
          </button>
          <button class="action-btn" data-action="share" data-video-id="${video.id}" title="Share">
            <i class="fas fa-share"></i>
          </button>
        </div>
      </div>
    `

        // Add click handlers for video actions
        card.querySelectorAll(".action-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation()
                this.handleVideoAction(btn.dataset.action, btn.dataset.videoId, btn)
            })
        })

        // Add click handler for video card
        card.addEventListener("click", () => {
            this.playVideo(video)
        })

        return card
    }

    // Handle video actions
    handleVideoAction(action, videoId, button) {
        const video = this.sampleVideos.find((v) => v.id == videoId)
        if (!video) return

        switch (action) {
            case "like":
                video.liked = !video.liked
                button.classList.toggle("active", video.liked)
                this.showToast(video.liked ? "Added to liked videos" : "Removed from liked videos", "success")
                break
            case "save":
                video.saved = !video.saved
                button.classList.toggle("active", video.saved)
                this.showToast(video.saved ? "Video saved" : "Video removed from saved", "success")
                break
            case "watch-later":
                video.watchLater = !video.watchLater
                button.classList.toggle("active", video.watchLater)
                this.showToast(video.watchLater ? "Added to watch later" : "Removed from watch later", "success")
                break
            case "share":
                this.shareVideo(video)
                break
        }

        // Animate button
        if (typeof gsap !== "undefined") {
            gsap.to(button, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 })
        }
    }

    // Play video (placeholder)
    playVideo(video) {
        this.showToast(`Playing: ${video.title}`, "info")
    }

    // Share video
    shareVideo(video) {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: `Check out this video: ${video.title}`,
                url: window.location.href,
            })
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showToast("Link copied to clipboard", "success")
            })
        }
    }

    // Populate different video sections
    populateHistory() {
        this.populateVideoGrid("historyGrid", this.sampleVideos)
    }

    populateLiked() {
        const likedVideos = this.sampleVideos.filter((video) => video.liked)
        this.populateVideoGrid("likedGrid", likedVideos)
    }

    populateSaved() {
        const savedVideos = this.sampleVideos.filter((video) => video.saved)
        this.populateVideoGrid("savedGrid", savedVideos)
    }

    // Populate mentors grid
    populateMentors() {
        const mentorsGrid = document.getElementById("mentorsGrid")
        if (!mentorsGrid) return

        mentorsGrid.innerHTML = ""

        this.sampleMentors.forEach((mentor, index) => {
            const mentorCard = this.createMentorCard(mentor)
            mentorsGrid.appendChild(mentorCard)

            // Animate mentor cards
            if (typeof gsap !== "undefined") {
                gsap.fromTo(
                    mentorCard, { y: 80, opacity: 0, rotationY: 15 }, { y: 0, opacity: 1, rotationY: 0, duration: 0.8, delay: index * 0.1, ease: "back.out(1.7)" },
                )
            }
        })
    }

    // Create mentor card element
    createMentorCard(mentor) {
        const card = document.createElement("div")
        card.className = "mentor-card"
        card.innerHTML = `
      <div class="mentor-avatar">
        <img src="${mentor.avatar}" alt="${mentor.name}" loading="lazy">
      </div>
      <h3 class="mentor-name">${mentor.name}</h3>
      <p class="mentor-expertise">${mentor.expertise}</p>
      <div class="mentor-stats">
        <span>
          <strong>${mentor.students}</strong>
          Students
        </span>
        <span>
          <strong>${mentor.courses}</strong>
          Courses
        </span>
        <span>
          <strong>${mentor.rating}</strong>
          Rating
        </span>
      </div>
      <div class="mentor-actions">
        <button class="btn btn-primary interactive-btn" onclick="profileManager.connectMentor(${mentor.id})">
          <i class="fas fa-user-plus"></i>
          <span>Connect</span>
        </button>
        <button class="btn btn-outline interactive-btn" onclick="profileManager.viewMentorProfile(${mentor.id})">
          <i class="fas fa-eye"></i>
          <span>View Profile</span>
        </button>
      </div>
    `

        return card
    }

    // Connect with mentor
    connectMentor(mentorId) {
        const mentor = this.sampleMentors.find((m) => m.id === mentorId)
        if (mentor) {
            this.showToast(`Connection request sent to ${mentor.name}`, "success")
        }
    }

    // View mentor profile
    viewMentorProfile(mentorId) {
        const mentor = this.sampleMentors.find((m) => m.id === mentorId)
        if (mentor) {
            this.showToast(`Opening ${mentor.name}'s profile`, "info")
        }
    }

    // Initialize settings
    initializeSettings() {
        const profileForm = document.getElementById("profileForm")
        const profileImageInput = document.getElementById("profileImageInput")
        const fileInputWrapper = document.getElementById("fileInputWrapper")
        const emailInput = document.getElementById("email")
        const darkModeToggle = document.getElementById("darkModeToggle")

        // Profile form submission
        if (profileForm) {
            profileForm.addEventListener("submit", (e) => {
                e.preventDefault()
                this.saveProfile()
            })
        }

        // File input handling
        if (profileImageInput && fileInputWrapper) {
            // Click to upload
            fileInputWrapper.addEventListener("click", () => {
                profileImageInput.click()
            })

            // Drag and drop
            fileInputWrapper.addEventListener("dragover", (e) => {
                e.preventDefault()
                fileInputWrapper.style.borderColor = "var(--accent-light)"
                fileInputWrapper.style.background = "var(--background-light)"
            })

            fileInputWrapper.addEventListener("dragleave", () => {
                fileInputWrapper.style.borderColor = "var(--border)"
                fileInputWrapper.style.background = "var(--background)"
            })

            fileInputWrapper.addEventListener("drop", (e) => {
                e.preventDefault()
                fileInputWrapper.style.borderColor = "var(--border)"
                fileInputWrapper.style.background = "var(--background)"

                const files = e.dataTransfer.files
                if (files.length > 0) {
                    this.handleImageUpload(files[0])
                }
            })

            profileImageInput.addEventListener("change", (e) => {
                if (e.target.files.length > 0) {
                    this.handleImageUpload(e.target.files[0])
                }
            })
        }

        // Email validation
        if (emailInput) {
            emailInput.addEventListener("input", () => {
                this.validateEmail(emailInput.value)
            })
        }

        // Dark mode toggle
        if (darkModeToggle) {
            darkModeToggle.addEventListener("change", (e) => {
                this.toggleDarkMode(e.target.checked)
            })
        }

        // Reset form button
        const resetBtn = document.getElementById("resetFormBtn")
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                this.resetForm()
            })
        }
    }

    // Handle image upload
    handleImageUpload(file) {
        // Validate file
        if (!file.type.startsWith("image/")) {
            this.showToast("Please select a valid image file", "error")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            // 5MB limit
            this.showToast("Image size must be less than 5MB", "error")
            return
        }

        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
            this.pendingImageFile = e.target.result
            this.showImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    // Show image preview modal
    showImagePreview(imageSrc) {
        const modal = document.getElementById("imageModal")
        const modalImage = document.getElementById("modalImage")
        const confirmBtn = document.getElementById("confirmImageBtn")
        const cancelBtn = document.getElementById("cancelImageBtn")
        const closeBtn = document.getElementById("modalCloseBtn")

        if (!modal || !modalImage) return

        modalImage.src = imageSrc
        modal.classList.add("active")

        // Animate modal
        if (typeof gsap !== "undefined") {
            gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 })
            gsap.fromTo(".modal-content", { scale: 0.8, y: 50 }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" })
        }

        // Confirm button
        const confirmHandler = () => {
            this.updateProfileImage(imageSrc)
            this.closeModal()
            this.showToast("Profile image updated successfully", "success")
        }

        // Cancel button
        const cancelHandler = () => {
            this.pendingImageFile = null
            this.closeModal()
        }

        // Remove existing listeners
        confirmBtn.replaceWith(confirmBtn.cloneNode(true))
        cancelBtn.replaceWith(cancelBtn.cloneNode(true))
        closeBtn.replaceWith(closeBtn.cloneNode(true))

        // Add new listeners
        document.getElementById("confirmImageBtn").addEventListener("click", confirmHandler)
        document.getElementById("cancelImageBtn").addEventListener("click", cancelHandler)
        document.getElementById("modalCloseBtn").addEventListener("click", cancelHandler)

        // Close on backdrop click
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                cancelHandler()
            }
        })
    }

    // Close modal
    closeModal() {
        const modal = document.getElementById("imageModal")
        if (modal) {
            modal.classList.remove("active")
        }
    }

    // Update profile image
    updateProfileImage(imageSrc) {
        const profileImage = document.getElementById("profileImage")
        if (profileImage) {
            profileImage.src = imageSrc
            this.currentUser.profileImage = imageSrc

            // Animate image update
            if (typeof gsap !== "undefined") {
                gsap.fromTo(
                    profileImage, { scale: 0.8, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
                )
            }
        }
    }

    // Validate email
    validateEmail(email) {
        const emailStatus = document.getElementById("emailStatus")
        if (!emailStatus) return

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValid = emailRegex.test(email)

        if (email === "") {
            emailStatus.innerHTML = ""
            return
        }

        if (isValid) {
            emailStatus.innerHTML = '<i class="fas fa-check"></i> Valid email address'
            emailStatus.className = "input-status success"
        } else {
            emailStatus.innerHTML = '<i class="fas fa-times"></i> Please enter a valid email address'
            emailStatus.className = "input-status error"
        }
    }

    // Save profile
    saveProfile() {
        const formData = new FormData(document.getElementById("profileForm"))
        const fullName = formData.get("fullName")
        const email = formData.get("email")
        const bio = formData.get("bio")

        // Validate required fields
        if (!fullName || !email) {
            this.showToast("Please fill in all required fields", "error")
            return
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            this.showToast("Please enter a valid email address", "error")
            return
        }

        // Update user data
        this.currentUser.username = fullName
        this.currentUser.email = email
        this.currentUser.bio = bio

        // Update display
        const displayUsername = document.getElementById("displayUsername")
        const displayEmail = document.getElementById("displayEmail")

        if (displayUsername) displayUsername.textContent = fullName
        if (displayEmail) displayEmail.textContent = `@${email.split("@")[0]}`

        // Show success message
        this.showToast("Profile updated successfully", "success")

        // Animate save button
        const saveBtn = document.querySelector('#profileForm button[type="submit"]')
        if (saveBtn && typeof gsap !== "undefined") {
            gsap.to(saveBtn, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 })
        }
    }

    // Reset form
    resetForm() {
        const form = document.getElementById("profileForm")
        if (form) {
            form.reset()
                // Reset to original values
            document.getElementById("fullName").value = this.currentUser.username
            document.getElementById("email").value = this.currentUser.email
            document.getElementById("bio").value = this.currentUser.bio

            this.showToast("Form reset to original values", "info")
        }
    }

    // Toggle dark mode
    toggleDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add("dark-mode")
            this.showToast("Dark mode enabled", "info")
        } else {
            document.body.classList.remove("dark-mode")
            this.showToast("Dark mode disabled", "info")
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Profile actions
        const editProfileBtn = document.getElementById("editProfileBtn")
        const shareProfileBtn = document.getElementById("shareProfileBtn")
        const downloadDataBtn = document.getElementById("downloadDataBtn")

        if (editProfileBtn) {
            editProfileBtn.addEventListener("click", () => {
                // Switch to settings tab
                document.querySelector('[data-tab="settings"]').click()
                this.showToast("Switched to settings", "info")
            })
        }

        if (shareProfileBtn) {
            shareProfileBtn.addEventListener("click", () => {
                this.shareProfile()
            })
        }

        if (downloadDataBtn) {
            downloadDataBtn.addEventListener("click", () => {
                this.downloadUserData()
            })
        }

        // Search functionality
        const historySearch = document.getElementById("historySearch")
        if (historySearch) {
            historySearch.addEventListener("input", (e) => {
                this.searchVideos(e.target.value, "history")
            })
        }

        // Filter functionality
        const mentorFilter = document.getElementById("mentorFilter")
        if (mentorFilter) {
            mentorFilter.addEventListener("change", (e) => {
                this.filterMentors(e.target.value)
            })
        }

        // View options
        document.querySelectorAll(".view-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                document.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("active"))
                e.target.classList.add("active")
                this.changeView(e.target.dataset.view)
            })
        })

        // Clear history
        const clearHistoryBtn = document.getElementById("clearHistoryBtn")
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener("click", () => {
                this.clearHistory()
            })
        }

        // Create playlist
        const createPlaylistBtn = document.getElementById("createPlaylistBtn")
        if (createPlaylistBtn) {
            createPlaylistBtn.addEventListener("click", () => {
                this.createPlaylist()
            })
        }

        // Find mentors
        const findMentorsBtn = document.getElementById("findMentorsBtn")
        if (findMentorsBtn) {
            findMentorsBtn.addEventListener("click", () => {
                this.findMentors()
            })
        }

        // Profile avatar click
        const profileAvatarContainer = document.getElementById("profileAvatarContainer")
        if (profileAvatarContainer) {
            profileAvatarContainer.addEventListener("click", () => {
                document.getElementById("profileImageInput").click()
            })
        }
    }

    // Share profile
    shareProfile() {
        if (navigator.share) {
            navigator.share({
                title: `${this.currentUser.username}'s Profile`,
                text: `Check out ${this.currentUser.username}'s learning profile`,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showToast("Profile link copied to clipboard", "success")
            })
        }
    }

    // Download user data
    downloadUserData() {
        const userData = {
            profile: this.currentUser,
            videos: this.sampleVideos,
            mentors: this.sampleMentors,
            activities: this.sampleActivities,
            exportDate: new Date().toISOString(),
        }

        const dataStr = JSON.stringify(userData, null, 2)
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)

        const link = document.createElement("a")
        link.href = url
        link.download = `${this.currentUser.username.replace(/\s+/g, "_")}_profile_data.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        this.showToast("Profile data downloaded successfully", "success")
    }

    // Search videos
    searchVideos(query, section) {
        const videos = this.sampleVideos.filter(
            (video) =>
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.channel.toLowerCase().includes(query.toLowerCase()),
        )

        this.populateVideoGrid(`${section}Grid`, videos)
    }

    // Filter mentors
    filterMentors(filter) {
        let filteredMentors = this.sampleMentors

        switch (filter) {
            case "active":
                filteredMentors = this.sampleMentors.filter((mentor) => mentor.active)
                break
            case "favorites":
                filteredMentors = this.sampleMentors.filter((mentor) => mentor.favorite)
                break
            default:
                filteredMentors = this.sampleMentors
        }

        this.populateMentorsFiltered(filteredMentors)
    }

    // Populate filtered mentors
    populateMentorsFiltered(mentors) {
        const mentorsGrid = document.getElementById("mentorsGrid")
        if (!mentorsGrid) return

        mentorsGrid.innerHTML = ""

        mentors.forEach((mentor, index) => {
            const mentorCard = this.createMentorCard(mentor)
            mentorsGrid.appendChild(mentorCard)

            // Animate mentor cards
            if (typeof gsap !== "undefined") {
                gsap.fromTo(
                    mentorCard, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: index * 0.1, ease: "power2.out" },
                )
            }
        })

        if (mentors.length === 0) {
            mentorsGrid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-user-tie"></i>
          <h3>No mentors found</h3>
          <p>Try adjusting your filter criteria.</p>
        </div>
      `
        }
    }

    // Change view
    changeView(view) {
        const videoGrids = document.querySelectorAll(".video-grid")
        videoGrids.forEach((grid) => {
            if (view === "list") {
                grid.classList.add("list-view")
            } else {
                grid.classList.remove("list-view")
            }
        })

        this.showToast(`Switched to ${view} view`, "info")
    }

    // Clear history
    clearHistory() {
        if (confirm("Are you sure you want to clear your watch history? This action cannot be undone.")) {
            const historyGrid = document.getElementById("historyGrid")
            if (historyGrid) {
                historyGrid.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-history"></i>
            <h3>History cleared</h3>
            <p>Your watch history has been cleared.</p>
          </div>
        `
            }
            this.showToast("Watch history cleared", "success")
        }
    }

    // Create playlist
    createPlaylist() {
        const playlistName = prompt("Enter playlist name:")
        if (playlistName) {
            this.showToast(`Playlist "${playlistName}" created successfully`, "success")
        }
    }

    // Find mentors
    findMentors() {
        this.showToast("Opening mentor discovery...", "info")
    }

    // Populate all content
    populateContent() {
        this.populateDashboard()
        this.populateHistory()
        this.populateMentors()
        this.populateLiked()
        this.populateSaved()
    }

    // Initialize toast system
    initializeToasts() {
        // Create toast container if it doesn't exist
        if (!document.getElementById("toastContainer")) {
            const container = document.createElement("div")
            container.id = "toastContainer"
            container.className = "toast-container"
            document.body.appendChild(container)
        }
    }

    // Show toast notification
    showToast(message, type = "info", duration = 3000) {
        const container = document.getElementById("toastContainer")
        if (!container) return

        const toast = document.createElement("div")
        toast.className = `toast ${type}`
        toast.innerHTML = `
      <i class="fas fa-${this.getToastIcon(type)}"></i>
      <span>${message}</span>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    `

        container.appendChild(toast)

        // Close button functionality
        const closeBtn = toast.querySelector(".toast-close")
        closeBtn.addEventListener("click", () => {
            this.removeToast(toast)
        })

        // Auto remove after duration
        setTimeout(() => {
            this.removeToast(toast)
        }, duration)

        // Animate toast in
        if (typeof gsap !== "undefined") {
            gsap.fromTo(toast, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" })
        }
    }

    // Remove toast
    removeToast(toast) {
        if (!toast || !toast.parentNode) return

        toast.classList.add("removing")

        if (typeof gsap !== "undefined") {
            gsap.to(toast, {
                x: 100,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast)
                    }
                },
            })
        } else {
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast)
                }
            }, 300)
        }
    }

    // Get toast icon
    getToastIcon(type) {
        switch (type) {
            case "success":
                return "check-circle"
            case "error":
                return "exclamation-circle"
            case "warning":
                return "exclamation-triangle"
            default:
                return "info-circle"
        }
    }

    // Show alert (for important messages)
    showAlert(message, type = "info") {
        const container = document.getElementById("alertContainer")
        if (!container) return

        const alert = document.createElement("div")
        alert.className = `alert ${type}`
        alert.innerHTML = `
      <i class="fas fa-${this.getToastIcon(type)}"></i>
      <span>${message}</span>
    `

        container.appendChild(alert)

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert)
            }
        }, 5000)
    }
}

// Initialize the profile manager when the page loads
let profileManager
document.addEventListener("DOMContentLoaded", () => {
    profileManager = new InteractiveProfileManager()
})

// Global error handler
window.addEventListener("error", (e) => {
    console.error("Global error:", e.error)
})

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason)
})

// Prevent right-click context menu on images (optional)
document.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "IMG") {
        e.preventDefault()
    }
})

// Handle keyboard navigation
document.addEventListener("keydown", (e) => {
    // ESC key to close modals
    if (e.key === "Escape") {
        const modal = document.querySelector(".modal.active")
        if (modal) {
            modal.classList.remove("active")
        }

        const mobileMenu = document.querySelector(".mobile-menu.active")
        if (mobileMenu) {
            document.getElementById("hamburger").classList.remove("active")
            mobileMenu.classList.remove("active")
            document.body.classList.remove("menu-open")
        }
    }

    // Tab navigation for accessibility
    if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation")
    }
})

// Remove keyboard navigation class on mouse use
document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation")
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        // Page is hidden, pause animations if needed
        console.log("Page hidden")
    } else {
        // Page is visible, resume animations if needed
        console.log("Page visible")
    }
})

// Performance monitoring
if ("performance" in window) {
    window.addEventListener("load", () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType("navigation")[0]
            console.log("Page load time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
        }, 0)
    })
}

// Service worker registration (if available)
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        // Uncomment if you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //   .then(registration => console.log('SW registered'))
        //   .catch(error => console.log('SW registration failed'));
    })
}