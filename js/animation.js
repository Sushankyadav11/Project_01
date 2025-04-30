// Animation and scroll effects

// DOM Elements
const allSections = document.querySelectorAll('.section');
const skillItems = document.querySelectorAll('.skill-item');
const projectCards = document.querySelectorAll('.project-card');
const certificateCards = document.querySelectorAll('.certificate-card');

// Options for the Intersection Observer
const observerOptions = {
  root: null, // use the viewport as the root
  threshold: 0.15, // 15% of the element must be visible
  rootMargin: '-50px 0px' // trigger slightly before element enters viewport
};

// Function to handle element animation on scroll
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add animation class based on section type
      const element = entry.target;
      
      if (element.classList.contains('about-section')) {
        const aboutContent = element.querySelector('.about-content');
        if (aboutContent) {
          aboutContent.classList.add('slide-up');
        }
      } else if (element.classList.contains('skill-item')) {
        element.classList.add('fade-in');
        // Add delay to create staggered effect
        element.style.animationDelay = `${(Array.from(skillItems).indexOf(element) % 4) * 0.1}s`;
      } else if (element.classList.contains('project-card')) {
        element.classList.add('slide-up');
        element.style.animationDelay = `${(Array.from(projectCards).indexOf(element) % 3) * 0.1}s`;
      } else if (element.classList.contains('certificate-card')) {
        element.classList.add('fade-in');
        element.style.animationDelay = `${(Array.from(certificateCards).indexOf(element) % 3) * 0.1}s`;
      } else {
        element.classList.add('fade-in');
      }
      
      // Stop observing once animation is applied
      observer.unobserve(element);
    }
  });
}

// Create an observer instance
const animationObserver = new IntersectionObserver(handleIntersection, observerOptions);

// Start observing elements
document.addEventListener('DOMContentLoaded', () => {
  // Observe sections (except home section)
  allSections.forEach(section => {
    if (!section.classList.contains('home-section')) {
      animationObserver.observe(section);
    }
  });
  
  // Observe individual items
  skillItems.forEach(item => {
    animationObserver.observe(item);
  });
  
  projectCards.forEach(card => {
    animationObserver.observe(card);
  });
  
  certificateCards.forEach(card => {
    animationObserver.observe(card);
  });
  
  // Setup parallax effect for home section
  setupParallaxEffect();
});

// Parallax effect for home section
function setupParallaxEffect() {
  const homeSection = document.querySelector('.home-section');
  
  if (homeSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition <= window.innerHeight) {
        const translateY = scrollPosition * 0.3;
        const opacity = 1 - (scrollPosition / window.innerHeight);
        
        homeSection.style.backgroundPositionY = `${translateY}px`;
        
        // Apply parallax to home content
        const homeContent = document.querySelector('.home-content');
        if (homeContent) {
          homeContent.style.transform = `translateY(${scrollPosition * 0.15}px)`;
          homeContent.style.opacity = Math.max(0, opacity);
        }
      }
    });
  }
}

// Add smooth reveal for section titles
const sectionTitles = document.querySelectorAll('.section-title');
const sectionTitleOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

function handleTitleAnimation(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-up');
    }
  });
}

const titleObserver = new IntersectionObserver(handleTitleAnimation, sectionTitleOptions);

sectionTitles.forEach(title => {
  titleObserver.observe(title);
});