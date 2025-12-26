
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Toggle del menú móvil
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Cambiar icono del botón
            const isOpen = !mobileMenu.classList.contains('hidden');
            updateMenuIcon(isOpen);

            const navbar = document.getElementById('navbar');
if (isOpen) {
  navbar.classList.add('mobile-open');
} else {
  navbar.classList.remove('mobile-open');
}
        });
        
        // Cerrar menú al hacer click en un enlace
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                updateMenuIcon(false);
            });
        });
        
        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', function(event) {
            const isClickInside = mobileMenu.contains(event.target) || 
                                mobileMenuBtn.contains(event.target);
            
            if (!isClickInside && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                updateMenuIcon(false);
            }
        });
    }
    
    // Función para actualizar el icono del menú
    function updateMenuIcon(isOpen) {
        const svg = mobileMenuBtn.querySelector('svg path');
        if (svg) {
            if (isOpen) {
                // Icono de X para cerrar
                svg.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
                // Icono de hamburguesa
                svg.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        }
    }
    
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    
    // ============================================
    // SMOOTH SCROLL PARA NAVEGACIÓN
    // ============================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar smooth scroll si el href es un ancla válida
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    
    // ============================================
    // SWIPER CAROUSEL INITIALIZATION
    // ============================================
    const swiper = new Swiper('.mySwiper', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    
    
    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Opcional: dejar de observar después de la animación
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
   const animatedElements = document.querySelectorAll('.hover-scale, section h2, section p');
    animatedElements.forEach(el => observer.observe(el));
    
    
    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const imageObserverOptions = {
        rootMargin: '50px'
    };
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Cargar la imagen si tiene data-src
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    }, imageObserverOptions);
    
    // Observar imágenes con lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
    
    
    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    // Crear botón de scroll to top
    const scrollTopBtn = createScrollTopButton();
    document.body.appendChild(scrollTopBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });
    
    // Función para crear el botón
    function createScrollTopButton() {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.className = 'fixed bottom-5 right-8 bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-secondary transition duration-300 opacity-0 pointer-events-none z-50 text-xl font-bold';
        btn.setAttribute('aria-label', 'Scroll to top');
        
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        return btn;
    }
    
    
    // ============================================
    // FORM HANDLING (si agregas un formulario)
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Mostrar loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Recopilar datos del formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            try {
                // Aquí irá tu webhook de GHL o endpoint de API
                const response = await fetch('TU_WEBHOOK_URL_AQUI', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    // Éxito
                    showNotification('¡Mensaje enviado con éxito!', 'success');
                    this.reset();
                } else {
                    // Error
                    showNotification('Hubo un error. Por favor intenta de nuevo.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Hubo un error. Por favor intenta de nuevo.', 'error');
            } finally {
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    
    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 px-6 py-4 rounded-lg shadow-xl z-50 transition-all duration-300 transform translate-x-full`;
        
        // Colores según tipo
        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-blue-500 text-white',
            warning: 'bg-yellow-500 text-white'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    
});


// ============================================
// UTILITY FUNCTIONS
// ============================================

// Función para detectar si es móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para obtener parámetros de URL
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Función para debounce (optimizar eventos que se disparan mucho)
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

// Ejemplo de uso de debounce para resize
window.addEventListener('resize', debounce(function() {
    console.log('Window resized');
}, 250));