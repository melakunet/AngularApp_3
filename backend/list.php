<?php
// Include our database connection
require 'db.php';

// Create a query to get all the books
$sql = "SELECT * FROM books";
$result = $conn->query($sql);

$books = [];
// If we have results, put them into our array one by one
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
}

// Convert the PHP array to JSON so Angular can read it
echo json_encode($books);

// Always close the database connection
$conn->close();
?>
