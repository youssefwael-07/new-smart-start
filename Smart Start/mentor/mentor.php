<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once "db.php";

// استقبال مدخلات البحث والفلترة
$search = $_GET['search'] ?? '';
$interest = $_GET['interest'] ?? 'all';

// بناء الاستعلام
$sql = "SELECT * FROM contact_messages WHERE 1";

// شرط البحث
if (!empty($search)) {
    $search = $conn->real_escape_string($search);
    $sql .= " AND (name LIKE '%$search%' OR email LIKE '%$search%' OR interest LIKE '%$search%' OR message LIKE '%$search%')";
}

// شرط الفلترة
if ($interest !== 'all') {
    $interest = $conn->real_escape_string($interest);
    $sql .= " AND interest = '$interest'";
}

// تنفيذ الاستعلام
$result = $conn->query($sql);
if (!$result) {
    die("SQL Error: " . $conn->error);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Find Your Mentor - MentorHub</title>
    <link rel="stylesheet" href="mentor.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
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
                    <a href="../mentor/mentor.php" class="nav-link active ">
                        <span>Mentor</span>
                        <div class="nav-indicator "></div>
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
                    <a href="../contact-us/contact.php" class="nav-link ">
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
    <!-- Main Content -->
    <main class="main-content">
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-content">
                <h1>Find Your Perfect Mentor</h1>
                <p>Connect with experienced professionals who can guide your career journey</p>
                
                <!-- Search Bar -->
                <div class="search-container">
                    <div class="search-bar">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" id="searchInput" placeholder="Search by skills, expertise, or name..." class="search-input">
                        <button class="search-btn" onclick="performSearch()">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Filters Section -->
        <section class="filters-section">
            <div class="filters-container">
                <h3>Filter Mentors</h3>
                <div class="filters-grid">
                    <div class="filter-group">
                        <label for="skillFilter">Skills</label>
                        <select id="skillFilter" onchange="applyFilters()">
                            <option value="">All Skills</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="react">React</option>
                            <option value="nodejs">Node.js</option>
                            <option value="design">UI/UX Design</option>
                            <option value="marketing">Digital Marketing</option>
                            <option value="data-science">Data Science</option>
                            <option value="product-management">Product Management</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="experienceFilter">Experience Level</label>
                        <select id="experienceFilter" onchange="applyFilters()">
                            <option value="">All Levels</option>
                            <option value="junior">Junior (1-3 years)</option>
                            <option value="mid">Mid-level (3-7 years)</option>
                            <option value="senior">Senior (7-12 years)</option>
                            <option value="expert">Expert (12+ years)</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="availabilityFilter">Availability</label>
                        <select id="availabilityFilter" onchange="applyFilters()">
                            <option value="">All</option>
                            <option value="available">Available Now</option>
                            <option value="busy">Limited Availability</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="ratingFilter">Rating</label>
                        <select id="ratingFilter" onchange="applyFilters()">
                            <option value="">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4+ Stars</option>
                            <option value="3">3+ Stars</option>
                        </select>
                    </div>
                </div>
                
                <button class="clear-filters-btn" onclick="clearFilters()">
                    <i class="fas fa-times"></i> Clear Filters
                </button>
            </div>
        </section>

        <!-- Results Section -->
        <section class="results-section">
            <div class="results-header">
                <h2>Available Mentors</h2>
                <div class="results-count">
                    <span id="resultsCount">12</span> mentors found
                </div>
            </div>
            
            <!-- Mentor Cards Grid -->
            <div  class="mentors-grid" id="mentorsGrid">
                <!-- Mentor cards will be populated by JavaScript -->
            </div>
            
            <!-- Load More Button -->
            <div class="load-more-container">
                <button class="load-more-btn" onclick="loadMoreMentors()">
                    <i class="fas fa-plus"></i> Load More Mentors
                </button>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>MentorHub</h4>
                <p>Connecting mentors and mentees worldwide</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <a href="#">Find Mentors</a>
                <a href="#">Become a Mentor</a>
                <a href="#">About Us</a>
            </div>
            <div class="footer-section">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact Us</a>
                <a href="#">Privacy Policy</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Smartstart. All rights reserved.</p>
        </div>
    </footer>

    <script src="mentor.js"></script>
    
</body>
</html>