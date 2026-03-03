<?php

ini_set('display_errors', 0); // No mostrar errores al usuario
ini_set('log_errors', 1);     // Activar log
ini_set('error_log', __DIR__ . '/error.log'); // Archivo donde guardar

header('Content-Type: application/json');

if($_SERVER['SERVER_NAME'] === 'localhost'){
    require __DIR__ . "/config-local.php";
}else{
    require __DIR__ . "/config.php";
}

$stmt = $conn->prepare("SELECT hours FROM worked_hours ORDER BY id DESC LIMIT 1");
$stmt->execute();

$result = $stmt->get_result();

if( $result->num_rows > 0 ){
    $row = $result->fetch_assoc();
    $hours = $row['hours'];
} else{
    $hours = 0;
}

echo json_encode([
    "succes"=> true,
    "last_hours" => $hours
]);

$stmt->close();
$conn->close();