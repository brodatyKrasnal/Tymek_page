// Script to remove specific sections from the main page

class SpecificSectionRemover {
  constructor() {
    this.sectionsToRemove = [
      'airpods',
      'air pods',
      'tv & home',
      'tv and home',
      'tv-home',
      'entertainment',
      'accessories',
      'support'
    ];
    
    this.sectionsToKeep = [
      'home',
      'shop',
      'store',
      'desktop',
      'pad',
      'phone',
      'watch'
    ];
    
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
        this.removeSpecificSections();
      } else {
        // Try again in 100ms
        setTimeout(checkForApp, 100);
      }
    };

    // Start checking after a short delay
    setTimeout(checkForApp, 1500);
  }

  removeSpecificSections() {
    console.log('Removing specific sections from main page...');
    
    // Remove by exact text matches first
    this.removeByExactText();
    
    // Remove by partial text matches
    this.removeByPartialText();
    
    // Remove navigation items
    this.removeNavigationItems();
    
    // Ensure only desired sections remain
    this.ensureOnlyDesiredSections();
    
    // Clean up empty containers
    this.cleanupEmptyContainers();
    
    console.log('Specific section removal completed');
  }

  removeByExactText() {
    // Look for elements with exact text matches (only navigation items)
    this.sectionsToRemove.forEach(sectionName => {
      const navSelectors = [
        'nav a',
        '.nav a',
        '.navigation a',
        '.menu a',
        '.navbar a',
        '[role="navigation"] a',
        '.nav-link',
        '.nav-item',
        'button',
        '[role="button"]'
      ];

      navSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const text = element.textContent?.toLowerCase().trim();
          if (text === sectionName.toLowerCase()) {
            console.log(`Removing exact navigation match: ${element.textContent}`);
            element.remove();
          }
        });
      });
    });
  }

  removeByPartialText() {
    // Only remove navigation items, not content sections
    this.sectionsToRemove.forEach(sectionName => {
      const navSelectors = [
        'nav a',
        '.nav a',
        '.navigation a',
        '.menu a',
        '.navbar a',
        '[role="navigation"] a',
        '.nav-link',
        '.nav-item',
        'button',
        '[role="button"]'
      ];

      navSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const text = element.textContent?.toLowerCase() || '';
          if (text.includes(sectionName.toLowerCase()) && text.length < 30) {
            console.log(`Removing navigation item containing: ${sectionName}`);
            element.remove();
          }
        });
      });
    });
  }

  removeNavigationItems() {
    // Remove navigation items containing the section names
    const navSelectors = [
      'nav a',
      '.nav a',
      '.navigation a',
      '.menu a',
      '.navbar a',
      '[role="navigation"] a',
      '.nav-link',
      '.nav-item',
      'button',
      '[role="button"]'
    ];

    navSelectors.forEach(selector => {
      const navItems = document.querySelectorAll(selector);
      navItems.forEach(item => {
        const text = item.textContent?.toLowerCase() || '';
        this.sectionsToRemove.forEach(sectionName => {
          if (text.includes(sectionName.toLowerCase())) {
            console.log(`Removing navigation item: ${item.textContent}`);
            item.remove();
          }
        });
      });
    });
  }

  isLikelySection(element) {
    // Check if element is likely a section or navigation item
    const tagName = element.tagName?.toLowerCase();
    const className = element.className?.toLowerCase() || '';
    const id = element.id?.toLowerCase() || '';
    
    // Common section indicators
    const sectionIndicators = [
      'section', 'nav', 'menu', 'item', 'link', 'tab', 'card', 'button'
    ];
    
    return sectionIndicators.some(indicator => 
      tagName.includes(indicator) || 
      className.includes(indicator) || 
      id.includes(indicator)
    );
  }

  isTargetSection(element, sectionName) {
    // More specific check to ensure we're removing the right sections
    const text = element.textContent?.toLowerCase() || '';
    
    // Check for specific patterns that indicate these are our target sections
    const patterns = {
      'airpods': ['airpods', 'air pods', 'wireless', 'earbuds'],
      'tv & home': ['tv & home', 'tv and home', 'homepod', 'apple tv', 'tv-home'],
      'entertainment': ['entertainment', 'apple music', 'apple tv+', 'apple arcade', 'apple news+'],
      'accessories': ['accessories', 'magic mouse', 'magic keyboard', 'airtag', 'cable'],
      'support': ['support', 'help', 'genius bar', 'applecare', 'repair']
    };

    const sectionKey = sectionName.replace(/\s+/g, '').replace(/&/g, '').toLowerCase();
    const relevantPatterns = patterns[sectionKey] || [sectionName];
    
    return relevantPatterns.some(pattern => text.includes(pattern.toLowerCase()));
  }

  ensureOnlyDesiredSections() {
    // Only remove navigation items, not content sections
    const navSelectors = [
      'nav a',
      '.nav a',
      '.navigation a',
      '.menu a',
      '.navbar a',
      '[role="navigation"] a',
      '.nav-link',
      '.nav-item'
    ];

    navSelectors.forEach(selector => {
      const navItems = document.querySelectorAll(selector);
      navItems.forEach(item => {
        const text = item.textContent?.toLowerCase().trim() || '';
        
        // Only remove if it's clearly a navigation item and not a desired section
        if (text !== '' && text.length < 20) {
          const isDesiredSection = this.sectionsToKeep.some(desiredSection => 
            text.includes(desiredSection.toLowerCase())
          );
          
          const isUnwantedSection = this.sectionsToRemove.some(unwantedSection => 
            text.includes(unwantedSection.toLowerCase())
          );
          
          // Only remove if it's unwanted and not desired
          if (isUnwantedSection && !isDesiredSection) {
            console.log(`Removing unwanted navigation item: ${item.textContent}`);
            item.remove();
          }
        }
      });
    });
  }

  cleanupEmptyContainers() {
    // Only remove empty navigation containers, not content containers
    const emptyNavContainers = document.querySelectorAll('nav li, .nav li, .navigation li, .menu li');
    emptyNavContainers.forEach(container => {
      if (container.children.length === 0 && 
          (!container.textContent || container.textContent.trim() === '')) {
        container.remove();
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.specificSectionRemover = new SpecificSectionRemover();
});

// Also try to initialize after a delay in case the main app loads later
setTimeout(() => {
  if (!window.specificSectionRemover) {
    window.specificSectionRemover = new SpecificSectionRemover();
  }
}, 3000);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SpecificSectionRemover };
}
