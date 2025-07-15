document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll(
        '.section-title, ' +
        '.problem-solution-flow, .flow-item, .flow-arrow, ' +
        '.program-card, ' +
        '.gallery-grid img'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Optional: Smooth scroll for internal links (e.g., "Explore Trainings" button)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});