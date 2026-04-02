<?php
// Allow Angular frontend to access this script
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Connect to the database
require 'db.php';

// Get the raw JSON data sent from Angular
$json = file_get_contents('php://input');
// Convert the JSON into a PHP object
$data = json_decode($json);

// Check if we actually received data
if(isset($data) && !empty($data)) {
    // Sanitize inputs to prevent SQL injection
    $title = mysqli_real_escape_string($conn, $data->title);
    $author = mysqli_real_escape_string($conn, $data->author);
    $description = mysqli_real_escape_string($conn, $data->description);
    $price = mysqli_real_escape_string($conn, $data->price);
    $type = mysqli_real_escape_string($conn, $data->type ?? 'Paperback');
    $imageName = mysqli_real_escape_string($conn, $data->imageName ?? '');

    $sql = "INSERT INTO books (title, author, description, price, type, imageName) VALUES ('$title', '$author', '$description', '$price', '$type', '$imageName')";

    // Run the query and see if it works
    if($conn->query($sql) === TRUE) {
        // Send back the new book with its new database ID
        $book = [
            'id' => $conn->insert_id,
            'title' => $title,
            'author' => $author,
            'description' => $description,
            'price' => $price,
            'type' => $type,
            'imageName' => $imageName
        ];
        echo json_encode($book);
    } else {
        // Send an error code if the query fails
        http_response_code(422);
    }
}

// Close the connection when we're done
$conn->close();
?>
