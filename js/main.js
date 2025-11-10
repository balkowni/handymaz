document.addEventListener('DOMContentLoaded', function () {
    // LIGHTBOX for project images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const btnClose = document.getElementById('lightboxClose');
    const btnPrev = document.getElementById('lightboxPrev');
    const btnNext = document.getElementById('lightboxNext');
    const galleryImages = Array.from(document.querySelectorAll('.carousel-track img'));
    let currentIndex = 0;

    function openLightbox(index) {
        if (!lightbox) return;
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    function showRelative(delta) {
        if (!galleryImages.length) return;
        currentIndex = (currentIndex + delta + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    }

    galleryImages.forEach((img, idx) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(idx));
    });

    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    if (btnPrev) btnPrev.addEventListener('click', () => showRelative(-1));
    if (btnNext) btnNext.addEventListener('click', () => showRelative(1));

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showRelative(-1);
        if (e.key === 'ArrowRight') showRelative(1);
    });
});
