<header class="main-header">
  <link rel="stylesheet" href="../css/styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <div class="container header-content">
    <div>
        <a href="/harvest-hop/index.php" class="brand">
        <img src="/harvest-hop/images/Harvest_Hop_Only_Logo.png" alt="Harvest Hop Logo" class="logo">
        <h1 class="brand-title">Harvest Hop</h1>
        </a>
    </div>

    <nav class="main-nav">
    <ul>
        <!-- Fresh -->
        <li class="dropdown">
          <a href="#">Fresh</a>
          <ul class="submenu">
            <li><a href="#">Fruits</a></li>
            <li><a href="#">Vegetables</a></li>
            <li><a href="#">Greens</a></li>
          </ul>
        </li>

        <!-- Dairy -->
        <li class="dropdown">
          <a href="#">Dairy</a>
          <ul class="submenu">
            <li><a href="#">Milk & Cream</a></li>
            <li><a href="#">Cheese</a></li>
            <li><a href="#">Butter & Spreads</a></li>
          </ul>
        </li>

        <!-- Pantry -->
        <li class="dropdown">
          <a href="#">Pantry</a>
          <ul class="submenu">
            <li><a href="#">Rice & Grains</a></li>
            <li><a href="#">Pasta & Noodles</a></li>
            <li><a href="#">Sauces & Condiments</a></li>
          </ul>
        </li>

        <!-- Frozen -->
        <li class="dropdown">
          <a href="#">Frozen</a>
          <ul class="submenu">
            <li><a href="#">Frozen Meals</a></li>
            <li><a href="#">Desserts & Ice Cream</a></li>
          </ul>
        </li>

        <!-- Household -->
        <li class="dropdown">
          <a href="#">Household</a>
          <ul class="submenu">
            <li><a href="#">Cleaning</a></li>
            <li><a href="#">Kitchen</a></li>
            <li><a href="#">Laundry</a></li>
          </ul>
        </li>
      </ul>
    </nav>

    <div class="header-right">
      <input type="text" id="searchBox" class="search-input" placeholder="Search products..." onkeydown="if(event.key==='Enter') handleSearch()">
      <a href="/harvest-hop/pages/cart.php" class="navbar-cart-button">
        <div>
          <img src="/harvest-hop/images/cart_icon.png" alt="cart">
          Cart
          <span id="cart-count" class="navbar-cart-badge">0</span>
        </div>
      </a>
    </div>
  </div>
</header>