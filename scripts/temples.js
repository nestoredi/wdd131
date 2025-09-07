// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    
    hamburgerBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        // Cambiar el ícono a 'X' cuando está activo
        if (mainNav.classList.contains('active')) {
            hamburgerBtn.textContent = '✕';
        } else {
            hamburgerBtn.textContent = '☰';
        }
    });
    
    // Actualizar el año actual en el footer
    const currentYearElement = document.getElementById('currentYear');
    currentYearElement.textContent = new Date().getFullYear();
    
    // Actualizar la fecha de última modificación
    const lastModifiedElement = document.getElementById('lastModified');
    lastModifiedElement.textContent = formatDate(new Date(document.lastModified));
});

// Función para formatear la fecha
function formatDate(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${date.toLocaleDateString()} ${hours}:${minutes}:${seconds}`;
}