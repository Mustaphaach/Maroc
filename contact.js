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
// DOM Elements
const contactForm = document.getElementById('contact-form');
const nav = document.querySelector('nav');

// Form Submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const newsletter = document.getElementById('newsletter').checked;
  
  // Create success message
  showSuccessMessage('Message sent successfully! We\'ll get back to you within 24 hours.');
  
  // Log form data (in production, this would be sent to a server)
  console.log({
    name,
    email,
    phone,
    subject,
    message,
    newsletter
  });
  
  // Reset form
  contactForm.reset();
});

// Show Success Message
function showSuccessMessage(text) {
  // Create success message element
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message show';
  successDiv.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <svg xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${text}</span>
    </div>
  `;
  
  document.body.appendChild(successDiv);
  
  // Remove after 5 seconds
  setTimeout(() => {
    successDiv.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 500);
  }, 5000);
}

// Scroll Effect for Navigation
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Form Validation Enhancement
const inputs = document.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
  input.addEventListener('blur', () => {
    if (input.required && !input.value) {
      input.style.borderColor = '#ff3366';
    } else {
      input.style.borderColor = '#ffffff22';
    }
  });
  
  input.addEventListener('focus', () => {
    input.style.borderColor = '#ecad29';
  });
});

// Phone Number Formatting
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 0) {
    if (value.length <= 3) {
      e.target.value = value;
    } else if (value.length <= 6) {
      e.target.value = value.slice(0, 3) + ' ' + value.slice(3);
    } else if (value.length <= 10) {
      e.target.value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
    } else {
      e.target.value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
    }
  }
});

// Quick Links Animation
const quickLinks = document.querySelectorAll('.quick-link-card');
quickLinks.forEach((link, index) => {
  link.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
  link.style.opacity = '0';
});

// Info Cards Animation on Scroll
const infoCards = document.querySelectorAll('.info-card');
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      }, index * 100);
    }
  });
}, observerOptions);

infoCards.forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});
