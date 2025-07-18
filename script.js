document.addEventListener('DOMContentLoaded', () => {

    // Add this class to the body to safely enable CSS animations
    document.body.classList.add('js-animations-enabled');

    // --- 1. GLOBAL LOGIC (Runs on Every Page) ---

    // Accessible Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Smooth Scroll for on-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Global Intersection Observer for animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });


    // --- 2. PAGE-SPECIFIC LOGIC ---

    // A. Logic for the TRAINING PAGE
    const trainingSection = document.querySelector('.trainings-section');
    if (trainingSection) {
        // a) Live Search Filter
        const searchInput = document.querySelector('.search-bar input');
        const trainingGrid = document.querySelector('.trainings-grid');
        const noResultsMessage = document.getElementById('no-results');

        if (searchInput && trainingGrid) {
            const trainingCards = Array.from(trainingGrid.children);
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                let visibleCards = 0;
                trainingCards.forEach(card => {
                    if (card.classList.contains('training-card')) {
                        const cardText = card.textContent.toLowerCase();
                        const isVisible = cardText.includes(searchTerm);
                        card.hidden = !isVisible;
                        if (isVisible) visibleCards++;
                    }
                });
                if (noResultsMessage) {
                    noResultsMessage.style.display = visibleCards === 0 ? 'block' : 'none';
                }
            });
        }
        
        // b) Animate Training Cards and Section Title
        const elementsToAnimate = trainingSection.querySelectorAll('.training-card, .section-title');
        elementsToAnimate.forEach(el => observer.observe(el));
    }


    // B. Logic for the HOMEPAGE or OTHER PAGES
    const otherAnimatedSections = document.querySelector('.problem-solution-flow, .our-vision-section');
    if (otherAnimatedSections) {
        const elementsToAnimate = document.querySelectorAll(
            '.problem-solution-flow, .flow-item, .our-vision-section, .vision-content, .program-card'
        );
        elementsToAnimate.forEach(el => observer.observe(el));
    }

});
