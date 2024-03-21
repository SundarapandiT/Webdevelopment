<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $full_name = $_POST["full_name"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];
    $gate_eligibility = $_POST["gate_eligibility"];
    $qualification = $_POST["qualification"];
    $college = $_POST["college"];
    
    // Validate form data (you can add more validation as per your requirements)
    if ($password != $confirm_password) {
        // Passwords do not match
        echo "Error: Passwords do not match.";
        exit;
    }

    // Connect to your database
    $servername = "localhost";
    $username = "your_username";
    $password = "your_password";
    $dbname = "your_database_name";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Update user profile in the database
    $sql = "UPDATE users SET full_name='$full_name', email='$email', password='$password', gate_eligibility='$gate_eligibility', qualification='$qualification', college='$college' WHERE id=1"; // Change '1' to the actual user ID
    if ($conn->query($sql) === TRUE) {
        echo "Profile updated successfully";
    } else {
        echo "Error updating profile: " . $conn->error;
    }

    $conn->close();
}
?>
