document.addEventListener('DOMContentLoaded', () => {
    // Options for the Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Create the observer
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Unobserve once animated
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // List of selectors to animate
    const animatedSelectors = [
        '.section-title',
        '.problem-solution-flow', '.flow-item', '.flow-connector',
        '.our-vision-section', '.vision-content', '.vision-graphic',
        '.how-it-works', '.step-item', '.step-connector',
        '.program-card',
        '.gallery-grid img',
        '.contact-form-section', '.contact-form', '.contact-info'
    ];

    // Observe all elements
    animatedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    });

    // Smooth scroll for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
