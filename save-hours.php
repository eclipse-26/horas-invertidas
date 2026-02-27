<?php

if($_SERVER['HTTP_HOST'] === 'localhost'){
    require "config-local.php";
}else{
    require "config.php";
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
