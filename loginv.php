<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get JSON data
        $json = file_get_contents('php://input');
        
        // Log the received data for debugging
        error_log('Login request received: ' . $json);
        
        $data = json_decode($json, true);
        
        // Check if JSON was parsed correctly
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON data: ' . json_last_error_msg());
        }
        
        if (!isset($data['email']) || !isset($data['password'])) {
            throw new Exception('Email and password are required');
        }
        
        $email = trim($data['email']);
        $password = $data['password'];
        
        // Validation
        if (empty($email) || empty($password)) {
            throw new Exception('Email and password cannot be empty');
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format');
        }
        
        // Check users table
        $stmt = $pdo->prepare("SELECT id, full_name, email, password, is_admin FROM users WHERE email = ? AND active = 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            error_log('User not found: ' . $email);
            throw new Exception('Invalid email or password');
        }
        
        if (!password_verify($password, $user['password'])) {
            error_log('Password verification failed for user: ' . $email);
            throw new Exception('Invalid email or password');
        }
        
        // Login successful
        $response = [
            'status' => 'success',
            'message' => 'Login successful',
            'user' => [
                'id' => (int)$user['id'],
                'name' => $user['full_name'],
                'email' => $user['email'],
                'is_admin' => isset($user['is_admin']) ? (int)$user['is_admin'] : 0
            ]
        ];
        
        // Log successful login
        error_log('Login successful for user: ' . $email . ' (Admin: ' . $response['user']['is_admin'] . ')');
        
        echo json_encode($response);
        
    } catch (Exception $e) {
        error_log('Login error: ' . $e->getMessage());
        
        $response = [
            'status' => 'error',
            'message' => $e->getMessage()
        ];
        
        echo json_encode($response);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed'
    ]);
}
?>