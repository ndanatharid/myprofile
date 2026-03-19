// ================= THEME TOGGLE =================
const toggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = toggle.querySelector("i");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
    icon.classList.replace("fa-moon", "fa-sun");
} else {
    body.classList.remove("dark");
    icon.classList.replace("fa-sun", "fa-moon");
}

toggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        localStorage.setItem("theme", "light");
        icon.classList.replace("fa-sun", "fa-moon");
    }
});


// ================= CARD ANIMATION =================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.portfolio-card');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});


// ================= PROGRESS BAR =================
document.addEventListener('DOMContentLoaded', () => {
    const progressFills = document.querySelectorAll('.progress-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0%';

                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressFills.forEach(fill => observer.observe(fill));
});


// ================= COUNT UP =================
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = +element.getAttribute('data-target');
        const count = +element.innerText;
        const speed = 100;
        
        const inc = target / speed;

        if (count < target) {
            element.innerText = Math.ceil(count + inc);
            setTimeout(() => countUp(element), 20);
        } else {
            element.innerText = target + "+";
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
});


// ================= DOWNLOAD BUTTON =================
document.getElementById('downloadBtn').addEventListener('click', function() {
    const btn = this;
    const originalText = btn.innerText;
    
    btn.innerText = "Downloading...";
    btn.style.opacity = "0.7";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.opacity = "1";
    }, 2000);
});


// ================= SPLASH SCREEN =================
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    const splashDuration = 2500; 

    setTimeout(() => {
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
        mainContent.classList.add('visible');
    }, splashDuration);
});


// ================= COPYRIGHT =================
document.addEventListener('DOMContentLoaded', () => {
    const copyrightYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright-info p');
});