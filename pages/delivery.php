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
        <form id="deliveryForm">
            <label>
                Full Name:
                <input type="text" name="name" required>
            </label><br>
            <label>
                Email:
                <input type="email" name="email" required>
            </label><br>
            <label>
                Mobile Number:
                <input type="tel" name="mobile" required>
            </label><br>
            <label>
                Address:
                <input type="text" name="address" required>
            </label><br>
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
            </label><br><br>
            <button type="submit">Place Order</button>
        </form>
    </main>
    <script src="/harvest-hop/js/delivery.js"></script>
</body>

</html>