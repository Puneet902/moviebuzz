<?php
// Connect to MySQL
$conn = new mysqli("localhost", "","mywebsite");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get JSON from fetch
$data = json_decode(file_get_contents("php://input"));

// Insert into database
$email = $conn->real_escape_string($data->email);
$sql = "INSERT INTO users (email) VALUES ('$email')";

if ($conn->query($sql) === TRUE) {
  echo "Saved successfully";
} else {
  echo "Error: " . $conn->error;
}

$conn->close();
?>
