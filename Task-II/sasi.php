<!DOCTYPE html>
<html>
<head>
    <title>Transfer Money</title>
</head>
<body>

<?php
// Establish a database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "banking_system_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to transfer money
function transferMoney($senderID, $receiverID, $amount) {
    global $conn;

    // Start a transaction
    $conn->begin_transaction();

    try {
        // Fetch sender's balance
        $senderQuery = "SELECT * FROM users WHERE id = $senderID";
        $senderResult = $conn->query($senderQuery);
        // $senderData = $senderResult->fetch_assoc();
        // $sender=$senderData[$senderID];

        if ($senderResult->num_rows == 0) {
            throw new Exception("Sender user not found");
        }

        $senderData = $senderResult->fetch_assoc();
        $senderBalance = $senderData['balance'];

        if ($senderBalance < $amount) {
            throw new Exception("Insufficient balance");
        }

        // Update sender's balance
        $newSenderBalance = $senderBalance - $amount;
        $updateSenderQuery = "UPDATE users SET balance = $newSenderBalance WHERE id = $senderID";
        $conn->query($updateSenderQuery);

        // Update receiver's balance
        $receiverQuery = "SELECT balance FROM users WHERE id = $receiverID";
        $receiverResult = $conn->query($receiverQuery);

        if ($receiverResult->num_rows == 0) {
            throw new Exception("Receiver user not found");
        }

        $receiverData = $receiverResult->fetch_assoc();
        $receiverBalance = $receiverData['balance'];

        $newReceiverBalance = $receiverBalance + $amount;
        $updateReceiverQuery = "UPDATE users SET balance = $newReceiverBalance WHERE id = $receiverID";
        $conn->query($updateReceiverQuery);

        // Record the transaction
        $insertTransactionQuery = "INSERT INTO transactions (sender_id, receiver_id, amount) VALUES ($senderID, $receiverID, $amount)";
        $conn->query($insertTransactionQuery);

        // Commit the transaction
        $conn->commit();

        echo "Money transferred successfully!";
    } catch (Exception $e) {
        // Rollback the transaction on error
        $conn->rollback();

        echo "Error: " . $e->getMessage();
    }
}

if (isset($_POST['submit'])) {
    $senderID = $_POST['sender_id'];
    $receiverID = $_POST['receiver_id'];
    $amount = $_POST['amount'];

    transferMoney($senderID, $receiverID, $amount);
}

$conn->close();
?>

<form method="post" action="">
    <label for="sender_id">Sender ID:</label>
    <input type="text" name="sender_id" id="sender_id" required><br>

    <label for="receiver_id">Receiver ID:</label>
    <input type="text" name="receiver_id" id="receiver_id" required><br>

    <label for="amount">Amount:</label>
    <input type="text" name="amount" id="amount" required><br>

    <input type="submit" name="submit" value="Transfer">
</form>

</body>
</html>