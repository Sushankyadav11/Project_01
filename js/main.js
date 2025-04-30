// Main JavaScript functionality

// DOM Elements
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');

// Scroll event for header shadow and active nav link
document.addEventListener('DOMContentLoaded', () => {
  // Initialize active section on page load
  checkActiveSection();
  
  // Handle mobile menu toggle
  setupMobileMenu();
  
  // Setup smooth scrolling for nav links
  setupSmoothScroll();
});

// Window scroll event
window.addEventListener('scroll', () => {
  // Header shadow on scroll
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Update active section on scroll
  checkActiveSection();
});

// Function to check and update the active section
function checkActiveSection() {
  const scrollPosition = window.scrollY;
  
  // Get current section
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to current section's link
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

// Function to setup mobile menu
function setupMobileMenu() {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Function to setup smooth scrolling
function setupSmoothScroll() {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });
  
  // Smooth scroll for scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator a');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  }
}

// Add custom styles to header when scrolled
function updateHeader() {
  if (window.scrollY > 50) {
    header.style.backgroundColor = 'var(--header-bg)';
    header.style.boxShadow = 'var(--header-shadow)';
  } else {
    header.style.backgroundColor = 'transparent';
    header.style.boxShadow = 'none';
  }
}

// Resume buttons functionality
// Resume buttons functionality
const viewResumeBtn = document.getElementById('view-resume-btn');
const downloadResumeBtn = document.getElementById('download-resume-btn');

// Check if the buttons exist and add functionality
if (viewResumeBtn) {
  viewResumeBtn.addEventListener('click', (e) => {
    // Check if the href is valid
    if (!viewResumeBtn.href) {
      e.preventDefault();
      alert('Resume URL not set. Please update the URL in the HTML.');
    }
  });
}

if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener('click', (e) => {
    // Check if the href is valid for download
    if (!downloadResumeBtn.href) {
      e.preventDefault();
      alert('Resume download URL not set. Please update the URL in the HTML.');
    }
  });
}
// Add event listeners to the button