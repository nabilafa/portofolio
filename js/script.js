// Smooth scrolling untuk navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smooth scroll to target section
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for section detection
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const correspondingLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Photo hover effects
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Lazy loading untuk gambar
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Mobile menu toggle (untuk responsive)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const navbar = document.querySelector('.navbar');
            const navMenu = document.querySelector('.nav-menu');
            
            // Create hamburger button if it doesn't exist
            if (!document.querySelector('.hamburger')) {
                const hamburger = document.createElement('button');
                hamburger.className = 'hamburger';
                hamburger.innerHTML = '☰';
                hamburger.style.cssText = `
                    display: block;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                `;
                
                navbar.appendChild(hamburger);
                
                hamburger.addEventListener('click', () => {
                    navMenu.classList.toggle('mobile-active');
                });
            }
        }
    };
    
    // Check for mobile on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
});