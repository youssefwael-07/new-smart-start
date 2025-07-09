<?php
session_start();
require_once "db.php";

$success = $error = "";

// Handle AJAX request for username
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['get_username'])) {
    $email = trim($_POST["email"]);
    
    $stmt = $conn->prepare("SELECT username FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    header('Content-Type: application/json');
    if ($user && $user['username']) {
        echo json_encode(['success' => true, 'username' => $user['username']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
    exit();
}

// Handle AJAX request for fetching user data
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['action']) && $_POST['action'] === 'fetch_user') {
    $email = trim($_POST["email"]);
    
    $stmt = $conn->prepare("SELECT id, username, profile_image FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    header('Content-Type: application/json');
    if ($user) {
        echo json_encode([
            'success' => true,
            'username' => $user['username'] ?? 'User',
            'profile_image' => $user['profile_image'] ? 'uploads/' . $user['profile_image'] : null
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
    exit();
}

// Handle image upload
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["profile_image"])) {
    $email = trim($_POST["email"]);

    if (empty($email)) {
        $error = "Email is required.";
    } else {
        $stmt = $conn->prepare("SELECT id, username FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            $user_id = $user['id'];
            $image = $_FILES["profile_image"];

            // Validate image
            $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            $max_size = 5 * 1024 * 1024; // 5MB

            if ($image['error'] === 0) {
                if (in_array($image['type'], $allowed_types) && $image['size'] <= $max_size) {
                    $ext = pathinfo($image["name"], PATHINFO_EXTENSION);
                    $new_name = "profile_" . $user_id . "_" . time() . "." . $ext;
                    $upload_path = "uploads/" . $new_name;

                    // Create uploads directory if it doesn't exist
                    if (!is_dir('uploads')) {
                        mkdir('uploads', 0755, true);
                    }

                    // Delete old profile image if exists
                    if (isset($_SESSION["profile_image"]) && file_exists("uploads/" . $_SESSION["profile_image"])) {
                        unlink("uploads/" . $_SESSION["profile_image"]);
                    }

                    if (move_uploaded_file($image["tmp_name"], $upload_path)) {
                        $stmt = $conn->prepare("UPDATE users SET profile_image = ? WHERE id = ?");
                        $stmt->bind_param("si", $new_name, $user_id);
                        
                        if ($stmt->execute()) {
                            // Update session with new image
                            $_SESSION["profile_image"] = $new_name;
                            $_SESSION["user_id"] = $user_id;
                            $_SESSION["username"] = $user['username'];
                            
                            $success = "Profile image updated successfully!";
                        } else {
                            $error = "Failed to update database.";
                        }
                    } else {
                        $error = "Failed to upload image.";
                    }
                } else {
                    $error = "Invalid image file. Please upload JPEG, PNG, GIF, or WebP files under 5MB.";
                }
            } else {
                $error = "Error uploading file: " . $image['error'];
            }
        } else {
            $error = "Email not found.";
        }
    }
}

// Get current profile image for display
$current_image = isset($_SESSION['profile_image']) ? 'uploads/' . $_SESSION['profile_image'] : '/placeholder.svg?height=120&width=120';
$current_username = isset($_SESSION['username']) ? $_SESSION['username'] : 'John Doe';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Profile - Smart Start</title>
    <link rel="stylesheet" href="profile.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- GSAP Animation Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js"></script>
    
    <meta name="description" content="Interactive SmartStart Profile with advanced animations and responsive design">
    <meta name="keywords" content="profile, interactive, animations, responsive, learning platform">
    <meta name="author" content="SmartStart">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwODkxYjIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTggMkw2IDZIMTBMOCAyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTggMTRMNiAxMEgxMEw4IDE0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=">
</head>
<body>
    <!-- Animated Background -->
    <div class="animated-background">
        <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
            <div class="shape shape-5"></div>
        </div>
        <div class="particles-container" id="particlesContainer"></div>
    </div>
    
    

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
                    <a href="../user/profile-1.php" class="nav-link active">
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
                        <a href="../mentor-details/details.html" class="mobile-sublink">Mentor Details</a>
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

    <main class="main-content">
        <!-- Success/Error Messages -->
        <div id="alertContainer" class="alert-container"></div>

        <!-- Profile Header -->
        <section class="profile-header" id="profileHeader">
            <div class="container">
                <div class="profile-info">
                    <div class="profile-avatar-container">
                        <div class="profile-avatar" id="profileAvatarContainer">
                            <img id="profileImage" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile Picture">
                            <div class="upload-overlay">
                                <i class="fas fa-camera"></i>
                                <span>Change Photo</span>
                            </div>
                            <div class="avatar-ring"></div>
                            <div class="avatar-glow"></div>
                        </div>
                        <div class="status-indicator online"></div>
                    </div>
                    
                    <div class="profile-details">
                        <div class="profile-name-section">
                            <h1 id="displayUsername" class="profile-name">John Doe</h1>
                            <div class="verification-badge">
                                <i class="fas fa-check-circle"></i>
                            </div>
                        </div>
                        <p class="profile-username" id="displayEmail">@johndoe</p>
                        <p class="profile-bio">Content creator and lifelong learner. Passionate about technology and education. Building the future one line of code at a time.</p>
                        
                        <div class="profile-badges">
                            <span class="badge badge-premium">
                                <i class="fas fa-crown"></i>
                                Premium
                            </span>
                            <span class="badge badge-mentor">
                                <i class="fas fa-user-tie"></i>
                                Mentor
                            </span>
                            <span class="badge badge-verified">
                                <i class="fas fa-shield-alt"></i>
                                Verified
                            </span>
                        </div>

                        <div class="profile-stats">
                            <div class="stat-item">
                                <div class="stat-number" data-target="127">0</div>
                                <div class="stat-label">Videos Watched</div>
                                <div class="stat-progress">
                                    <div class="progress-bar" data-progress="85"></div>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" data-target="23">0</div>
                                <div class="stat-label">Saved</div>
                                <div class="stat-progress">
                                    <div class="progress-bar" data-progress="65"></div>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" data-target="8">0</div>
                                <div class="stat-label">Mentors</div>
                                <div class="stat-progress">
                                    <div class="progress-bar" data-progress="40"></div>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" data-target="156">0</div>
                                <div class="stat-label">Achievements</div>
                                <div class="stat-progress">
                                    <div class="progress-bar" data-progress="92"></div>
                                </div>
                            </div>
                        </div>

                        <div class="profile-actions">
                            <button class="btn btn-primary interactive-btn" id="editProfileBtn">
                                <i class="fas fa-edit"></i>
                                <span>Edit Profile</span>
                            </button>
                            <button class="btn btn-secondary interactive-btn" id="shareProfileBtn">
                                <i class="fas fa-share-alt"></i>
                                <span>Share</span>
                            </button>
                            <button class="btn btn-outline interactive-btn" id="downloadDataBtn">
                                <i class="fas fa-download"></i>
                                <span>Export Data</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Interactive Tabs Section -->
        <section class="content-section">
            <div class="container">
                <div class="tabs-container">
                    <div class="tabs-wrapper">
                        <button class="tab-btn active interactive-btn" data-tab="dashboard">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                            <div class="tab-indicator"></div>
                        </button>
                        <button class="tab-btn interactive-btn" data-tab="history">
                            <i class="fas fa-history"></i>
                            <span>History</span>
                            <div class="tab-indicator"></div>
                        </button>
                        <button class="tab-btn interactive-btn" data-tab="mentors">
                            <i class="fas fa-users"></i>
                            <span>Mentors</span>
                            <div class="tab-indicator"></div>
                        </button>
                        <button class="tab-btn interactive-btn" data-tab="liked">
                            <i class="fas fa-heart"></i>
                            <span>Liked</span>
                            <div class="tab-indicator"></div>
                        </button>
                        <button class="tab-btn interactive-btn" data-tab="saved">
                            <i class="fas fa-bookmark"></i>
                            <span>Saved</span>
                            <div class="tab-indicator"></div>
                        </button>
                        <button class="tab-btn interactive-btn" data-tab="settings">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                            <div class="tab-indicator"></div>
                        </button>
                    </div>
                </div>

                <!-- Dashboard Tab -->
                <div id="dashboard" class="tab-content active">
                    <div class="dashboard-grid">
                        <div class="dashboard-card activity-card">
                            <div class="card-header">
                                <h3>Recent Activity</h3>
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="activity-list" id="activityList">
                                <!-- Populated by JavaScript -->
                            </div>
                        </div>

                        <div class="dashboard-card progress-card">
                            <div class="card-header">
                                <h3>Learning Progress</h3>
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="progress-items">
                                <div class="progress-item">
                                    <div class="progress-info">
                                        <span class="course-name">JavaScript Mastery</span>
                                        <span class="progress-percent">85%</span>
                                    </div>
                                    <div class="progress-track">
                                        <div class="progress-fill" data-progress="85"></div>
                                    </div>
                                </div>
                                <div class="progress-item">
                                    <div class="progress-info">
                                        <span class="course-name">React Development</span>
                                        <span class="progress-percent">72%</span>
                                    </div>
                                    <div class="progress-track">
                                        <div class="progress-fill" data-progress="72"></div>
                                    </div>
                                </div>
                                <div class="progress-item">
                                    <div class="progress-info">
                                        <span class="course-name">Node.js Backend</span>
                                        <span class="progress-percent">45%</span>
                                    </div>
                                    <div class="progress-track">
                                        <div class="progress-fill" data-progress="45"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dashboard-card achievements-card">
                            <div class="card-header">
                                <h3>Achievements</h3>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="achievements-grid">
                                <div class="achievement-item earned">
                                    <i class="fas fa-code"></i>
                                    <span>First Code</span>
                                </div>
                                <div class="achievement-item earned">
                                    <i class="fas fa-fire"></i>
                                    <span>7 Day Streak</span>
                                </div>
                                <div class="achievement-item earned">
                                    <i class="fas fa-star"></i>
                                    <span>Top Student</span>
                                </div>
                                <div class="achievement-item">
                                    <i class="fas fa-rocket"></i>
                                    <span>Speed Learner</span>
                                </div>
                            </div>
                        </div>

                        <div class="dashboard-card stats-card">
                            <div class="card-header">
                                <h3>Quick Stats</h3>
                                <i class="fas fa-chart-pie"></i>
                            </div>
                            <div class="stats-grid">
                                <div class="stat-box">
                                    <div class="stat-icon">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="stat-info">
                                        <div class="stat-value">24h</div>
                                        <div class="stat-name">Study Time</div>
                                    </div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-icon">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                    <div class="stat-info">
                                        <div class="stat-value">89</div>
                                        <div class="stat-name">Completed</div>
                                    </div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-icon">
                                        <i class="fas fa-medal"></i>
                                    </div>
                                    <div class="stat-info">
                                        <div class="stat-value">12</div>
                                        <div class="stat-name">Badges</div>
                                    </div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-icon">
                                        <i class="fas fa-users"></i>
                                    </div>
                                    <div class="stat-info">
                                        <div class="stat-value">156</div>
                                        <div class="stat-name">Connections</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- History Tab -->
                <div id="history" class="tab-content">
                    <div class="content-header">
                        <h2>Watch History</h2>
                        <div class="header-actions">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" placeholder="Search history..." id="historySearch">
                            </div>
                            <button class="btn btn-secondary interactive-btn" id="clearHistoryBtn">
                                <i class="fas fa-trash"></i>
                                <span>Clear History</span>
                            </button>
                        </div>
                    </div>
                    <div class="video-grid" id="historyGrid">
                        <!-- Content populated by JavaScript -->
                    </div>
                </div>

                <!-- Mentors Tab -->
                <div id="mentors" class="tab-content">
                    <div class="content-header">
                        <h2>My Mentors</h2>
                        <div class="header-actions">
                            <div class="filter-dropdown">
                                <select id="mentorFilter" class="filter-select">
                                    <option value="all">All Mentors</option>
                                    <option value="active">Active</option>
                                    <option value="favorites">Favorites</option>
                                </select>
                            </div>
                            <button class="btn btn-primary interactive-btn" id="findMentorsBtn">
                                <i class="fas fa-search"></i>
                                <span>Find More Mentors</span>
                            </button>
                        </div>
                    </div>
                    <div class="mentors-grid" id="mentorsGrid">
                        <!-- Content populated by JavaScript -->
                    </div>
                </div>

                <!-- Liked Tab -->
                <div id="liked" class="tab-content">
                    <div class="content-header">
                        <h2>Liked Videos</h2>
                        <div class="header-actions">
                            <div class="view-options">
                                <button class="view-btn active interactive-btn" data-view="grid" title="Grid View">
                                    <i class="fas fa-th"></i>
                                </button>
                                <button class="view-btn interactive-btn" data-view="list" title="List View">
                                    <i class="fas fa-list"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="video-grid" id="likedGrid">
                        <!-- Content populated by JavaScript -->
                    </div>
                </div>

                <!-- Saved Tab -->
                <div id="saved" class="tab-content">
                    <div class="content-header">
                        <h2>Saved Videos</h2>
                        <div class="header-actions">
                            <button class="btn btn-primary interactive-btn" id="createPlaylistBtn">
                                <i class="fas fa-plus"></i>
                                <span>Create Playlist</span>
                            </button>
                        </div>
                    </div>
                    <div class="video-grid" id="savedGrid">
                        <!-- Content populated by JavaScript -->
                    </div>
                </div>

                <!-- Settings Tab -->
                <div id="settings" class="tab-content">
                    <div class="content-header">
                        <h2>Profile Settings</h2>
                    </div>
                    
                    <div class="settings-container">
                        <div class="settings-section">
                            <h3>Personal Information</h3>
                            <form id="profileForm" class="settings-form">
                                <div class="form-group">
                                    <label for="fullName">
                                        <i class="fas fa-user"></i>
                                        Full Name
                                    </label>
                                    <input type="text" id="fullName" name="fullName" value="John Doe" class="form-input">
                                </div>
                                
                                <div class="form-group">
                                    <label for="email">
                                        <i class="fas fa-envelope"></i>
                                        Email Address
                                    </label>
                                    <input type="email" id="email" name="email" value="john.doe@example.com" class="form-input">
                                    <div id="emailStatus" class="input-status"></div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="bio">
                                        <i class="fas fa-align-left"></i>
                                        Bio
                                    </label>
                                    <textarea id="bio" name="bio" rows="4" class="form-input">Content creator and lifelong learner. Passionate about technology and education.</textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label for="profileImage">
                                        <i class="fas fa-image"></i>
                                        Profile Image
                                    </label>
                                    <div class="file-input-wrapper" id="fileInputWrapper">
                                        <input type="file" id="profileImageInput" name="profileImage" accept="image/*" class="file-input">
                                        <div class="file-input-display">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                            <span>Click to upload or drag and drop</span>
                                            <small>Supported: JPEG, PNG, GIF, WebP (Max: 5MB)</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-actions">
                                    <button type="submit" class="btn btn-primary interactive-btn">
                                        <i class="fas fa-save"></i>
                                        <span>Save Changes</span>
                                    </button>
                                    <button type="button" class="btn btn-secondary interactive-btn" id="resetFormBtn">
                                        <i class="fas fa-undo"></i>
                                        <span>Reset</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div class="settings-section">
                            <h3>Preferences</h3>
                            <div class="preferences-grid">
                                <div class="preference-item">
                                    <div class="preference-info">
                                        <h4>Email Notifications</h4>
                                        <p>Receive updates about your learning progress</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                
                                <div class="preference-item">
                                    <div class="preference-info">
                                        <h4>Push Notifications</h4>
                                        <p>Get notified about new content and messages</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                
                                <div class="preference-item">
                                    <div class="preference-info">
                                        <h4>Auto-play Videos</h4>
                                        <p>Automatically play next video in playlist</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                
                                <div class="preference-item">
                                    <div class="preference-info">
                                        <h4>Dark Mode</h4>
                                        <p>Use dark theme for better viewing experience</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="darkModeToggle">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Toast Notifications -->
    <div class="toast-container" id="toastContainer"></div>

    <!-- Modal for Image Preview -->
    <div class="modal" id="imageModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Profile Image Preview</h3>
                <button class="modal-close" id="modalCloseBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <img id="modalImage" src="/placeholder.svg" alt="Preview">
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary interactive-btn" id="confirmImageBtn">
                    <i class="fas fa-check"></i>
                    <span>Confirm</span>
                </button>
                <button class="btn btn-secondary interactive-btn" id="cancelImageBtn">
                    <i class="fas fa-times"></i>
                    <span>Cancel</span>
                </button>
            </div>
        </div>
    </div>

    <script src="profile.js"></script>
</body>
</html>
