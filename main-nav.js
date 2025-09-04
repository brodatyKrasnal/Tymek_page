// Main Navigation Enhancement for Store Link

class MainNavigation {
  constructor() {
    this.init();
  }

  init() {
    // Wait for the main app to load
    this.waitForMainApp();
  }

  waitForMainApp() {
    const checkForApp = () => {
      // Look for common React app indicators
      const rootElement = document.getElementById('root');
      if (rootElement && rootElement.children.length > 0) {
        this.setupNavigation();
      } else {
        // Try again in 100ms
        setTimeout(checkForApp, 100);
      }
    };

    // Start checking after a short delay
    setTimeout(checkForApp, 500);
  }

  setupNavigation() {
    // Setup navigation functionality for the existing navigation
    this.setupNavigationLinks();
    this.setupShoppingBag();
  }

  setupNavigationLinks() {
    // Add click handlers for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
      });
    });
  }

  setupShoppingBag() {
    // Setup shopping bag functionality
    const bagIcon = document.getElementById('bag-icon');
    const bagCount = document.getElementById('bag-count');
    
    if (bagIcon && bagCount) {
      // Load cart count from localStorage
      const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
      bagCount.textContent = cart.length;
      
      // Add click handler for bag icon
      bagIcon.addEventListener('click', () => {
        // Navigate to store page when bag is clicked
        window.location.href = 'store.html';
      });
    }
  }


  // Method to update store link in any navigation
  updateStoreLinkInNavigation() {
    // Look for any existing store links and update them
    const existingStoreLinks = document.querySelectorAll('a[href*="store"]');
    existingStoreLinks.forEach(link => {
      if (!link.href.includes('store.html')) {
        link.href = 'store.html';
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.mainNavigation = new MainNavigation();
});

// Also try to initialize after a delay in case the main app loads later
setTimeout(() => {
  if (!window.mainNavigation) {
    window.mainNavigation = new MainNavigation();
  }
}, 2000);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MainNavigation };
}
