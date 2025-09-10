// Function to calculate wind chill in metric system (Celsius)
function calculateWindChill(temp, windSpeed) {
    // Formula for wind chill in metric system
    return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temp * Math.pow(windSpeed, 0.16));
}

// Update footer with current year and last modified date
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = new Date(document.lastModified).toLocaleString();

// Calculate and display wind chill
const temp = 22; // Static temperature value in Celsius
const windSpeed = 12; // Static wind speed value in km/h

// Check if wind chill calculation is viable (metric conditions)
if (temp <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temp, windSpeed);
    document.getElementById('wind-chill').textContent = `${Math.round(windChill)}°C`;
} else {
    document.getElementById('wind-chill').textContent = 'N/A';
}