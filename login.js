// Modal de Login
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeLogin = document.querySelector('.close-login');
    
    // Abrir modal al hacer clic en Iniciar Sesión
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
    });
    
    // Cerrar modal al hacer clic en la X
    closeLogin.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    // Manejar el envío del formulario
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Aquí puedes agregar la lógica de autenticación
        console.log('Usuario:', username, 'Contraseña:', password);
        
        // Cerrar el modal después del envío (simulado)
        loginModal.style.display = 'none';
        alert('Inicio de sesión exitoso (simulado)');
    });
});