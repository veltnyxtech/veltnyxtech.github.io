// Add smooth scrolling to links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animation setup function
function initAnimations() {
    const animationElements = document.querySelectorAll('.service-card, .about-text');
    animationElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });
}

// Theme Toggle initialization function
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Function to set toggle icons based on current theme class
    function updateThemeIcons() {
        const isLightTheme = document.documentElement.classList.contains('light-theme');
        if (isLightTheme) {
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        } else {
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
        }
    }

    // Initialize icons state
    if (themeToggleBtn) {
        updateThemeIcons();

        // Add event listener to toggle theme on click
        themeToggleBtn.addEventListener('click', () => {
            const isLightTheme = document.documentElement.classList.contains('light-theme');
            if (isLightTheme) {
                document.documentElement.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
            updateThemeIcons();
        });
    }
}

// Ensure execution even if script is loaded after DOMContentLoaded has fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initAnimations();
        initThemeToggle();
    });
} else {
    initAnimations();
    initThemeToggle();
}
