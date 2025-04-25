const form = document.getElementById("deliveryForm");
const submitBtn = form.querySelector(".place-order-btn");

// Enable/disable Place Order button on input
form.addEventListener("input", () => {
  submitBtn.disabled = !form.checkValidity();
});

// Show custom validation messages
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Validate manually and show errors
  let allValid = true;
  const fields = form.querySelectorAll("input, select");

  fields.forEach(field => {
    const errorEl = field.parentElement.querySelector(".error-msg");
    if (!field.checkValidity()) {
      errorEl.textContent = field.validationMessage;
      allValid = false;
    } else {
      errorEl.textContent = "";
    }
  });

  if (!allValid) return;
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const formData = new FormData(form);
  const rawInfo = Object.fromEntries(formData.entries());

  const userInfo = {
    name: rawInfo.name,
    email: rawInfo.email,
    mobile: rawInfo.mobile,
    street: rawInfo.street,
    city: rawInfo.city,
    state: rawInfo.state,
    pincode: rawInfo.pincode
  };
  
  const response = await fetch("../api/submitOrder.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userInfo, cart })
  });

  const result = await response.json();

  if (result.success) {
    localStorage.setItem("lastUserEmail", userInfo.email);
    localStorage.setItem("lastUserName", userInfo.name);
    localStorage.removeItem("cart");
    window.location.href = "confirm.php";
  } else {
    alert("Order failed: " + result.message);
  }
});