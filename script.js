document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Loader Logic
    const loader = document.getElementById('loader');
    if (loader) {
        // Hide loader after window load (simulated with timeout for smoothness)
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 500);
    }

    // 1. Dynamic Year for Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navbar Active State on Click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });

        // Mobile Menu Collapse Optimization
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: true});
                bsCollapse.hide();
            }
        });
    });

    console.log('HumaniLens script loaded successfully.');

    // 3. Fade-in Animation on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 4. Animated Counters (DIASS)
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // Animation duration in ms
                const increment = target / (duration / 16); // Approx 60fps

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 5. Trends Toggle Logic
    const trendToggle = document.getElementById('trendToggle');
    if (trendToggle) {
        trendToggle.addEventListener('change', function() {
            const isChecked = this.checked;
            const trendContent = document.getElementById('trend-content');
            const fadContent = document.getElementById('fad-content');
            
            if (isChecked) {
                // Show Examples
                trendContent.innerHTML = '<h4 class="fw-bold text-success mb-3">Example: Denim Jeans</h4><p>A classic fashion staple that has remained popular for decades, evolving in style but never disappearing. It meets a sustained need for durable clothing.</p>';
                fadContent.innerHTML = '<h4 class="fw-bold text-danger mb-3">Example: Fidget Spinners</h4><p>Exploded in popularity in 2017 and disappeared almost as quickly as they arrived. It was a novelty item with no long-term utility.</p>';
            } else {
                // Show Definitions
                trendContent.innerHTML = '<h4 class="fw-bold text-success mb-3">Trend</h4><p>A pattern of gradual change in a condition, output, or process, or an average or general tendency of a series of data points to move in a certain direction over time.</p>';
                fadContent.innerHTML = '<h4 class="fw-bold text-danger mb-3">Fad</h4><p>An intense and widely shared enthusiasm for something, especially one that is short-lived and without a basis in the object\'s qualities.</p>';
            }
        });
    }

    // 6. Scroll Progress & Back to Top
    const progressBar = document.getElementById('myBar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Progress Bar
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        }

        // Back to Top Button
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});