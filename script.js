// ========== Theme Toggle ==========
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
} else if (systemDarkMode) {
    html.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ========== Hamburger Menu ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
    });
});

// ========== Active Nav Link on Scroll ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ========== Smooth Scroll for Nav Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = 64;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Navbar Shadow on Scroll ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}, { passive: true });

// ========== Scroll Progress Bar ==========
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.prepend(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
}, { passive: true });

// ========== Intersection Observer for Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.timeline-item, .skill-card, .project-card, .education-item, .contact-card').forEach(el => {
    observer.observe(el);
});

// ========== Typing Effect for Hero Name ==========
const heroName = document.querySelector('.hero-name');
if (heroName) {
    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.borderRight = '3px solid var(--accent)';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        } else {
            // Remove cursor after typing is done
            setTimeout(() => {
                heroName.style.borderRight = 'none';
            }, 1500);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ========== Close mobile menu on resize ==========
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
    }
});

// ========== Hero Section Parallax Effect ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;
        if (scrolled < heroHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
    }
}, { passive: true });
