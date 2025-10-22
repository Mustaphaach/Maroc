// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 2000); // Shows preloader for 2 seconds
});
// Destinations Data
const destinationsData = [
  {
    id: 1,
    name: 'Marrakech',
    description: 'The Red City captivates with its bustling souks, stunning palaces, and vibrant Jemaa el-Fnaa square. Experience the magic of Morocco\'s most iconic destination.',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800',
    features: ['Medina', 'Souks', 'Palaces', 'Gardens']
  },
  {
    id: 2,
    name: 'Fes',
    description: 'Ancient imperial city with the world\'s largest car-free urban zone. Explore winding alleys, historic madrasas, and traditional tanneries.',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800',
    features: ['Medina', 'Tanneries', 'History', 'Artisans']
  },
  {
    id: 3,
    name: 'Chefchaouen',
    description: 'The enchanting blue pearl of Morocco nestled in the Rif Mountains. Perfect for photography and peaceful mountain exploration.',
    image: 'https://images.unsplash.com/photo-1516985212057-1997dfa07a4d?w=800',
    features: ['Mountains', 'Photography', 'Hiking', 'Crafts']
  },
  {
    id: 4,
    name: 'Merzouga',
    description: 'Gateway to the Sahara Desert. Experience magical dunes, camel treks, and unforgettable starry nights in desert camps.',
    image: 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=800',
    features: ['Desert', 'Camels', 'Dunes', 'Camping']
  },
  {
    id: 5,
    name: 'Essaouira',
    description: 'Charming coastal town with Portuguese fortifications, fresh seafood, and world-class wind sports on Atlantic beaches.',
    image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800',
    features: ['Beach', 'Surfing', 'Seafood', 'Art']
  },
  {
    id: 6,
    name: 'Casablanca',
    description: 'Morocco\'s economic heart featuring the magnificent Hassan II Mosque, Art Deco architecture, and modern cosmopolitan energy.',
    image: 'https://images.unsplash.com/photo-1554072675-66db59dba46f?w=800',
    features: ['Modern', 'Mosque', 'Architecture', 'Business']
  },
  {
    id: 7,
    name: 'Rabat',
    description: 'The capital city blends ancient heritage with modern governance. Explore the Kasbah of the Udayas and Hassan Tower.',
    image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800',
    features: ['Capital', 'History', 'Museums', 'Gardens']
  },
  {
    id: 8,
    name: 'Agadir',
    description: 'Modern beach resort with year-round sunshine, golden beaches, and gateway to the Anti-Atlas mountains.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Agadir-cityreflection.jpg',
    features: ['Beach', 'Resort', 'Golf', 'Relaxation']
  },
  {
    id: 9,
    name: 'Ouarzazate',
    description: 'Hollywood of Africa! Explore kasbahs, film studios, and dramatic desert landscapes used in countless movies.',
    image: 'https://images.unsplash.com/photo-1564053489984-317bbd824340?w=800',
    features: ['Desert', 'Films', 'Kasbahs', 'History']
  }
];

// Map Destinations
const mapDestinations = [
  'Marrakech', 'Fes', 'Chefchaouen', 'Casablanca', 'Rabat', 
  'Essaouira', 'Agadir', 'Merzouga', 'Ouarzazate', 'Tangier',
  'Meknes', 'Tetouan', 'Dades Valley', 'Todra Gorge', 'Imlil'
];

// DOM Elements
const destinationsGrid = document.getElementById('destinations-grid');
const mapContainer = document.getElementById('map-container');
const nav = document.querySelector('nav');

// Render Destinations
function renderDestinations() {
  destinationsGrid.innerHTML = '';
  
  destinationsData.forEach((dest, index) => {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="destination-image" style="background-image: url('${dest.image}')">
        <div class="destination-overlay">
          <div class="destination-name">${dest.name}</div>
        </div>
      </div>
      <div class="destination-content">
        <p class="destination-description">${dest.description}</p>
        <div class="destination-features">
          ${dest.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
        </div>
        <button class="destination-btn">Explore ${dest.name}</button>
      </div>
    `;
    
    destinationsGrid.appendChild(card);
  });
}

// Render Map Pins
function renderMap() {
  mapContainer.innerHTML = '';
  
  mapDestinations.forEach(dest => {
    const pin = document.createElement('div');
    pin.className = 'map-pin';
    pin.textContent = dest;
    pin.addEventListener('click', () => {
      alert(`Exploring ${dest}!\n\nThis would open detailed information about ${dest}.`);
    });
    mapContainer.appendChild(pin);
  });
}

// Scroll Effect for Navigation
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Region Buttons
document.querySelectorAll('.region-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const region = e.target.closest('.region-card').dataset.region;
    alert(`Exploring ${region} region!\n\nThis would show all destinations in the ${region} region.`);
  });
});

// Destination Buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('destination-btn')) {
    const destName = e.target.textContent.replace('Explore ', '');
    alert(`${destName} Details\n\nThis would open a detailed page with:\n• Attractions\n• Hotels\n• Restaurants\n• Activities\n• Travel Tips`);
  }
});

// Initialize
renderDestinations();
renderMap();
