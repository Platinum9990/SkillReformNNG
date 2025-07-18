document.addEventListener('DOMContentLoaded', () => {

    document.body.classList.add('js-animations-enabled');

    // --- 1. GLOBAL LOGIC (Runs on Every Page) ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- 2. PAGE-SPECIFIC LOGIC ---
    const trainingSection = document.querySelector('.trainings-section');
    if (trainingSection) {
        // a) Live Search Filter
        const searchInput = document.querySelector('.search-bar input');
        const trainingGrid = document.querySelector('.trainings-grid');
        const noResultsMessage = document.getElementById('no-results');
        const pagination = document.querySelector('.pagination'); // Get pagination element

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

                // Logic to hide/show pagination based on search
                if (pagination) {
                    pagination.style.display = searchTerm.length > 0 ? 'none' : 'flex';
                }
            });
        }
        
        // b) Animate Training Cards and Section Title
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const elementsToAnimate = trainingSection.querySelectorAll('.training-card, .section-title');
        elementsToAnimate.forEach(el => observer.observe(el));
    }
});
