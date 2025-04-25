# Harvest Hop 🛒🥬

Harvest Hop is a responsive grocery shopping web application built using **PHP**, **JavaScript**, **MySQL**, **HTML**, and **CSS**.

## 🌱 Features
- ✅ Product listing with category & subcategory filters
- ✅ Search with real-time results
- ✅ Dynamic cart with quantity management
- ✅ Stock-aware checkout (frontend + backend validation)
- ✅ Delivery form with validation and live feedback
- ✅ Order confirmation page with email mentioned
- ✅ Toast notifications and polished UI
- ✅ Empty cart and order UX 
- ✅ Clear cart confirmation prompt
- ✅ Responsive layout for laptops

## 🛠️ Technologies Used
- PHP (server-side scripting)
- MySQL (database for products & orders)
- JavaScript (DOM, cart logic, validation)
- HTML/CSS (layout & responsive design)

## 📦 Folder Structure
/api → Backend endpoints (getProducts.php, submitOrder.php) /pages → Cart, delivery, search, and confirmation views /includes → Reusable header files /images → All UI icons and product images /js → Frontend logic (cart.js, delivery.js, products.js) /css → styles.css index.php → Homepage

## 🚀 Setup Instructions

1. Import the provided SQL file (`product_example.sql`) into MySQL. This will automatically create and select the `harvest_hop_db` database.

2. Place the project folder inside your web server root (e.g., `htdocs/harvest-hop` for XAMPP).

3. Start **Apache** and **MySQL** via XAMPP.

4. Open your browser and visit:  
   `http://localhost/harvest-hop/index.php`

## ✨ Notes
This app was built as part of an assignment with a focus on:
- Functional cart flow
- Validations and good UX
- Robust backend checks