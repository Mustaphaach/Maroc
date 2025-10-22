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
// Airports Data
const airportsData = [
  {
    code: 'RAK',
    name: 'Marrakech Menara Airport',
    location: 'Marrakech',
    tags: ['International', 'Major Hub', 'Car Rental']
  },
  {
    code: 'CMN',
    name: 'Mohammed V International',
    location: 'Casablanca',
    tags: ['Largest Airport', 'International', 'Connections']
  },
  {
    code: 'FEZ',
    name: 'Fès–Saïss Airport',
    location: 'Fes',
    tags: ['International', 'Regional', 'Transfers']
  },
  {
    code: 'AGA',
    name: 'Al Massira Airport',
    location: 'Agadir',
    tags: ['Beach Access', 'International', 'Seasonal']
  },
  {
    code: 'TNG',
    name: 'Ibn Batouta Airport',
    location: 'Tangier',
    tags: ['Northern Hub', 'International', 'Europe Flights']
  },
  {
    code: 'RBA',
    name: 'Rabat-Salé Airport',
    location: 'Rabat',
    tags: ['Capital', 'Domestic', 'International']
  }
];

// Airlines Data
const airlinesData = [
  { code: 'RAM', name: 'Royal Air Maroc' },
  { code: 'FR', name: 'Ryanair' },
  { code: 'EZY', name: 'easyJet' },
  { code: 'AF', name: 'Air France' },
  { code: 'LH', name: 'Lufthansa' },
  { code: 'IB', name: 'Iberia' },
  { code: 'BA', name: 'British Airways' },
  { code: 'EK', name: 'Emirates' },
  { code: 'QR', name: 'Qatar Airways' },
  { code: 'TK', name: 'Turkish Airlines' }
];

// Popular Routes Data
const routesData = [
  { from: 'Paris', to: 'Marrakech', price: 149 },
  { from: 'London', to: 'Casablanca', price: 179 },
  { from: 'Madrid', to: 'Fes', price: 99 },
  { from: 'Barcelona', to: 'Marrakech', price: 89 },
  { from: 'Brussels', to: 'Agadir', price: 159 },
  { from: 'Amsterdam', to: 'Casablanca', price: 169 },
  { from: 'Frankfurt', to: 'Marrakech', price: 189 },
  { from: 'Rome', to: 'Casablanca', price: 199 }
];

// DOM Elements
const airportsGrid = document.getElementById('airports-grid');
const airlinesSlider = document.getElementById('airlines-slider');
const routesGrid = document.getElementById('routes-grid');
const searchForm = document.getElementById('search-form');
const tabBtns = document.querySelectorAll('.tab-btn');
const returnDateGroup = document.getElementById('return-date-group');
const nav = document.querySelector('nav');
const swapBtn = document.querySelector('.swap-btn');

// Render Airports
function renderAirports() {
  airportsGrid.innerHTML = '';
  
  airportsData.forEach(airport => {
    const card = document.createElement('div');
    card.className = 'airport-card';
    
    card.innerHTML = `
      <div class="airport-code">${airport.code}</div>
      <div class="airport-name">${airport.name}</div>
      <div class="airport-location">${airport.location}, Morocco</div>
      <div class="airport-info">
        ${airport.tags.map(tag => `<span class="info-tag">${tag}</span>`).join('')}
      </div>
    `;
    
    card.addEventListener('click', () => {
      alert(`${airport.name} (${airport.code})\n\nThis would show flight options to ${airport.location}.`);
    });
    
    airportsGrid.appendChild(card);
  });
}

// Render Airlines
function renderAirlines() {
  airlinesSlider.innerHTML = '';
  
  airlinesData.forEach(airline => {
    const card = document.createElement('div');
    card.className = 'airline-card';
    
    card.innerHTML = `
      <div class="airline-logo">${airline.code}</div>
      <div class="airline-name">${airline.name}</div>
    `;
    
    card.addEventListener('click', () => {
      alert(`${airline.name}\n\nThis would filter flights by ${airline.name}.`);
    });
    
    airlinesSlider.appendChild(card);
  });
}

// Render Routes
function renderRoutes() {
  routesGrid.innerHTML = '';
  
  routesData.forEach(route => {
    const card = document.createElement('div');
    card.className = 'route-card';
    
    card.innerHTML = `
      <div class="route-cities">
        <div class="route-city">${route.from}</div>
        <div class="route-arrow">→</div>
        <div class="route-city">${route.to}</div>
      </div>
      <div class="route-price">
        <div class="price-from">from</div>
        <div class="price-amount">€${route.price}</div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      alert(`${route.from} → ${route.to}\n\nPrice from €${route.price}\n\nThis would show available flights for this route.`);
    });
    
    routesGrid.appendChild(card);
  });
}

// Tab Switching
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const tab = btn.dataset.tab;
    
    if (tab === 'one-way') {
      returnDateGroup.style.display = 'none';
      document.getElementById('return-date').required = false;
    } else if (tab === 'round-trip') {
      returnDateGroup.style.display = 'flex';
      document.getElementById('return-date').required = true;
    } else if (tab === 'multi-city') {
      alert('Multi-city search coming soon!');
    }
  });
});

// Swap Cities
swapBtn.addEventListener('click', () => {
  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');
  
  const temp = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = temp;
});

// Search Form
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const departDate = document.getElementById('depart-date').value;
  const returnDate = document.getElementById('return-date').value;
  const passengers = document.getElementById('passengers').value;
  const flightClass = document.getElementById('class').value;
  
  let message = `Searching Flights:\n\n`;
  message += `From: ${from}\n`;
  message += `To: ${to}\n`;
  message += `Departure: ${departDate}\n`;
  
  if (returnDate) {
    message += `Return: ${returnDate}\n`;
  }
  
  message += `Passengers: ${passengers}\n`;
  message += `Class: ${flightClass}\n\n`;
  message += `This would redirect to flight search results.`;
  
  alert(message);
});

// Set min date for date inputs
const today = new Date().toISOString().split('T')[0];
document.getElementById('depart-date').setAttribute('min', today);
document.getElementById('return-date').setAttribute('min', today);

// Scroll Effect for Navigation
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Initialize
renderAirports();
renderAirlines();
renderRoutes();
