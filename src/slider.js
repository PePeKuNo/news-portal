export function setupTrendingSlider() {
  const slider = document.getElementById('trendingScroll');
  if (!slider) return;

  const wrapper = slider.querySelector('.trending-section__wrapper');
  const prevButton = document.getElementById('scrollLeft');
  const nextButton = document.getElementById('scrollRight');
  const cards = wrapper.querySelectorAll('.news-card');
  
  // Set initial visibility
  wrapper.style.opacity = '1';
  wrapper.style.visibility = 'visible';
  cards.forEach(card => {
    card.style.opacity = '1';
    card.style.visibility = 'visible';
  });
  
  let currentIndex = 0;
  let cardWidth = 0;
  let maxIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function updateSliderMetrics() {
    cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(wrapper).columnGap);
    maxIndex = Math.max(0, cards.length - (window.innerWidth >= 768 ? 2 : 1));
    
    // Reset position if we're past the new max index
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
      updateSliderPosition();
    }
    
    // Update button states
    updateButtonStates();
  }

  function updateSliderPosition() {
    wrapper.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    updateButtonStates();
  }

  function updateButtonStates() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSliderPosition();
    }
  });
  // Initialize slider
  updateSliderMetrics();

  // Touch events
  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  wrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > 50) { // minimum swipe distance
      if (swipeDistance > 0 && currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
      } else if (swipeDistance < 0 && currentIndex < maxIndex) {
        currentIndex++;
        updateSliderPosition();
      }
    }
  });

  // Prevent default touch behavior to avoid page scrolling while swiping
  wrapper.addEventListener('touchmove', (e) => {
    if (Math.abs(e.touches[0].clientX - touchStartX) > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  // Update metrics on window resize and orientation change
  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      updateSliderMetrics();
      wrapper.style.transition = 'none';
      updateSliderPosition();
      setTimeout(() => {
        wrapper.style.transition = 'transform 0.3s ease';
      }, 50);
    });
  });
  
  // Initial load adjustments
  window.addEventListener('load', updateSliderMetrics);
}
