<?php
// Allow Angular frontend to access this script
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

require 'db.php';

// Read fields sent as form data
$id          = isset($_POST['id'])          ? (int) $_POST['id'] : 0;
$title       = mysqli_real_escape_string($conn, $_POST['title']       ?? '');
$author      = mysqli_real_escape_string($conn, $_POST['author']      ?? '');
$description = mysqli_real_escape_string($conn, $_POST['description'] ?? '');
$price       = mysqli_real_escape_string($conn, $_POST['price']       ?? '0');
$type        = mysqli_real_escape_string($conn, $_POST['type']        ?? 'Paperback');
$imageName   = mysqli_real_escape_string($conn, $_POST['imageName']   ?? '');

// Basic validation
if ($id < 1 || $title === '' || $author === '' || $price === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields.']);
    exit;
}

// Handle optional image upload
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir     = 'uploads/';
    $newImageName  = basename($_FILES['image']['name']);
    $allowedTypes  = ['jpg', 'jpeg', 'png', 'gif'];
    $ext           = strtolower(pathinfo($newImageName, PATHINFO_EXTENSION));

    if (!in_array($ext, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid image type.']);
        exit;
    }

    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $newImageName)) {
        $imageName = mysqli_real_escape_string($conn, $newImageName);
    }
}

// Build query — only update imageName if one was provided
if ($imageName !== '') {
    $sql = "UPDATE books SET title='$title', author='$author', description='$description', price='$price', type='$type', imageName='$imageName' WHERE id=$id LIMIT 1";
} else {
    $sql = "UPDATE books SET title='$title', author='$author', description='$description', price='$price', type='$type' WHERE id=$id LIMIT 1";
}

if ($conn->query($sql) === TRUE) {
    http_response_code(200);
    echo json_encode(['message' => 'Book updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Database update failed']);
}

$conn->close();
?>
