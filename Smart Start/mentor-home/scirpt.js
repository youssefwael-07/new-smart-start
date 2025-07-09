 // JavaScript for Interactive Elements and Animations
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



 // Scroll reveal animation
 const observerOptions = {
     threshold: 0.1,
     rootMargin: '0px 0px -50px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('active');
         }
     });
 }, observerOptions);

 // Observe all elements with reveal class
 document.querySelectorAll('.reveal').forEach(el => {
     observer.observe(el);
 });

 // Contact form handling
 const contactForm = document.getElementById('contact-form');
 contactForm.addEventListener('submit', function(e) {
     e.preventDefault();

     // Get form data
     const formData = new FormData(this);
     const name = formData.get('name');
     const email = formData.get('email');
     const subject = formData.get('subject');
     const message = formData.get('message');

     // Simple form validation
     if (!name || !email || !subject || !message) {
         showNotification('Please fill in all fields.', 'error');
         return;
     }

     // Email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
         showNotification('Please enter a valid email address.', 'error');
         return;
     }

     // Simulate form submission
     const submitButton = this.querySelector('button[type="submit"]');
     const originalText = submitButton.textContent;
     submitButton.textContent = 'Sending...';
     submitButton.disabled = true;

     setTimeout(() => {
         showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
         this.reset();
         submitButton.textContent = originalText;
         submitButton.disabled = false;
     }, 2000);
 });

 // Notification system
 function showNotification(message, type) {
     // Create notification element
     const notification = document.createElement('div');
     notification.className = `notification ${type}`;
     notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: var(--foreground);
                font-weight: 500;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            `;

     // Set background color based on type
     if (type === 'success') {
         notification.style.background = 'var(--success)';
     } else if (type === 'error') {
         notification.style.background = 'var(--error)';
     } else {
         notification.style.background = 'var(--warning)';
     }

     notification.textContent = message;
     document.body.appendChild(notification);

     // Animate in
     setTimeout(() => {
         notification.style.transform = 'translateX(0)';
     }, 100);

     // Remove after 5 seconds
     setTimeout(() => {
         notification.style.transform = 'translateX(100%)';
         setTimeout(() => {
             document.body.removeChild(notification);
         }, 300);
     }, 5000);
 }

 // Service card hover effects
 const serviceCards = document.querySelectorAll('.service-card');
 serviceCards.forEach(card => {
     card.addEventListener('mouseenter', function() {
         this.style.transform = 'translateY(-5px) scale(1.02)';
     });

     card.addEventListener('mouseleave', function() {
         this.style.transform = 'translateY(-5px)';
     });
 });

 // Testimonial card stagger animation
 const testimonialCards = document.querySelectorAll('.testimonial-card');
 testimonialCards.forEach((card, index) => {
     card.style.animationDelay = `${index * 0.2}s`;
 });

 // Add loading class to body when page loads
 window.addEventListener('load', () => {
     document.body.classList.add('loading');
 });

 // Parallax effect for hero section
 window.addEventListener('scroll', () => {
     const scrolled = window.pageYOffset;
     const hero = document.querySelector('.hero');
     const rate = scrolled * -0.5;

     if (hero) {
         hero.style.transform = `translateY(${rate}px)`;
     }
 });

 // Button click effects
 document.querySelectorAll('.btn').forEach(button => {
     button.addEventListener('click', function(e) {
         // Create ripple effect
         const ripple = document.createElement('span');
         const rect = this.getBoundingClientRect();
         const size = Math.max(rect.width, rect.height);
         const x = e.clientX - rect.left - size / 2;
         const y = e.clientY - rect.top - size / 2;

         ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

         this.appendChild(ripple);

         setTimeout(() => {
             ripple.remove();
         }, 600);
     });
 });

 // Add ripple animation keyframes
 const style = document.createElement('style');
 style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
 document.head.appendChild(style);

 // Console welcome message
 console.log('%cWelcome to MentorHub! 🚀', 'color: #06b6d4; font-size: 20px; font-weight: bold;');
 console.log('%cThis website was built with modern web technologies and best practices.', 'color: #cbd5e1; font-size: 14px;');