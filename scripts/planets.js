// Planet gravity factors relative to Earth
const planetData = {
    mercury: { 
        gravity: 0.378, 
        name: 'Mercury', 
        image: 'images/mercury.png',
        fact: "Closest to the Sun with extreme temperatures",
        description: "Mercury has the most extreme temperature variations, from 427°C during the day to -173°C at night.",
        distance: "57.9 million km from Sun",
        diameter: "4,879 km",
        day: "59 Earth days",
        year: "88 Earth days"
    },
    venus: { 
        gravity: 0.907, 
        name: 'Venus', 
        image: 'images/venus.png',
        fact: "Hottest planet with thick toxic atmosphere",
        description: "Venus has the thickest atmosphere and hottest surface temperature of any planet at 462°C.",
        distance: "108.2 million km from Sun",
        diameter: "12,104 km",
        day: "243 Earth days",
        year: "225 Earth days"
    },
    earth: { 
        gravity: 1.0, 
        name: 'Earth', 
        image: 'images/earth.png',
        fact: "The only known planet with life",
        description: "Earth is the only known planet with life and liquid water covering 71% of its surface.",
        distance: "149.6 million km from Sun",
        diameter: "12,756 km",
        day: "24 hours",
        year: "365.25 days"
    },
    mars: { 
        gravity: 0.377, 
        name: 'Mars', 
        image: 'images/mars.png',
        fact: "The Red Planet with the largest volcano",
        description: "Mars has the largest volcano in the solar system, Olympus Mons, and evidence of ancient water flows.",
        distance: "227.9 million km from Sun",
        diameter: "6,792 km",
        day: "24.6 hours",
        year: "687 Earth days"
    },
    jupiter: { 
        gravity: 2.36, 
        name: 'Jupiter', 
        image: 'images/jupiter.png',
        fact: "Largest planet with a Great Red Spot storm",
        description: "Jupiter is so massive it could contain all other planets combined and has at least 79 known moons.",
        distance: "778.5 million km from Sun",
        diameter: "142,984 km",
        day: "9.9 hours",
        year: "12 Earth years"
    },
    saturn: { 
        gravity: 0.916, 
        name: 'Saturn', 
        image: 'images/saturn.png',
        fact: "Famous for its beautiful ring system",
        description: "Saturn's rings are made of billions of ice and rock particles and it could float in water due to its low density.",
        distance: "1.43 billion km from Sun",
        diameter: "120,536 km",
        day: "10.7 hours",
        year: "29 Earth years"
    },
    uranus: { 
        gravity: 0.889, 
        name: 'Uranus', 
        image: 'images/uranus.png',
        fact: "Rotates on its side with faint rings",
        description: "Uranus rotates on its side at a 98-degree angle and has faint rings discovered in 1977.",
        distance: "2.88 billion km from Sun",
        diameter: "51,118 km",
        day: "17.2 hours",
        year: "84 Earth years"
    },
    neptune: { 
        gravity: 1.13, 
        name: 'Neptune', 
        image: 'images/neptune.png',
        fact: "Windiest planet in the solar system",
        description: "Neptune has the fastest winds in the solar system, reaching speeds up to 2,100 km/h.",
        distance: "4.50 billion km from Sun",
        diameter: "49,528 km",
        day: "16.1 hours",
        year: "165 Earth years"
    }
};

// DOM elements
let weightInput, planetSelect, calculateButton;
let resultSection, planetImage, planetName, selectedPlanetName;
let calculatedWeight, gravityFactor;
let planetOptions;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    setDefaultPlanet();
});

function initializeElements() {
    weightInput = document.getElementById('weightInput');
    planetSelect = document.getElementById('planetSelect');
    calculateButton = document.getElementById('calculateButton');
    resultSection = document.getElementById('resultSection');
    planetImage = document.getElementById('planetImage');
    planetName = document.getElementById('planetName');
    selectedPlanetName = document.getElementById('selectedPlanetName');
    calculatedWeight = document.getElementById('calculatedWeight');
    gravityFactor = document.getElementById('gravityFactor');
    planetOptions = document.querySelectorAll('.planet-option');
}

function setupEventListeners() {
    // Calculate button
    calculateButton.addEventListener('click', calculateWeight);
    
    // Planet selection from visual grid
    planetOptions.forEach(option => {
        option.addEventListener('click', function() {
            const planetKey = this.dataset.planet;
            selectPlanet(planetKey);
            if (weightInput.value) {
                calculateWeight();
            }
        });
    });
    
    // Dropdown selection
    planetSelect.addEventListener('change', function() {
        if (this.value) {
            selectPlanet(this.value);
            if (weightInput.value) {
                calculateWeight();
            }
        }
    });
    
    // Enter key support
    weightInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && planetSelect.value) {
            calculateWeight();
        }
    });
    
    // Auto-calculate when weight is entered and planet is selected
    weightInput.addEventListener('input', function() {
        if (this.value && planetSelect.value) {
            calculateWeight();
        }
    });
    
    // Focus on weight input when page loads
    weightInput.focus();
}

function setDefaultPlanet() {
    selectPlanet('earth');
}

function selectPlanet(planetKey) {
    // Update dropdown
    planetSelect.value = planetKey;
    
    // Update visual selection
    planetOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.planet === planetKey) {
            option.classList.add('selected');
        }
    });
    
    // Update planet display in result area
    const planet = planetData[planetKey];
    if (planet) {
        planetImage.src = planet.image;
        planetImage.alt = planet.name;
        planetName.textContent = planet.name;
        selectedPlanetName.textContent = planet.name;
        gravityFactor.textContent = planet.gravity.toFixed(3);
    }
}

function calculateWeight() {
    const weight = parseFloat(weightInput.value);
    const selectedPlanet = planetSelect.value;
    
    // Validation
    if (!weight || weight <= 0) {
        showError('Please enter a valid weight greater than 0.');
        weightInput.focus();
        return;
    }
    
    if (!selectedPlanet) {
        showError('Please select a planet.');
        return;
    }
    
    // Calculate weight on selected planet
    const planet = planetData[selectedPlanet];
    const planetWeight = (weight * planet.gravity).toFixed(1);
    
    // Update display
    calculatedWeight.textContent = planetWeight + ' kg';
    
    // Show result section with animation
    resultSection.classList.add('active');
    resultSection.classList.add('fade-in');
    
    // Update all display elements
    updatePlanetDisplay(selectedPlanet);
    
    // Remove fade-in class after animation
    setTimeout(() => {
        resultSection.classList.remove('fade-in');
    }, 500);
}

function updatePlanetDisplay(planetKey) {
    const planet = planetData[planetKey];
    
    // Update main planet display
    planetImage.src = planet.image;
    planetImage.alt = planet.name;
    planetName.textContent = planet.name;
    selectedPlanetName.textContent = planet.name;
    gravityFactor.textContent = planet.gravity.toFixed(3);
    
    // Update visual selection
    planetOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.planet === planetKey) {
            option.classList.add('selected');
        }
    });
}

function showError(message) {
    // Create or update error message
    let errorDiv = document.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: rgba(244, 67, 54, 0.2);
            border: 2px solid #f44336;
            color: #f44336;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            text-align: center;
            font-weight: bold;
        `;
        calculateButton.parentNode.insertBefore(errorDiv, calculateButton.nextSibling);
    }
    
    errorDiv.textContent = message;
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 3000);
}

// Function to reset calculator
function resetCalculator() {
    weightInput.value = '';
    planetSelect.value = '';
    resultSection.classList.remove('active');
    setDefaultPlanet();
    
    // Remove any error messages
    const errorDiv = document.querySelector('.error-message');
    if (errorDiv && errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
    }
}

// Add planet facts for educational purpose
const planetFacts = {
    mercury: "Mercury has the most extreme temperature variations, from 427°C during the day to -173°C at night.",
    venus: "Venus has the thickest atmosphere and hottest surface temperature of any planet at 462°C.",
    earth: "Earth is the only known planet with life and liquid water covering 71% of its surface.",
    mars: "Mars has the largest volcano in the solar system, Olympus Mons, and evidence of ancient water flows.",
    jupiter: "Jupiter is so massive it could contain all other planets combined and has at least 79 known moons.",
    saturn: "Saturn's rings are made of billions of ice and rock particles and it could float in water due to its low density.",
    uranus: "Uranus rotates on its side at a 98-degree angle and has faint rings discovered in 1977.",
    neptune: "Neptune has the fastest winds in the solar system, reaching speeds up to 2,100 km/h."
};

// Optional: Add tooltip functionality for planet facts
function addPlanetTooltips() {
    planetOptions.forEach(option => {
        const planetKey = option.dataset.planet;
        option.title = planetFacts[planetKey];
    });
}

// Initialize tooltips when DOM is ready
document.addEventListener('DOMContentLoaded', addPlanetTooltips);
