document.addEventListener("DOMContentLoaded", () => {
    initCheckout();
    initCheckoutPopup();
});

function initCheckout() {
    const sendBtn = document.getElementById("send-order-btn");
    if (!sendBtn) return;

    // Replace to remove old listeners
    sendBtn.replaceWith(sendBtn.cloneNode(true));
    const newSendBtn = document.getElementById("send-order-btn");

    newSendBtn.addEventListener("click", async () => {
        const form = document.getElementById("order-form");

        // ✅ Run browser's native HTML5 validation first
        if (!form.checkValidity()) {
            form.reportValidity(); // show built-in error popups
            return;
        }

        const countrySelect = document.getElementById("country");
        const phoneCodeInput = document.getElementById("phone-code");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const customer = {
            name: document.getElementById("cust-name").value.trim(),
            phone: (phoneCodeInput.value || '') + " " + document.getElementById("cust-phone").value.trim(),
            address: document.getElementById("cust-address").value.trim(),
            houseNumber: document.getElementById("house-number").value.trim(),
            city: document.getElementById("city").value.trim(),
            postcode: document.getElementById("postcode").value.trim(),
            email: document.getElementById("cust-email").value.trim(),
            country: countrySelect.value,
            paymentMethod: document.getElementById("payment-method").value,
        };

        // ✅ Extra manual validation (optional)
        if (cart.length === 0) {
            alert("Korpa je prazna.");
            return;
        }

        let total = formatPrice();
        const regeneratedCart = cart.map(item => [...item]);
        const orderData = { customer, cart: regeneratedCart, total };

        const link = window.location.href == "index.html" ? "sendOrder.php" : "../sendOrder.php";
        const redirect = window.location.href == "index.html" ? "Redirect.html" : "../Redirect.html";

        fetch(link, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        })
        .then(async res => {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return res.json();
            } else {
                const text = await res.text();
                throw new Error("Server returned non-JSON: " + text);
            }
        })
        .then(data => {
            if (data.status === "ok") {
                form.reset();
                localStorage.removeItem("cart");
                document.getElementById("total-price").textContent = "0 RSD";
                window.location.href = redirect;
            } else {
                console.error("Server error:", data);
            }
        })
        .catch(err => {
            console.error("Network or server error:", err);
        });
    });

    // Prefix update
    const countrySelect = document.getElementById("country");
    const phoneCodeInput = document.getElementById("phone-code");

    countrySelect.addEventListener("change", () => {
        const selectedOption = countrySelect.options[countrySelect.selectedIndex];
        const code = selectedOption.getAttribute("data-code") || "";
        phoneCodeInput.value = code;
        document.getElementById("cust-phone").disabled = false;
    });

    if (countrySelect.value) {
        const selectedOption = countrySelect.options[countrySelect.selectedIndex];
        phoneCodeInput.value = selectedOption.getAttribute("data-code") || "";
    }
}

function initCheckoutPopup() {
    const payBtn = document.getElementById("pay");
    const overlay = document.getElementById("checkout-overlay");
    const closeBtn = document.getElementById("checkout-close");
    const totalPriceEl = document.getElementById("total-price");

    if (!payBtn || !overlay || !closeBtn || !totalPriceEl) return;

    payBtn.addEventListener("click", () => {
        totalPriceEl.textContent = formatNumber(formatPrice()) + " RSD";
        overlay.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });
}

// Phone filter
document.getElementById("cust-phone").addEventListener("input", () => {
    const phoneField = document.getElementById("cust-phone");
    phoneField.value = phoneField.value.replace(/[^0-9+]/g, "");
});
