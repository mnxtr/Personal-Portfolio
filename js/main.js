/**
 * Main JavaScript for Portfolio
 * Handles theme toggle, typewriter effect, mobile menu, and scroll reveal
 */

import '../styles.css';
import { initThreeScenes } from './three-scene.js';

// Typewriter Effect
const phrases = window.typewriterPhrases || [
  "Building Intelligent AI Systems.",
  "LLMs · RAG · Neural Networks.",
  "Full Stack Development.",
  "Python · FastAPI · PyTorch · React."
];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeWriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;
  
  const current = phrases[phraseIndex];
  if (!deleting) {
    el.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    el.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 35 : 50);
}

// Theme Toggle
function setupTheme(toggleId, sunId, moonId) {
  const btn = document.getElementById(toggleId);
  const sun = document.getElementById(sunId);
  const moon = document.getElementById(moonId);
  if (!btn) return;
  btn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    sun?.classList.toggle("hidden", !isLight);
    moon?.classList.toggle("hidden", isLight);
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light");
    ["sunIcon", "sunIconMobile"].forEach(id => document.getElementById(id)?.classList.remove("hidden"));
    ["moonIcon", "moonIconMobile"].forEach(id => document.getElementById(id)?.classList.add("hidden"));
  }
  setupTheme("themeToggle", "sunIcon", "moonIcon");
  setupTheme("themeToggleMobile", "sunIconMobile", "moonIconMobile");
}

// Mobile Menu
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", menuToggle.classList.contains("open").toString());
    });
  }
}

// Scroll Reveal
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { 
      if (e.isIntersecting) { 
        e.target.classList.add("visible"); 
      } 
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initScrollReveal();
  initThreeScenes();
});

// Start typewriter after full load
window.addEventListener("load", () => setTimeout(typeWriter, 500));

export { typeWriter, setupTheme, initTheme, initMobileMenu, initScrollReveal };
