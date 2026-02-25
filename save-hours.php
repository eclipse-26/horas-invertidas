<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("localhost", "root", "", "hmdt");

if ($conn->connect_error) {
    die("Error de conexión");
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
