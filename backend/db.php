<?php
// Set CORS headers so the Angular frontend can access our PHP scripts
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "angular_app3";

// Create the connection to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Stop the script if the connection fails
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
