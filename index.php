<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // The raw POST data can be accessed from the input stream
    $json_data = file_get_contents('php://input');

    // Decode the JSON data
    $data = json_decode($json_data, true);

    // Check if there is data in the POST request
    if (!empty($data)) {
        // Create a response array
        $response = [
            'status' => 'success',
            'message' => 'Data received successfully.',
            'data' => $data
        ];
        // Encode the response array as JSON and echo it
        echo json_encode($response, JSON_PRETTY_PRINT);
    } else if (!empty($_POST)) {
        // Handle form-data
        $response = [
            'status' => 'success',
            'message' => 'Form data received successfully.',
            'data' => $_POST
        ];
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
    else {
        // If no data was sent, return a message
        $response = [
            'status' => 'error',
            'message' => 'No data sent in the POST request.'
        ];
        // Set a 400 Bad Request status code
        http_response_code(400);
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
} else {
    // If the request method is not POST, return an error message
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method. Only POST requests are accepted.'
    ];
    // Set a 405 Method Not Allowed status code
    http_response_code(405);
    echo json_encode($response, JSON_PRETTY_PRINT);
}
?>
