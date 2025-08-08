document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const cart = [];
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartModal = document.getElementById('cart-modal');
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.querySelector('.close-cart');
    
    // Elementos del flujo de pago
    const checkoutBtn = document.querySelector('.checkout-btn');
    const paymentMethods = document.getElementById('payment-methods');
    const backToCartBtn = document.querySelector('.back-to-cart');
    const cardPaymentForm = document.getElementById('card-payment-form');
    const backToMethodsBtn = document.querySelector('.back-to-methods-btn');
    const paymentAmount = document.getElementById('payment-amount');
    const creditCardForm = document.getElementById('credit-card-form');

    // Inicialización de Stripe (si se usa)
    let stripe, elements;
    if (typeof Stripe !== 'undefined') {
        stripe = Stripe('pk_test_51ABC123XYZ456789'); // Reemplaza con tu clave pública
        elements = stripe.elements();
    }

    // 1. Manejar apertura/cierre del carrito
    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'block';
        resetCartView();
    });
    
    closeCart.addEventListener('click', closeCartModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });

    // 2. Delegación de eventos para añadir productos
    document.addEventListener('click', function(e) {
        // Añadir al carrito
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            addToCart(button);
        }
        
        // Eliminar producto
        if (e.target.closest('.remove-item')) {
            const button = e.target.closest('.remove-item');
            removeFromCart(button.dataset.index);
        }
        
        // Modificar cantidad
        if (e.target.closest('.quantity-btn')) {
            const button = e.target.closest('.quantity-btn');
            adjustQuantity(button.dataset.index, button.classList.contains('minus'));
        }
    });

    // 3. Funciones principales del carrito
    function addToCart(button) {
        const productCard = button.closest('.product-card');
        if (!productCard) return;

        const product = {
            id: productCard.dataset.id || Date.now().toString(),
            name: productCard.querySelector('h3').textContent,
            price: parsePrice(productCard.querySelector('.price').textContent),
            image: productCard.querySelector('img').src,
            quantity: 1
        };

        const existingIndex = cart.findIndex(item => item.id === product.id);
        if (existingIndex >= 0) {
            cart[existingIndex].quantity++;
        } else {
            cart.push(product);
        }

        updateCart();
        showFeedback(productCard, '✓ Añadido al carrito', 'success');
    }

    function removeFromCart(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            updateCart();
            showFeedback(document.body, 'Producto eliminado', 'error');
        }
    }

    function adjustQuantity(index, isDecrease) {
        if (index >= 0 && index < cart.length) {
            if (isDecrease) {
                cart[index].quantity > 1 ? cart[index].quantity-- : removeFromCart(index);
            } else {
                cart[index].quantity++;
            }
            updateCart();
        }
    }

    function updateCart() {
        // Actualizar contador
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Actualizar lista de productos
        cartItemsContainer.innerHTML = cart.length === 0 
            ? '<p class="empty-cart">Tu carrito está vacío</p>' 
            : cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='img/placeholder-product.png'">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="price">$${item.price.toFixed(2)} c/u</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-item" data-index="${index}">&times;</button>
                </div>
            `).join('');
        
        // Actualizar total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
        if (paymentAmount) paymentAmount.textContent = total.toFixed(2);
    }

    // 4. Flujo de pago
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showFeedback(this, 'Tu carrito está vacío', 'error');
            return;
        }
        showPaymentMethods();
    });

    function showPaymentMethods() {
        document.querySelector('.cart-items').style.display = 'none';
        document.querySelector('.cart-total').style.display = 'none';
        checkoutBtn.style.display = 'none';
        
        if (paymentMethods) {
            paymentMethods.style.display = 'block';
        } else {
            console.error('Elemento payment-methods no encontrado');
        }
    }

    backToCartBtn.addEventListener('click', resetCartView);
    
    function resetCartView() {
        document.querySelector('.cart-items').style.display = 'block';
        document.querySelector('.cart-total').style.display = 'flex';
        checkoutBtn.style.display = 'block';
        
        if (paymentMethods) paymentMethods.style.display = 'none';
        if (cardPaymentForm) cardPaymentForm.style.display = 'none';
    }

    // 5. Manejo de métodos de pago
    if (paymentMethods) {
        paymentMethods.addEventListener('click', function(e) {
            const option = e.target.closest('.payment-option');
            if (option) {
                const method = option.dataset.method;
                
                if (method === 'card') {
                    showCardForm();
                } else {
                    processPayment(method);
                }
            }
        });
    }

    function showCardForm() {
        if (paymentMethods) paymentMethods.style.display = 'none';
        
        if (cardPaymentForm) {
            cardPaymentForm.style.display = 'block';
            
            // Inicializar Stripe Elements si es necesario
            if (stripe && !window.stripeElementsInitialized) {
                initializeStripeElements();
                window.stripeElementsInitialized = true;
            }
        } else {
            console.error('Elemento card-payment-form no encontrado');
        }
    }

    if (backToMethodsBtn) {
        backToMethodsBtn.addEventListener('click', showPaymentMethods);
    }

    if (creditCardForm) {
        creditCardForm.addEventListener('submit', handleCardPayment);
    }

    // 6. Funciones de Stripe (si se usa)
    function initializeStripeElements() {
        const style = {
            base: {
                fontSize: '16px',
                color: '#32325d',
            }
        };

        const cardNumber = elements.create('cardNumber', { style });
        cardNumber.mount('#card-number-element');

        const cardExpiry = elements.create('cardExpiry', { style });
        cardExpiry.mount('#card-expiry-element');

        const cardCvc = elements.create('cardCvc', { style });
        cardCvc.mount('#card-cvc-element');
    }

    async function handleCardPayment(e) {
        e.preventDefault();
        
        if (!stripe || !elements) {
            showFeedback(creditCardForm, 'Error en el sistema de pagos', 'error');
            return;
        }

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement('cardNumber'),
            billing_details: {
                name: document.getElementById('cardholder-name').value
            }
        });

        if (error) {
            showFeedback(creditCardForm, `Error: ${error.message}`, 'error');
        } else {
            // Simular envío a backend (en producción, haz una llamada real)
            showFeedback(creditCardForm, 'Procesando pago...', 'info');
            
            setTimeout(() => {
                showFeedback(creditCardForm, 'Pago exitoso!', 'success');
                cart.length = 0;
                updateCart();
                closeCartModal();
            }, 2000);
        }
    }

    // 7. Funciones auxiliares
    function parsePrice(priceString) {
        return parseFloat(priceString.replace(/[^\d.-]/g, ''));
    }

    function showFeedback(element, message, type) {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${type}`;
        feedback.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            ${message}
        `;
        
        element.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('fade-out');
            setTimeout(() => feedback.remove(), 500);
        }, 3000);
    }

    function processPayment(method) {
        showFeedback(paymentMethods, `Procesando pago con ${getMethodName(method)}...`, 'info');
        
        setTimeout(() => {
            showFeedback(paymentMethods, `Pago con ${getMethodName(method)} completado!`, 'success');
            cart.length = 0;
            updateCart();
            closeCartModal();
        }, 2000);
    }

    function getMethodName(method) {
        const methods = {
            'mercadopago': 'Mercado Pago',
            'paypal': 'PayPal',
            'card': 'Tarjeta'
        };
        return methods[method] || method;
    }

    function closeCartModal() {
        cartModal.style.display = 'none';
        resetCartView();
    }

    // Inicialización
    updateCart();
});