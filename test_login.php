<?php
// Test login functionality
$url = "http://localhost/donate/api/login.php";

// Test data
$data = array(
    "email" => "test@example.com",
    "password" => "password123"
);

// Initialize cURL
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json'
));

// Execute cURL request
$response = curl_exec($ch);

// Check for errors
if(curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
}

// Close cURL
curl_close($ch);

// Display response
echo "Response:\n";
echo $response;
?> 