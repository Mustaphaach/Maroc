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
// Holiday Packages Data
const packagesData = [
  {
    id: 1,
    category: 'cultural',
    title: 'Imperial Cities Tour',
    description: 'Explore Morocco\'s four imperial cities: Rabat, Fes, Meknes, and Marrakech. Discover rich history, stunning architecture, and vibrant souks.',
    image: 'https://images.unsplash.com/photo-1548164885-087dd5ee70b9?w=800',
    duration: '8 Days',
    groupSize: '12 People',
    price: 1299,
    badge: 'Popular'
  },
  {
    id: 2,
    category: 'adventure',
    title: 'Sahara Desert Adventure',
    description: 'Experience the magic of the Sahara with camel treks, desert camps, and breathtaking starry nights in Merzouga dunes.',
    image: 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=800',
    duration: '5 Days',
    groupSize: '8 People',
    price: 899,
    badge: 'Adventure'
  },
  {
    id: 3,
    category: 'luxury',
    title: 'Luxury Marrakech Escape',
    description: 'Indulge in 5-star riads, private guided tours, spa treatments, and exclusive dining experiences in the Red City.',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800',
    duration: '6 Days',
    groupSize: '6 People',
    price: 2499,
    badge: 'Luxury'
  },
  {
    id: 4,
    category: 'family',
    title: 'Family Morocco Discovery',
    description: 'Family-friendly adventure through Marrakech, Essaouira, and Atlas Mountains with activities suitable for all ages.',
    image: 'https://images.unsplash.com/photo-1551465094-59f3c7cae8b4?w=800',
    duration: '7 Days',
    groupSize: '10 People',
    price: 1599,
    badge: 'Family'
  },
  {
    id: 5,
    category: 'cultural',
    title: 'Fes Medina Experience',
    description: 'Immerse yourself in the ancient medina of Fes, visit traditional tanneries, artisan workshops, and historic madrasas.',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800',
    duration: '4 Days',
    groupSize: '15 People',
    price: 699,
    badge: 'Cultural'
  },
  {
    id: 6,
    category: 'adventure',
    title: 'Atlas Mountains Trek',
    description: 'Hike through Berber villages, stunning valleys, and snow-capped peaks. Experience authentic mountain hospitality.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
    duration: '6 Days',
    groupSize: '10 People',
    price: 1099,
    badge: 'Trekking'
  },
  {
    id: 7,
    category: 'luxury',
    title: 'Casablanca & Rabat Luxury',
    description: 'Explore Morocco\'s modern cities with luxury accommodations, fine dining, and exclusive tours of Hassan II Mosque.',
    image: 'https://images.unsplash.com/photo-1554072675-66db59dba46f?w=800',
    duration: '5 Days',
    groupSize: '8 People',
    price: 1899,
    badge: 'Premium'
  },
  {
    id: 8,
    category: 'adventure',
    title: 'Coastal Surf & Adventure',
    description: 'Surf the Atlantic waves in Essaouira and Taghazout, explore coastal towns, and enjoy fresh seafood.',
    image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800',
    duration: '7 Days',
    groupSize: '12 People',
    price: 1199,
    badge: 'Surf'
  },
  {
    id: 9,
    category: 'cultural',
    title: 'Chefchaouen Blue City',
    description: 'Discover the enchanting blue-washed streets of Chefchaouen, nestled in the Rif Mountains.',
    image: 'https://images.unsplash.com/photo-1516985212057-1997dfa07a4d?w=800',
    duration: '3 Days',
    groupSize: '15 People',
    price: 499,
    badge: 'Photography'
  },
  {
    id: 10,
    category: 'family',
    title: 'Morocco for Kids',
    description: 'Interactive tours with storytelling, treasure hunts in medinas, camel rides, and kid-friendly activities.',
    image: 'https://images.unsplash.com/photo-1591825738231-54cc8d8e4d67?w=800',
    duration: '8 Days',
    groupSize: '12 People',
    price: 1399,
    badge: 'Kids'
  },
  {
    id: 11,
    category: 'luxury',
    title: 'Royal Morocco Experience',
    description: 'VIP treatment with private riads, helicopter tours, exclusive access to royal palaces and premium experiences.',
    image: 'https://images.unsplash.com/photo-1583059114568-5c5e5f4f8c91?w=800',
    duration: '10 Days',
    groupSize: '4 People',
    price: 4999,
    badge: 'VIP'
  },
  {
    id: 12,
    category: 'adventure',
    title: 'Morocco Off-Road Safari',
    description: '4x4 adventure through desert landscapes, mountain passes, and remote Berber villages.',
    image: 'https://images.unsplash.com/photo-1564053489984-317bbd824340?w=800',
    duration: '9 Days',
    groupSize: '8 People',
    price: 1799,
    badge: '4x4'
  }
];

// DOM Elements
const packagesGrid = document.getElementById('packages-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const nav = document.querySelector('nav');

// Render Packages
function renderPackages(filter = 'all') {
  packagesGrid.innerHTML = '';
  
  const filteredPackages = filter === 'all' 
    ? packagesData 
    : packagesData.filter(pkg => pkg.category === filter);
  
  filteredPackages.forEach((pkg, index) => {
    const card = document.createElement('div');
    card.className = 'package-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="package-image" style="background-image: url('${pkg.image}')">
        <div class="package-badge">${pkg.badge}</div>
      </div>
      <div class="package-content">
        <div class="package-category">${pkg.category}</div>
        <h3 class="package-title">${pkg.title}</h3>
        <p class="package-description">${pkg.description}</p>
        <div class="package-details">
          <div class="package-detail">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${pkg.duration}</span>
          </div>
          <div class="package-detail">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            <span>${pkg.groupSize}</span>
          </div>
        </div>
        <div class="package-footer">
          <div class="package-price">
            From
            <span class="package-price-amount">$${pkg.price}</span>
          </div>
          <button class="package-btn">View Details</button>
        </div>
      </div>
    `;
    
    packagesGrid.appendChild(card);
  });
}

// Filter Functionality
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    renderPackages(filter);
  });
});

// Scroll Effect for Navigation
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Smooth Scroll for Hero CTA
document.querySelector('.hero-cta').addEventListener('click', () => {
  document.querySelector('.packages-section').scrollIntoView({ 
    behavior: 'smooth' 
  });
});

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  alert(`Thank you for subscribing with ${email}! You'll receive exclusive deals soon.`);
  e.target.reset();
});

// Initialize
renderPackages();

// Add click animation to package cards
document.addEventListener('click', (e) => {
  if (e.target.closest('.package-btn')) {
    const card = e.target.closest('.package-card');
    const title = card.querySelector('.package-title').textContent;
    alert(`Viewing details for: ${title}\n\nThis would open a detailed package page.`);
  }
});
