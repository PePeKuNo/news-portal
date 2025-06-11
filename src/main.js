import './styles/main.scss'
import { setupTrendingSlider } from './slider.js'
import { initializeNavigation } from './navigation.js'

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  setupTrendingSlider()
  initializeNavigation()
})
