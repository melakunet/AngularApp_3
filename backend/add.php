<?php
require 'db.php';

$json = file_get_contents('php://input');
$data = json_decode($json);

if(isset($data) && !empty($data)) {
    $title = mysqli_real_escape_string($conn, $data->title);
    $author = mysqli_real_escape_string($conn, $data->author);
    $description = mysqli_real_escape_string($conn, $data->description);
    $price = mysqli_real_escape_string($conn, $data->price);
    $type = mysqli_real_escape_string($conn, $data->type ?? 'Paperback'); // Default if not provided

    $sql = "INSERT INTO books (title, author, description, price, type) VALUES ('$title', '$author', '$description', '$price', '$type')";

    if($conn->query($sql) === TRUE) {
        $book = [
            'title' => $title,
            'author' => $author,
            'description' => $description,
            'price' => $price,
            'type' => $type,
            'id' => $conn->insert_id
        ];
        echo json_encode($book);
    } else {
        http_response_code(422);
    }
}
$conn->close();
?>
