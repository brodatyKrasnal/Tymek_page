// Script to update any remaining Apple/Mac/iPad/iPhone references to LemOn branding

class BrandingUpdater {
  constructor() {
    this.brandingMappings = {
      // Apple to LemOn
      'Apple': 'LemOn',
      'apple': 'LemOn',
      'APPLE': 'LEMON',
      
      // Mac to Desktop
      'Mac': 'Desktop',
      'mac': 'Desktop',
      'MAC': 'DESKTOP',
      'MacBook': 'DesktopBook',
      'macbook': 'DesktopBook',
      'MACBOOK': 'DESKTOPBOOK',
      'iMac': 'iDesktop',
      'imac': 'iDesktop',
      'IMAC': 'IDESKTOP',
      
      // iPad to Pad
      'iPad': 'Pad',
      'ipad': 'Pad',
      'IPAD': 'PAD',
      
      // iPhone to Phone
      'iPhone': 'Phone',
      'iphone': 'Phone',
      'IPHONE': 'PHONE',
      
      // Apple Watch to LemOn Watch
      'Apple Watch': 'LemOn Watch',
      'apple watch': 'LemOn Watch',
      'APPLE WATCH': 'LEMON WATCH',
      
      // Operating Systems
      'MacOS': 'DesktopOS',
      'macOS': 'DesktopOS',
      'MACOS': 'DESKTOPOS',
      'iPadOS': 'PadOS',
      'ipadOS': 'PadOS',
      'IPADOS': 'PADOS',
      'iOS': 'PhoneOS',
      'ios': 'PhoneOS',
      'IOS': 'PHONEOS',
      'watchOS': 'LemOn WatchOS',
      'watchos': 'LemOn WatchOS',
      'WATCHOS': 'LEMON WATCHOS'
    };
    
    this.init();
  }

  init() {
    // Wait for the main app to load
    this.waitForMainApp();
  }

  waitForMainApp() {
    const checkForApp = () => {
      const rootElement = document.getElementById('root');
      if (rootElement && rootElement.children.length > 0) {
        this.updateBranding();
        // Set up a mutation observer to catch dynamically added content
        this.setupMutationObserver();
      } else {
        setTimeout(checkForApp, 100);
      }
    };

    setTimeout(checkForApp, 1500);
  }

  updateBranding() {
    console.log('Updating branding throughout the page...');
    
    // Update text content in all elements
    this.updateTextContent();
    
    // Update any data attributes
    this.updateDataAttributes();
    
    // Update any alt text or titles
    this.updateAttributes();
    
    console.log('Branding update completed');
  }

  updateTextContent() {
    // Get all text nodes in the document
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    textNodes.forEach(textNode => {
      let text = textNode.textContent;
      let updated = false;

      // Apply all branding mappings
      Object.entries(this.brandingMappings).forEach(([oldText, newText]) => {
        if (text.includes(oldText)) {
          text = text.replace(new RegExp(oldText, 'g'), newText);
          updated = true;
        }
      });

      if (updated) {
        textNode.textContent = text;
      }
    });
  }

  updateDataAttributes() {
    // Update data attributes that might contain product names
    const elementsWithData = document.querySelectorAll('[data-product], [data-category], [data-name]');
    
    elementsWithData.forEach(element => {
      Object.entries(this.brandingMappings).forEach(([oldText, newText]) => {
        // Update data-product attributes
        if (element.dataset.product && element.dataset.product.includes(oldText.toLowerCase())) {
          element.dataset.product = element.dataset.product.replace(
            new RegExp(oldText.toLowerCase(), 'g'), 
            newText.toLowerCase()
          );
        }
        
        // Update data-category attributes
        if (element.dataset.category && element.dataset.category.includes(oldText.toLowerCase())) {
          element.dataset.category = element.dataset.category.replace(
            new RegExp(oldText.toLowerCase(), 'g'), 
            newText.toLowerCase()
          );
        }
      });
    });
  }

  updateAttributes() {
    // Update alt text, title attributes, etc.
    const elementsWithAttributes = document.querySelectorAll('[alt], [title], [aria-label]');
    
    elementsWithAttributes.forEach(element => {
      Object.entries(this.brandingMappings).forEach(([oldText, newText]) => {
        if (element.alt && element.alt.includes(oldText)) {
          element.alt = element.alt.replace(new RegExp(oldText, 'g'), newText);
        }
        if (element.title && element.title.includes(oldText)) {
          element.title = element.title.replace(new RegExp(oldText, 'g'), newText);
        }
        if (element.getAttribute('aria-label') && element.getAttribute('aria-label').includes(oldText)) {
          element.setAttribute('aria-label', 
            element.getAttribute('aria-label').replace(new RegExp(oldText, 'g'), newText)
          );
        }
      });
    });
  }

  setupMutationObserver() {
    // Watch for dynamically added content
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldUpdate = true;
        }
      });
      
      if (shouldUpdate) {
        // Debounce the update
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
          this.updateBranding();
        }, 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.brandingUpdater = new BrandingUpdater();
});

// Also try to initialize after a delay in case the main app loads later
setTimeout(() => {
  if (!window.brandingUpdater) {
    window.brandingUpdater = new BrandingUpdater();
  }
}, 2000);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BrandingUpdater };
}
