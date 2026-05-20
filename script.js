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

// ========== Project Filter Logic ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    // Show matching card
                    card.classList.remove('hide');
                    // Trigger reflow to ensure transition works
                    void card.offsetWidth;
                    card.classList.remove('fade-out');
                } else {
                    // Hide mismatching card
                    card.classList.add('fade-out');
                    // Add 'hide' after the opacity transition ends
                    setTimeout(() => {
                        if (card.classList.contains('fade-out')) {
                            card.classList.add('hide');
                        }
                    }, 300);
                }
            });
        });
    });
}

// ========== Looping Typing Effect for Hero Title ==========
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const roles = [
        "Backend Software Engineer",
        "Distributed Systems Builder",
        "AI Integration Specialist"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            heroTitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // delete faster
        } else {
            heroTitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80; // normal typing speed
        }

        // Add a styled cursor representation
        heroTitle.innerHTML = heroTitle.textContent + '<span class="typing-cursor">|</span>';

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeRole, typingSpeed);
    }

    // Start role looping typing effect after a short delay
    setTimeout(typeRole, 1800);
}

// ========== Simulated Developer Console Terminal ==========
const terminalBody = document.getElementById('terminalBody');
if (terminalBody) {
    const logLines = [
        { text: 'systemctl start shreevatsa-microservice-cluster.service', type: 'cmd' },
        { text: '=====================================================', type: 'info' },
        { text: '   🌱  Spring Boot  🌱   (v3.2.4)', type: 'success' },
        { text: '=====================================================', type: 'info' },
        { text: '2026-05-20 19:26:25.102  INFO 14902 --- [main] c.s.portfolio.PortfolioApplication : Starting application on macOS', type: 'info' },
        { text: '2026-05-20 19:26:25.405  INFO 14902 --- [main] c.s.p.c.DatabaseConfig            : Connecting to database pool...', type: 'info' },
        { text: '2026-05-20 19:26:25.750  INFO 14902 --- [main] org.mongodb.driver.client         : [OK] Connection active (10/10 pool)', type: 'success' },
        { text: '2026-05-20 19:26:26.120  WARN 14902 --- [main] c.s.p.m.Neo4jMigrationService     : Migrating high-value client data to MongoDB...', type: 'warn' },
        { text: '2026-05-20 19:26:26.680  INFO 14902 --- [main] c.s.p.m.Neo4jMigrationService     : [SUCCESS] 40% Cost Reduction & 25% Query Boost', type: 'success' },
        { text: '2026-05-20 19:26:27.010  INFO 14902 --- [main] c.s.p.m.KafkaMessagingService     : [OK] Kafka Consumer Group \'rights-dm\' active', type: 'success' },
        { text: '2026-05-20 19:26:27.340  INFO 14902 --- [main] c.s.p.a.VertexAiMcpGateway        : Initializing Claude AI MCP gateway server...', type: 'info' },
        { text: '2026-05-20 19:26:27.810  INFO 14902 --- [main] c.s.p.a.VertexAiMcpGateway        : [ONLINE] Claude AI connected successfully (Latency: 45ms)', type: 'success' },
        { text: '2026-05-20 19:26:28.100  INFO 14902 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http)', type: 'info' },
        { text: '2026-05-20 19:26:28.105  INFO 14902 --- [main] c.s.portfolio.PortfolioApplication : Started PortfolioApplication in 3.003 seconds', type: 'success' },
        { text: '-----------------------------------------------------', type: 'info' },
        { text: 'READY FOR INCOMING API GATEWAY REQUESTS', type: 'success' }
    ];

    let currentLineIndex = 0;

    function addTerminalLine(lineObj, callback) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';

        if (lineObj.type === 'cmd') {
            const promptSpan = document.createElement('span');
            promptSpan.className = 'terminal-prompt';
            promptSpan.textContent = 'visitor@shreevatsa:~$ ';
            lineDiv.appendChild(promptSpan);

            const textSpan = document.createElement('span');
            textSpan.className = 'terminal-text';
            lineDiv.appendChild(textSpan);

            terminalBody.appendChild(lineDiv);
            terminalBody.scrollTop = terminalBody.scrollHeight;

            // Type out the command character by character
            let charIdx = 0;
            function typeCmd() {
                if (charIdx < lineObj.text.length) {
                    textSpan.textContent += lineObj.text.charAt(charIdx);
                    charIdx++;
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                    setTimeout(typeCmd, 35);
                } else {
                    if (callback) setTimeout(callback, 500);
                }
            }
            typeCmd();
        } else {
            const outputSpan = document.createElement('span');
            outputSpan.className = `terminal-output ${lineObj.type}`;
            outputSpan.textContent = lineObj.text;
            lineDiv.appendChild(outputSpan);
            
            terminalBody.appendChild(lineDiv);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            if (callback) setTimeout(callback, 200 + Math.random() * 300);
        }
    }

    function runLogSequence() {
        if (currentLineIndex < logLines.length) {
            addTerminalLine(logLines[currentLineIndex], () => {
                currentLineIndex++;
                runLogSequence();
            });
        } else {
            // Log sequence complete, start generating live mock request logs!
            setTimeout(startRequestStream, 2000);
        }
    }

    // Live mock requests to show backend activity
    const mockRequests = [
        { path: 'GET /api/v1/projects', status: 200, statusText: 'OK', type: 'success' },
        { path: 'GET /api/v1/experience/bazaarvoice', status: 200, statusText: 'OK', type: 'success' },
        { path: 'POST /api/v1/mcp/chat', status: 200, statusText: 'OK', type: 'success' },
        { path: 'GET /api/v1/skills', status: 200, statusText: 'OK', type: 'success' },
        { path: 'POST /api/v1/contact/message', status: 201, statusText: 'CREATED', type: 'success' },
        { path: 'GET /api/v1/metrics/dashboard', status: 200, statusText: 'OK', type: 'success' }
    ];

    function startRequestStream() {
        setInterval(() => {
            const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + '.000';
            const randomReq = mockRequests[Math.floor(Math.random() * mockRequests.length)];
            const latency = Math.floor(10 + Math.random() * 50);
            
            const logLine = `[GATEWAY] ${timestamp} INFO --- ${randomReq.path} ${randomReq.status} ${randomReq.statusText} - ${latency}ms`;
            
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            
            const outputSpan = document.createElement('span');
            outputSpan.className = 'terminal-output success';
            outputSpan.textContent = logLine;
            
            lineDiv.appendChild(outputSpan);
            terminalBody.appendChild(lineDiv);
            
            // Auto scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            // Limit lines to prevent memory issues or infinite expansion
            const lines = terminalBody.getElementsByClassName('terminal-line');
            if (lines.length > 50) {
                terminalBody.removeChild(lines[0]);
            }
        }, 3000 + Math.random() * 3000);
    }

    // Start terminal typing sequences after a brief delay
    setTimeout(runLogSequence, 1000);
}

// ========== Career Metrics Stats Count-Up Animation ==========
const statsNumbers = document.querySelectorAll('.stat-number');

if (statsNumbers.length) {
    const countOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const targetVal = parseFloat(targetEl.getAttribute('data-target'));
                const duration = 1500; // 1.5 seconds animation
                const startTime = performance.now();
                const isDecimal = targetVal % 1 !== 0;

                function updateCount(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    // Ease out quadratic
                    const easeProgress = progress * (2 - progress);
                    
                    let currentVal = easeProgress * targetVal;
                    
                    if (isDecimal) {
                        targetEl.textContent = currentVal.toFixed(1) + '+';
                    } else {
                        // Suffixes based on ID or data attribute
                        if (targetEl.id === 'costCount' || targetEl.id === 'perfCount') {
                            targetEl.textContent = Math.floor(currentVal) + '%';
                        } else {
                            targetEl.textContent = Math.floor(currentVal);
                        }
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        // Final snap to target
                        if (isDecimal) {
                            targetEl.textContent = targetVal.toFixed(1) + '+';
                        } else if (targetEl.id === 'costCount' || targetEl.id === 'perfCount') {
                            targetEl.textContent = targetVal + '%';
                        } else {
                            targetEl.textContent = targetVal;
                        }
                    }
                }

                requestAnimationFrame(updateCount);
                observer.unobserve(targetEl); // Trigger only once
            }
        });
    }, countOptions);

    statsNumbers.forEach(num => countObserver.observe(num));
}

