document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  const totalDiv = document.getElementById("cartTotal");

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalDiv.textContent = "";
    return;
  }

  fetch("../api/getProducts.php")
    .then(res => res.json())
    .then(products => {
      let total = 0;
      let totalItems = 0;
      document.getElementById("cartHeader").innerHTML = `
        <div>
          <h2>Shopping Cart (${cart.reduce((sum, item) => sum + item.qty, 0)})</h2>
          <button onclick="clearCart()" class="clear-btn">
            <img src="/harvest-hop/images/exit_icon.png" alt="Clear" class="exit-icon"> Clear Cart
          </button>
        </div>
      `;
      container.innerHTML = "";

      cart.forEach(item => {
        const product = products.find(p => p.id == item.id);
        if (!product) return;

        const itemTotal = product.price * item.qty;
        total += itemTotal;
        totalItems += item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <img src="/harvest-hop/images/products/${product.image}" alt="${product.name}">
          <div class="cart-item-info">
            <h3 style="font-size: 1.05rem;">${product.name}</h3>
            <p style="font-size: 0.9rem; color: #555;">$${Number(product.price).toFixed(2)} per ${product.unit}</p>
          </div>
          <div class="quantity-control">
            <button onclick="updateQuantity(${product.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="updateQuantity(${product.id}, 1)" ${item.qty >= product.stock ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>+</button>
          </div>
          <div class="cart-actions">
            <p style="margin-top: 0.4rem;">Subtotal: $${itemTotal.toFixed(2)}</p>
            <p class="remove-label" onclick="removeFromCart(${item.id})">
              <img src="/harvest-hop/images/bin_icon.png" alt="Remove" class="bin-icon"> Remove
            </p>
          </div>
        `;
        container.appendChild(div);
      });

      totalDiv.innerHTML = `
        <div class="cart-footer">
          <div class="cart-summary">
            <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 10px;">
              <p>Cart Total (${totalItems} item${totalItems > 1 ? 's' : ''}): </p>
              <h3>$${total.toFixed(2)}</h3>
            </div>
            <button onclick="window.location.href='delivery.php'" class="checkout-btn">
              <img src="/harvest-hop/images/checkout_icon.png" alt="Checkout" class="checkout-icon">Place Order
            </button>
          </div>
        </div>
      `;
    });
});

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
}