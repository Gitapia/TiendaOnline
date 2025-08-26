<!DOCTYPE html>
<html lang="es">
<head>
    <!-- METADATOS Y ENLACES EXTERNOS -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Tienda Online</title>
    <link rel="stylesheet" href="/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <!-- ============================================ -->
    <!-- BARRA DE NAVEGACIÓN PRINCIPAL -->
    <!-- ============================================ -->
    <header>
        <div class="container">
            <!-- LOGO DE LA TIENDA -->
            <div class="logo">
                <a href="index.html"><img src="img/logo.png" alt="Logo de la tienda"></a>
            </div>
            
            <!-- MENÚ DE NAVEGACIÓN PRINCIPAL -->
            <nav class="main-nav">
                <ul>
                    <li><a href="index.html" class="active">Inicio</a></li>
                    <li><a href="productos.html">Productos</a></li>
                    <!-- MENÚ DESPLEGABLE DE CATEGORÍAS -->
                    <li><a href="#">Categorías</a>
                        <ul class="submenu">
                            <li><a href="#">Electrónica</a></li>
                            <li><a href="#">Ropa</a></li>
                            <li><a href="#">Hogar</a></li>
                        </ul>
                    </li>
                    <li><a href="contacto.html">Contacto</a></li>
                </ul>
            </nav>
            
            <!-- ACCIONES DE USUARIO: CARRITO Y LOGIN -->
            <div class="user-actions">
                <!-- BOTÓN DEL CARRITO DE COMPRAS -->
                <a href="#" class="cart-btn" id="cart-toggle">
                    <i class="fas fa-shopping-cart"></i> 
                    <span class="cart-count">0</span>
                </a>
                <!-- BOTÓN DE INICIO DE SESIÓN -->
                <a href="#" class="login-btn">Iniciar Sesión</a>
            </div>
        </div>
    </header>

    <!-- ============================================ -->
    <!-- BANNER PRINCIPAL (HERO SECTION) -->
    <!-- ============================================ -->
    <section class="hero">
        <div class="container">
            <h1>Bienvenido a Nuestra Tienda</h1>
            <p>Los mejores productos al mejor precio</p>
            <a href="productos.html" class="btn">Ver Productos</a>
        </div>
    </section>

    <!-- ============================================ -->
    <!-- SECCIÓN DE PRODUCTOS DESTACADOS -->
    <!-- ============================================ -->
    <section class="featured-products">
        <div class="container">
            <h2>Productos Destacados</h2>
            <!-- CONTENEDOR DE LA CUADRÍCULA DE PRODUCTOS -->
            <div class="products-grid">
                
                <!-- PRODUCTO 1 -->
                <div class="product-card">
                    <img src="img/producto1.jpg" alt="Producto 1">
                    <h3>Nombre del Producto 1</h3>
                    <p class="price">$2500</p>
                    <button class="btn add-to-cart">Añadir al Carrito</button>
                    <a href="#" class="btn-details">Ver Detalles</a>
                </div>
                
                <!-- PRODUCTO 2 -->
                <div class="product-card">
                    <img src="img/producto2.jpg" alt="Producto 2">
                    <h3>Nombre del Producto 2</h3>
                    <p class="price">$350.00</p>
                    <button class="btn add-to-cart">Añadir al Carrito</button>
                    <a href="#" class="btn-details">Ver Detalles</a>
                </div>
                
                <!-- PRODUCTO 3 -->
                <div class="product-card">
                    <img src="img/producto3.jpg" alt="Producto 3">
                    <h3>Nombre del Producto 3</h3>
                    <p class="price">$300.00</p>
                    <button class="btn add-to-cart">Añadir al Carrito</button>
                    <a href="#" class="btn-details">Ver Detalles</a>
                </div>
                
                <!-- PRODUCTO 4 -->
                <div class="product-card">
                    <img src="img/producto4.jpg" alt="Producto 4">
                    <h3>Nombre del Producto 4</h3>
                    <p class="price">$250.00</p>
                    <button class="btn add-to-cart">Añadir al Carrito</button>
                    <a href="#" class="btn-details">Ver Detalles</a>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================ -->
    <!-- MODAL DEL CARRITO DE COMPRAS (OCULTO INICIALMENTE) -->
    <!-- ============================================ -->
    <div class="cart-modal" id="cart-modal">
        <div class="cart-content">
            <span class="close-cart">&times;</span>
            <h2>Tu Carrito</h2>
            <!-- CONTENEDOR PARA LOS ITEMS DEL CARRITO -->
            <div class="cart-items" id="cart-items">
                <!-- Los productos se añadirán aquí dinámicamente mediante JavaScript -->
            </div>
            <!-- SECCIÓN DEL TOTAL Y BOTÓN DE PAGO -->
            <div class="cart-total">
                <p>Total: <span id="cart-total">$0.00</span></p>
                <button class="btn checkout-btn">Proceder al Pago</button>
            </div>
        </div>
    </div>

    <!-- ============================================ -->
    <!-- PIE DE PÁGINA (FOOTER) -->
    <!-- ============================================ -->
    <footer>
        <div class="container">
            <!-- SECCIÓN INFORMATIVA -->
            <div class="footer-section">
                <h4>Sobre Nosotros</h4>
                <p>Somos una tienda online comprometida con la calidad y el servicio al cliente.</p>
            </div>
            
            <!-- SECCIÓN DE ENLACES RÁPIDOS -->
            <div class="footer-section">
                <h4>Enlaces Rápidos</h4>
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="productos.html">Productos</a></li>
                    <li><a href="contacto.html">Contacto</a></li>
                    <li><a href="#">Términos y condiciones</a></li>
                </ul>
            </div>
            
            <!-- SECCIÓN DE CONTACTO -->
            <div class="footer-section">
                <h4>Contacto</h4>
                <p>Email: info@mitienda.com</p>
                <p>Teléfono: +123 456 7890</p>
            </div>
            
            <!-- SECCIÓN DE REDES SOCIALES -->
            <div class="footer-section">
                <h4>Síguenos</h4>
                <div class="social-icons">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        
        <!-- SECCIÓN DE DERECHOS DE AUTOR -->
        <div class="copyright">
            <p>&copy; 2023 Mi Tienda Online. Todos los derechos reservados.</p>
        </div>
    </footer>

    <!-- ============================================ -->
    <!-- MODAL DE INICIO DE SESIÓN (OCULTO INICIALMENTE) -->
    <!-- ============================================ -->
    <div class="login-modal" id="login-modal">
        <div class="login-content">
            <span class="close-login">&times;</span>
            <h2>Iniciar Sesión</h2>
            <!-- FORMULARIO DE LOGIN -->
            <form id="login-form">
                <div class="form-group">
                    <label for="username">Usuario:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn login-submit">Ingresar</button>
                <!-- ENLACES ADICIONALES DE LOGIN -->
                <div class="login-links">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                    <a href="#">Registrarse</a>
                </div>
            </form>
        </div>
    </div>

    <!-- ============================================ -->
    <!-- SCRIPTS DE JAVASCRIPT -->
    <!-- ============================================ -->
    <script src="cart.js"></script> <!-- Controla la funcionalidad del carrito -->
    <script src="login.js"></script> <!-- Gestiona el inicio de sesión -->
</body>
</html>
