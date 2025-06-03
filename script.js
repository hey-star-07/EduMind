document.addEventListener('DOMContentLoaded', function() {
// Efecto scroll navbar
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.glass-navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navUl = document.querySelector('.nav-links');

if (hamburger && navUl) {
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navUl.classList.toggle('active');
    
    // Bloquear scroll cuando el menú está abierto
    if (navUl.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navUl.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

  // Formulario de contacto
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 3000);
        this.reset();
      }, 1500);
    });
  }

  // FAQ Acordeón
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        item.classList.toggle('active');
      });
    });
  }

  // Observer para animaciones
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('impact-stats')) {
          animateNumbers();
          animationObserver.unobserve(entry.target);
        }
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  // Configurar elementos animables
  document.querySelectorAll('.animated-step, .feature-card, .tech-card, .process-step, .info-card, .faq-item, .testimonial, .impact-stats').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    animationObserver.observe(el);
  });

  // Testimonial Slider
  if (document.querySelector('.testimonial-slider')) {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
      testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
        testimonial.style.display = 'none';
      });
      testimonials[index].classList.add('active');
      testimonials[index].style.display = 'block';
      testimonials[index].style.animation = 'none';
      void testimonials[index].offsetWidth;
      testimonials[index].style.animation = 'fadeIn 0.5s ease-in-out';
    }
    
    function startAutoRotation() {
      testimonialInterval = setInterval(() => {
        currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
      }, 5000);
    }
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
        showTestimonial(currentIndex);
        resetAutoRotation();
      });
      
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
        resetAutoRotation();
      });
    }
    
    function resetAutoRotation() {
      clearInterval(testimonialInterval);
      startAutoRotation();
    }
    
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
      slider.addEventListener('mouseleave', startAutoRotation);
    }
    
    showTestimonial(0);
    startAutoRotation();
  }

  // Efecto Parallax
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      heroImage.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    });
  }

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 80;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animación de números
  function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const speed = 200;
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const count = +stat.innerText;
      const increment = target / speed;

      if (count < target) {
        stat.innerText = Math.ceil(count + increment);
        setTimeout(animateNumbers, 1);
      } else {
        stat.innerText = target;
      }
    });
  }
  // Animación de partículas para el hero
document.addEventListener('DOMContentLoaded', function() {
  // Configuración de partículas
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  // Animación de scroll para el hero
  const heroScroll = document.querySelector('.hero-scroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', function(e) {
      e.preventDefault();
      const contactSection = document.querySelector('.contact-main');
      contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Animación de formulario
  const formInputs = document.querySelectorAll('.form-group.floating input, .form-group.floating textarea, .form-group.floating select');
  
  formInputs.forEach(input => {
    // Comprobar si hay valor al cargar la página
    if (input.value) {
      input.nextElementSibling.style.top = '0';
      input.nextElementSibling.style.fontSize = '0.85rem';
      input.nextElementSibling.style.color = 'var(--primary-color)';
    }
    
    input.addEventListener('focus', function() {
      this.nextElementSibling.style.top = '0';
      this.nextElementSibling.style.fontSize = '0.85rem';
      this.nextElementSibling.style.color = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.nextElementSibling.style.top = '30px';
        this.nextElementSibling.style.fontSize = '1rem';
        this.nextElementSibling.style.color = 'var(--text-light)';
      }
    });
  });

  // Animación de FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const item = this.parentNode;
      const isActive = item.classList.contains('active');
      
      // Cerrar todos los items primero
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
      });
      
      // Abrir el item clickeado si no estaba activo
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Animación de envío de formulario
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('span');
      const btnIcon = submitBtn.querySelector('i');
      
      // Animación de envío
      btnText.textContent = 'Enviando...';
      btnIcon.classList.remove('fa-paper-plane');
      btnIcon.classList.add('fa-spinner', 'fa-spin');
      submitBtn.disabled = true;
      
      // Simular envío (en producción, aquí iría tu código AJAX)
      setTimeout(() => {
        btnText.textContent = '¡Mensaje enviado!';
        btnIcon.classList.remove('fa-spinner', 'fa-spin');
        btnIcon.classList.add('fa-check');
        
        // Resetear después de 3 segundos
        setTimeout(() => {
          btnText.textContent = 'Enviar mensaje';
          btnIcon.classList.remove('fa-check');
          btnIcon.classList.add('fa-paper-plane');
          submitBtn.disabled = false;
          contactForm.reset();
          
          // Resetear labels
          formInputs.forEach(input => {
            if (!input.value) {
              input.nextElementSibling.style.top = '30px';
              input.nextElementSibling.style.fontSize = '1rem';
              input.nextElementSibling.style.color = 'var(--text-light)';
            }
          });
        }, 3000);
      }, 1500);
    });
  }
});
});