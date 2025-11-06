// Data Gombalan: Kelompokkan berdasarkan kata kunci sederhana
const gombalanData = {
    // Kategori "bete"
    bete: [
        "Kenapa kamu bete, Sayang? Aku janji bakal jadi badut pribadimu hari ini biar senyummu balik lagi.",
        "Marah-marah aja tetep lucu, apalagi kalau senyum. Jangan bete lama-lama ya, nanti aku kangen manisnya senyummu.",
        "Aku tahu kamu bete, tapi kamu tahu gak? Bete-nya kamu itu kayak magnet, bikin aku makin tertarik buat hibur kamu.",
        "Kamu seperti matahari, walau lagi 'mendung' (bete), cahayanya (cinta) tetap menerangi hariku. Maafin aku ya.",
        "Stop betenya dong! Aku mau ngajak kamu lari, tapi bukan lari dari masalah, tapi lari ke pelukan aku."
    ],
    // Kategori "kerja" atau "semangat"
    kerja: [
        "Semangat kerjanya, Sayang! Ingat, secangkir kopi aja kalah manis sama semangat dan senyum kamu hari ini.",
        "Aku tahu kamu lagi sibuk, tapi jangan lupa istirahat, ya. Kamu itu 'proyek' paling berharga di hidupku.",
        "Walaupun kita jauh, semangat kerjamu itu kayak sinyal 5G, kenceng banget. Aku selalu dukung kamu!",
        "Fokus kerjanya! Biar cepet kelar, terus kita bisa 'meeting' romantis bareng. Love you!"
    ],
    // Kategori "kangen"
    kangen: [
        "Kalau rindu dihitung pakai kilometer, mungkin aku udah keliling bumi berkali-kali. Cepet ketemu, yuk?",
        "Kamu tahu gak bedanya kamu sama bulan? Kalau bulan jauh, kalau kamu... juga jauh. Makanya aku kangen banget!",
        "Aku rela jadi tukang pos, asalkan yang aku kirim dan terima cuma surat cinta dari kamu setiap hari.",
        "Kangen itu kayak hujan, datang tiba-tiba. Kalau kamu, datangnya di hatiku dan gak pernah pergi."
    ],
    // Gombalan Umum (Jika kata kunci tidak ditemukan)
    umum: [
        "Aku rela ikut lomba lari keliling dunia, asalkan engkau yang menjadi garis finishnya.",
        "Kamu itu seperti garam di lautan, tidak terlihat namun akan selalu ada untuk selamanya.",
        "Meskipun hari ini hujan, di hatiku selalu ada pelangi karena kamu selalu ada disana.",
        "Aku ingin seperti sendok dan garpu, selalu berdampingan di setiap waktu makan, eh, maksudnya di setiap waktu hidupku.",
        "Aku nggak perlu wanita yang sempurna, tapi aku butuh kamu yang selalu menyempurnakan hari-hariku."
    ]
};

// --- DOM Elements ---
const permintaanTextarea = document.getElementById('permintaan');
const buatGombalanBtn = document.getElementById('buatGombalanBtn');
const hasilGombalanDiv = document.getElementById('hasilGombalan');
const salinGombalanBtn = document.getElementById('salinGombalanBtn');

// --- Fungsi Utama ---
function generateGombalan() {
    const permintaan = permintaanTextarea.value.toLowerCase().trim();
    let selectedCategory = 'umum';

    if (!permintaan) {
        hasilGombalanDiv.innerHTML = '<p class="placeholder-text">Mohon masukkan permintaanmu dulu ya, Sayang!</p>';
        salinGombalanBtn.style.display = 'none';
        return;
    }

    // Logika Pemilihan Kategori Sederhana (Kata Kunci)
    if (permintaan.includes('bete') || permintaan.includes('marah') || permintaan.includes('ngambek')) {
        selectedCategory = 'bete';
    } else if (permintaan.includes('kerja') || permintaan.includes('semangat') || permintaan.includes('sibuk')) {
        selectedCategory = 'kerja';
    } else if (permintaan.includes('kangen') || permintaan.includes('rindu') || permintaan.includes('jauh')) {
        selectedCategory = 'kangen';
    }

    // Ambil gombalan acak dari kategori yang dipilih
    const gombalanList = gombalanData[selectedCategory];
    const randomIndex = Math.floor(Math.random() * gombalanList.length);
    const gombalan = gombalanList[randomIndex];

    // Tampilkan Hasil
    hasilGombalanDiv.innerHTML = `<p class="gombalan-text">${gombalan}</p>`;
    salinGombalanBtn.style.display = 'inline-block';

    // Efek Konfeti (Interaktif/Unik)
    triggerConfetti();
}

// Fungsi Konfeti (Diambil dari CDN)
function triggerConfetti() {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    confetti({
        ...defaults,
        particleCount: 100,
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.7, 0.9) },
        colors: ['#FF69B4', '#9370DB', '#FFFFFF']
    });

    confetti({
        ...defaults,
        particleCount: 100,
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.7, 0.9) },
        colors: ['#FF69B4', '#9370DB', '#FFFFFF']
    });
}

// Fungsi Salin
function salinGombalan() {
    const gombalanText = hasilGombalanDiv.querySelector('.gombalan-text').textContent;
    
    navigator.clipboard.writeText(gombalanText).then(() => {
        salinGombalanBtn.textContent = 'Tersalin! ✅';
        salinGombalanBtn.disabled = true;

        setTimeout(() => {
            salinGombalanBtn.textContent = 'Salin Gombalan';
            salinGombalanBtn.disabled = false;
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
        alert('Gagal menyalin teks. Silakan salin manual.');
    });
}

// --- Event Listeners ---
buatGombalanBtn.addEventListener('click', generateGombalan);
salinGombalanBtn.addEventListener('click', salinGombalan);