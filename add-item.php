<?php

if($_SERVER['SERVER_NAME'] === 'localhost'){
    require __DIR__ . "/config-local.php";
}else{
    require __DIR__ . "/config.php";
}

$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'];
$amount = $data['amount'];
$section_id = $data['section_id'];

// Insertar en la base de datos
$stmt = $conn->prepare("INSERT INTO items (title, amount, section_id) VALUES (?, ?, ?)");
$stmt->bind_param("sii", $title, $amount, $section_id);
$stmt->execute();

echo json_encode(["success" => true]);

$stmt->close(); 
$conn->close();