document.addEventListener('DOMContentLoaded', () => {

    // Safely enable CSS animations by adding a class to the body
    document.body.classList.add('js-animations-enabled');

    // --- 1. GLOBAL LOGIC (Runs on Every Page) ---

    // A. Hamburger Menu for Homepage, About, Contact pages (the new navbar)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // B. Hamburger Menu for the old Training page layout
    const oldHamburger = document.getElementById('hamburger');
    const oldNavMenu = document.getElementById('nav-menu');

    if (oldHamburger && oldNavMenu) {
        oldHamburger.addEventListener('click', () => {
            oldNavMenu.classList.toggle('active');
            const isExpanded = oldNavMenu.classList.contains('active');
            oldHamburger.setAttribute('aria-expanded', isExpanded);
        });
    }

    // C. Global Intersection Observer for animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });


    // --- 2. PAGE-SPECIFIC LOGIC ---

    // A. Animate elements on the HOMEPAGE
    const homePageSections = document.querySelector('.problem, .our-vision-section, .trainings, .gallery');
    if (homePageSections) {
        const elementsToAnimate = document.querySelectorAll(
            '.problem-solution-flow, .flow-item, .flow-connector, .our-vision-section, .vision-content, .vision-graphic, .how-it-works, .step-item, .step-connector, .featured-programs, .program-card, .gallery-grid, .gallery-grid img'
        );
        elementsToAnimate.forEach(el => observer.observe(el));
    }

    // B. Logic for the TRAINING PAGE (with Search Filter)
    const trainingSection = document.querySelector('.trainings-section');
    if (trainingSection) {
        // a) Live Search Filter
        const searchInput = trainingSection.querySelector('.search-bar input');
        const trainingGrid = trainingSection.querySelector('.trainings-grid');
        const noResultsMessage = trainingSection.querySelector('#no-results');
        const pagination = trainingSection.querySelector('.pagination');

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
                
                if (pagination) {
                    pagination.style.display = searchTerm.length > 0 ? 'none' : 'flex';
                }
            });
        }
        
        // b) Animate Training Page Cards
        const elementsToAnimate = trainingSection.querySelectorAll('.training-card, .section-title');
        elementsToAnimate.forEach(el => observer.observe(el));
    }
});
