const form = document.getElementById("deliveryForm");
const submitBtn = form.querySelector(".place-order-btn");

// Live field validation
function validateFormFields() {
  let allValid = true;
  const fields = form.querySelectorAll("input, select");

  fields.forEach(field => {
    const errorEl = field.parentElement.querySelector(".error-msg");
    if (!field.checkValidity()) {
      allValid = false;

      if (field.name === "name") {
        errorEl.textContent = "Please enter your full name (first and last).";
      } else if (field.name === "email") {
        errorEl.textContent = "Please enter a valid email address.";
      } else if (field.name === "mobile") {
        errorEl.textContent = "Mobile number must be 10 digits.";
      } else if (field.name === "street") {
        errorEl.textContent = "Please enter your street address.";
      } else if (field.name === "city") {
        errorEl.textContent = "Please enter your city or suburb.";
      } else if (field.name === "pincode") {
        errorEl.textContent = "Pincode must be a 4-digit number.";
      } else if (field.name === "state") {
        errorEl.textContent = "Please select your state.";
      } else {
        errorEl.textContent = "Please fill in this field.";
      }
    } else {
      errorEl.textContent = "";
    }
  });

  submitBtn.disabled = !allValid;
  submitBtn.classList.toggle("disabled", !allValid);
}

// Hook into input and change events for instant validation
form.addEventListener("input", validateFormFields);
form.addEventListener("change", validateFormFields);

// Submit logic
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!form.checkValidity()) return;
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
    showToast(result.message || "Something went wrong.");
    setTimeout(() => {
      window.location.href = "cart.php";
    }, 3000); 
  }  
});

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.classList.remove("show");
  
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}