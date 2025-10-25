/* ============================================
   DR. NURUL ISLAM - PORTFOLIO JAVASCRIPT
   Professional Academic Website
   ============================================ */

'use strict';

// ============================================
// GLOBAL STATE
// ============================================
const State = {
    currentPubFilter: 'all',
    currentTalkFilter: 'all',
    currentStudentFilter: 'all',
    publicationsDisplayed: 10,
    isLoading: false,
    scrollPosition: 0
};

// ============================================
// DOM LOADED EVENT
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initializeWebsite();
});

// ============================================
// MAIN INITIALIZATION
// ============================================
async function initializeWebsite() {
    console.log('%c🎓 Dr. Nurul Islam - Portfolio Initializing...', 'color: #0F4C81; font-size: 18px; font-weight: bold;');

    try {
        // Initialize all components
        initCustomCursor();
        initNavigation();
        initScrollEffects();
        initParticleCanvas();
        initAOS();

        // Load all content
        await loadAllContent();

        // Initialize interactive features
        initContactForm();
        initCounters();
        initTabs();
        initToast();

        console.log('%c✅ Website initialized successfully!', 'color: #38A169; font-size: 14px; font-weight: bold;');

    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    if (!cursorDot || !cursorOutline) return;

    if (window.innerWidth <= 1024) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }

    animateOutline();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const header = document.getElementById('header');
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scrollProgress');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scroll navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');

                    // Update active link
                    updateActiveLink(href);
                }
            }
        });
    });

    // Scroll effects
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Header background on scroll
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update scroll progress bar
        if (scrollProgress) {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (currentScroll / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        }

        // Update active section
        updateActiveSectionOnScroll();

        lastScroll = currentScroll;
    });
}

function updateActiveLink(href) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

function updateActiveSectionOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Back to top button
        if (window.pageYOffset > 500) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// PARTICLE CANVAS ANIMATION
// ============================================
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connect particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ============================================
// AOS ANIMATION
// ============================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 50
        });
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// LOAD ALL CONTENT
// ============================================
async function loadAllContent() {
    try {
        await Promise.all([
            loadExperience(),
            loadHonoraryPositions(),
            loadResearchProjects(),
            loadPublications(),
            loadTeaching(),
            loadTalks(),
            loadAwards(),
            loadSupervision()
        ]);

        console.log('✅ All content loaded successfully');
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// ============================================
// LOAD EXPERIENCE
// ============================================
function loadExperience() {
    const container = document.getElementById('experienceTimeline');
    if (!container || !EXPERIENCE_DATA) return;

    container.innerHTML = '';

    EXPERIENCE_DATA.forEach((exp, index) => {
        const item = document.createElement('div');
        item.className = 'experience-item';
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', index * 100);

        item.innerHTML = `
            <div class="exp-card${exp.current ? ' current' : ''}">
                <div class="exp-header">
                    <h3>${exp.position}</h3>
                    <span class="exp-period">${exp.startYear} - ${exp.endYear}</span>
                </div>
                <p class="exp-org">
                    <i class="fas fa-building"></i>
                    ${exp.institution}
                </p>
                ${exp.department ? `<p style="color: var(--color-gray); margin-top: 0.5rem; font-size: 0.9375rem;">${exp.department}</p>` : ''}
                ${exp.current ? '<div style="margin-top: 1rem;"><span style="background: linear-gradient(135deg, #F9A825, #D84315); color: white; padding: 0.375rem 1rem; border-radius: 1rem; font-size: 0.8125rem; font-weight: 600;"><i class="fas fa-star"></i> Current Position</span></div>' : ''}
            </div>
        `;

        container.appendChild(item);
    });
}

// ============================================
// LOAD HONORARY POSITIONS
// ============================================
function loadHonoraryPositions() {
    const container = document.getElementById('honoraryGrid');
    if (!container || !HONORARY_POSITIONS) return;

    container.innerHTML = '';

    HONORARY_POSITIONS.forEach((position, index) => {
        const card = document.createElement('div');
        card.className = 'honorary-card';
        card.setAttribute('data-aos', 'zoom-in');
        card.setAttribute('data-aos-delay', index * 100);

        card.innerHTML = `
            <div class="honorary-icon">
                <i class="fas fa-award"></i>
            </div>
            <h4>${position.title}</h4>
            <p>${position.organization}</p>
            ${position.period ? `<p style="color: var(--color-gray-light); font-size: 0.875rem; margin-top: 0.5rem;"><i class="fas fa-calendar"></i> ${position.period}</p>` : ''}
        `;

        container.appendChild(card);
    });
}

// ============================================
// LOAD RESEARCH PROJECTS
// ============================================
function loadResearchProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container || !RESEARCH_PROJECTS) return;

    container.innerHTML = '';

    RESEARCH_PROJECTS.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 3) * 100);

        card.innerHTML = `
            <span class="project-year">${project.year}</span>
            <h3>${project.title}</h3>
            ${project.funder ? `
                <p class="project-funder">
                    <i class="fas fa-hand-holding-usd"></i>
                    <span>${project.funder}</span>
                </p>
            ` : ''}
            ${project.status ? `
                <div class="project-status">
                    <i class="fas fa-check-circle"></i>
                    <span>${project.status}</span>
                </div>
            ` : ''}
        `;

        container.appendChild(card);
    });
}

// ============================================
// LOAD PUBLICATIONS
// ============================================
function loadPublications() {
    if (!ALL_PUBLICATIONS) return;

    updatePublicationStats();
    displayPublications();
    initPublicationFilters();
}

function updatePublicationStats() {
    const totalPubs = ALL_PUBLICATIONS.length;
    const journalPubs = ALL_PUBLICATIONS.filter(p => p.type === 'journal').length;
    const bookPubs = ALL_PUBLICATIONS.filter(p => p.type === 'book' || p.type === 'chapter').length;
    const confPubs = ALL_PUBLICATIONS.filter(p => p.type === 'conference').length;

    const totalEl = document.getElementById('totalPubs');
    const journalEl = document.getElementById('journalPubs');
    const bookEl = document.getElementById('bookPubs');
    const confEl = document.getElementById('confPubs');

    if (totalEl) totalEl.textContent = totalPubs;
    if (journalEl) journalEl.textContent = journalPubs;
    if (bookEl) bookEl.textContent = bookPubs;
    if (confEl) confEl.textContent = confPubs;
}

function displayPublications(filter = 'all') {
    const container = document.getElementById('publicationsList');
    if (!container) return;

    let filtered = [...ALL_PUBLICATIONS];

    // Apply filter
    if (filter !== 'all') {
        const year = parseInt(filter);
        filtered = filtered.filter(pub => {
            const pubYear = parseInt(pub.year);
            if (year === 2020) return pubYear >= 2020;
            if (year === 2015) return pubYear >= 2015 && pubYear < 2020;
            if (year === 2010) return pubYear >= 2010 && pubYear < 2015;
            if (year === 2000) return pubYear < 2010;
            return true;
        });
    }

    // Sort by year (newest first)
    filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));

    // Display limited number
    const toDisplay = filtered.slice(0, State.publicationsDisplayed);

    container.innerHTML = '';

    if (toDisplay.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: var(--color-gray);">
                <i class="fas fa-search" style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.3;"></i>
                <h3>No publications found</h3>
                <p style="margin: 0;">Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    toDisplay.forEach((pub, index) => {
        const item = document.createElement('div');
        item.className = 'publication-item';
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', (index % 5) * 50);

        item.innerHTML = `
            <p class="pub-authors">${pub.authors}</p>
            <h3>${pub.title}</h3>
            <p class="pub-journal">${pub.journal}</p>
            <div class="pub-meta">
                <span class="pub-meta-item">
                    <i class="fas fa-calendar"></i>
                    ${pub.year}
                </span>
                ${pub.type ? `
                    <span class="pub-meta-item">
                        <i class="fas fa-tag"></i>
                        ${capitalizeFirst(pub.type)}
                    </span>
                ` : ''}
                ${pub.doi ? `
                    <span class="pub-meta-item">
                        <i class="fas fa-link"></i>
                        DOI: ${pub.doi}
                    </span>
                ` : ''}
            </div>
        `;

        container.appendChild(item);
    });

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMorePubs');
    if (loadMoreBtn) {
        if (State.publicationsDisplayed >= filtered.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }

    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function initPublicationFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('pubSearch');
    const searchClear = document.getElementById('searchClear');
    const loadMoreBtn = document.getElementById('loadMorePubs');

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            State.currentPubFilter = this.getAttribute('data-filter');
            State.publicationsDisplayed = 10;
            displayPublications(State.currentPubFilter);
        });
    });

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            searchPublications(e.target.value);
        });
    }

    // Search clear
    if (searchClear) {
        searchClear.addEventListener('click', function () {
            searchInput.value = '';
            displayPublications(State.currentPubFilter);
        });
    }

    // Load more
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            State.publicationsDisplayed += 10;
            displayPublications(State.currentPubFilter);

            // Scroll to first new item
            setTimeout(() => {
                const items = document.querySelectorAll('.publication-item');
                if (items[State.publicationsDisplayed - 10]) {
                    items[State.publicationsDisplayed - 10].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 100);
        });
    }
}

function searchPublications(query) {
    const container = document.getElementById('publicationsList');
    if (!container) return;

    if (!query.trim()) {
        displayPublications(State.currentPubFilter);
        return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = ALL_PUBLICATIONS.filter(pub =>
        pub.title?.toLowerCase().includes(searchTerm) ||
        pub.authors?.toLowerCase().includes(searchTerm) ||
        pub.journal?.toLowerCase().includes(searchTerm) ||
        pub.year?.includes(searchTerm)
    );

    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: var(--color-gray);">
                <i class="fas fa-search" style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.3;"></i>
                <h3>No publications found</h3>
                <p style="margin: 0;">No results for "${query}"</p>
            </div>
        `;
        return;
    }

    filtered.forEach((pub, index) => {
        const item = document.createElement('div');
        item.className = 'publication-item';

        item.innerHTML = `
            <p class="pub-authors">${pub.authors}</p>
            <h3>${pub.title}</h3>
            <p class="pub-journal">${pub.journal}</p>
            <div class="pub-meta">
                <span class="pub-meta-item">
                    <i class="fas fa-calendar"></i>
                    ${pub.year}
                </span>
                ${pub.type ? `
                    <span class="pub-meta-item">
                        <i class="fas fa-tag"></i>
                        ${capitalizeFirst(pub.type)}
                    </span>
                ` : ''}
            </div>
        `;

        container.appendChild(item);
    });

    // Hide load more during search
    const loadMoreBtn = document.getElementById('loadMorePubs');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

// ============================================
// LOAD TEACHING
// ============================================
function loadTeaching() {
    const container = document.getElementById('teachingGrid');
    if (!container || !TEACHING_COURSES) return;

    container.innerHTML = '';

    const icons = {
        'Year 1': 'fa-globe',
        'Year 2': 'fa-map',
        'Year 3': 'fa-water',
        'Year 4': 'fa-satellite',
        'Year 5': 'fa-mountain'
    };

    TEACHING_COURSES.forEach((course, index) => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.setAttribute('data-aos', 'zoom-in');
        card.setAttribute('data-aos-delay', (index % 4) * 100);

        const icon = icons[course.year] || 'fa-book';

        card.innerHTML = `
            <div class="course-icon">
                <i class="fas ${icon}"></i>
            </div>
            <h3>${course.course}</h3>
            <p class="course-level">${course.year}</p>
            ${course.code ? `<span class="course-code">${course.code}</span>` : ''}
        `;

        container.appendChild(card);
    });
}

// ============================================
// LOAD TALKS & PRESENTATIONS
// ============================================
function loadTalks() {
    if (!TALKS_DATA && !WORKSHOPS_DATA) return;

    // Combine all talks
    const allTalks = [
        ...(TALKS_DATA || []),
        ...(WORKSHOPS_DATA || []),
        ...(MEDIA_APPEARANCES || [])
    ];

    // Initialize tabs
    initTalksTabs(allTalks);

    // Display all talks initially
    displayTalks(allTalks, 'all');
}

function initTalksTabs(allTalks) {
    const tabButtons = document.querySelectorAll('.talks-tabs .tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-tab');
            displayTalks(allTalks, filter);
        });
    });
}

function displayTalks(talks, filter) {
    const container = document.getElementById('talksContainer');
    if (!container) return;

    let filtered = talks;

    if (filter !== 'all') {
        filtered = talks.filter(talk => talk.type === filter);
    }

    // Sort by year (newest first)
    filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));

    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: var(--color-gray);">
                <i class="fas fa-microphone" style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.3;"></i>
                <h3>No talks found</h3>
                <p style="margin: 0;">No presentations in this category.</p>
            </div>
        `;
        return;
    }

    filtered.forEach((talk, index) => {
        const item = document.createElement('div');
        item.className = 'talk-item';
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', (index % 3) * 100);

        item.innerHTML = `
            <span class="talk-type">${capitalizeFirst(talk.type)}</span>
            <h3>${talk.title}</h3>
            <div class="talk-details">
                <span class="talk-detail-item">
                    <i class="fas fa-calendar"></i>
                    ${talk.year}${talk.date ? ' - ' + talk.date : ''}
                </span>
                ${talk.event ? `
                    <span class="talk-detail-item">
                        <i class="fas fa-users"></i>
                        ${talk.event}
                    </span>
                ` : ''}
                ${talk.location ? `
                    <span class="talk-detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        ${talk.location}
                    </span>
                ` : ''}
                ${talk.organization ? `
                    <span class="talk-detail-item">
                        <i class="fas fa-building"></i>
                        ${talk.organization}
                    </span>
                ` : ''}
            </div>
        `;

        container.appendChild(item);
    });

    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// ============================================
// LOAD AWARDS
// ============================================
function loadAwards() {
    const container = document.getElementById('awardsGrid');
    if (!container || !AWARDS_DATA) return;

    container.innerHTML = '';

    AWARDS_DATA.forEach((award, index) => {
        const card = document.createElement('div');
        card.className = 'award-card';
        card.setAttribute('data-aos', 'zoom-in');
        card.setAttribute('data-aos-delay', (index % 3) * 100);

        card.innerHTML = `
            <div class="award-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <h3>${award.title}</h3>
            <p class="award-org">${award.organization}</p>
            <span class="award-year">${award.year}</span>
            ${award.description ? `<p class="award-description">${award.description}</p>` : ''}
        `;

        container.appendChild(card);
    });
}

// ============================================
// LOAD SUPERVISION
// ============================================
function loadSupervision() {
    if (!STUDENTS_DATA) return;

    updateSupervisionStats();
    initSupervisionTabs();
    displayStudents('all');
}

function updateSupervisionStats() {
    const phdCount = STUDENTS_DATA.filter(s => s.level === 'PhD').length;
    const mphilCount = STUDENTS_DATA.filter(s => s.level === 'MPhil').length;
    const mscCount = STUDENTS_DATA.filter(s => s.level === 'MSc').length;
    const bscCount = STUDENTS_DATA.filter(s => s.level === 'BSc' || s.level === 'BA').length;

    const phdEl = document.getElementById('phdCount');
    const mphilEl = document.getElementById('mphilCount');
    const mscEl = document.getElementById('mscCount');
    const bscEl = document.getElementById('bscCount');

    if (phdEl) phdEl.textContent = phdCount;
    if (mphilEl) mphilEl.textContent = mphilCount;
    if (mscEl) mscEl.textContent = mscCount;
    if (bscEl) bscEl.textContent = bscCount;
}

function initSupervisionTabs() {
    const tabButtons = document.querySelectorAll('.supervision-tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const level = this.getAttribute('data-level');
            displayStudents(level);
        });
    });
}

function displayStudents(level) {
    const container = document.getElementById('studentsContainer');
    if (!container) return;

    let filtered = STUDENTS_DATA;

    if (level === 'phd') {
        filtered = STUDENTS_DATA.filter(s => s.level === 'PhD' || s.level === 'MPhil');
    } else if (level === 'masters') {
        filtered = STUDENTS_DATA.filter(s => s.level === 'MSc');
    } else if (level === 'undergrad') {
        filtered = STUDENTS_DATA.filter(s => s.level === 'BSc' || s.level === 'BA');
    }

    // Sort by year (newest first)
    filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));

    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: var(--color-gray);">
                <i class="fas fa-user-graduate" style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.3;"></i>
                <h3>No students found</h3>
                <p style="margin: 0;">No students in this category.</p>
            </div>
        `;
        return;
    }

    filtered.forEach((student, index) => {
        const item = document.createElement('div');
        item.className = 'student-item';
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', (index % 3) * 100);

        item.innerHTML = `
            <h4>
                ${student.name}
                <span class="student-level">${student.level}</span>
            </h4>
            <p class="student-thesis">
                <strong>Thesis:</strong> ${student.thesis}
            </p>
            <p style="color: var(--color-gray); font-size: 0.9375rem; margin-top: 0.5rem;">
                <i class="fas fa-calendar"></i>
                ${student.year}
            </p>
            ${student.status ? `
                <div class="student-status">
                    <i class="fas fa-check-circle"></i>
                    <span>${student.status}</span>
                </div>
            ` : ''}
        `;

        container.appendChild(item);
    });

    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// ============================================
// TABS FUNCTIONALITY
// ============================================
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn[data-tab]');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const parent = this.closest('section');
            if (!parent) return;

            // Remove active from all tabs in this section
            parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

            // Add active to clicked tab
            this.classList.add('active');
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

        try {
            // Simulate sending (replace with actual API call if needed)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For static website, create mailto link
            const mailtoLink = `mailto:nurul.islam@juniv.edu?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `From: ${formData.name} (${formData.email})\n\n${formData.message}`
            )}`;

            // Show success toast
            showToast('Message Ready!', 'Your message is ready to send. Opening your email client...', 'success');

            // Open email client
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1000);

            // Reset form
            form.reset();

        } catch (error) {
            console.error('Error:', error);
            showToast('Error', 'Something went wrong. Please try again or email directly.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function initToast() {
    // Toast is initialized when needed
}

function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const toastIcon = toast.querySelector('.toast-icon i');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');

    // Update content
    toastTitle.textContent = title;
    toastMessage.textContent = message;

    // Update icon based on type
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toastIcon.className = `fas ${icons[type] || icons.success}`;

    // Update icon background color
    const iconWrapper = toast.querySelector('.toast-icon');
    const colors = {
        success: 'linear-gradient(135deg, #38A169, #22c55e)',
        error: 'linear-gradient(135deg, #E53E3E, #dc2626)',
        warning: 'linear-gradient(135deg, #D69E2E, #f59e0b)',
        info: 'linear-gradient(135deg, #3182CE, #2563eb)'
    };

    iconWrapper.style.background = colors[type] || colors.success;

    // Show toast
    toast.classList.add('show');

    // Auto hide after 5 seconds
    setTimeout(() => {
        closeToast();
    }, 5000);
}

function closeToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('show');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c🎓 Dr. Md. Nurul Islam', 'color: #0F4C81; font-size: 24px; font-weight: bold;');
console.log('%cProfessor of Geography and Environment', 'color: #00838F; font-size: 16px;');
console.log('%cJahangirnagar University, Bangladesh', 'color: #4A5568; font-size: 14px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #E2E8F0;');
console.log('%c✨ Website Features:', 'color: #38A169; font-size: 14px; font-weight: bold;');
console.log('  • 52+ Publications');
console.log('  • 15+ Research Projects');
console.log('  • 30+ Students Supervised');
console.log('  • Professional CV Download');
console.log('  • Advanced Animations');
console.log('  • Fully Responsive Design');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #E2E8F0;');

console.log('%c✅ main.js loaded successfully', 'color: #38A169; font-size: 12px; font-weight: bold;');