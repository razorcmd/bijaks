// Pastikan DOM sudah sepenuhnya dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {

    // --- JavaScript untuk FAQ Accordion ---
    document.querySelectorAll('.faq-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling; // Konten FAQ
            const icon = button.querySelector('.faq-icon'); // Icon + atau -

            // Toggle class 'hidden' untuk menyembunyikan/menampilkan konten
            content.classList.toggle('hidden');

            // Mengubah icon + menjadi - atau sebaliknya
            if (content.classList.contains('hidden')) {
                icon.textContent = '+';
                // Jika disembunyikan, hapus class 'open' untuk transisi
                content.classList.remove('open');
            } else {
                icon.textContent = '-';
                // Jika ditampilkan, tambahkan class 'open' untuk transisi
                content.classList.add('open');
            }
            // Optional: Toggle 'active' class pada tombol untuk styling icon (misal: rotate)
            button.classList.toggle('active');
        });
    });


    // --- JavaScript untuk Mobile Navigation Toggle (Hamburger Menu) ---
    const mobileMenuButton = document.querySelector('.mobile-menu-button'); // Tombol hamburger
    const navLinks = document.querySelector('.nav-links'); // Container link navigasi

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('hidden'); // Menambah/menghapus class 'hidden'
            navLinks.classList.toggle('flex'); // Menambah/menghapus class 'flex' untuk display
            // Anda bisa tambahkan class untuk transisi seperti 'transition-all duration-300 ease-in-out' ke nav-links di HTML
        });
    }

    // --- Contoh JavaScript lain (opsional, bisa Anda tambahkan) ---
    // Smooth scrolling untuk navigasi internal (jika diklik link #id)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

}); // Akhir dari DOMContentLoaded