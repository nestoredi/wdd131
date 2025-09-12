// Array of Temple Objects with local images
const temples = [
    {
        templeName: "Bogota Colombia Temple",
        location: "Bogota, Colombia",
        dedicated: "1999, April, 24",
        area: 53000,
        imageUrl: "images/bogota_colombia_temple_lds.jpeg"
    },
    {
        templeName: "Buenos Aires Argentina Temple",
        location: "Buenos Aires, Argentina",
        dedicated: "1986, January, 17",
        area: 30600,
        imageUrl: "images/buenos_aires_argentina_temple.jpeg"
    },
    {
        templeName: "Draper Utah Temple",
        location: "Draper, Utah, United States",
        dedicated: "2009, March, 20",
        area: 58300,
        imageUrl: "images/draper_utah_temple.jpeg"
    },
    {
        templeName: "Montevideo Uruguay Temple",
        location: "Montevideo, Uruguay",
        dedicated: "2001, March, 18",
        area: 10700,
        imageUrl: "images/montevideo_uruguay_temple_lds.jpeg"
    },
    {
        templeName: "Jordan River Utah Temple",
        location: "South Jordan, Utah, United States",
        dedicated: "1981, November, 16",
        area: 148236,
        imageUrl: "images/jordan_river_temple_lds.jpeg"
    },
    {
        templeName: "São Paulo Brazil Temple",
        location: "São Paulo, Brazil",
        dedicated: "1978, November, 2",
        area: 59246,
        imageUrl: "images/sao_paulo_brazil_temple_lds.jpeg"
    },
    {
        templeName: "Tijuana Mexico Temple",
        location: "Tijuana, Mexico",
        dedicated: "2015, December, 13",
        area: 33000,
        imageUrl: "images/tijuana_mexico_temple_exterior.jpeg"
    },
    {
        templeName: "Albuquerque New Mexico Temple",
        location: "Albuquerque, New Mexico, United States",
        dedicated: "2000, March, 5",
        area: 34000,
        imageUrl: "images/albuquerque_temple_lds.jpeg"
    },
    {
        templeName: "Asunción Paraguay Temple",
        location: "Asunción, Paraguay",
        dedicated: "2002, May, 19",
        area: 11000,
        imageUrl: "images/asuncion_paraguay_temple_lds.jpeg"
    },
    
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl: "images/salt_lake_temple_lds.jpeg"
    },
    {
        templeName: "Logan Utah Temple",
        location: "Logan, Utah, United States",
        dedicated: "1884, May, 17",
        area: 119000,
        imageUrl: "images/logan_temple_lds.jpeg"
    },
    {
        templeName: "Manti Utah Temple",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "images/manti_temple_lds.jpeg"
    }
];

// Function to create temple card HTML
function createTempleCard(temple) {
    return `
        <figure>
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <figcaption>
                <h3>${temple.templeName}</h3>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </figcaption>
        </figure>
    `;
}

// Function to display temples based on filter
function displayTemples(filter = 'all') {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    let filteredTemples = [];
    
    switch(filter) {
        case 'old':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year < 1900;
            });
            break;
        case 'new':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year > 2000;
            });
            break;
        case 'large':
            filteredTemples = temples.filter(temple => temple.area > 90000);
            break;
        case 'small':
            filteredTemples = temples.filter(temple => temple.area < 10000);
            break;
        default:
            filteredTemples = temples;
    }
    
    filteredTemples.forEach(temple => {
        gallery.innerHTML += createTempleCard(temple);
    });
}

// Funcionalidad del menú hamburguesa y filtrado
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav a');
    
    hamburgerBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        // Cambiar el ícono a 'X' cuando está activo
        if (mainNav.classList.contains('active')) {
            hamburgerBtn.textContent = '✕';
        } else {
            hamburgerBtn.textContent = '☰';
        }
    });
    
    // Add event listeners to nav links for filtering
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            displayTemples(filter);
            
            // Update active state on navigation
            navLinks.forEach(item => item.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
    
    // Display all temples by default
    displayTemples();
    
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