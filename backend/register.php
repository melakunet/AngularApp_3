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

// Check all required fields are present
if (!isset($data->userName, $data->password, $data->emailAddress)) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit;
}

$userName     = trim($data->userName);
$password     = trim($data->password);
$emailAddress = trim($data->emailAddress);

// Check if username or email is already taken
$check = $conn->prepare("SELECT id FROM users WHERE userName = ? OR emailAddress = ?");
$check->bind_param("ss", $userName, $emailAddress);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username or email already exists.']);
    exit;
}

// Hash password before storing
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$insert = $conn->prepare("INSERT INTO users (userName, emailAddress, password) VALUES (?, ?, ?)");
$insert->bind_param("sss", $userName, $emailAddress, $hashedPassword);

if ($insert->execute()) {
    echo json_encode(['success' => true, 'message' => 'User registered successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed.']);
}

$conn->close();
?>
