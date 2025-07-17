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
                // Ensure correct sections unobserve so they don't re-animate
                // This checks for top-level section containers or specific single elements
                if (entry.target.matches('.section-title, .problem-solution-flow, .gallery-grid, .our-vision-section, .how-it-works, .contact-form-section')) {
                    observer.unobserve(entry.target);
                } else if (entry.target.matches('.flow-item, .flow-connector, .vision-content, .vision-graphic, .step-item, .step-connector, .program-card, .gallery-grid img, .contact-form, .contact-info')) {
                    // These are individual elements that might be animated and should also unobserve
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Elements to animate on scroll (Includes all sections and elements from homepage and contact page)
    const elementsToAnimate = document.querySelectorAll(
        '.section-title, ' +
        '.problem-solution-flow, .flow-item, .flow-connector, ' +
        '.our-vision-section, .vision-content, .vision-graphic, ' +
        '.how-it-works, .step-item, .step-connector, ' +
        '.program-card, ' +
        '.gallery-grid img, ' +
        '.contact-form-section, .contact-form, .contact-info'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Optional: Smooth scroll for internal links (e.g., "Explore Trainings" button)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href'); // Get the ID from the href (e.g., '#trainings')
            const targetElement = document.querySelector(targetId); // Find the element with that ID

            if (targetElement) { // If the element exists on the current page
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Scroll smoothly to it
                });
            }
        });
    });
});