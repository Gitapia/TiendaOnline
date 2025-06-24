document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const cart = [];
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartModal = document.getElementById('cart-modal');
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.querySelector('.close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Abrir/cerrar el carrito
    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'block';
    });
    
    closeCart.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Añadir productos al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Crear objeto producto
            const product = {
                name: productName,
                price: parseFloat(productPrice.replace('$', '')),
                image: productImage,
                quantity: 1
            };
            
            // Verificar si el producto ya está en el carrito
            const existingProduct = cart.find(item => item.name === product.name);
            
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }
            
            updateCart();
        });
    });
    
    // Actualizar el carrito
    function updateCart() {
        // Actualizar contador
        const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Actualizar lista de productos
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío</p>';
        } else {
            cart.forEach((product, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="cart-item-info">
                        <h4>${product.name}</h4>
                        <p>Cantidad: ${product.quantity}</p>
                    </div>
                    <div class="cart-item-price">$${(product.price * product.quantity).toFixed(2)}</div>
                    <span class="remove-item" data-index="${index}">&times;</span>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
        
        // Actualizar total
        const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
        
        // Añadir event listeners a los botones de eliminar
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
    
    // Inicializar el carrito
    updateCart();
});