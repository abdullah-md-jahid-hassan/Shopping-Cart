let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) return;
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
    }
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
