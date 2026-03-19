document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Splash Screen Logic ---
    const splash = document.getElementById('splash-screen');
    
    // Menghilangkan splash screen setelah semua aset (gambar) terload
    window.addEventListener('load', () => {
        setTimeout(() => {
            splash.style.opacity = '0';
            splash.style.visibility = 'hidden';
            // Berikan waktu transisi CSS selesai sebelum benar-benar dihapus dari layout
            setTimeout(() => splash.style.display = 'none', 600);
        }, 1500); // Tampilkan selama 1.5 detik
    });

    // --- 2. Modal Zoom Logic ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imgFull');
    const closeBtn = document.querySelector('.close-modal');
    const body = document.body;

    const openModal = (src) => {
        modal.style.display = 'flex';
        modalImg.src = src;
        
        // Lock scroll agar halaman belakang tidak bergerak saat modal aktif
        body.style.overflow = 'hidden';

        // Delay kecil agar transisi opacity & scale di CSS terpicu
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    };

    const closeModal = () => {
        modal.classList.remove('active');
        body.style.overflow = 'auto'; // Unlock scroll
        
        // Tunggu transisi selesai sebelum menyembunyikan element
        setTimeout(() => {
            modal.style.display = 'none';
            modalImg.src = ''; // Bersihkan src untuk memori
        }, 300);
    };

    // Event listener untuk setiap gambar di galeri
    document.querySelectorAll('.zoomable').forEach(img => {
        img.addEventListener('click', () => openModal(img.src));
    });

    // Tutup modal klik tombol X
    closeBtn.addEventListener('click', closeModal);

    // Tutup modal klik area luar gambar (overlay)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- 3. Theme Toggle Logic ---
    const themeToggle = document.getElementById('themeToggle');
    const modeText = document.querySelector('.mode-text');

    // Cek preferensi user yang tersimpan di browser
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Simpan pilihan user
        updateThemeUI(newTheme);
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            body.classList.add('dark');
            modeText.textContent = 'Light Mode';
        } else {
            body.classList.remove('dark');
            modeText.textContent = 'Dark Mode';
        }
    }

    // --- 4. Back Button Logic ---
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', () => {
        // Jika ada history, balik ke halaman sebelumnya
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Jika tidak ada (misal buka link langsung), arahkan ke home atau portfolio utama
            window.location.href = '../index.html'; 
        }
    });
});
