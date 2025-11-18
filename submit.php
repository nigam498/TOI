<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name     = $_POST['fullname'] ?? '';
    $email    = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Folder where data will be stored
    $folder = "data";

    // Create folder if not exists
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true); // recursive create
    }

    // File path
    $filePath = $folder . "/userdata.txt";

    // Create file if not exists
    if (!file_exists($filePath)) {
        file_put_contents($filePath, "=== USER DATA FILE ===\n", FILE_APPEND);
    }

    // Format data
    $data = "Name: $name | Email: $email | Password: $password | Time: " . date("Y-m-d H:i:s") . "\n";

    // Write to file
    file_put_contents($filePath, $data, FILE_APPEND);

    echo "Data saved successfully!";
}
?>
