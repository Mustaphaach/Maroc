
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
// Data for Cards
const data = [
    {
        place:'Mosquée Hassan II',
        title:'CASA',
        title2:'BLANCA',
        description:'The Hassan II Mosque in Casablanca, Morocco, is a grand architectural marvel, blending traditional Islamic design with modern engineering. Completed in 1993, its towering minaret stands at 210 meters and is adorned with intricate Moroccan tile work. Inside, the prayer hall accommodates up to 25,000 worshippers and features stunning marble floors and a retractable roof.',
        image:'https://img.freepik.com/photos-gratuite/mosquee-hassan-ii-entouree-eau-batiments-sous-ciel-bleu-lumiere-du-soleil_181624-26376.jpg?w=740'
    },
    {
        place:'Agadir Beach',
        title:'AGADIR',
        title2:'OUFLA',
        description:'Agadir, situated along Morocco\'s southern coast, is renowned for its stunning beaches, vibrant culture, and rich history. With its mild climate and beautiful coastline, it is a popular destination for tourists seeking relaxation and adventure alike. The city offers a glimpse into Morocco\'s past with traditional markets blending seamlessly with modern amenities.',
        image:'https://upload.wikimedia.org/wikipedia/commons/b/be/Agadir-cityreflection.jpg'
    },
    {
        place:'Sahara Desert',
        title:'MARRAKECH',
        title2:'MERZOUGA',
        description:'The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life. Experience the magic of endless dunes and breathtaking sunsets.',
        image:'https://assets.codepen.io/3685267/timed-cards-3.jpg'
    },
    {
        place:'Rabat Historic Capital',
        title:'MOROCCO\'S',
        title2:'CAPITAL',
        description:'Rabat, the capital city of Morocco, is a captivating blend of history, culture, and contemporary life. With its ancient medina, picturesque Kasbah des Oudaias, and well-preserved historic monuments, Rabat offers a glimpse into Morocco\'s rich past. As the political center of the country, it exudes an atmosphere of significance and dynamism.',
        image:'https://media.gettyimages.com/id/164170376/fr/photo/tour-hassan-de-rabat-maroc-afrique.jpg?s=612x612&w=0&k=20&c=-d4TVEQ2LQCIUjQsZY44N2jDZa2QMb4EwKRDh1-GxaA='
    },
    {
        place:'Ouarzazate',
        title:'GATEWAY TO',
        title2:'THE SAHARA',
        description:'Ouarzazate, known as the "Gateway to the Sahara," is a captivating desert city famed for its stunning landscapes and historic kasbahs, such as Ait Ben Haddou. Renowned as the "Hollywood of the Desert," it has been the backdrop for numerous blockbuster films and TV series, attracting visitors with its cinematic allure.',
        image:'https://media.gettyimages.com/id/168510721/fr/photo/le-maroc.jpg?s=612x612&w=0&k=20&c=ECwq4h-l1RN-_vgbQEuxPEbBCJFsFxKEI032PyycR8I='
    },
    {
        place:'Fes Ancient City',
        title:'CULTURAL',
        title2:'HEARTBEAT',
        description:'Fes, spiritual and cultural capital, enchants visitors with its labyrinthine medina, ancient mosques, and vibrant souks, such as Bab Boujloud. As one of the world\'s oldest continuously inhabited medieval cities, Fes offers a timeless experience steeped in history and tradition. Discover the famous tanneries and artisan workshops.',
        image:'https://media.gettyimages.com/id/471994791/fr/photo/homme-travaillant-dans-une-tannerie-maroc-f%C3%A8s.jpg?s=612x612&w=0&k=20&c=8D3s53hJde1SI8Sy1EnoMhHhbiiYxMTLPFuKLmvetkA='
    },
];

const _ = (id) => document.getElementById(id);
const cards = data.map((i, index) => `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`).join('');

const cardContents = data.map((i, index) => `<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>
</div>`).join('');

const slideNumbers = data.map((_, index) => `<div class="item" id="slide-item-${index}">${index + 1}</div>`).join('');

_('demo').innerHTML = cards + cardContents;
_('slide-numbers').innerHTML = slideNumbers;

const range = (n) => Array(n).fill(0).map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}

function getCardContent(index) {
  return `#card-content-${index}`;
}

function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;
let isAnimating = false;
let autoPlayInterval;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        startAutoPlay();
      }, 500);
    },
  });
  
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

function step() {
  if (isAnimating) return Promise.resolve();
  isAnimating = true;
  
  return new Promise((resolve) => {
    order.push(order.shift());
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent = data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
    gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
    gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
    gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: () => {
        isAnimating = false;
        resolve();
      },
      ease,
    });
    
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  set(".indicator", { x: -window.innerWidth });
  await step();
  loop();
}

function startAutoPlay() {
  loop();
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
}

// Manual Navigation
_('arrow-right').addEventListener('click', () => {
  stopAutoPlay();
  step().then(() => {
    setTimeout(startAutoPlay, 3000);
  });
});

_('arrow-left').addEventListener('click', () => {
  stopAutoPlay();
  // Reverse the order for previous slide
  order.unshift(order.pop());
  step().then(() => {
    setTimeout(startAutoPlay, 3000);
  });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    stopAutoPlay();
    step().then(() => {
      setTimeout(startAutoPlay, 3000);
    });
  } else if (e.key === 'ArrowLeft') {
    stopAutoPlay();
    order.unshift(order.pop());
    step().then(() => {
      setTimeout(startAutoPlay, 3000);
    });
  }
});

// Image Preloading
async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

// Responsive handling
window.addEventListener('resize', () => {
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;
});

start();
