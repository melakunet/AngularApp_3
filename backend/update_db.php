<?php
require 'db.php';

// Check if column exists first to avoid errors
$checkCol = $conn->query("SHOW COLUMNS FROM books LIKE 'type'");
if($checkCol->num_rows == 0) {
    $sql = "ALTER TABLE books ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'Paperback'";
    if ($conn->query($sql) === TRUE) {
        echo "Database updated successfully: Added 'type' column.";
    } else {
        echo "Error updating database: " . $conn->error;
    }
} else {
    echo "Database already up to date.";
}

$conn->close();
?>
