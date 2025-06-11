import './styles/main.scss'

// Initialize Intersection Observer for lazy loading images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('fade-in');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px 0px',
  threshold: 0.1
});

// Lazy load images
document.querySelectorAll('.news-card__image').forEach(img => {
  if (img.dataset.src) {
    imageObserver.observe(img);
  }
});

// News ticker functionality
const tickerItems = document.querySelector('.news-scroll__items');
if (tickerItems) {
  // Clone items for seamless scrolling
  tickerItems.innerHTML += tickerItems.innerHTML;

  // Pause animation on hover
  tickerItems.addEventListener('mouseenter', () => {
    tickerItems.style.animationPlayState = 'paused';
  });

  tickerItems.addEventListener('mouseleave', () => {
    tickerItems.style.animationPlayState = 'running';
  });
}

// Weather data and updates
const weatherData = {
  temperature: 24,
  location: 'Warsaw',
  icon: 'weather-sunny'
};

function updateWeather() {
  const weatherTemp = document.querySelector('.weather__temp');
  if (weatherTemp) {
    weatherTemp.textContent = `${weatherData.temperature}°`;
  }
}

// Mobile menu toggle
const menuButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
    menuButton.classList.toggle('nav-toggle--open');
  });
}

// Trending section scroll functionality
const trendingScroll = document.getElementById('trendingScroll');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

if (trendingScroll && scrollLeftBtn && scrollRightBtn) {
  const scrollAmount = 300; // Width of one card

  scrollLeftBtn.addEventListener('click', () => {
    trendingScroll.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  scrollRightBtn.addEventListener('click', () => {
    trendingScroll.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Hide/show scroll buttons based on scroll position
  trendingScroll.addEventListener('scroll', () => {
    const isAtStart = trendingScroll.scrollLeft === 0;
    const isAtEnd = trendingScroll.scrollLeft + trendingScroll.clientWidth >= trendingScroll.scrollWidth;

    scrollLeftBtn.style.opacity = isAtStart ? '0.5' : '1';
    scrollRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
  });
}

// Add smooth reveal animation for news cards
const revealCards = () => {
  const cards = document.querySelectorAll('.news-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => observer.observe(card));
};

// Initialize
updateWeather();
setInterval(updateWeather, 300000); // Update every 5 minutes
revealCards();
