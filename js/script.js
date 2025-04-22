document.addEventListener("DOMContentLoaded", () => {
    fetch("/harvest-hop/api/getProducts.php")
      .then(res => res.json())
      .then(data => displayProducts(data))
      .catch(err => console.error("Failed to load products", err));
  });
  
  function displayProducts(products) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = ""; // clear
  
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="images/${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  }
  
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === productId);
    if (existing) existing.qty++;
    else cart.push({ id: productId, qty: 1 });
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }  