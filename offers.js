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
// Offers Data
const offersData = [
  {
    id: 1,
    type: 'packages',
    title: 'Marrakech Explorer',
    description: 'Experience the magic of Marrakech with guided tours, palace visits, and souk exploration.',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800',
    oldPrice: 899,
    newPrice: 549,
    discount: 39
  },
  {
    id: 2,
    type: 'hotels',
    title: 'Luxury Riad Stay',
    description: '5 nights in a boutique riad with breakfast, pool access, and spa treatments included.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    oldPrice: 699,
    newPrice: 449,
    discount: 36
  },
  {
    id: 3,
    type: 'flights',
    title: 'Round Trip to Morocco',
    description: 'Direct flights from major European cities to Casablanca or Marrakech.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    oldPrice: 399,
    newPrice: 249,
    discount: 38
  },
  {
    id: 4,
    type: 'packages',
    title: 'Desert Adventure',
    description: '3-day Sahara experience with camel trek, overnight camp, and Berber village visits.',
    image: 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=800',
    oldPrice: 499,
    newPrice: 299,
    discount: 40
  },
  {
    id: 5,
    type: 'hotels',
    title: 'Coastal Resort Package',
    description: '7 nights all-inclusive at Agadir beach resort with water sports and excursions.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    oldPrice: 1199,
    newPrice: 799,
    discount: 33
  },
  {
    id: 6,
    type: 'packages',
    title: 'Imperial Cities Tour',
    description: 'Visit all four imperial cities: Fes, Marrakech, Meknes, and Rabat in 8 days.',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800',
    oldPrice: 1399,
    newPrice: 899,
    discount: 36
  },
  {
    id: 7,
    type: 'flights',
    title: 'First Class Upgrade',
    description: 'Upgrade to first class on select routes to Morocco with premium lounge access.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    oldPrice: 899,
    newPrice: 599,
    discount: 33
  },
  {
    id: 8,
    type: 'packages',
    title: 'Atlas Mountains Trek',
    description: '5-day guided trek through Atlas Mountains with accommodation in Berber villages.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
    oldPrice: 799,
    newPrice: 549,
    discount: 31
  },
  {
    id: 9,
    type: 'hotels',
    title: 'Chefchaouen Boutique',
    description: '4 nights in the Blue Pearl with breakfast, rooftop terrace, and mountain views.',
    image: 'https://images.unsplash.com/photo-1516985212057-1997dfa07a4d?w=800',
    oldPrice: 499,
    newPrice: 299,
    discount: 40
  }
];

// Last Minute Deals Data
const lastMinuteDeals = [
  { title: 'Marrakech Weekend', departure: 'Departs in 5 days', price: 399 },
  { title: 'Sahara Express', departure: 'Departs in 8 days', price: 449 },
  { title: 'Fes Explorer', departure: 'Departs in 12 days', price: 349 },
  { title: 'Coastal Escape', departure: 'Departs in 15 days', price: 499 },
  { title: 'Atlas Adventure', departure: 'Departs in 18 days', price: 379 },
  { title: 'Blue City Tour', departure: 'Departs in 22 days', price: 299 }
];

// DOM Elements
const offersGrid = document.getElementById('offers-grid');
const lastMinuteGrid = document.getElementById('last-minute-grid');
const filterTabs = document.querySelectorAll('.filter-tab');
const faqItems = document.querySelectorAll('.faq-item');
const nav = document.querySelector('nav');

// Countdown Timer
function startCountdown() {
  const countdownDate = new Date('December 31, 2025 23:59:59').getTime();
  
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById('countdown').innerHTML = '<div style="font-size: 24px; color: #ecad29;">Offer Expired!</div>';
    }
  }, 1000);
}

// Render Offers
function renderOffers(filter = 'all') {
  offersGrid.innerHTML = '';
  
  const filteredOffers = filter === 'all' 
    ? offersData 
    : offersData.filter(offer => offer.type === filter);
  
  filteredOffers.forEach((offer, index) => {
    const card = document.createElement('div');
    card.className = 'offer-card';
    card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
    card.style.opacity = '0';
    
    card.innerHTML = `
      <div class="offer-image" style="background-image: url('${offer.image}')">
        <div class="offer-discount-badge">-${offer.discount}%</div>
        <div class="offer-type">${offer.type}</div>
      </div>
      <div class="offer-content">
        <h3 class="offer-title">${offer.title}</h3>
        <p class="offer-description">${offer.description}</p>
        <div class="offer-footer">
          <div class="offer-price">
            <div class="offer-old-price">$${offer.oldPrice}</div>
            <div class="offer-new-price">$${offer.newPrice}</div>
          </div>
          <button class="offer-btn">Book Now</button>
        </div>
      </div>
    `;
    
    offersGrid.appendChild(card);
  });
}

// Render Last Minute Deals
function renderLastMinute() {
  lastMinuteGrid.innerHTML = '';
  
  lastMinuteDeals.forEach(deal => {
    const card = document.createElement('div');
    card.className = 'last-minute-card';
    
    card.innerHTML = `
      <div class="urgent-badge">URGENT</div>
      <h3 class="last-minute-title">${deal.title}</h3>
      <div class="last-minute-departure">${deal.departure}</div>
      <div class="last-minute-price">$${deal.price}</div>
    `;
    
    card.addEventListener('click', () => {
      alert(`${deal.title}\n${deal.departure}\nPrice: $${deal.price}\n\nThis would redirect to booking page.`);
    });
    
    lastMinuteGrid.appendChild(card);
  });
}

// Filter Functionality
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    renderOffers(filter);
  });
});

// FAQ Toggle
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    faqItems.forEach(faq => faq.classList.remove('active'));
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Claim Mega Deal
document.querySelector('.claim-btn').addEventListener('click', () => {
  alert('Grand Morocco Experience\n\nThis would redirect to booking page with the discount automatically applied.\n\nTotal: $1,799 per person\nSavings: $1,200 (40% off)');
});

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  alert(`Thank you for subscribing!\n\nYou'll receive exclusive offers at ${email}`);
  e.target.reset();
});

// Scroll Effect for Navigation
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Initialize
startCountdown();
renderOffers();
renderLastMinute();
