<?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $senderId = $_POST['senderId'];
    $receiverId = $_POST['receiverId'];
    $amount = $_POST['amount'];

    // Perform necessary database operations to transfer the money
    $connection = mysqli_connect("localhost:3306", "root", "", "banking_system_db");

    // Retrieve sender and receiver details
    $query = "SELECT * FROM customers WHERE Id IN ($senderId, $receiverId)";
    $result = mysqli_query($connection, $query);

    $customers = array();
    while ($row = mysqli_fetch_assoc($result)) {
      $customers[$row['Id']] = $row;
    }

    // Check if sender has sufficient balance
    $sender = $customers[$senderId];
    if ($sender['Balance'] >= $amount) {
      // Perform the money transfer
      $sender['Balance'] -= $amount;
      $receiver = $customers[$receiverId];
      $receiver['Balance'] += $amount;

      // Update sender and receiver Balances in the database
      $query = "UPDATE customers SET Balance = ".$sender['Balance']." WHERE Id = $senderId";
      mysqli_query($connection, $query);

      $query = "UPDATE customers SET Balance = ".$receiver['Balance']." WHERE Id = $receiverId";
      mysqli_query($connection, $query);
      echo '<script type="text/Javascript">alert("Successfully Transferred")</script>';

      // Redirect back to the view all customers page
      header("refresh:1;url=view_all_customers.php");
      exit();
    } else 
    {
      echo '<script type="text/Javascript">alert("Insufficient balance.")</script>';
      header("refresh:3;url=view_all_customers.php");
    }

    mysqli_close($connection);
  }
?>
