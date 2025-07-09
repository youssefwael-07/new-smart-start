// MINIMAL NAVBAR FIX - Just ensures it stays fixed, nothing else
;
(() => {
    function fixNavbar() {
        const navbar = document.getElementById("navbar")
        if (navbar) {
            // Only fix the positioning, don't touch anything else
            if (navbar.style.position !== "fixed") {
                navbar.style.position = "fixed"
                navbar.style.top = "0"
                navbar.style.left = "0"
                navbar.style.right = "0"
                navbar.style.zIndex = "9999"
            }
        }
    }

    // Run when page loads
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fixNavbar)
    } else {
        fixNavbar()
    }

    // Run on window load as backup
    window.addEventListener("load", fixNavbar)
})()

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger")
    const mobileMenu = document.getElementById("mobileMenu")
    const dropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle")

    // Toggle mobile menu
    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", function(e) {
            e.stopPropagation()
            hamburger.classList.toggle("active")
            mobileMenu.classList.toggle("active")
            document.body.classList.toggle("menu-open")
        })
    }

    // Mobile dropdown toggles
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", function(e) {
            e.preventDefault()
            e.stopPropagation()

            const submenu = this.nextElementSibling
            const isActive = this.classList.contains("active")

            // Close all other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
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
    document.addEventListener("click", function(e) {
        if (!document.getElementById("navbar").contains(e.target)) {
            hamburger.classList.remove("active")
            mobileMenu.classList.remove("active")
            document.body.classList.remove("menu-open")
        }
    })

    // Close mobile menu on window resize
    window.addEventListener("resize", function() {
        if (window.innerWidth > 1024) {
            hamburger.classList.remove("active")
            mobileMenu.classList.remove("active")
            document.body.classList.remove("menu-open")
        }
    })
})

// Scroll effect for navbar
window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar")
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
    } else {
        navbar.classList.remove("scrolled")
    }
})

// Create animated particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
    }
}

// Payment method selection
document.addEventListener("DOMContentLoaded", function() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            showToast('Payment method updated', 'success');
        });
    });
});

// Real-time form validation
function validateField(field, validator) {
    const isValid = validator(field.value);
    const icon = document.getElementById(field.id + '-icon');

    field.classList.remove('valid', 'invalid');
    if (icon) {
        icon.classList.remove('show', 'valid', 'invalid');

        if (field.value.length > 0) {
            icon.classList.add('show');
            if (isValid) {
                field.classList.add('valid');
                icon.classList.add('valid');
            } else {
                field.classList.add('invalid');
                icon.classList.add('invalid');
            }
        }
    }

    return isValid;
}

// Validation functions
const validators = {
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    cardNumber: (value) => {
        const cleaned = value.replace(/\s/g, '');
        return /^\d{13,19}$/.test(cleaned);
    },
    expiry: (value) => {
        const match = value.match(/^(\d{2})\/(\d{2})$/);
        if (!match) return false;
        const month = parseInt(match[1]);
        const year = parseInt(match[2]) + 2000;
        const now = new Date();
        const expiry = new Date(year, month - 1);
        return month >= 1 && month <= 12 && expiry > now;
    },
    cvv: (value) => /^\d{3,4}$/.test(value),
    cardholder: (value) => value.trim().length >= 2,
    zip: (value) => /^\d{5}(-\d{4})?$/.test(value)
};

// Format card number with spaces
function formatCardNumber(value) {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted;
}

// Format expiry date
function formatExpiry(value) {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
        return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
}

// Update credit card display
function updateCardDisplay() {
    const cardNumber = document.getElementById('card-number');
    const cardholder = document.getElementById('cardholder');
    const expiry = document.getElementById('expiry');
    const cardDisplay = document.getElementById('card-display');
    const nameDisplay = document.getElementById('name-display');
    const expiryDisplay = document.getElementById('expiry-display');

    if (cardNumber && cardDisplay) {
        const displayNumber = cardNumber.value || '•••• •••• •••• ••••';
        cardDisplay.textContent = displayNumber;
    }

    if (cardholder && nameDisplay) {
        const displayName = cardholder.value.toUpperCase() || 'YOUR NAME';
        nameDisplay.textContent = displayName;
    }

    if (expiry && expiryDisplay) {
        const displayExpiry = expiry.value || 'MM/YY';
        expiryDisplay.textContent = displayExpiry;
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const loading = document.getElementById('loading');
    const btnText = document.getElementById('btn-text');

    if (submitBtn && loading && btnText) {
        // Show loading state
        submitBtn.classList.add('processing');
        loading.style.display = 'inline-block';
        btnText.textContent = 'Processing Payment...';

        // Simulate payment processing
        setTimeout(() => {
            submitBtn.classList.remove('processing');
            loading.style.display = 'none';
            btnText.textContent = 'Payment Successful!';
            showToast('Payment completed successfully!', 'success');

            // Reset after 3 seconds
            setTimeout(() => {
                btnText.textContent = 'Complete Payment - $29.70';
            }, 3000);
        }, 2000);
    }
}

// Event listeners for form fields
document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    createParticles();

    // Show welcome toast
    showToast('Welcome! Your secure checkout is ready.', 'success');

    // Form field event listeners
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('input', function() {
            validateField(this, validators.email);
        });
    }

    const cardNumberField = document.getElementById('card-number');
    if (cardNumberField) {
        cardNumberField.addEventListener('input', function() {
            this.value = formatCardNumber(this.value);
            validateField(this, validators.cardNumber);
            updateCardDisplay();
        });
    }

    const expiryField = document.getElementById('expiry');
    if (expiryField) {
        expiryField.addEventListener('input', function() {
            this.value = formatExpiry(this.value);
            validateField(this, validators.expiry);
            updateCardDisplay();
        });
    }

    const cvvField = document.getElementById('cvv');
    if (cvvField) {
        cvvField.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
            validateField(this, validators.cvv);
        });
    }

    const cardholderField = document.getElementById('cardholder');
    if (cardholderField) {
        cardholderField.addEventListener('input', function() {
            validateField(this, validators.cardholder);
            updateCardDisplay();
        });
    }

    const zipField = document.getElementById('zip');
    if (zipField) {
        zipField.addEventListener('input', function() {
            validateField(this, validators.zip);
        });
    }

    // Form submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handleFormSubmit);
    }
});