document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.md\\:hidden.nav-links');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex'); // Tailwind class to display as flex container
        });
    }

    // --- FAQ Accordion ---
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isOpen = content.classList.contains('open');

            // Optional: Close all other open FAQs
            document.querySelectorAll('.faq-content.open').forEach(openContent => {
                if (openContent !== content) {
                    openContent.classList.remove('open');
                    openContent.previousElementSibling.classList.remove('active');
                }
            });

            // Toggle the clicked FAQ
            toggle.classList.toggle('active', !isOpen);
            content.classList.toggle('open', !isOpen);
        });
    });

    // --- Service Card Hover Effect ---
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // Set CSS custom properties for the radial gradient position
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu on click
                if (mobileMenu && mobileMenu.classList.contains('flex')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});