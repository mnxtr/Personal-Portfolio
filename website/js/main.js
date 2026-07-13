/**
 * BD Traffic Signs - Main JavaScript
 * Minimalist, performant interactions
 */

(function() {
  'use strict';

  // DOM Elements
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const copyBtn = document.getElementById('copyBtn');
  const citationText = document.getElementById('citationText');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const navLinkItems = document.querySelectorAll('.nav__link');

  // Throttle utility
  function throttle(fn, wait) {
    let time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn.apply(this, arguments);
        time = Date.now();
      }
    };
  }

  // Navigation scroll effect
  function handleScroll() {
    const scrollY = window.scrollY;
    
    // Add shadow on scroll
    if (scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Update active nav link based on section
    updateActiveNavLink();
  }

  // Update active navigation link
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Mobile navigation toggle
  function toggleMobileNav() {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  // Close mobile nav on link click
  function closeMobileNav() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Tab functionality
  function handleTabClick(e) {
    const tabId = e.target.dataset.tab;
    
    // Update button states
    tabBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Update panel visibility
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === tabId) {
        panel.classList.add('active');
      }
    });
  }

  // Copy citation
  function copyCitation() {
    const text = citationText.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2000);
    });
  }

  // Back to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Smooth scroll for anchor links
  function handleAnchorClick(e) {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        closeMobileNav();
      }
    }
  }

  // Initialize
  function init() {
    // Scroll listener
    window.addEventListener('scroll', throttle(handleScroll, 100));

    // Mobile nav toggle
    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileNav);
    }

    // Nav links click handlers
    navLinkItems.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Tab buttons
    tabBtns.forEach(btn => {
      btn.addEventListener('click', handleTabClick);
    });

    // Copy citation
    if (copyBtn) {
      copyBtn.addEventListener('click', copyCitation);
    }

    // Back to top
    if (backToTop) {
      backToTop.addEventListener('click', scrollToTop);
    }

    // Hero action buttons smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Initial scroll state
    handleScroll();

    // Intersection Observer for lazy animations (optional enhancement)
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.card, .stat-card, .result-figure').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
      });
    }

    console.log('BD Traffic Signs website initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
