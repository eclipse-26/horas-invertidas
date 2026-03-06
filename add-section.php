<?php

if($_SERVER['SERVER_NAME'] === 'localhost'){
    require __DIR__ . "/config-local.php";
}else{
    require __DIR__ . "/config.php";
}

$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'];
// Insertar en la base de datos

$stmt = $conn->prepare("INSERT INTO sections (title) VALUES (?)");
$stmt->bind_param("s", $title);
$stmt->execute();

echo json_encode(["success" => true]);

$stmt->close(); 
$conn->close();