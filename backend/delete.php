<?php
// Set headers so Angular can bypass CORS issues
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Include our database connection
require 'db.php';

// Check if we got an 'id' through the URL
if (isset($_GET['id'])) {
    // Sanitize the ID to be safe
    $id = mysqli_real_escape_string($conn, $_GET['id']);
    
    // Command to delete this specific book
    $sql = "DELETE FROM books WHERE id = '$id'";
    
    // Check if the delete worked
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Book deleted successfully.']);
    } else {
        // Return error status if it failed
        http_response_code(422);
        echo json_encode(['message' => 'Error deleting book.']);
    }
} else {
    // Return error if no ID is provided at all
    http_response_code(400);
    echo json_encode(['message' => 'No ID provided.']);
}

// Close the connection
$conn->close();
?>
