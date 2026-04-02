<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uploadDir = 'uploads/';

// Check a file was actually sent
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded or upload error occurred.']);
    exit;
}

// Only allow image file types
$allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
$fileTmpPath      = $_FILES['image']['tmp_name'];
$fileName         = basename($_FILES['image']['name']);
$fileType         = mime_content_type($fileTmpPath);

if (!in_array($fileType, $allowedMimeTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid image format. Only JPG, PNG, and GIF are allowed.']);
    exit;
}

// Move the file into the uploads folder
$targetFilePath = $uploadDir . $fileName;
if (move_uploaded_file($fileTmpPath, $targetFilePath)) {
    http_response_code(200);
    echo json_encode(['message' => 'File uploaded successfully', 'fileName' => $fileName]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to move uploaded file.']);
}
?>
