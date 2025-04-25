<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "harvest_hop_db");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$user = $data["userInfo"];
$cart = $data["cart"];

if (!$user || !$cart) {
    echo json_encode(["success" => false, "message" => "Missing user or cart data."]);
    exit;
}

// 1. Validate stock
foreach ($cart as $item) {
    $productId = $item["id"];
    $qty = $item["qty"];

    $stmt = $conn->prepare("SELECT stock, name FROM products WHERE id = ?");
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $stmt->bind_result($stock, $productName);
    $stmt->fetch();
    $stmt->close();

    if ($stock === null || $stock < $qty) {
        echo json_encode([
            "success" => false,
            "message" => "Only $stock × $productName left in stock. Please update your cart."
        ]);
        exit;
    }
}

// 2. Insert into orders (mock table) and update stock
foreach ($cart as $item) {
    $productId = $item["id"];
    $qty = $item["qty"];

    // Update stock
    $stmt = $conn->prepare("UPDATE products SET stock = stock - ? WHERE id = ?");
    $stmt->bind_param("ii", $qty, $productId);
    $stmt->execute();
    $stmt->close();
}

// (Optional) You can also save the order info into a separate orders table if desired
// For now we just simulate confirmation.

// 3. Insert into orders table
$stmt = $conn->prepare("INSERT INTO orders (customer_name, email, mobile, street, city, state, pincode, cart) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$cartJSON = json_encode($cart);
$stmt->bind_param(
    "ssssssss",
    $user["name"],
    $user["email"],
    $user["mobile"],
    $user["street"],
    $user["city"],
    $user["state"],
    $user["pincode"],
    $cartJSON
);
$stmt->execute();
$stmt->close();

// After all DB operations done
echo json_encode(["success" => true]);
exit;