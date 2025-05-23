<!DOCTYPE html>
<!--
  Harvest Hop - A simple grocery store web application
  Assignment 1 - 32516 Internet Programming
  Rahul Ramachandran - 24910212
  Date: 25th April 2025
-->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Harvest Hop</title>
  <link rel="stylesheet" href="/harvest-hop/css/styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
  <?php include 'includes/header.php'; ?>
  <main>
    <div>
      <h1 style = "margin-top: 0px">Welcome to Harvest Hop</h1>
      <p>Your one-stop shop for fresh produce and groceries. Browse our wide selection across categories and add items to your cart.</p>
    </div>
    <div id="productGrid" class="product-grid"></div>
  </main>
  <div id="toast" class="toast">Item added to cart</div>
  <script src="js/products.js"></script>
</body>
</html>
