<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'] ?? '';
    $card_number = $_POST['card_number'] ?? '';
    $expiry = $_POST['expiry'] ?? '';
    $cvv = $_POST['cvv'] ?? '';
    $cardholder = $_POST['cardholder'] ?? '';
    $country = $_POST['country'] ?? '';
    $zip = $_POST['zip'] ?? '';
    $total = $_POST['total'] ?? '0.00';

    // تحقق بسيط
    if (!$email || !$card_number || !$expiry || !$cvv || !$cardholder || !$country || !$zip) {
        echo "Please fill all required fields.";
        exit;
    }

    // إدخال البيانات باستخدام bind_param
    $stmt = $conn->prepare("INSERT INTO payments (email, card_number, expiry, cvv, cardholder, country, zip, total_amount)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    // "sssssssd" معناها:
    // s = string, d = double
    $stmt->bind_param("sssssssd", $email, $card_number, $expiry, $cvv, $cardholder, $country, $zip, $total);

    $success = $stmt->execute();

    if ($success) {
        echo "✅ Payment recorded successfully!";
    } else {
        echo "❌ Payment failed. Please try again.";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Session Payment - Dr. Sarah Ahmed</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="payment.css">
    <!-- Font Awesome with integrity check -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- SEO Meta Tags -->
    <meta name="description" content="SmartStart - The only way to success. Professional web development, cloud solutions, mobile apps, and data analytics services.">
    <meta name="keywords" content="web development, cloud solutions, mobile apps, data analytics, digital transformation">
    <meta name="author" content="SmartStart">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="SmartStart - The Only Way to Success">
    <meta property="og:description" content="Professional digital solutions for your business transformation">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://smartstart.com">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwODkxYjIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTggMkw2IDZIMTBMOCAyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTggMTRMNiAxMEgxMEw4IDE0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=">

    <!-- Performance optimization -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
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
                    <a href="../contact-us/contact.php" class="nav-link">
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
    
    <!-- Animated Background Particles -->
    <div class="bg-particles" id="particles"></div>

   

    <!-- Main Container -->
    <div class="container">
        <div class="payment-wrapper">
            <!-- Order Summary Sidebar -->
            <div class="order-summary">
                <h2 class="section-title">
                    <i class="fas fa-receipt"></i>
                    Session Summary
                </h2>
                
                <!-- Mentor Info -->
                <div class="mentor-info">
                    <div class="mentor-avatar">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div class="mentor-details">
                        <h3>Dr. Sarah Ahmed</h3>
                        <p>Cardiologist & Medical Mentor</p>
                        <p><i class="fas fa-star" style="color: var(--warning);"></i> 4.9 (127 reviews)</p>
                    </div>
                </div>
                
                <div class="order-item">
                    <div class="item-details">
                        <div class="item-icon">
                            <i class="fas fa-video"></i>
                        </div>
                        <div class="item-info">
                            <h4>Premium Session</h4>
                            <p>20 minutes • Video consultation</p>
                        </div>
                    </div>
                    <div class="item-price">$25.00</div>
                </div>
                
                <div class="order-item">
                    <div class="item-details">
                        <div class="item-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="item-info">
                            <h4>Session Notes</h4>
                            <p>Detailed written summary</p>
                        </div>
                    </div>
                    <div class="item-price">Included</div>
                </div>
                
                <div class="order-item">
                    <div class="item-details">
                        <div class="item-icon">
                            <i class="fas fa-headset"></i>
                        </div>
                        <div class="item-info">
                            <h4>Follow-up Support</h4>
                            <p>Email support for 7 days</p>
                        </div>
                    </div>
                    <div class="item-price">Included</div>
                </div>

                <div class="total-section">
                    <div class="total-row">
                        <span>Session Fee:</span>
                        <span>$25.00</span>
                    </div>
                    <div class="total-row">
                        <span>Platform Fee:</span>
                        <span>$2.50</span>
                    </div>
                    <div class="total-row">
                        <span>Tax:</span>
                        <span>$2.20</span>
                    </div>
                    <div class="total-row final">
                        <span>Total:</span>
                        <span id="total">$29.70</span>
                    </div>
                </div>
            </div>

            <!-- Payment Form Section -->
            <div class="payment-section">
                <h2 class="section-title">
                    <i class="fas fa-credit-card"></i>
                    Payment Details
                </h2>
                
                <!-- Credit Card Visual -->
                <div class="credit-card">
                    <div class="card-header">
                        <div class="card-brand">MENTORLINK PREMIUM</div>
                        <div class="card-type">VISA</div>
                    </div>
                    <div class="card-number-display" id="card-display">•••• •••• •••• ••••</div>
                    <div class="card-details">
                        <div>
                            <div style="font-size: 0.7rem; opacity: 0.8;">CARDHOLDER</div>
                            <div id="name-display">YOUR NAME</div>
                        </div>
                        <div>
                            <div style="font-size: 0.7rem; opacity: 0.8;">EXPIRES</div>
                            <div id="expiry-display">MM/YY</div>
                        </div>
                    </div>
                </div>

                <div class="payment-methods">
                    <div class="payment-method active" data-method="card">
                        <span><i class="fas fa-credit-card"></i> Credit Card</span>
                    </div>
                    <div class="payment-method" data-method="paypal">
                        <span><i class="fab fa-paypal"></i> PayPal</span>
                    </div>
                    <div class="payment-method" data-method="apple">
                        <span><i class="fab fa-apple-pay"></i> Apple Pay</span>
                    </div>
                </div>

                <form id="payment-form">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <div class="input-container">
                            <input type="email" id="email" placeholder="your@email.com" required>
                            <div class="input-icon" id="email-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="card-number">Card Number</label>
                        <div class="input-container">
                            <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19" required>
                            <div class="input-icon" id="card-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiry">Expiry Date</label>
                            <div class="input-container">
                                <input type="text" id="expiry" placeholder="MM/YY" maxlength="5" required>
                                <div class="input-icon" id="expiry-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <div class="input-container">
                                <input type="text" id="cvv" placeholder="123" maxlength="4" required>
                                <div class="input-icon" id="cvv-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="cardholder">Cardholder Name</label>
                        <div class="input-container">
                            <input type="text" id="cardholder" placeholder="John Doe" required>
                            <div class="input-icon" id="name-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="country">Country</label>
                            <select id="country" required>
                                <option value="">Select Country</option>
                                <option value="US">🇺🇸 United States</option>
                                <option value="CA">🇨🇦 Canada</option>
                                <option value="UK">🇬🇧 United Kingdom</option>
                                <option value="AU">🇦🇺 Australia</option>
                                <option value="DE">🇩🇪 Germany</option>
                                <option value="FR">🇫🇷 France</option>
                                <option value="EG">🇪🇬 Egypt</option>
                                <option value="SA">🇸🇦 Saudi Arabia</option>
                                <option value="AE">🇦🇪 UAE</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="zip">ZIP Code</label>
                            <div class="input-container">
                                <input type="text" id="zip" placeholder="10001" required>
                                <div class="input-icon" id="zip-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="submit-btn" id="submit-btn">
                        <div class="loading-spinner" id="loading"></div>
                        <i class="fas fa-lock" id="lock-icon"></i>
                        <span id="btn-text">Complete Payment - $29.70</span>
                    </button>
                </form>

                <div class="security-features">
                    <div class="security-item">
                        <i class="fas fa-shield-alt security-icon"></i>
                        <div>SSL Encrypted</div>
                    </div>
                    <div class="security-item">
                        <i class="fas fa-check-circle security-icon"></i>
                        <div>PCI Compliant</div>
                    </div>
                    <div class="security-item">
                        <i class="fas fa-university security-icon"></i>
                        <div>Bank Level Security</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast" id="toast"></div>

    <script src="payment.js"></script>
</body>
</html>
