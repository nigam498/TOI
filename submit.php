<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name     = $_POST['fullname'];
    $email    = $_POST['email'];
    $password = $_POST['password'];

    // Format the data
    $data = "Name: $name | Email: $email | Password: $password\n";

    // Save to file (will auto-create the file)
    file_put_contents("userdata.txt", $data, FILE_APPEND);

    echo "Data saved successfully!";
}
?>
