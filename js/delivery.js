const form = document.getElementById("deliveryForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const userInfo = Object.fromEntries(formData.entries());
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const response = await fetch("../api/submitOrder.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userInfo, cart })
  });

  const result = await response.json();

  if (result.success) {
    localStorage.removeItem("cart");
    window.location.href = "confirm.html";
  } else {
    alert("Order failed: " + result.message);
  }
});