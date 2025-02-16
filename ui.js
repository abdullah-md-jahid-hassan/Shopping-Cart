document.addEventListener("DOMContentLoaded", renderCart);

async function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    
    cartContainer.innerHTML = "";
    let total = 0;

    const response = await fetch('data.json');
    const products = await response.json();

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            total += product.price * item.quantity;

            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                ${product.name} - $${product.price.toFixed(2)} x 
                <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        }
    });

    totalDisplay.innerText = total.toFixed(2);
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll("input[type='number']").forEach(input => {
        input.addEventListener("change", (e) => {
            updateQuantity(parseInt(e.target.dataset.id), parseInt(e.target.value));
        });
    });

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (e) => {
            removeFromCart(parseInt(e.target.dataset.id));
        });
    });

    document.getElementById("clear-cart").addEventListener("click", clearCart);
}
