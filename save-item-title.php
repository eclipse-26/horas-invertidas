<?php

if($_SERVER['SERVER_NAME'] === 'localhost'){
    require __DIR__ . "/config-local.php";
}else{
    require __DIR__ . "/config.php";
}

// Leer JSON desde JS
$data = json_decode(file_get_contents("php://input"), true);

// Obtener el valor hours
$id = intval($data['id']);
$title = trim($data['title']);

// Actualizar en la base de datos
$stmt = $conn->prepare("UPDATE items SET title = ? WHERE id = ?");
$stmt->bind_param("si", $title, $id);
$stmt->execute();

echo json_encode(["succes" => true]);

$stmt->close(); 
$conn->close();