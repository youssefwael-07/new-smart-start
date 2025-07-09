<?php
require_once "db.php";
// التحقق من أن الطلب هو POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // استقبال البيانات وتأمينها
    $url = $conn->real_escape_string(trim($_POST['video_url']));
    $title = $conn->real_escape_string(trim($_POST['video_title']));
    $desc = $conn->real_escape_string(trim($_POST['video_desc']));
    $category = $conn->real_escape_string(trim($_POST['video_category']));

    // التحقق من أن الحقول الأساسية غير فارغة
    if (!empty($url) && !empty($title) && !empty($category)) {
        $sql = "INSERT INTO videos (url, title, description, category, created_at)
                VALUES ('$url', '$title', '$desc', '$category', NOW())";

        if ($conn->query($sql) === TRUE) {
            echo "success";
        } else {
            echo "Database error: " . $conn->error;
        }
    } else {
        echo "Please fill in all required fields.";
    }
}

$conn->close();
?>
