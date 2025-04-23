<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "harvest_hop_db");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>
