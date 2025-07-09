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
    // Sample mentor data
const mentorsData = [{
        id: 1,
        name: "Sarah Chen",
        title: "Senior Software Engineer at Google",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
        rating: 4.9,
        reviews: 127,
        bio: "Passionate about helping developers grow their careers. Specializing in full-stack development and system design.",
        skills: ["JavaScript", "React", "Node.js", "System Design"],
        experience: "senior",
        availability: "available",
        price: "$80/hour"
    },
    {
        id: 2,
        name: "Marcus Johnson",
        title: "Lead Product Designer at Airbnb",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        rating: 4.8,
        reviews: 89,
        bio: "10+ years in product design. I help designers transition into senior roles and build better user experiences.",
        skills: ["UI/UX Design", "Figma", "Product Strategy", "User Research"],
        experience: "expert",
        availability: "busy",
        price: "$120/hour"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        title: "Data Science Manager at Netflix",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
        rating: 5.0,
        reviews: 156,
        bio: "Helping data professionals advance their careers. Expert in machine learning, analytics, and team leadership.",
        skills: ["Python", "Machine Learning", "Data Analysis", "Leadership"],
        experience: "expert",
        availability: "available",
        price: "$100/hour"
    },
    {
        id: 4,
        name: "David Kim",
        title: "DevOps Engineer at Amazon",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
        rating: 4.7,
        reviews: 73,
        bio: "Cloud infrastructure expert with 8 years of experience. Passionate about automation and scalable systems.",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        experience: "senior",
        availability: "available",
        price: "$90/hour"
    },
    {
        id: 5,
        name: "Lisa Thompson",
        title: "Marketing Director at HubSpot",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
        rating: 4.6,
        reviews: 94,
        bio: "Digital marketing strategist with expertise in growth hacking, content marketing, and brand building.",
        skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
        experience: "senior",
        availability: "busy",
        price: "$75/hour"
    },
    {
        id: 6,
        name: "Alex Patel",
        title: "Mobile App Developer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
        rating: 4.5,
        reviews: 62,
        bio: "iOS and Android developer with 6 years of experience. Love helping new developers build their first apps.",
        skills: ["Swift", "Kotlin", "React Native", "Flutter"],
        experience: "mid",
        availability: "available",
        price: "$65/hour"
    },
    {
        id: 7,
        name: "Rachel Green",
        title: "Product Manager at Spotify",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face",
        rating: 4.9,
        reviews: 118,
        bio: "Product management expert with focus on user-centric design and agile methodologies. 9 years of experience.",
        skills: ["Product Management", "Agile", "User Research", "Strategy"],
        experience: "senior",
        availability: "available",
        price: "$95/hour"
    },
    {
        id: 8,
        name: "James Wilson",
        title: "Cybersecurity Specialist",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&crop=face",
        rating: 4.8,
        reviews: 85,
        bio: "Cybersecurity expert helping professionals transition into security roles. Specializing in ethical hacking and compliance.",
        skills: ["Cybersecurity", "Penetration Testing", "Risk Assessment", "Compliance"],
        experience: "expert",
        availability: "busy",
        price: "$110/hour"
    }
];

let filteredMentors = [...mentorsData];
let displayedMentors = [];
let currentPage = 0;
const mentorsPerPage = 6;

// Navigation functions
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function toggleDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userProfile = document.querySelector('.user-profile');
    const dropdown = document.getElementById('userDropdown');

    if (!userProfile.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Search and filter functions
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    filteredMentors = mentorsData.filter(mentor => {
        return mentor.name.toLowerCase().includes(searchTerm) ||
            mentor.title.toLowerCase().includes(searchTerm) ||
            mentor.bio.toLowerCase().includes(searchTerm) ||
            mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm));
    });

    applyFilters();
}

function applyFilters() {
    const skillFilter = document.getElementById('skillFilter').value;
    const experienceFilter = document.getElementById('experienceFilter').value;
    const availabilityFilter = document.getElementById('availabilityFilter').value;
    const ratingFilter = document.getElementById('ratingFilter').value;

    let filtered = [...filteredMentors];

    if (skillFilter) {
        filtered = filtered.filter(mentor =>
            mentor.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()))
        );
    }

    if (experienceFilter) {
        filtered = filtered.filter(mentor => mentor.experience === experienceFilter);
    }

    if (availabilityFilter) {
        filtered = filtered.filter(mentor => mentor.availability === availabilityFilter);
    }

    if (ratingFilter) {
        const minRating = parseFloat(ratingFilter);
        filtered = filtered.filter(mentor => mentor.rating >= minRating);
    }

    filteredMentors = filtered;
    currentPage = 0;
    displayedMentors = [];

    updateResultsCount();
    loadMoreMentors();
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('skillFilter').value = '';
    document.getElementById('experienceFilter').value = '';
    document.getElementById('availabilityFilter').value = '';
    document.getElementById('ratingFilter').value = '';

    filteredMentors = [...mentorsData];
    currentPage = 0;
    displayedMentors = [];

    updateResultsCount();
    loadMoreMentors();
}

function updateResultsCount() {
    const count = filteredMentors.length;
    document.getElementById('resultsCount').textContent = count;
}

function loadMoreMentors() {
    const startIndex = currentPage * mentorsPerPage;
    const endIndex = startIndex + mentorsPerPage;
    const newMentors = filteredMentors.slice(startIndex, endIndex);

    displayedMentors = [...displayedMentors, ...newMentors];
    currentPage++;

    renderMentors();

    // Hide load more button if all mentors are displayed
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (displayedMentors.length >= filteredMentors.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
}

function renderMentors() {
    const mentorsGrid = document.getElementById('mentorsGrid');

    if (currentPage === 1) {
        mentorsGrid.innerHTML = '';
    }

    const startIndex = (currentPage - 1) * mentorsPerPage;
    const newMentors = displayedMentors.slice(startIndex);

    newMentors.forEach((mentor, index) => {
        const mentorCard = createMentorCard(mentor);
        mentorCard.style.animationDelay = `${index * 0.1}s`;
        mentorsGrid.appendChild(mentorCard);
    });
}

function createMentorCard(mentor) {
    const card = document.createElement('div');
    card.className = 'mentor-card';
    card.onclick = () => contactMentor(mentor.id);

    const stars = '★'.repeat(Math.floor(mentor.rating)) +
        (mentor.rating % 1 !== 0 ? '☆' : '') +
        '☆'.repeat(5 - Math.ceil(mentor.rating));

    const availabilityClass = mentor.availability === 'available' ? 'available' : 'busy';
    const availabilityText = mentor.availability === 'available' ? 'Available Now' : 'Limited Availability';

    card.innerHTML = `
        <div class="mentor-header">
            <img src="${mentor.avatar}" alt="${mentor.name}" class="mentor-avatar">
            <div class="mentor-info">
                <h3>${mentor.name}</h3>
                <div class="mentor-title">${mentor.title}</div>
            </div>
        </div>
        
        <div class="mentor-rating">
            <div class="stars">${stars}</div>
            <span class="rating-text">${mentor.rating} (${mentor.reviews} reviews)</span>
        </div>
        
        <div class="mentor-bio">${mentor.bio}</div>
        
        <div class="mentor-skills">
            ${mentor.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        
        <div class="mentor-footer">
            <div class="availability ${availabilityClass}">
                <div class="availability-dot"></div>
                ${availabilityText}
            </div>
            <a
  href="../mentor-details/details.html"
  class="contact-btn"
  style="text-decoration: none; color: white; display: inline-block; padding: 10px 20px; background-color: #007bff; border-radius: 5px;"
>
  Show More
</a>

        </div>
    `;
    
    return card;
}



// Search on Enter key
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateResultsCount();
    loadMoreMentors();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});