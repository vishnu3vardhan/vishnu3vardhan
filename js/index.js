// ==========================================
// 1. MOBILE NAVIGATION TOGGLE
// ==========================================
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
    const isVisible = nav.classList.toggle('nav--visible');
    
    // Accessibility: Update aria-expanded attribute
    navToggle.setAttribute('aria-expanded', isVisible);
    
    // Optional: Animate hamburger lines to 'X' (Requires CSS update)
    navToggle.classList.toggle('nav-toggle--open'); 
});

// Close nav when clicking a link (Mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav--visible');
        navToggle.classList.remove('nav-toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ==========================================
// 2. HEADER SHADOW ON SCROLL
// ==========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    // Add shadow when scrolled past 50px
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        header.style.transition = "box-shadow 0.3s ease";
    } else {
        header.style.boxShadow = "none";
    }
});

// ==========================================
// 3. SMOOTH SCROLL WITH HEADER OFFSET
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            
            // Calculate header height to offset the scroll properly
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// 4. ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let currentId = "";

    sections.forEach(section => {
        // Offset by header height + a little buffer (150px)
        const sectionTop = section.offsetTop - header.offsetHeight - 50; 
        
        if (window.scrollY >= sectionTop) {
            currentId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
        }
    });
});

// ==========================================
// 5. HIGH-PERFORMANCE SCROLL REVEAL ANIMATION (Intersection Observer)
// ==========================================
// We dynamically grab the elements updated in the new HTML
const revealElements = document.querySelectorAll(
    '.intro__content, .intro__img, .service, .about-me__body, .about-me__img, .portfolio__item, .achievement-card, .why-me__item, .contact'
);

// Ensure all elements start with the base 'reveal' class
revealElements.forEach(el => el.classList.add('reveal'));

// Setup Observer settings
const revealOptions = {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the very bottom of screen
};

// Create the Observer
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return; // Ignore if not on screen
        
        // Add animation class
        entry.target.classList.add('reveal-active');
        
        // Unobserve to prevent animating over and over, saving performance
        observer.unobserve(entry.target); 
    });
}, revealOptions);

// Attach Observer to elements
revealElements.forEach(el => {
    revealObserver.observe(el);
});