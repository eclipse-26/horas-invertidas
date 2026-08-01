<?php

header('Content-Type: application/json');

if($_SERVER['SERVER_NAME'] === 'localhost'){
    require __DIR__ . "/config-local.php";
}else{
    require __DIR__ . "/config.php";
}

$stmt = $conn->prepare("SELECT id,title,amount,section_id FROM items");
$stmt->execute();

$result = $stmt->get_result();

$items = [];

while($row = $result->fetch_assoc()){
    $items[] = $row;
}
    

echo json_encode([
    "success" => true,
    "items" => $items
]);

$stmt->close();
$conn->close();