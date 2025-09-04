// Apple-style Navigation JavaScript

class AppleNavigation {
  constructor() {
    this.navTabs = document.querySelectorAll('.nav-tab');
    this.contentSections = document.querySelectorAll('.content-section');
    this.currentTab = 'store';
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setActiveTab('store');
  }

  setupEventListeners() {
    // Tab click events
    this.navTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.currentTarget.dataset.tab;
        this.setActiveTab(tabName);
      });

      // Hover effects
      tab.addEventListener('mouseenter', (e) => {
        this.handleTabHover(e.currentTarget, true);
      });

      tab.addEventListener('mouseleave', (e) => {
        this.handleTabHover(e.currentTarget, false);
      });
    });

    // Apple logo click
    const appleLogo = document.querySelector('.apple-logo');
    if (appleLogo) {
      appleLogo.addEventListener('click', () => {
        this.setActiveTab('store');
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });

    // Smooth scrolling for better UX
    this.setupSmoothScrolling();
  }

  setActiveTab(tabName) {
    // Remove active class from all tabs and sections
    this.navTabs.forEach(tab => {
      tab.classList.remove('active');
    });

    this.contentSections.forEach(section => {
      section.classList.remove('active');
    });

    // Add active class to current tab and section
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeSection = document.getElementById(tabName);

    if (activeTab) {
      activeTab.classList.add('active');
    }

    if (activeSection) {
      activeSection.classList.add('active');
    }

    this.currentTab = tabName;

    // Add page transition effect
    this.addPageTransition();
  }

  handleTabHover(tab, isHovering) {
    if (isHovering) {
      tab.style.transform = 'translateY(-1px)';
      tab.style.textShadow = '0 2px 4px rgba(255, 255, 255, 0.1)';
    } else {
      tab.style.transform = 'translateY(0)';
      tab.style.textShadow = 'none';
    }
  }

  handleKeyboardNavigation(e) {
    const tabNames = ['store', 'desktop', 'pad', 'phone', 'watch'];
    const currentIndex = tabNames.indexOf(this.currentTab);

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabNames.length - 1;
        this.setActiveTab(tabNames[prevIndex]);
        break;
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = currentIndex < tabNames.length - 1 ? currentIndex + 1 : 0;
        this.setActiveTab(tabNames[nextIndex]);
        break;
      case 'Home':
        e.preventDefault();
        this.setActiveTab('store');
        break;
      case 'End':
        e.preventDefault();
        this.setActiveTab('entertainment');
        break;
    }
  }

  addPageTransition() {
    const activeSection = document.getElementById(this.currentTab);
    if (activeSection) {
      // Add entrance animation
      activeSection.style.opacity = '0';
      activeSection.style.transform = 'translateY(20px)';
      
      requestAnimationFrame(() => {
        activeSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        activeSection.style.opacity = '1';
        activeSection.style.transform = 'translateY(0)';
      });
    }
  }

  setupSmoothScrolling() {
    // Smooth scroll behavior for any internal links
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
  }

  // Public method to programmatically change tabs
  navigateToTab(tabName) {
    this.setActiveTab(tabName);
  }

  // Get current active tab
  getCurrentTab() {
    return this.currentTab;
  }
}

// Enhanced Apple-style interactions
class AppleInteractions {
  constructor() {
    this.setupParallaxEffects();
    this.setupProductAnimations();
    this.setupHoverEffects();
  }

  setupParallaxEffects() {
    // Subtle parallax effect on scroll
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero-image');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  setupProductAnimations() {
    // Animate product mockups on section change
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const mockup = entry.target.querySelector('.hero-image');
          if (mockup) {
            mockup.style.animation = 'fadeInUp 0.8s ease-out';
          }
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.content-section').forEach(section => {
      observer.observe(section);
    });
  }

  setupHoverEffects() {
    // Enhanced hover effects for interactive elements
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 122, 255, 0.3)';
      });

      button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = 'none';
      });
    });

    // Store card hover effects
    document.querySelectorAll('.store-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
      });
    });
  }
}

// Apple-style loading and initialization
class AppleLoader {
  constructor() {
    this.init();
  }

  init() {
    // Simulate Apple's loading experience
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-in-out';
        document.body.style.opacity = '1';
      }, 100);
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Apple Navigation
  window.appleNav = new AppleNavigation();
  
  // Initialize Apple Interactions
  window.appleInteractions = new AppleInteractions();
  
  // Initialize Apple Loader
  window.appleLoader = new AppleLoader();

  // Add some Apple-style polish
  document.body.classList.add('apple-loaded');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AppleNavigation, AppleInteractions, AppleLoader };
}
