// Contact form functionality

// DOM Elements
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.querySelector('.submit-btn');

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Input validation
function validateInput(input, validationFunction) {
  const isValid = validationFunction(input.value);
  
  if (!isValid) {
    input.classList.add('invalid');
    return false;
  } else {
    input.classList.remove('invalid');
    return true;
  }
}

// Form submission handling
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate inputs
    const isNameValid = validateInput(nameInput, value => value.trim().length > 2);
    const isEmailValid = validateInput(emailInput, isValidEmail);
    const isMessageValid = validateInput(messageInput, value => value.trim().length > 10);
    
    // Check if all inputs are valid
    if (isNameValid && isEmailValid && isMessageValid) {
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      
      // Simulate form submission (replace with actual form submission in production)
      setTimeout(() => {
        // Create form data
        const formData = {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        };
        
        // Log form data (for development only)
        console.log('Form Data:', formData);
        
        // Show success message
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }, 1500);
    } else {
      // Show error message
      showNotification('Please fill out all fields correctly.', 'error');
    }
  });
}

// Input event listeners for real-time validation
if (nameInput) {
  nameInput.addEventListener('blur', () => {
    validateInput(nameInput, value => value.trim().length > 2);
  });
}

if (emailInput) {
  emailInput.addEventListener('blur', () => {
    validateInput(emailInput, isValidEmail);
  });
}

if (messageInput) {
  messageInput.addEventListener('blur', () => {
    validateInput(messageInput, value => value.trim().length > 10);
  });
}

// Notification function
function showNotification(message, type) {
  // Check if notification container exists, if not create it
  let notificationContainer = document.querySelector('.notification-container');
  
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);
    
    // Add styles to container
    notificationContainer.style.position = 'fixed';
    notificationContainer.style.bottom = '20px';
    notificationContainer.style.right = '20px';
    notificationContainer.style.zIndex = '1000';
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Style the notification
  notification.style.padding = '12px 20px';
  notification.style.marginBottom = '10px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  notification.style.fontWeight = '500';
  notification.style.fontSize = '0.9rem';
  notification.style.opacity = '0';
  notification.style.transform = 'translateY(20px)';
  notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  
  // Set colors based on type
  if (type === 'success') {
    notification.style.backgroundColor = 'var(--color-success-500)';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.backgroundColor = 'var(--color-error-500)';
    notification.style.color = 'white';
  }
  
  // Add to container
  notificationContainer.appendChild(notification);
  
  // Show the notification with animation
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}