// Theme Toggle Functionality

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const bodyElement = document.body;

// Check for saved theme preference or use preferred color scheme
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    // Apply saved theme
    bodyElement.className = savedTheme;
  } else {
    // Check for preferred color scheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDarkMode) {
      bodyElement.className = 'dark-theme';
      localStorage.setItem('theme', 'dark-theme');
    } else {
      bodyElement.className = 'light-theme';
      localStorage.setItem('theme', 'light-theme');
    }
  }
});

// Toggle theme function
function toggleTheme() {
  if (bodyElement.classList.contains('light-theme')) {
    // Switch to dark theme
    bodyElement.className = 'dark-theme';
    localStorage.setItem('theme', 'dark-theme');
  } else {
    // Switch to light theme
    bodyElement.className = 'light-theme';
    localStorage.setItem('theme', 'light-theme');
  }
}

// Event listener for theme toggle button
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const savedTheme = localStorage.getItem('theme');
  
  // Only auto-switch if user hasn't manually set a preference
  if (!savedTheme) {
    if (e.matches) {
      bodyElement.className = 'dark-theme';
    } else {
      bodyElement.className = 'light-theme';
    }
  }
});