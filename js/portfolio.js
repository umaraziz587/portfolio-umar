// JavaScript Documentdocument.addEventListener('DOMContentLoaded', () => {
    // Functionality for back-to-top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling down 300px
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for sidebar navigation
    document.querySelectorAll('.sidebar nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Remove active class from all and add to the clicked one
            document.querySelectorAll('.sidebar nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Set initial active link on page load
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Percentage of target element visible in the viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // Image fullscreen overlay functionality
    const fullscreenOverlay = document.getElementById('fullscreenOverlay');
    const fullscreenImage = document.getElementById('fullscreenImage');

    document.querySelectorAll('.portfolio-card img, .portfolio-thumb img').forEach(img => {
        img.addEventListener('click', function() {
            fullscreenImage.src = this.src;
            fullscreenOverlay.style.display = 'flex';
        });
    });

    if (fullscreenOverlay) {
        fullscreenOverlay.addEventListener('click', function() {
            this.style.display = 'none';
        });
    }


    // Skill popup functionality
    const skillPopupOverlay = document.getElementById('skillPopupOverlay');
    const skillPopupContent = document.getElementById('skillPopupContent');
    const skillPopupTitle = document.getElementById('skillPopupTitle');
    const skillPopupDescription = document.getElementById('skillPopupDescription');
    const skillPopupCloseBtn = document.getElementById('skillPopupCloseBtn');

    document.querySelectorAll('.skill').forEach(skill => {
        skill.addEventListener('click', function() {
            const title = this.querySelector('.skill-name').textContent;
            const description = this.getAttribute('data-description') || 'No description available.';
            
            skillPopupTitle.textContent = title;
            skillPopupDescription.textContent = description;
            skillPopupOverlay.style.display = 'flex';
        });
    });

    if (skillPopupCloseBtn) {
        skillPopupCloseBtn.addEventListener('click', () => {
            skillPopupOverlay.style.display = 'none';
        });
    }

    if (skillPopupOverlay) {
        skillPopupOverlay.addEventListener('click', (e) => {
            if (e.target === skillPopupOverlay) {
                skillPopupOverlay.style.display = 'none';
            }
        });
    }


    // Video expansion functionality for portfolio cards
    document.querySelectorAll('.portfolio-card video').forEach(video => {
        video.addEventListener('click', function() {
            // Toggle 'expanded' class on click
            this.classList.toggle('expanded');
            // If expanded, play video, else pause
            if (this.classList.contains('expanded')) {
                this.play();
            } else {
                this.pause();
            }
        });

        // Optional: Pause video if clicked outside when expanded
        document.addEventListener('click', (e) => {
            if (e.target !== video && video.classList.contains('expanded') && !e.target.closest('.portfolio-card')) {
                video.classList.remove('expanded');
                video.pause();
            }
        });
    });


    // ** NEW SLIDER NAVIGATION JAVASCRIPT **
    const slider = document.querySelector('.mobile-photos-slider');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');

    if (slider && prevButton && nextButton) {
        const scrollAmount = slider.clientWidth * 0.8; // Scroll 80% of the slider's visible width

        nextButton.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevButton.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Optional: Hide/show buttons if at start/end of scroll
        const updateButtonVisibility = () => {
            // Hide prev button if at the very beginning
            if (slider.scrollLeft <= 0) {
                prevButton.style.display = 'none';
            } else {
                prevButton.style.display = 'block';
            }

            // Hide next button if at the very end (allow for a small tolerance)
            // scrollWidth is the total scrollable width, clientWidth is the visible width
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) { // -1 for a small tolerance
                nextButton.style.display = 'none';
            } else {
                nextButton.style.display = 'block';
            }
        };

        // Initial check when page loads
        updateButtonVisibility();

        // Update visibility whenever the slider is scrolled
        slider.addEventListener('scroll', updateButtonVisibility);
    }
});