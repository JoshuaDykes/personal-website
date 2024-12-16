// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
      });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              const headerOffset = 100;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.project-card, .gallery-item, .skill-items span');
  const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          if (elementTop < windowHeight - 50) {
              element.classList.add('revealed');
          }
      });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;

          // Create success message element
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = `
              <div class="success-content">
                  <i class="fas fa-check-circle"></i>
                  <p>Thank you for your message, ${name}! I'll get back to you soon.</p>
              </div>
          `;

          // Add success message to form
          contactForm.innerHTML = '';
          contactForm.appendChild(successMessage);

          // Reset form after 5 seconds
          setTimeout(() => {
              contactForm.innerHTML = `
                  <div class="form-group">
                      <input type="text" id="name" required placeholder="Your Name">
                  </div>
                  <div class="form-group">
                      <input type="email" id="email" required placeholder="Your Email">
                  </div>
                  <div class="form-group">
                      <textarea id="message" required placeholder="Your Message"></textarea>
                  </div>
                  <button type="submit" class="submit-btn">Send Message</button>
              `;
          }, 5000);
      });
  }

  // Add scroll-to-top button functionality
  const scrollButton = document.createElement('button');
  scrollButton.className = 'scroll-to-top';
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollButton);

  window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
          scrollButton.classList.add('visible');
      } else {
          scrollButton.classList.remove('visible');
      }
  });

  scrollButton.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Image lazy loading
  const images = document.querySelectorAll('img[data-src]');
  const imageOptions = {
      threshold: 0,
      rootMargin: '0px 0px 50px 0px'
  };

  if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  img.src = img.dataset.src;
                  img.removeAttribute('data-src');
                  observer.unobserve(img);
              }
          });
      }, imageOptions);

      images.forEach(img => imageObserver.observe(img));
  } else {
      images.forEach(img => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
      });
  }

  // Add smooth hover effect for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
      card.addEventListener('mouseenter', function(e) {
          const image = this.querySelector('img');
          if (image) {
              image.style.transform = 'scale(1.1)';
          }
      });

      card.addEventListener('mouseleave', function(e) {
          const image = this.querySelector('img');
          if (image) {
              image.style.transform = 'scale(1)';
          }
      });
  });

  // Add parallax effect to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
      window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
      });
  }
});
