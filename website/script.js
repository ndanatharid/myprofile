document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. SPLASH SCREEN LOGIC
    // =========================================
    const splash = document.getElementById('splash-screen');
    
    window.addEventListener('load', () => {
        // Tampilkan splash screen minimal selama 2 detik
        setTimeout(() => {
            splash.style.opacity = '0';
            splash.style.visibility = 'hidden';
            // Izinkan scroll body setelah splash hilang
            document.body.style.overflow = 'auto';
        }, 2000);
    });

    // =========================================
    // 2. THEME TOGGLE LOGIC (DARK/LIGHT)
    // =========================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const modeText = document.querySelector('.mode-text');

    // Cek preferensi tema yang tersimpan di browser
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Inisialisasi tema saat halaman dimuat
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update teks tombol
        if (theme === 'dark') {
            modeText.textContent = 'Light Mode';
            body.classList.add('dark');
        } else {
            modeText.textContent = 'Dark Mode';
            body.classList.remove('dark');
        }
    }

    // =========================================
    // 3. MODAL ZOOM LOGIC
    // =========================================
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imgFull');
    const closeBtn = document.querySelector('.close-modal');
    const zoomableImages = document.querySelectorAll('.zoomable');

    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            // Gunakan display flex agar centering di CSS bekerja
            modal.style.display = 'flex'; 
            modalImg.src = img.src;
            
            // Tambahkan class active untuk memicu animasi transisi
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        // Tunggu animasi selesai baru hilangkan display
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    // Tutup modal jika klik di area luar gambar (overlay)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Tutup modal dengan tombol Escape di keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // =========================================
    // 4. BACK BUTTON LOGIC
    // =========================================
    const backBtn = document.getElementById('backBtn');

    backBtn.addEventListener('click', () => {
        // Jika ada riwayat halaman sebelumnya, kembali ke sana
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Jika tidak ada riwayat (buka langsung dari link), 
            // arahkan ke halaman utama buatanmu
            window.location.href = 'index.html'; 
        }
    });
});
