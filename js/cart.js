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
        container.innerHTML = "";
  
        cart.forEach(item => {
          const product = products.find(p => p.id == item.id);
          if (!product) return;
  
          const itemTotal = product.price * item.qty;
          total += itemTotal;
  
          const div = document.createElement("div");
          div.className = "cart-item";
          div.innerHTML = `
            <img src="/harvest-hop/images/${product.image}" alt="${product.name}">
            <div>
              <h3>${product.name}</h3>
              <p>Price: $${product.price}</p>
              <p>Quantity: ${item.qty}</p>
              <p>Subtotal: $${itemTotal.toFixed(2)}</p>
              <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          `;
          container.appendChild(div);
        });
  
        totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
      });
  });
  
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // refresh to update UI
  }
  