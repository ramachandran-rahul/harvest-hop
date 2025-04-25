let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("/harvest-hop/api/getProducts.php")
    .then(res => res.json())
    .then(data => {
      allProducts = data;

      attachFilters(); // Set up filter click listeners
      updateCartBadge();

      if (window.location.pathname.includes("search.php")) {
        initSearchPage(); // Search page only
      } else {
        const savedCat = localStorage.getItem("filterCat");
        const savedSub = localStorage.getItem("filterSub");

        if (savedCat) {
          const filtered = allProducts.filter(p => p.category === savedCat);
          displayProducts(filtered);
          localStorage.removeItem("filterCat");
        } else if (savedSub) {
          const filtered = allProducts.filter(p => p.subcategory === savedSub);
          displayProducts(filtered);
          localStorage.removeItem("filterSub");
        } else {
          displayProducts(allProducts); // Default view
        }
      }
    })
    .catch(err => {
      console.error("Failed to load products", err);
      document.getElementById("productGrid").innerHTML = "<p>Error loading products.</p>";
    });
});

function attachFilters() {
  // Subcategories
  document.querySelectorAll(".submenu a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sub = link.textContent.trim();
      localStorage.setItem("filterSub", sub);
      window.location.href = "/harvest-hop/index.php";
    });
  });

  // Main categories
  document.querySelectorAll(".main-nav > ul > li > a").forEach(link => {
    link.addEventListener("click", (e) => {
      const cat = link.textContent.trim();
      if (cat === "Home") {
        e.preventDefault();
        window.location.href = "/harvest-hop/index.php";
      } else {
        e.preventDefault();
        localStorage.setItem("filterCat", cat);
        window.location.href = "/harvest-hop/index.php";
      }
    });
  });

  // Logo/brand click
  const brandLink = document.querySelector(".brand");
  if (brandLink) {
    brandLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/harvest-hop/index.php";
    });
  }
}

function displayProducts(products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  if (!products || products.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  const grouped = {};
  products.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  const categoryDescriptions = {
    Fresh: "Fresh produce delivered daily. Fruits, vegetables, and leafy greens.",
    Dairy: "Quality dairy essentials including milk, cheese, and butter.",
    Pantry: "Your everyday pantry staples, sauces, grains, and more.",
    Frozen: "Tasty frozen meals and sweet treats ready to go.",
    Household: "Cleaning and home needs for a tidy, stress-free life."
  };

  for (const category in grouped) {
    const section = document.createElement("section");
    section.classList.add("category-section");

    const catHeading = document.createElement("h2");
    catHeading.textContent = category;
    section.appendChild(catHeading);

    const catDesc = document.createElement("p");
    catDesc.textContent = categoryDescriptions[category] || "";
    catDesc.style.fontSize = "0.9rem";
    catDesc.style.margin = "0.25rem 0 1rem";
    catDesc.style.color = "#555";
    section.appendChild(catDesc);

    const row = document.createElement("div");
    row.className = "product-row";

    grouped[category].forEach(p => {
      const card = createProductCard(p);
      row.appendChild(card);
    });

    section.appendChild(row);
    grid.appendChild(section);
  }
}

function displaySearchResults(filtered, query) {
  const grid = document.getElementById("productGrid");
  const searchHeader = document.getElementById("searchHeader");

  // Update the header section
  searchHeader.innerHTML = `
    <h2>Search Results for "<span>${query}</span>"</h2>
    <p>Here's what we found:</p>
  `;

  // Clear previous grid content
  grid.innerHTML = "";

  if (!filtered || filtered.length === 0) {
    grid.innerHTML = `<p>No products matched your search.</p>`;
    return;
  }

  // Group search results by category
  const grouped = {};
  filtered.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  const categoryDescriptions = {
    Fresh: "Fresh produce delivered daily. Fruits, vegetables, and leafy greens.",
    Dairy: "Quality dairy essentials including milk, cheese, and butter.",
    Pantry: "Your everyday pantry staples, sauces, grains, and more.",
    Frozen: "Tasty frozen meals and sweet treats ready to go.",
    Household: "Cleaning and home needs for a tidy, stress-free life."
  };

  for (const category in grouped) {
    const section = document.createElement("section");
    section.classList.add("category-section");

    // Category heading
    const catHeading = document.createElement("h2");
    catHeading.textContent = category;
    section.appendChild(catHeading);

    // Subtext description
    const catDesc = document.createElement("p");
    catDesc.textContent = categoryDescriptions[category] || "";
    catDesc.style.fontSize = "0.9rem";
    catDesc.style.margin = "0.25rem 0 1rem";
    catDesc.style.color = "#555";
    section.appendChild(catDesc);

    // Product grid
    const row = document.createElement("div");
    row.className = "product-row";

    grouped[category].forEach(p => {
      const card = createProductCard(p);
      row.appendChild(card);
    });

    section.appendChild(row);
    grid.appendChild(section);
  }
}

function createProductCard(p, latestCart = null) {
  const cart = latestCart || JSON.parse(localStorage.getItem("cart")) || [];
  const cartItem = cart.find(item => item.id == p.id);
  const qtyInCart = cartItem ? cartItem.qty : 0;
  const stock = Number(p.stock);
  const remainingStock = stock - qtyInCart;

  const inStock = remainingStock > 0;

  console.log(inStock, remainingStock, stock, qtyInCart);

  const stockLabel = inStock
    ? `<p style="color: green; font-weight: bold; margin: 6px 0; display: flex; align-items: center; gap: 6px;">
         <span style="font-size: 1rem;">&#10004;</span> In Stock
       </p>`
    : `<p style="color: #d32f2f; font-weight: bold; margin: 6px 0; display: flex; align-items: center; gap: 6px;">
         <span style="font-size: 1rem;">&#10006;</span> Out of Stock
       </p>`;

  const buttonHTML = `
    <button onclick="addToCart(${p.id})" ${!inStock ? 'disabled style="background-color: #ccc; cursor: not-allowed;"' : ''}>
      <div>+</div><div>Add to Cart</div>
    </button>
  `;

  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <span class="sub-badge">${p.subcategory}</span>
    <img src="/harvest-hop/images/products/${p.image}" alt="${p.name}">
    <div class="product-info">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
    </div>
    <div style="display:flex; align-items: baseline; gap: 5px; font-size: 0.9rem; color: #333;">
      <strong>$${Number(p.price).toFixed(2)}</strong>
      <p style="font-size: 0.85rem; color: #666; margin: 0;">per ${p.unit}</p>
    </div>
    ${stockLabel}
    ${buttonHTML}
  `;
  return card;
}

function initSearchPage() {
  const query = new URLSearchParams(window.location.search).get("q");
  if (!query) return;
  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );
  displaySearchResults(filtered, query);
}

window.handleSearch = function () {
  const query = document.getElementById("searchBox").value.trim();
  if (!query) return;

  const encoded = encodeURIComponent(query);
  const targetURL = `/harvest-hop/pages/search.php?q=${encoded}`;

  if (window.location.pathname.includes("search.php")) {
    history.pushState({}, "", targetURL);
    initSearchPage();
  } else {
    window.location.href = targetURL;
  }
};

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 5000);
}

function addToCart(productId) {
  const product = allProducts.find(p => p.id == productId);
  if (!product) return showToast("Product not found.");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const stock = Number(product.stock);
  const existing = cart.find(item => item.id == productId);
  const qtyInCart = existing ? existing.qty : 0;

  const remaining = stock - qtyInCart;
  if (remaining <= 0) {
    showToast(`${product.name} is out of stock.`);
    return;
  }

  // ✅ Update cart
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`Added ${qtyInCart + 1} × ${product.name} to cart`);
  updateCartBadge();

  // Re-render the card using latest stock data
  const grid = document.getElementById("productGrid");
  const cards = grid.getElementsByClassName("product-card");
  for (let card of cards) {
    if (card.querySelector("h3")?.textContent === product.name) {
      const newCard = createProductCard(product, cart); // ✅ cart passed in
      card.replaceWith(newCard);
      break;
    }
  }
}


function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}
