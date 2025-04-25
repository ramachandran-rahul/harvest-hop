<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Order Confirmed - Harvest Hop</title>
  <link rel="stylesheet" href="../css/styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
<?php include '../includes/minimal-header.php'; ?>

<main>
  <section class="confirmation-box">
    <h2>🎉 Order Confirmed!</h2>
    <p>We've sent a confirmation email to <strong id="userEmail">you@example.com</strong>.</p>
    <p>Thank you, <strong id="userName">Customer</strong>, for shopping with Harvest Hop.</p>
    <p>Your items will be delivered soon 🚚</p>

    <a href="/harvest-hop/index.php" class="back-home-btn">← Back to Home</a>
  </section>
</main>

<script>
  document.getElementById("userEmail").textContent = localStorage.getItem("lastUserEmail") || "your email";
  document.getElementById("userName").textContent = localStorage.getItem("lastUserName") || "valued customer";
</script>
</body>
</html>