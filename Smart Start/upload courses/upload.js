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

 // Global variables
 let currentSection = 'courses';
 let currentFilter = 'all';
 let downloadQueue = [];

 // DOM Content Loaded
 document.addEventListener('DOMContentLoaded', function() {
     initializeApp();
     setupEventListeners();
     loadUserProgress();
 });

 // Initialize Application
 function initializeApp() {
     // Set initial active section
     showSection('courses');

     // Initialize filter tabs
     setupFilterTabs();

     // Setup search functionality
     setupSearch();

     // Load animations
     setupAnimations();

     console.log('EduMentor Platform Initialized');
 }

 // Setup Event Listeners
 function setupEventListeners() {
     // Filter tabs
     document.querySelectorAll('.tab').forEach(tab => {
         tab.addEventListener('click', function() {
             const filter = this.dataset.filter;
             filterCourses(filter);
             updateActiveTab(this);
         });
     });

     // Modal close events
     window.addEventListener('click', function(event) {
         const modal = document.getElementById('downloadModal');
         if (event.target === modal) {
             closeModal();
         }
     });

     // Keyboard shortcuts
     document.addEventListener('keydown', function(event) {
         if (event.key === 'Escape') {
             closeModal();
         }
     });

     // Smooth scrolling for navigation
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function(e) {
             e.preventDefault();
             const target = document.querySelector(this.getAttribute('href'));
             if (target) {
                 target.scrollIntoView({
                     behavior: 'smooth',
                     block: 'start'
                 });
             }
         });
     });
 }

 // Show Section
 function showSection(sectionId) {
     // Hide all sections
     document.querySelectorAll('.section').forEach(section => {
         section.style.display = 'none';
     });

     // Show target section
     const targetSection = document.getElementById(sectionId);
     if (targetSection) {
         targetSection.style.display = 'block';
         targetSection.classList.add('fade-in');
         currentSection = sectionId;
     }

     // Update navigation
     updateNavigation(sectionId);
 }

 // Update Navigation
 function updateNavigation(activeSection) {
     document.querySelectorAll('.nav-menu a').forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === `#${activeSection}`) {
             link.classList.add('active');
         }
     });
 }

 // Filter Courses
 function filterCourses(filter) {
     const courses = document.querySelectorAll('.course-card');

     courses.forEach(course => {
         const category = course.dataset.category;

         if (filter === 'all' || category === filter) {
             course.style.display = 'block';
             course.classList.add('slide-up');
         } else {
             course.style.display = 'none';
         }
     });

     currentFilter = filter;
 }

 // Update Active Tab
 function updateActiveTab(activeTab) {
     document.querySelectorAll('.tab').forEach(tab => {
         tab.classList.remove('active');
     });
     activeTab.classList.add('active');
 }

 // Setup Filter Tabs
 function setupFilterTabs() {
     const tabs = document.querySelectorAll('.tab');
     tabs.forEach(tab => {
         tab.addEventListener('click', function() {
             const filter = this.dataset.filter;
             filterCourses(filter);
             updateActiveTab(this);
         });
     });
 }

 // Setup Search
 function setupSearch() {
     const searchInput = document.getElementById('videoSearch');
     if (searchInput) {
         searchInput.addEventListener('input', function() {
             const searchTerm = this.value.toLowerCase();
             searchVideos(searchTerm);
         });
     }
 }

 // Search Videos
 function searchVideos(searchTerm) {
     const videos = document.querySelectorAll('.video-card');

     videos.forEach(video => {
         const title = video.querySelector('h4').textContent.toLowerCase();
         const description = video.querySelector('p').textContent.toLowerCase();

         if (title.includes(searchTerm) || description.includes(searchTerm)) {
             video.style.display = 'block';
             video.classList.add('fade-in');
         } else {
             video.style.display = 'none';
         }
     });
 }

 // Download Course
 function downloadCourse(courseId) {
     console.log(`Initiating download for course: ${courseId}`);

     // Show download modal
     const modal = document.getElementById('downloadModal');
     modal.style.display = 'block';

     // Store current course for download
     window.currentDownloadCourse = courseId;

     // Add to download queue
     if (!downloadQueue.includes(courseId)) {
         downloadQueue.push(courseId);
     }

     // Show success notification
     showNotification('Course added to download queue', 'success');
 }

 // Download Video
 function downloadVideo(videoId) {
     console.log(`Downloading video: ${videoId}`);

     // Simulate download process
     showNotification('Video download started', 'info');

     // Simulate download progress
     simulateDownload(videoId, 'video');
 }

 // Download Format
 function downloadFormat(format) {
     const courseId = window.currentDownloadCourse;

     console.log(`Downloading ${courseId} in ${format} format`);

     // Close modal
     closeModal();

     // Simulate download
     simulateDownload(courseId, format);

     // Show success message
     showNotification(`Download started in ${format.toUpperCase()} format`, 'success');
 }

 // Simulate Download
 function simulateDownload(itemId, format) {
     // Create progress notification
     const progressDiv = document.createElement('div');
     progressDiv.className = 'download-progress';
     progressDiv.innerHTML = `
        <div class="progress-header">
            <span>Downloading ${itemId}</span>
            <span class="progress-percentage">0%</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
    `;

     // Add to page (you might want to create a dedicated notifications area)
     document.body.appendChild(progressDiv);

     // Simulate progress
     let progress = 0;
     const interval = setInterval(() => {
         progress += Math.random() * 15;
         if (progress >= 100) {
             progress = 100;
             clearInterval(interval);

             // Remove progress indicator
             setTimeout(() => {
                 progressDiv.remove();
                 showNotification('Download completed successfully!', 'success');
             }, 1000);
         }

         // Update progress
         const progressFill = progressDiv.querySelector('.progress-fill');
         const progressPercentage = progressDiv.querySelector('.progress-percentage');

         if (progressFill && progressPercentage) {
             progressFill.style.width = `${progress}%`;
             progressPercentage.textContent = `${Math.round(progress)}%`;
         }
     }, 500);
 }

 // Play Video
 function playVideo(videoId) {
     console.log(`Playing video: ${videoId}`);

     // Create video player modal or redirect to video page
     showNotification('Opening video player...', 'info');

     // Simulate video loading
     setTimeout(() => {
         showNotification('Video loaded successfully!', 'success');
     }, 1500);
 }

 // Start Activity
 function startActivity(activityType) {
     console.log(`Starting activity: ${activityType}`);

     switch (activityType) {
         case 'quiz':
             startQuiz();
             break;
         case 'coding':
             startCodingChallenge();
             break;
         case 'project':
             startProject();
             break;
         case 'discussion':
             openDiscussion();
             break;
         default:
             showNotification('Activity not available', 'warning');
     }
 }

 // Start Quiz
 function startQuiz() {
     showNotification('Loading quiz questions...', 'info');

     // Simulate quiz loading
     setTimeout(() => {
         showNotification('Quiz started! Good luck!', 'success');
         // Here you would typically redirect to quiz page or open quiz modal
     }, 1000);
 }

 // Start Coding Challenge
 function startCodingChallenge() {
     showNotification('Preparing coding environment...', 'info');

     setTimeout(() => {
         showNotification('Coding challenge ready!', 'success');
         // Open coding interface
     }, 1500);
 }

 // Start Project
 function startProject() {
     showNotification('Setting up project workspace...', 'info');

     setTimeout(() => {
         showNotification('Project workspace ready!', 'success');
     }, 1200);
 }

 // Open Discussion
 function openDiscussion() {
     showNotification('Loading discussion forum...', 'info');

     setTimeout(() => {
         showNotification('Welcome to the discussion forum!', 'success');
     }, 800);
 }

 // Toggle Favorite
 function toggleFavorite(button) {
     const icon = button.querySelector('i');

     if (icon.classList.contains('far')) {
         icon.classList.remove('far');
         icon.classList.add('fas');
         button.style.color = '#ef4444';
         showNotification('Added to favorites', 'success');
     } else {
         icon.classList.remove('fas');
         icon.classList.add('far');
         button.style.color = '';
         showNotification('Removed from favorites', 'info');
     }
 }

 // Close Modal
 function closeModal() {
     const modal = document.getElementById('downloadModal');
     modal.style.display = 'none';
 }

 // Show Notification
 function showNotification(message, type = 'info') {
     // Create notification element
     const notification = document.createElement('div');
     notification.className = `notification notification-${type}`;
     notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

     // Add styles
     notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        min-width: 300px;
        border-left: 4px solid var(--${getNotificationColor(type)});
        animation: slideInRight 0.3s ease;
    `;

     // Add to page
     document.body.appendChild(notification);

     // Auto remove after 5 seconds
     setTimeout(() => {
         if (notification.parentElement) {
             notification.style.animation = 'slideOutRight 0.3s ease';
             setTimeout(() => notification.remove(), 300);
         }
     }, 5000);
 }

 // Get Notification Icon
 function getNotificationIcon(type) {
     const icons = {
         success: 'check-circle',
         error: 'exclamation-circle',
         warning: 'exclamation-triangle',
         info: 'info-circle'
     };
     return icons[type] || 'info-circle';
 }

 // Get Notification Color
 function getNotificationColor(type) {
     const colors = {
         success: 'success',
         error: 'error',
         warning: 'warning',
         info: 'primary-blue'
     };
     return colors[type] || 'primary-blue';
 }

 // Load User Progress
 function loadUserProgress() {
     // Simulate loading user progress from API
     const progressData = {
         overallProgress: 70,
         coursesCompleted: 15,
         hoursLearned: 120,
         certificatesEarned: 8,
         currentStreak: 7
     };

     // Update progress circle
     updateProgressCircle(progressData.overallProgress);

     // Update stats
     updateProgressStats(progressData);

     console.log('User progress loaded:', progressData);
 }

 // Update Progress Circle
 function updateProgressCircle(percentage) {
     const circle = document.querySelector('.progress-ring-circle');
     if (circle) {
         const radius = circle.r.baseVal.value;
         const circumference = radius * 2 * Math.PI;
         const offset = circumference - (percentage / 100) * circumference;

         circle.style.strokeDasharray = `${circumference} ${circumference}`;
         circle.style.strokeDashoffset = offset;
     }

     // Update percentage text
     const percentageText = document.querySelector('.progress-percentage');
     if (percentageText) {
         percentageText.textContent = `${percentage}%`;
     }
 }

 // Update Progress Stats
 function updateProgressStats(data) {
     const statElements = document.querySelectorAll('.stat-value');
     const values = [data.coursesCompleted, data.hoursLearned, data.certificatesEarned];

     statElements.forEach((element, index) => {
         if (values[index] !== undefined) {
             animateCounter(element, values[index]);
         }
     });
 }

 // Animate Counter
 function animateCounter(element, target) {
     let current = 0;
     const increment = target / 50;
     const timer = setInterval(() => {
         current += increment;
         if (current >= target) {
             current = target;
             clearInterval(timer);
         }
         element.textContent = Math.floor(current);
     }, 30);
 }

 // Setup Animations
 function setupAnimations() {
     // Intersection Observer for scroll animations
     const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.classList.add('fade-in');
             }
         });
     }, {
         threshold: 0.1
     });

     // Observe elements for animation
     document.querySelectorAll('.course-card, .video-card, .activity-card').forEach(el => {
         observer.observe(el);
     });
 }

 // Utility Functions
 function debounce(func, wait) {
     let timeout;
     return function executedFunction(...args) {
         const later = () => {
             clearTimeout(timeout);
             func(...args);
         };
         clearTimeout(timeout);
         timeout = setTimeout(later, wait);
     };
 }

 function throttle(func, limit) {
     let inThrottle;
     return function() {
         const args = arguments;
         const context = this;
         if (!inThrottle) {
             func.apply(context, args);
             inThrottle = true;
             setTimeout(() => inThrottle = false, limit);
         }
     };
 }

 // Export functions for testing (if needed)
 if (typeof module !== 'undefined' && module.exports) {
     module.exports = {
         showSection,
         filterCourses,
         downloadCourse,
         startActivity,
         toggleFavorite
     };
 }

 // Add CSS animations
 const style = document.createElement('style');
 style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--gray-400);
        padding: 0.25rem;
    }
    
    .notification-close:hover {
        color: var(--gray-600);
    }
    
    .download-progress {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--white);
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        min-width: 300px;
        border-left: 4px solid var(--primary-blue);
    }
    
    .progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        font-weight: 600;
    }
`;

 document.head.appendChild(style);

 console.log('EduMentor Platform JavaScript loaded successfully!');