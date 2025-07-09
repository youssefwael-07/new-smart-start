<?php
// تفعيل عرض الأخطاء للتشخيص
error_reporting(E_ALL);
ini_set('display_errors', 1);

// إعداد headers
header('Content-Type: text/plain; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// تسجيل محاولة الوصول
$logFile = 'signup_log.txt';
file_put_contents($logFile, date('Y-m-d H:i:s') . " - تم الوصول إلى signup.php\n", FILE_APPEND);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        // تسجيل البيانات المستلمة
        file_put_contents($logFile, date('Y-m-d H:i:s') . " - POST Data: " . print_r($_POST, true) . "\n", FILE_APPEND);
        
        // التحقق من وجود البيانات المطلوبة
        $requiredFields = ['signupName', 'signupEmail', 'signupPassword', 'userType'];
        foreach ($requiredFields as $field) {
            if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
                throw new Exception("الحقل المطلوب مفقود: $field");
            }
        }
        
        $name = trim($_POST['signupName']);
        $email = trim($_POST['signupEmail']);
        $password = $_POST['signupPassword'];
        $userType = $_POST['userType'];

        // التحقق من صحة البيانات
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("البريد الإلكتروني غير صحيح");
        }

        if (strlen($password) < 6) {
            throw new Exception("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
        }

        // تشفير كلمة المرور
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // البيانات الاختيارية
        $studyLevel = isset($_POST['studentLevel']) ? $_POST['studentLevel'] : null;
        $interests = isset($_POST['interests']) ? $_POST['interests'] : null;
        $mentorExperience = isset($_POST['mentorExperience']) ? $_POST['mentorExperience'] : null;
        $expertise = isset($_POST['expertise']) ? $_POST['expertise'] : null;
        $mentorCertificate = isset($_POST['mentorCertificate']) ? $_POST['mentorCertificate'] : null;

        // الاتصال بقاعدة البيانات
        require_once 'db.php';
        
        // التحقق من عدم وجود البريد الإلكتروني مسبقاً
        $checkEmail = $conn->prepare("SELECT id FROM users2 WHERE email = ?");
        if (!$checkEmail) {
            throw new Exception("خطأ في إعداد استعلام التحقق: " . $conn->error);
        }
        
        $checkEmail->bind_param("s", $email);
        $checkEmail->execute();
        $result = $checkEmail->get_result();
        
        if ($result->num_rows > 0) {
            throw new Exception("البريد الإلكتروني مستخدم مسبقاً");
        }
        
        // إدراج البيانات
        $sql = "INSERT INTO users2 (full_name, email, password, user_type, study_level, interests, experience_years, expertise, certificate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("خطأ في إعداد الاستعلام: " . $conn->error);
        }
        
        $stmt->bind_param("sssssssss", $name, $email, $hashedPassword, $userType, $studyLevel, $interests, $mentorExperience, $expertise, $mentorCertificate);
        
        if ($stmt->execute()) {
            $userId = $conn->insert_id;
            file_put_contents($logFile, date('Y-m-d H:i:s') . " - تم إنشاء المستخدم بنجاح. ID: $userId, Name: $name, Email: $email\n", FILE_APPEND);
            echo "success";
        } else {
            throw new Exception("خطأ في تنفيذ الاستعلام: " . $stmt->error);
        }

        $stmt->close();
        $checkEmail->close();
        $conn->close();
        
    } catch (Exception $e) {
        $errorMsg = "خطأ: " . $e->getMessage();
        file_put_contents($logFile, date('Y-m-d H:i:s') . " - " . $errorMsg . "\n", FILE_APPEND);
        echo $errorMsg;
    }
} else {
    echo "طريقة الطلب غير صحيحة - يجب استخدام POST";
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - طريقة طلب خاطئة: " . $_SERVER["REQUEST_METHOD"] . "\n", FILE_APPEND);
}
?>
