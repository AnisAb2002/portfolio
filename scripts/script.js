/* ============================================================
   Portfolio — script.js
   ============================================================ */

// ── Mobile menu ──────────────────────────────────────────────
const menuToggle = document.getElementById('menu-toggle');
const navbar     = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('open');
});

// Close menu on link click
navbar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navbar.classList.remove('open');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navbar.contains(e.target)) {
        menuToggle.classList.remove('active');
        navbar.classList.remove('open');
    }
});


// ── Header shrink on scroll ───────────────────────────────────
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });


// ── Scroll reveal ─────────────────────────────────────────────
const revealElements = document.querySelectorAll(
    '.info-card, .skill-category, .projet-card, .contact-link, .apropos-grid > *, .lang-pill'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings in the same parent
                const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));


// ── Active nav link on scroll ─────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active-nav',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            }
        });
    },
    { threshold: 0.35 }
);

sections.forEach(section => sectionObserver.observe(section));


// ── Smooth anchor scroll (extra safety for older browsers) ────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// ── Terminal typing animation ─────────────────────────────────
const terminalLines = document.querySelectorAll('.terminal-body p');
let delay = 0;

terminalLines.forEach(line => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
        line.style.opacity = '1';
    }, delay += 350);
});


// ── Subtle cursor glow on hero (desktop only) ─────────────────
if (window.matchMedia('(pointer: fine)').matches) {
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        document.querySelector('.hero').addEventListener('mousemove', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(2);
            const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(2);
            heroBg.style.background =
                `radial-gradient(600px circle at ${x}% ${y}%, rgba(77,255,171,0.04), transparent 70%)`;
        });

        document.querySelector('.hero').addEventListener('mouseleave', () => {
            heroBg.style.background = '';
        });
    }
}
