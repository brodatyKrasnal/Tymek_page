// Apple Store JavaScript

class AppleStore {
  constructor() {
    this.cart = [];
    this.cartTotal = 0;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupStoreNavigation();
    this.updateCartDisplay();
    this.loadCartFromStorage();
  }

  setupEventListeners() {
    // Bag icon click
    const bagIcon = document.getElementById('bag-icon');
    if (bagIcon) {
      bagIcon.addEventListener('click', () => this.toggleCart());
    }

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        this.filterByCategory(category);
      });
    });

    // Product cards hover effects
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.animateProductCard(e.currentTarget, true);
      });

      card.addEventListener('mouseleave', (e) => {
        this.animateProductCard(e.currentTarget, false);
      });
    });

    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
      searchIcon.addEventListener('click', () => this.toggleSearch());
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    });
  }

  addToCart(productId, price) {
    const existingItem = this.cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: productId,
        name: this.getProductName(productId),
        price: price,
        quantity: 1
      });
    }

    this.updateCartTotal();
    this.updateCartDisplay();
    this.saveCartToStorage();
    this.showAddToCartAnimation(productId);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCartTotal();
    this.updateCartDisplay();
    this.saveCartToStorage();
  }

  updateCartTotal() {
    this.cartTotal = this.cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  updateCartDisplay() {
    const bagCount = document.getElementById('bag-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Update bag count
    const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
    if (bagCount) {
      bagCount.textContent = totalItems;
      bagCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Update cart items
    if (cartItems) {
      if (this.cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your bag is empty</p></div>';
      } else {
        cartItems.innerHTML = this.cart.map(item => `
          <div class="cart-item">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${item.price} × ${item.quantity}</div>
            </div>
            <button class="remove-item" onclick="appleStore.removeFromCart('${item.id}')">Remove</button>
          </div>
        `).join('');
      }
    }

    // Update cart total
    if (cartTotal) {
      cartTotal.textContent = this.cartTotal.toFixed(2);
    }
  }

  toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
      cartModal.classList.toggle('active');
      if (cartModal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }

  closeCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
      cartModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  getProductName(productId) {
    const productNames = {
      'phone-15-pro': 'Phone 15 Pro',
      'desktopbook-air-m3': 'DesktopBook Air M3',
      'pad-pro': 'Pad Pro',
      'magic-mouse': 'Magic Mouse',
      'magic-keyboard': 'Magic Keyboard',
      'airtag': 'AirTag',
      'lightning-cable': 'Lightning to USB-C Cable'
    };
    return productNames[productId] || productId;
  }

  showAddToCartAnimation(productId) {
    const productCard = document.querySelector(`[data-product="${productId}"]`);
    if (productCard) {
      productCard.style.transform = 'scale(1.05)';
      productCard.style.boxShadow = '0 20px 40px rgba(0, 122, 255, 0.3)';
      
      setTimeout(() => {
        productCard.style.transform = '';
        productCard.style.boxShadow = '';
      }, 300);
    }

    // Show notification
    this.showNotification('Added to bag');
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #007aff;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 3000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }

  animateProductCard(card, isHovering) {
    const mockup = card.querySelector('.iphone-mockup, .macbook-mockup, .ipad-mockup');
    if (mockup) {
      if (isHovering) {
        mockup.style.transform = 'rotateY(-5deg) rotateX(2deg) scale(1.05)';
      } else {
        mockup.style.transform = 'rotateY(-15deg) rotateX(5deg) scale(1)';
      }
    }
  }

  filterByCategory(category) {
    // Add visual feedback
    document.querySelectorAll('.category-card').forEach(card => {
      card.classList.remove('active');
    });

    const activeCard = document.querySelector(`[data-category="${category}"]`);
    if (activeCard) {
      activeCard.classList.add('active');
    }

    // Scroll to products section
    const productsSection = document.querySelector('.featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Filter products (in a real app, this would make an API call)
    this.highlightCategoryProducts(category);
  }

  // Enhanced navigation for store links
  setupStoreNavigation() {
    // Make navigation links functional
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's a hash link, scroll to section
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetSection = document.querySelector(href);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
        // If it's an external link, let it navigate normally
      });
    });
  }

  highlightCategoryProducts(category) {
    document.querySelectorAll('.product-card').forEach(card => {
      card.style.opacity = '0.5';
      card.style.transform = 'scale(0.95)';
    });

    setTimeout(() => {
      document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      });
    }, 300);
  }

  toggleSearch() {
    // Create search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
      <div class="search-content">
        <div class="search-header">
          <input type="text" placeholder="Search Apple Store" class="search-input">
          <button class="close-search">×</button>
        </div>
        <div class="search-results">
          <div class="search-suggestion">Phone 15 Pro</div>
          <div class="search-suggestion">DesktopBook Air</div>
          <div class="search-suggestion">Pad Pro</div>
          <div class="search-suggestion">Apple Watch</div>
        </div>
      </div>
    `;

    searchOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(20px);
      z-index: 2000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 100px;
    `;

    document.body.appendChild(searchOverlay);
    document.body.style.overflow = 'hidden';

    const searchInput = searchOverlay.querySelector('.search-input');
    searchInput.focus();

    const closeSearch = () => {
      document.body.removeChild(searchOverlay);
      document.body.style.overflow = 'auto';
    };

    searchOverlay.querySelector('.close-search').addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });

    // Add search functionality
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const suggestions = searchOverlay.querySelectorAll('.search-suggestion');
      
      suggestions.forEach(suggestion => {
        if (suggestion.textContent.toLowerCase().includes(query)) {
          suggestion.style.display = 'block';
        } else {
          suggestion.style.display = 'none';
        }
      });
    });
  }

  handleKeyboardShortcuts(e) {
    // ESC to close cart
    if (e.key === 'Escape') {
      this.closeCart();
    }

    // Cmd/Ctrl + K to open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.toggleSearch();
    }
  }

  saveCartToStorage() {
    localStorage.setItem('appleStoreCart', JSON.stringify(this.cart));
  }

  loadCartFromStorage() {
    const savedCart = localStorage.getItem('appleStoreCart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.updateCartTotal();
      this.updateCartDisplay();
    }
  }

  checkout() {
    if (this.cart.length === 0) {
      this.showNotification('Your bag is empty');
      return;
    }

    // Simulate checkout process
    this.showNotification('Redirecting to checkout...');
    
    setTimeout(() => {
      alert(`Checkout complete! Total: $${this.cartTotal.toFixed(2)}\n\nItems:\n${this.cart.map(item => `${item.name} × ${item.quantity}`).join('\n')}`);
      this.cart = [];
      this.updateCartDisplay();
      this.saveCartToStorage();
      this.closeCart();
    }, 1500);
  }
}

// Enhanced Store Interactions
class StoreInteractions {
  constructor() {
    this.setupParallaxEffects();
    this.setupScrollAnimations();
    this.setupProductHovers();
  }

  setupParallaxEffects() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector('.store-hero');
      
      if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out';
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card, .category-card, .accessory-card').forEach(card => {
      card.style.opacity = '0';
      observer.observe(card);
    });
  }

  setupProductHovers() {
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
      });
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Apple Store
  window.appleStore = new AppleStore();
  
  // Initialize Store Interactions
  window.storeInteractions = new StoreInteractions();

  // Add checkout button functionality
  const checkoutButton = document.querySelector('.checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      window.appleStore.checkout();
    });
  }

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease-in-out';
    document.body.style.opacity = '1';
  }, 100);
});

// Global functions for inline event handlers
function addToCart(productId, price) {
  if (window.appleStore) {
    window.appleStore.addToCart(productId, price);
  }
}

function closeCart() {
  if (window.appleStore) {
    window.appleStore.closeCart();
  }
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AppleStore, StoreInteractions };
}
