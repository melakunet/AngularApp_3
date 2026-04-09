<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

$data = json_decode(file_get_contents("php://input"));

// Check required fields
if (empty($data->userName) || empty($data->password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password are required.']);
    exit;
}

$userName = mysqli_real_escape_string($conn, $data->userName);
$password = $data->password;

// Look up user by username
$sql    = "SELECT * FROM users WHERE userName = '$userName' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Verify the password against the stored hash
    if (password_verify($password, $user['password'])) {
        echo json_encode(['success' => true, 'message' => 'Login successful.']);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password.']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'User not found.']);
}

$conn->close();
?>
