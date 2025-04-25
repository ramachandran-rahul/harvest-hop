<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Delivery Details - Harvest Hop</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>

<body>
    <?php include '../includes/minimal-header.php'; ?>
    <main>
    <section class="delivery-section">
        <div class="delivery-header">
        <a href="cart.php" class="back-to-cart">← Back to Cart</a>
        <h2>Delivery Details</h2>
        <p>Please provide your contact and delivery information below.</p>
        </div>

        <form id="deliveryForm" class="delivery-form" novalidate>
            <div class="form-row">
                <label>
                Full Name:
                <input type="text" name="name" required pattern="^[A-Za-z]+ [A-Za-z]+.*$" title="Enter your full name (first and last)">
                <small class="error-msg"></small>
                </label>
                <label>
                Mobile Number:
                <input type="tel" name="mobile" required pattern="^\d{10}$" title="Enter a valid 10-digit mobile number">
                <small class="error-msg"></small>
                </label>
            </div>

            <div class="form-row">
                <label style="width: 100%;">
                Email:
                <input type="email" name="email" required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Enter a valid email">
                <small class="error-msg"></small>
                </label>
            </div>

            <div class="form-row">
                <label>
                Street Address:
                <input type="text" name="street" required>
                <small class="error-msg"></small>
                </label>
                <label>
                City/Suburb:
                <input type="text" name="city" required>
                <small class="error-msg"></small>
                </label>
            </div>

            <div class="form-row">
                <label>
                Pincode:
                <input type="text" name="pincode" required pattern="^\d{4}$" title="Enter a valid 4-digit postcode">
                <small class="error-msg"></small>
                </label>
                <label>
                State:
                <select name="state" required>
                    <option value="">Select a state</option>
                    <option>NSW</option>
                    <option>VIC</option>
                    <option>QLD</option>
                    <option>WA</option>
                    <option>SA</option>
                    <option>TAS</option>
                    <option>ACT</option>
                    <option>NT</option>
                </select>
                <small class="error-msg"></small>
                </label>
            </div>

            <button type="submit" class="place-order-btn" disabled>Place Order</button>
        </form>

    </section>
    </main>
    <script src="/harvest-hop/js/delivery.js"></script>
</body>

</html>