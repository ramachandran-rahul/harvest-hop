let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("/harvest-hop/api/getProducts.php")
    .then(res => res.json())
    .then(data => {
      allProducts = data;

      // If on search page, do search
      if (window.location.pathname.includes("search.php")) {
        initSearchPage();
      } else {
        displayProducts(allProducts); // home page display
      }

      attachFilters(); // category/subcategory
      updateCartBadge();
    })
    .catch(err => {
      console.error("Failed to load products", err);
      document.getElementById("productGrid").innerHTML = "<p>Error loading products.</p>";
    });
});

function attachFilters() {
  document.querySelectorAll(".submenu a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sub = link.textContent.trim();
      const filtered = allProducts.filter(p => p.subcategory === sub);
      displayProducts(filtered);
    });
  });

  document.querySelectorAll(".main-nav > ul > li > a").forEach(link => {
    link.addEventListener("click", (e) => {
      const cat = link.textContent.trim();
      if (cat === "Home") {
        e.preventDefault();
        displayProducts(allProducts);
      } else if (cat !== "") {
        e.preventDefault();
        const filtered = allProducts.filter(p => p.category === cat);
        displayProducts(filtered);
      }
    });
  });

  const brandLink = document.querySelector(".brand");
  if (brandLink) {
    brandLink.addEventListener("click", (e) => {
      e.preventDefault();
      displayProducts(allProducts);
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
  const searchTerm = document.getElementById("search-term");
  if (searchTerm) searchTerm.textContent = query;

  grid.innerHTML = "";
  if (!filtered || filtered.length === 0) {
    grid.innerHTML = "<p>No products matched your search.</p>";
    return;
  }

  filtered.forEach(p => {
    const card = createProductCard(p);
    grid.appendChild(card);
  });
}

function createProductCard(p) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <span class="sub-badge">${p.subcategory}</span>
    <img src="/harvest-hop/images/products/${p.image}" alt="${p.name}">
    <div class="product-info">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
    </div>
    <p><strong>$${Number(p.price).toFixed(2)}</strong></p>
    <button onclick="addToCart(${p.id})">
      <div>+</div>
      <div>Add to Cart</div>
    </button>
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
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = allProducts.find(p => p.id == productId);
  if (!product) return showToast("Product not found.");

  const stock = parseInt(product.stock);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    if (existing.qty >= stock) return showToast(`Only ${stock} in stock.`);
    existing.qty++;
  } else {
    if (stock < 1) return showToast(`${product.name} is out of stock.`);
    cart.push({ id: productId, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`Added ${existing ? existing.qty : 1} × ${product.name} to cart`);
  updateCartBadge();
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
