// Modern JavaScript for Hugo i18n Site Template
(function () {
  'use strict';

  // DOM ready function
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Initialize all features when DOM is ready
  ready(function () {
    initStickyHeader();
    initBackToTop();
    initSmoothScroll();
    initThemeToggle();
    initSearch();
    initAccessibility();
  });

  // Sticky header functionality
  function initStickyHeader() {
    const header = document.querySelector('.header-container');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        header.classList.add('is-fixed');
      } else {
        header.classList.remove('is-fixed');
      }

      lastScrollY = scrollY;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Back to top button
  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    // Show/hide on scroll
    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    // Initial check
    toggleBackToTop();
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  // Theme toggle functionality
  function initThemeToggle() {
    // Check for saved theme preference or default to light mode
    const currentTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');

    document.documentElement.setAttribute('data-theme', currentTheme);

    // Create theme toggle button if it doesn't exist
    let themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
      themeToggle = document.createElement('button');
      themeToggle.id = 'theme-toggle';
      themeToggle.setAttribute('aria-label', 'Toggle theme');
      themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

      const header = document.querySelector('header .wrapper');
      if (header) {
        header.appendChild(themeToggle);
      }
    }

    themeToggle.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      this.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  // Search functionality
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let searchResults = [];
    let searchIndex = null;

    // Simple search implementation
    function performSearch(query) {
      if (!query.trim()) {
        hideSearchResults();
        return;
      }

      const results = searchIndex.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.toLowerCase())
      );

      displaySearchResults(results);
    }

    function displaySearchResults(results) {
      const resultsContainer = document.getElementById('search-results');
      if (!resultsContainer) return;

      if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      } else {
        resultsContainer.innerHTML = results
          .map(
            result =>
              `<div class="search-result">
            <h4><a href="${result.url}">${result.title}</a></h4>
            <p>${result.excerpt}</p>
          </div>`
          )
          .join('');
      }

      resultsContainer.style.display = 'block';
    }

    function hideSearchResults() {
      const resultsContainer = document.getElementById('search-results');
      if (resultsContainer) {
        resultsContainer.style.display = 'none';
      }
    }

    // Initialize search index (simplified version)
    searchIndex = Array.from(
      document.querySelectorAll('article, .content')
    ).map(element => ({
      title: element.querySelector('h1, h2, h3')?.textContent || 'Untitled',
      content: element.textContent,
      url: element.querySelector('a')?.href || window.location.href,
      excerpt: element.textContent.substring(0, 150) + '...',
    }));

    searchInput.addEventListener('input', function () {
      performSearch(this.value);
    });

    // Hide results when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-container')) {
        hideSearchResults();
      }
    });
  }

  // Accessibility enhancements
  function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }

    // Keyboard navigation for custom elements
    const customButtons = document.querySelectorAll(
      '[role="button"]:not(button)'
    );
    customButtons.forEach(button => {
      button.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    // Focus management for modals and dropdowns
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function trapFocus(element) {
      const focusableContent = element.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableContent[0];
      const lastFocusableElement =
        focusableContent[focusableContent.length - 1];

      element.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
      });
    }

    // Apply focus trap to any modal-like elements
    const modals = document.querySelectorAll('[role="dialog"], .modal');
    modals.forEach(trapFocus);
  }

  // Utility functions
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Expose utilities globally if needed
  window.HugoTemplate = {
    debounce,
    throttle,
  };
})();
