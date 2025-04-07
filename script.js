document.addEventListener('DOMContentLoaded', function() {
    // Aktuális dátum és idő a láblécben
    function updateDateTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        };
        document.getElementById('datetime').textContent = now.toLocaleDateString('hu-HU', options);
        
        // Aktuális év
        document.getElementById('current-year').textContent = now.getFullYear();
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Görgetés esetén fejléc animáció
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobil menü
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Menü linkek kattintására bezáródik a mobil menü
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Sima görgetés a menüpontokhoz
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Skill progress bar animáció
    const skillBars = document.querySelectorAll('.progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Student Helper letöltés gomb
    const downloadBtn = document.getElementById('download-btn');
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Itt lehetne valós letöltési logika
        alert('A Student Helper alkalmazás letöltése elkezdődött!');
        
        // Animáció a letöltéshez
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Letöltés folyamatban...';
        
        setTimeout(() => {
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Letöltés kész!';
            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Letöltés (Ingyenes)';
            }, 2000);
        }, 3000);
    });
    
    // Önéletrajz letöltés
    const resumeDownload = document.getElementById('resume-download');
    
    resumeDownload.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Az önéletrajz letöltése elkezdődött!');
    });
    
    // Vélemény űrlap kezelése
    const reviewForm = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviewList');
    const noReviews = document.querySelector('.no-reviews');

    // Betöltjük a mentett véleményeket az oldal betöltésekor
    function loadReviews() {
        const savedReviews = localStorage.getItem('portfolioReviews');
        if (savedReviews) {
            const reviews = JSON.parse(savedReviews);
            reviews.forEach(review => {
                displayReview(review.name, review.text, review.rating, review.date);
            });
        }
    }

    // Vélemény megjelenítése
    function displayReview(name, text, rating, date) {
        if (noReviews) {
            noReviews.style.display = 'none';
        }
        
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        // Csillagok generálása
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        reviewCard.innerHTML = `
            <div class="review-header">
                <span class="review-author">${name}</span>
                <span class="review-date">${new Date(date).toLocaleDateString('hu-HU')}</span>
            </div>
            <div class="review-stars">${stars}</div>
            <p class="review-text">${text}</p>
        `;
        
        reviewList.insertBefore(reviewCard, reviewList.firstChild);
        reviewCard.style.opacity = '0';
        setTimeout(() => {
            reviewCard.style.opacity = '1';
        }, 10);
    }

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewer-name').value;
        const text = document.getElementById('review-text').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;
        const date = new Date().toISOString();
        
        // Létrehozunk egy review objektumot
        const review = {
            name,
            text,
            rating: parseInt(rating),
            date
        };
        
        // Betöltjük a meglévő véleményeket
        let savedReviews = localStorage.getItem('portfolioReviews');
        let reviews = [];
        
        if (savedReviews) {
            reviews = JSON.parse(savedReviews);
        }
        
        // Hozzáadjuk az új véleményt
        reviews.push(review);
        
        // Elmentjük a localStorage-ba
        localStorage.setItem('portfolioReviews', JSON.stringify(reviews));
        
        // Megjelenítjük az új véleményt
        displayReview(name, text, rating, date);
        
        // Űrlap reset
        reviewForm.reset();
        
        // Sikeres küldés visszajelzés
        const submitBtn = reviewForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Köszönjük!';
        setTimeout(() => {
            submitBtn.innerHTML = 'Küldés';
        }, 2000);
    });

    // Betöltjük a véleményeket az oldal betöltésekor
    loadReviews();

    // Kapcsolat űrlap kezelése
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Itt lehetne valós küldési logika
        alert(`Köszönjük az üzenetet, ${name}! Hamarosan válaszolunk.`);
        contactForm.reset();
    });
    
    // Animációk indítása
    animateSkillBars();
    
    // Intersection Observer animációkhoz
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});