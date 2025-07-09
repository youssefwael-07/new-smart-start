<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'db.php'; // إضافة الفاصلة المنقوطة المفقودة

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // استقبال البيانات مع التحقق
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $userType = isset($_POST['userType']) ? trim($_POST['userType']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // التحقق من البيانات المطلوبة
    if (empty($name) || empty($email) || empty($userType) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "Please fill all required fields";
        exit;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format";
        exit;
    }

    // التحقق من الاتصال بقاعدة البيانات
    if (!isset($conn) || $conn->connect_error) {
        http_response_code(500);
        echo "Database connection failed";
        exit;
    }

    // إعداد الاستعلام
    $stmt = $conn->prepare("INSERT INTO contact1 (name, email, phone, user_type, subject, message, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    
    if (!$stmt) {
        http_response_code(500);
        echo "Prepare failed: " . $conn->error;
        exit;
    }

    // ربط المعاملات
    $stmt->bind_param("ssssss", $name, $email, $phone, $userType, $subject, $message);

    // تنفيذ الاستعلام
    if ($stmt->execute()) {
        echo "success";
    } else {
        http_response_code(500);
        echo "Execute failed: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
    exit; // إنهاء معالجة PHP هنا
}
?>
    <!DOCTYPE html>

    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Us - Smart Start</title>
        <link rel="stylesheet" href="style.css">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">
        <!-- Font Awesome with integrity check -->
        <link crossorigin="anonymous" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" referrerpolicy="no-referrer" rel="stylesheet"
        />
        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" />
        <!-- SEO Meta Tags -->
        <meta content="SmartStart - The only way to success. Professional web development, cloud solutions, mobile apps, and data analytics services." name="description" />
        <meta content="web development, cloud solutions, mobile apps, data analytics, digital transformation" name="keywords" />
        <meta content="SmartStart" name="author" />
        <!-- Open Graph Meta Tags -->
        <meta content="SmartStart - The Only Way to Success" property="og:title" />
        <meta content="Professional digital solutions for your business transformation" property="og:description" />
        <meta content="website" property="og:type" />
        <meta content="https://smartstart.com" property="og:url" />
        <!-- Favicon -->
        <link href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwODkxYjIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTggMkw2IDZIMTBMOCAyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTggMTRMNiAxMEgxMEw4IDE0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo="
            rel="icon" type="image/x-icon" />
        <!-- Performance optimization -->
        <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    </head>

    <body>
     <!-- Navigation Bar -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <div class="logo-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <h2>Smart Start</h2>
            </div>

            <ul class="nav-menu" id="navMenu">
                <li class="nav-item">
                    <a href="../home/home.html" class="nav-link">
                        <span>Home</span>
                        <div class="nav-indicator"></div>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="../mentor/mentor.php" class="nav-link">
                        <span>Mentor</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <a href="../mentor/mentor.php" class="dropdown-item">Find Mentors</a>
                            <a href="../mentor-dashboard/mentor-dash.html" class="dropdown-item">Mentor Dashboard</a>
                            <a href="../mentor-comp/mentor-comp.html" class="dropdown-item">Mentor Comparison</a>
                            <a href="../mentor-details/details.html" class="dropdown-item">Mentor Details</a>
                            <a href="../upload courses/upload.html" class="dropdown-item">Upload page</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="../find-student/student.html" class="nav-link">
                        <span>Student</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <a href="../student-dashboard/index.html" class="dropdown-item">Student Dashboard</a>
                            <a href="../download/download.html" class="dropdown-item">Download Courses</a>
                            <a href="../student/student.html" class="dropdown-item">Find student</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="../contact-us/contact.php" class="nav-link active">
                        <span>Contact Us</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item">Live Chat</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="../about-us/About-us.html" class="nav-link ">
                        <span>About Us</span>
                        <div class="nav-indicator"></div>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="../user/profile-1.php" class="nav-link">
                        <span>Profile</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <a href="../payment/payment.php" class="dropdown-item">Payment</a>
                            <a href="../login-choices/index.html" class="dropdown-item">Log in</a>
                            <a href="../signup/signup.php" class="dropdown-item">Sign up</a>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="hamburger" id="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu" id="mobileMenu">
            <div class="mobile-menu-content">
                <div class="mobile-menu-item">
                    <a href="../home/home.html" class="mobile-link">Home</a>
                </div>
                <div class="mobile-menu-item">
                    <a href="#" class="mobile-link mobile-dropdown-toggle">
                        Mentor<span class="mobile-arrow">▼</span>
                    </a>
                    <div class="mobile-submenu">
                        <a href="../mentor/mentor.php" class="mobile-sublink">Find Mentors</a>
                        <a href="../mentor-dashboard/" class="mobile-sublink">Mentor Dashboard</a>
                        <a href="../mentor-comp/mentor-comp.html" class="mobile-sublink">Mentor Comparison</a>
                        <a href="../mentor-details/book_session.php" class="mobile-sublink">Mentor Details</a>
                        <a href="../upload courses/upload.html" class="mobile-sublink">Upload Page</a>
                    </div>
                </div>
                <div class="mobile-menu-item">
                    <a href="#" class="mobile-link mobile-dropdown-toggle">
                        Student<span class="mobile-arrow">▼</span>
                    </a>
                    <div class="mobile-submenu">
                        <a href="../student-dashboard/index.html" class="mobile-sublink">Student Dashboard</a>
                        <a href="../upload courses/upload.html" class="mobile-sublink">Upload Courses</a>
                        <a href="../student/find_student.html" class="mobile-sublink">Find Student</a>
                    </div>
                </div>
                <div class="mobile-menu-item">
                    <a href="#" class="mobile-link mobile-dropdown-toggle">
                        Contact Us<span class="mobile-arrow">▼</span>
                    </a>
                    <div class="mobile-submenu">
                        <a href="../contact-us/contact.php" class="mobile-sublink">Get in Touch</a>
                        <a href="#" class="mobile-sublink">Live Chat</a>
                    </div>
                </div>
                <div class="mobile-menu-item">
                    <a href="../about-us/About-us.html" class="mobile-link">About Us</a>
                </div>
                <div class="mobile-menu-item">
                    <a href="#" class="mobile-link mobile-dropdown-toggle">
                        Profile<span class="mobile-arrow">▼</span>
                    </a>
                    <div class="mobile-submenu">
                        <a href="../payment/payment.php" class="mobile-sublink">Payment</a>
                        <a href="../login-choices/index.html" class="mobile-sublink">Log in</a>
                        <a href="../signup/signup.php" class="mobile-sublink">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <h1>Get in Touch</h1>
                    <p>Have questions about our mentorship platform? Need support with your career guidance journey? We're here to help students and graduates connect with the right professional mentors.</p>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact-section">
            <div class="container">
                <div class="contact-grid">
                    <!-- Contact Form -->
                    <div class="contact-form-container">
                        <h2>Send us a Message</h2>
                        <form class="contact-form" id="contactForm">
                            <div class="form-group">
                                <label for="name">Full Name *</label>
                                <input type="text" id="name" name="name" required>
                                <span class="error-message" id="nameError"></span>
                            </div>

                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" name="email" required>
                                <span class="error-message" id="emailError"></span>
                            </div>

                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone">
                            </div>

                            <div class="form-group">
                                <label for="userType">I am a *</label>
                                <select id="userType" name="userType" required>
                                <option value="">Select your role</option>
                                <option value="student">Student</option>
                                <option value="graduate">Recent Graduate</option>
                                <option value="mentor">Potential Mentor</option>
                                <option value="institution">School/University Representative</option>
                                <option value="other">Other</option>
                            </select>
                                <span class="error-message" id="userTypeError"></span>
                            </div>

                            <div class="form-group">
                                <label for="subject">Subject *</label>
                                <select id="subject" name="subject" required>
                                <option value="">Select a subject</option>
                                <option value="mentorship">Mentorship Inquiry</option>
                                <option value="technical">Technical Support</option>
                                <option value="partnership">Partnership Opportunity</option>
                                <option value="feedback">Feedback</option>
                                <option value="other">Other</option>
                            </select>
                                <span class="error-message" id="subjectError"></span>
                            </div>

                            <div class="form-group">
                                <label for="message">Message *</label>
                                <textarea id="message" name="message" rows="5" placeholder="Tell us how we can help you with your career guidance journey..." required></textarea>
                                <span class="error-message" id="messageError"></span>
                            </div>

                            <button type="submit" class="submit-btn">
                            <span class="btn-text">Send Message</span>
                            <span class="btn-loading" style="display: none;">Sending...</span>
                        </button>
                        </form>

                        <div class="success-message" id="successMessage" style="display: none;">
                            <h3>Message Sent Successfully!</h3>
                            <p>Thank you for contacting Smart Start. We'll get back to you within 24 hours to help with your career guidance needs.</p>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div class="contact-info">
                        <h2>Contact Information</h2>

                        <div class="info-card">
                            <div class="info-icon">📧</div>
                            <div class="info-content">
                                <h3>Email Us</h3>
                                <p>support@smartstart.com</p>
                                <p>partnerships@smartstart.com</p>
                            </div>
                        </div>

                        <div class="info-card">
                            <div class="info-icon">📞</div>
                            <div class="info-content">
                                <h3>Call Us</h3>
                                <p>+1 (555) 123-4567</p>
                                <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>

                        <div class="info-card">
                            <div class="info-icon">💬</div>
                            <div class="info-content">
                                <h3>Live Chat</h3>
                                <p>Available 24/7 for urgent inquiries</p>
                                <button class="chat-btn">Start Chat</button>
                            </div>
                        </div>

                        <div class="info-card">
                            <div class="info-icon">🎯</div>
                            <div class="info-content">
                                <h3>Our Mission</h3>
                                <p>Connecting students and graduates with professional mentors for personalized career guidance and real-world insights.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section">
            <div class="container">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-grid">
                    <div class="faq-item">
                        <h3>How do I book a mentorship session?</h3>
                        <p>Simply browse our mentor profiles, select a mentor that matches your field of interest, and book a 20-minute session directly through our platform.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Are the sessions really free?</h3>
                        <p>We offer both free introductory sessions and premium sessions at symbolic prices. Many mentors provide their first session free to help students get started.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Can schools partner with Smart Start?</h3>
                        <p>Yes! We offer institutional partnerships to integrate career guidance into your school's curriculum. Contact us for custom solutions.</p>
                    </div>

                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Smart Start</h3>
                        <p>Empowering students and graduates with professional career guidance through experienced mentors.</p>
                    </div>
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="../home/home.html">Home</a></li>
                            <li><a href="../mentor/mentor.php">Find Mentors</a></li>
                            <li><a href="../about-us/about.html">About Us</a></li>
                            <li><a href="../contact-us/contact.php">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#help">Help Center</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 Smart Start. All rights reserved.</p>
                </div>
            </div>
        </footer>


        <script src="script.js"></script>
    </body>

    </html>