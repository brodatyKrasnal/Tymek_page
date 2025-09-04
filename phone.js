// Phone Page JavaScript

class IPhonePage {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupShoppingBag();
    this.setupProductCards();
    this.setupSmoothScrolling();
    this.setupAnimations();
  }

  setupNavigation() {
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
      this.updateCartCount();
      
      // Add click handler for bag icon
      bagIcon.addEventListener('click', () => {
        // Navigate to store page when bag is clicked
        window.location.href = 'store.html';
      });
    }
  }

  updateCartCount() {
    const bagCount = document.getElementById('bag-count');
    if (bagCount) {
      const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
      bagCount.textContent = cart.length;
    }
  }

  setupProductCards() {
    // Add hover effects and click handlers to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      // Add hover effect
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      });

      // Add click handler to navigate to store
      card.addEventListener('click', (e) => {
        // Don't trigger if clicking on buttons
        if (!e.target.closest('.btn-primary, .btn-secondary')) {
          window.location.href = 'store.html';
        }
      });
    });

    // Setup buy buttons
    const buyButtons = document.querySelectorAll('.btn-primary');
    buyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        // Navigate to store page
        window.location.href = 'store.html';
      });
    });

    // Setup learn more buttons
    const learnMoreButtons = document.querySelectorAll('.btn-secondary');
    learnMoreButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        // Scroll to features section
        const featuresSection = document.querySelector('.iphone-features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  setupSmoothScrolling() {
    // Setup smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupAnimations() {
    // Setup scroll-triggered animations
    this.setupScrollAnimations();
    
    // Setup hero animations
    this.setupHeroAnimations();
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .feature-card, .accessory-card');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  setupHeroAnimations() {
    // Animate hero elements on load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroActions = document.querySelector('.hero-actions');
    
    if (heroTitle) {
      heroTitle.style.opacity = '0';
      heroTitle.style.transform = 'translateY(30px)';
      heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
      }, 200);
    }
    
    if (heroSubtitle) {
      heroSubtitle.style.opacity = '0';
      heroSubtitle.style.transform = 'translateY(30px)';
      heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }, 400);
    }
    
    if (heroActions) {
      heroActions.style.opacity = '0';
      heroActions.style.transform = 'translateY(30px)';
      heroActions.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      setTimeout(() => {
        heroActions.style.opacity = '1';
        heroActions.style.transform = 'translateY(0)';
      }, 600);
    }
  }

  // Method to add product to cart (for future use)
  addToCart(productId, productName, price) {
    const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: price,
        quantity: 1
      });
    }
    
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    this.updateCartCount();
    
    // Show success message
    this.showNotification(`${productName} added to cart!`);
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #0071e3;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 20px rgba(0, 113, 227, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.phonePage = new PhonePage();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IPhonePage };
}
