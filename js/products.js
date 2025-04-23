let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");

  // Fetch all products on load
  fetch("/harvest-hop/api/getProducts.php")
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      // console.log("Products loaded", allProducts);
      displayProducts(allProducts);
    })
    .catch(err => {
      console.error("Failed to load products", err);
      grid.innerHTML = "<p>Error loading products.</p>";
    });

  // Filter by subcategory (e.g., Fruits, Greens)
  document.querySelectorAll(".submenu a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sub = link.textContent.trim();
      const filtered = allProducts.filter(p => p.subcategory === sub);
      displayProducts(filtered);
    });
  });

  // Filter by main category (e.g., Fresh, Dairy)
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

  // Click on logo or title should show all items
  const brandLink = document.querySelector(".brand");
  if (brandLink) {
    brandLink.addEventListener("click", (e) => {
      e.preventDefault();
      displayProducts(allProducts);
    });
  }
  updateCartBadge(); // show current cart count when the page loads
});

// Renders all products grouped by category
function displayProducts(products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  if (!products || products.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  const grouped = {};

  // Group products by category only
  products.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  // Category descriptions
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

    // Heading
    const catHeading = document.createElement("h2");
    catHeading.textContent = category;
    section.appendChild(catHeading);

    // Category Description
    const catDesc = document.createElement("p");
    catDesc.textContent = categoryDescriptions[category] || "";
    catDesc.style.fontSize = "0.9rem";
    catDesc.style.marginTop = "0.25rem";
    catDesc.style.marginBottom = "1rem";
    catDesc.style.color = "#555";
    section.appendChild(catDesc);

    // Product grid
    const row = document.createElement("div");
    row.className = "product-row";

    grouped[category].forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <span class="sub-badge">${p.subcategory}</span>
        <img src="images/products/${p.image}" alt="${p.name}">
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
      row.appendChild(card);
    });

    section.appendChild(row);
    grid.appendChild(section);
  }
}



// Add to cart handler
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find product from master list
  const product = allProducts.find(p => p.id == productId);
  if (!product) {
    alert("Product not found.");
    return;
  }

  const stock = parseInt(product.stock);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    if (existing.qty >= stock) {
      alert(`Only ${stock} available in stock for ${product.name}.`);
      return;
    }
    existing.qty++;
  } else {
    if (stock < 1) {
      alert(`${product.name} is out of stock.`);
      return;
    }
    cart.push({ id: productId, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added ${existing ? existing.qty : 1} ${product.name} to cart`);
  updateCartBadge();
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count");

  if (badge) {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
  }
}
