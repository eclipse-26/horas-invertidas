<?php

ini_set('display_errors', 0); // No mostrar errores al usuario
ini_set('log_errors', 1);     // Activar log
ini_set('error_log', __DIR__ . '/error.log'); // Archivo donde guardar

error_reporting(E_ALL);

if($_SERVER['SERVER_NAME'] === 'localhost'){
    require __DIR__ . "/config-local.php";
}else{
    require __DIR__ . "/config.php";
}

// $conn->query("INSERT INTO worked_hours (hours) VALUES (10)");

// echo "Dato guardado";

// Leer JSON desde JS
$data = json_decode(file_get_contents("php://input"), true);

// Obtener el valor hours
$hours = intval($data['hours']);

// Insertar en la base de datos

$stmt = $conn->prepare("INSERT INTO worked_hours (hours) VALUES (?)");
$stmt->bind_param("i", $hours);
$stmt->execute();

echo json_encode(["succes" => true]);

$stmt->close(); 
$conn->close();
