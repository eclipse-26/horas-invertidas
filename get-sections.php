<?php

header('Content-Type: application/json');

if($_SERVER['SERVER_NAME'] === 'localhost'){
    require __DIR__ . "/config-local.php";
}else{
    require __DIR__ . "/config.php";
}

$stmt = $conn->prepare("SELECT id,title FROM sections");
$stmt->execute();

$result = $stmt->get_result();

$sections = [];

while($row = $result->fetch_assoc()){
    $sections[] = $row;
}
    

echo json_encode([
    "success" => true,
    "sections" => $sections
]);

$stmt->close();
$conn->close();