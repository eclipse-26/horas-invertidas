<?php

header('Content-Type: application/json');

if($_SERVER['SERVER_NAME'] === 'localhost'){
    require __DIR__ . "/config-local.php";
}else{
    require __DIR__ . "/config.php";
}

// Leer JSON desde JS
$data = json_decode(file_get_contents("php://input"), true);

// Obtener el valor hours
$id = intval($data['id']);

// Actualizar en la base de datos
$stmt = $conn->prepare("DELETE FROM items WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo json_encode([
    "success" => true,
    "id" => $id
]);

$stmt->close(); 
$conn->close();