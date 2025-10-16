// About page JavaScript - Generates planet cards dynamically

document.addEventListener('DOMContentLoaded', function() {
    generatePlanetCards();
});

function generatePlanetCards() {
    const planetsGrid = document.getElementById('planetsGrid');
    
    if (!planetsGrid) return;
    
    // Clear existing content
    planetsGrid.innerHTML = '';
    
    // Generate a card for each planet
    Object.keys(planetData).forEach(planetKey => {
        const planet = planetData[planetKey];
        const card = createPlanetCard(planet, planetKey);
        planetsGrid.appendChild(card);
    });
}

function createPlanetCard(planet, planetKey) {
    const card = document.createElement('div');
    card.className = 'planet-card';
    card.dataset.planet = planetKey;
    
    card.innerHTML = `
        <div class="planet-card-header">
            <img src="${planet.image}" alt="${planet.name}" class="planet-card-img">
            <h3 class="planet-name">${planet.name}</h3>
        </div>
        
        <div class="planet-card-content">
            <p class="planet-fact">${planet.fact}</p>
            <p class="planet-description">${planet.description}</p>
            
            <div class="planet-stats">
                <div class="stat">
                    <span class="stat-label">Distance from Sun:</span>
                    <span class="stat-value">${planet.distance}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Diameter:</span>
                    <span class="stat-value">${planet.diameter}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Day Length:</span>
                    <span class="stat-value">${planet.day}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Year Length:</span>
                    <span class="stat-value">${planet.year}</span>
                </div>
                <div class="stat gravity-stat">
                    <span class="stat-label">Gravity:</span>
                    <span class="stat-value">${planet.gravity}× Earth's gravity</span>
                </div>
            </div>
            
        </div>
    `;
    
    // Add click animation
    card.addEventListener('click', function() {
        this.classList.add('card-clicked');
        setTimeout(() => {
            this.classList.remove('card-clicked');
        }, 200);
    });
    
    return card;
}

// Optional: Add search/filter functionality
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search planets...';
    searchInput.className = 'planet-search';
    
    const planetsContainer = document.querySelector('.planets-container');
    const planetsTitle = planetsContainer.querySelector('h2');
    
    planetsContainer.insertBefore(searchInput, planetsTitle.nextSibling);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const planetCards = document.querySelectorAll('.planet-card');
        
        planetCards.forEach(card => {
            const planetName = card.querySelector('.planet-name').textContent.toLowerCase();
            const planetFact = card.querySelector('.planet-fact').textContent.toLowerCase();
            
            if (planetName.includes(searchTerm) || planetFact.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addSearchFunctionality, 100);
});