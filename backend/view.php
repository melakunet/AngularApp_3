<?php
// Allow Angular frontend to access this script
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

require 'db.php';

// Expect ?id=X in the URL
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No ID provided.']);
    exit;
}

$id  = (int) $_GET['id'];
$sql = "SELECT * FROM books WHERE id = $id LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Book not found.']);
}

$conn->close();
?>
