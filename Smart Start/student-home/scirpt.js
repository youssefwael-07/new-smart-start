 // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
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

        // Animate statistics counter
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number');
            
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 20);
            });
        }

        // Service card highlight effect
        function highlightCard(card) {
            // Remove highlight from all cards
            document.querySelectorAll('.service-card').forEach(c => {
                c.style.transform = '';
                c.style.boxShadow = '';
            });
            
            // Highlight clicked card
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 50px rgba(8, 145, 178, 0.3)';
            
            // Reset after 2 seconds
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 2000);
        }

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');
            const submitLoader = document.getElementById('submitLoader');
            const formMessage = document.getElementById('formMessage');
            
            // Show loading state
            submitText.style.display = 'none';
            submitLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset button state
                submitText.style.display = 'inline';
                submitLoader.style.display = 'none';
                submitBtn.disabled = false;
                
                // Show success message
                showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
            }, 2000);
        });

        // Show form message
        function showFormMessage(message, type) {
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = message;
            formMessage.className = `message ${type} show`;
            
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }

        // Show notification
        function showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--success);
                color: var(--foreground);
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 1001;
                animation: slideInRight 0.3s ease-out;
            `;
            notification.textContent = message;
            
            // Add slide-in animation
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
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => {
                    document.body.removeChild(notification);
                    document.head.removeChild(style);
                }, 300);
            }, 3000);
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.addEventListener('DOMContentLoaded', function() {
            const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .stat-card');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                observer.observe(el);
            });
        });

        // Add some interactive hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Easter egg: Konami code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
        
        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                showNotification('🎉 Konami Code Activated! You found the easter egg!');
                document.body.style.animation = 'pulse 2s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);
            }
        });

        // Initialize animations on page load
        window.addEventListener('load', function() {
            // Trigger initial animations
            setTimeout(() => {
                const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
                heroElements.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.2}s`;
                });
            }, 100);
        });