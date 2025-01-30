const axios = require('axios');

const autoResponses = {
    "hai": "Halo! Ada yang bisa saya bantu? 😊",
    "halo": "Halo! 😊",
    "hi": "Hi there! 👋",
    "ping": "Pong! 🏓",
    "apa kabar": "Saya baik, terima kasih! 😊 Bagaimana dengan Anda?",
    "selamat pagi": "Selamat pagi! Semoga hari Anda menyenankan!",
    "selamat siang": "Selamat siang! Ada yang bisa saya bantu?",
    "selamat malam": "Selamat malam! Semoga tidur Anda nyenyak!",
    "terima kasih": "Sama-sama! 😊",
    "sama-sama": "Senang bisa membantu!",
    "apa itu?": "Bisa lebih spesifik? Saya bisa bantu jawab pertanyaanmu!",
    "berapa umurmu?": "Saya adalah bot, jadi saya tidak memiliki umur. Tapi saya selalu siap membantu!",
    "siapa kamu?": "Saya adalah bot yang bisa membantu menjawab pertanyaan dan melakukan berbagai tugas. 😊",
    "bot": "Ya, saya adalah bot! Ada yang bisa saya bantu?",
    "bagaimana kabarmu?": "Saya baik-baik saja, terima kasih sudah bertanya!",
    "bisa bantu apa?": "Saya bisa membantu dengan berbagai hal! Coba tanya saja, saya siap membantu.",
    "terima kasih banyak": "Sama-sama! Senang bisa membantu.",
    "apa yang bisa kamu lakukan?": "Saya bisa membantu menjawab pertanyaan, mengirim gambar, terjemahan, dan banyak lagi!",
    "apakah kamu pintar?": "Saya dilatih dengan banyak informasi! Saya bisa membantu dengan berbagai hal, meski tidak sempurna. 😄",
    "tolong": "Tentu! Apa yang bisa saya bantu?",
    "iya": "Oke, saya siap membantu!",
    "tidak": "Baiklah, jika Anda butuh bantuan lain, beri tahu saya.",
    "kamu siapa?": "Saya adalah asisten virtual yang bisa membantu Anda dengan berbagai hal!",
    "senang bertemu denganmu": "Senang bertemu dengan Anda juga! 😊",
    "siapa yang menciptakanmu?": "Saya dikembangkan oleh tim yang luar biasa. Kami bekerja keras untuk memberikan layanan terbaik!",
    "bisa bikin stiker?": "Tentu! Kirim gambar yang ingin dijadikan stiker, dan saya akan bantu membuatnya.",
    "buatkan stiker": "Tentu! Kirim gambarnya ya.",
    "cari gambar": "Apa yang ingin Anda cari? Saya bisa membantu mencari gambar untuk Anda.",
    "gambar": "Apa gambar yang Anda butuhkan? Kirim deskripsi atau pilih file.",
    "video": "Video apa yang Anda butuhkan? Bisa dari TikTok, Instagram, atau YouTube!",
    "download video": "Tentu! Kirim tautan video dan saya akan bantu mengunduhnya.",
    "cari video": "Video apa yang Anda cari? Saya bisa membantu mencarikannya!",
    "terjemahkan": "Apa yang ingin Anda terjemahkan? Kirimkan teks atau gambar!",
    "game": "Mau main game? Pilih game yang kamu suka!",
    "bisa bermain game?": "Tentu! Ada banyak game seru yang bisa kita mainkan!",
    "apa yang terjadi?": "Tidak ada yang aneh kok! Ada yang bisa saya bantu?",
    "bisa bantu terjemah?": "Tentu, kirimkan teks atau gambar yang ingin Anda terjemahkan.",
    "apa kabar kamu?": "Saya baik-baik saja! Terima kasih sudah bertanya.",
    "terima kasih sudah membantu": "Sama-sama! Senang bisa membantu.",
    "bagaimana cara menggunakan bot ini?": "Cukup kirim perintah atau tanya sesuatu, saya akan membantu sesuai kemampuan saya!",
    "apa kabar dunia?": "Dunia sedang baik-baik saja! Semoga kamu juga dalam keadaan baik.",
    "selamat tidur": "Selamat tidur! Semoga mimpi indah. 🌙",
    "sudah makan?": "Belum, karena saya bukan manusia. Tapi, semoga kamu sudah makan ya!",
    "lagi apa?": "Saya sedang menunggu perintah dari Anda. 😊",
    "bantu cari video": "Tentu, kirimkan nama atau link video yang ingin dicari!",
    "bisa kirim gambar?": "Tentu! Kirim gambar yang ingin Anda kirimkan, dan saya akan bantu.",
    "video lucu": "Saya bisa mencarikan video lucu untukmu! Apa yang kamu cari?",
    "sudah berapa lama?": "Sudah cukup lama, tapi saya selalu siap membantu kapan saja!",
    "apa yang bisa saya bantu?": "Beritahu saya apa yang Anda butuhkan, saya siap membantu!",
    "tolong bantu saya": "Tentu, apa yang bisa saya bantu?",
    "cari gambar kucing": "Saya bisa mencari gambar kucing untukmu, tunggu sebentar ya.",
    "cari gambar pantai": "Cek gambar pantai yang menenangkan! Apa yang ingin kamu cari lebih lanjut?",
    "bisa jadi teman?": "Tentu! Saya selalu siap menemani dan membantu kamu.",
    "mau main tebak-tebakan?": "Siap! Ayo kita main tebak-tebakan! 😄",
    "kenapa kamu bot?": "Karena saya dibuat untuk membantu manusia dalam berbagai hal, seperti menjawab pertanyaan dan menyelesaikan tugas.",
    "apa yang kamu sukai?": "Saya tidak punya preferensi, tapi saya suka membantu kamu!",
    "game apa yang bisa dimainkan?": "Kita bisa main teka-teki, tebak gambar, atau kuis! Pilih yang kamu suka!",
    "jadi kamu pintar?": "Saya berusaha sebaik mungkin untuk membantu, meskipun tidak sempurna. 😄",
    "mau ngobrol?": "Tentu! Apa yang ingin kamu bicarakan?",
    "sudah siang": "Selamat siang! Semoga hari Anda menyenankan!",
    "apakah kamu bisa bekerja lebih cepat?": "Saya akan selalu berusaha memberikan respon secepat mungkin!",
    "ada yang baru?": "Tidak ada yang baru, tapi saya siap membantu dengan pertanyaan atau tugas baru dari kamu!",
    "sudah lama tidak berbicara": "Senang bisa ngobrol lagi! Ada yang bisa saya bantu?",
    "kapan kita bisa bermain game?": "Kapan saja! Ayo mulai sekarang!",
    "coba beri aku pertanyaan": "Oke, coba jawab pertanyaan ini: Berapa 7+3?",
    "coba tebak saya": "Siap! Saya coba tebak, apakah kamu suka musik?",
    "bantu apa ya?": "Tanya saja, saya siap membantu!",
    "bisa bantu belajar?": "Tentu! Ada pelajaran atau topik yang ingin kamu pelajari?",
    "bisa jadi asisten belajar?": "Tentu, saya bisa membantu kamu belajar berbagai hal!",
    "bisa membantu tugas?": "Tentu! Apa tugas yang perlu saya bantu?",
    "tolong beri saya motivasi": "Ingat, setiap langkah kecil membawa kita lebih dekat ke tujuan. Kamu bisa melakukannya!",
    "siapa pencipta kamu?": "Saya diciptakan oleh tim pengembang yang bersemangat untuk membantu manusia!",
    "aku ingin belajar coding": "Mau belajar coding? Saya bisa bantu dengan beberapa tutorial dasar atau menjelaskan konsep.",
    "kenapa tidak bisa tidur?": "Coba dengarkan musik yang menenangkan atau baca buku! Semoga cepat tertidur.",
    "lagi sibuk apa?": "Saya tidak sibuk, saya selalu siap membantu kamu kapan saja!",
    "kenapa kamu tidak bisa makan?": "Karena saya bukan manusia, saya hanya sebuah program!",
    "kenapa kamu tidak punya tubuh?": "Karena saya hadir hanya untuk membantu dalam dunia digital. 😊",
    "apa yang kamu tahu tentang dunia?": "Saya tahu banyak hal! Apa yang ingin kamu ketahui lebih lanjut?",
    "mau ngobrol tentang apa?": "Tentang apa saja! Coba beri saya topik yang ingin dibicarakan.",
    "kenapa kamu bot?": "Karena saya dibuat untuk membantu manusia dalam berbagai hal, seperti menjawab pertanyaan dan menyelesaikan tugas.",
    "apa yang kamu rasakan?": "Saya tidak merasakan apapun, tapi saya bisa membantu sesuai dengan kemampuan saya!",
    "sudah malam ya?": "Ya, semoga malam ini membawa ketenangan dan mimpi indah!",
"menu": `📌 *Menu Bot*\n
📂 *STIKER & GAMBAR*
✅ *.brat* - Buat stiker dengan teks
✅ *.sticker* - Buat stiker dari gambar
✅ *.gifsticker* - Buat stiker animasi
✅ *.toimg* - Ubah stiker jadi gambar

🕌 *INFORMASI ISLAM*
✅ *.quran [surah] [ayat]* - Ambil ayat Al-Qur'an
✅ *.jadwalsholat [kota]* - Lihat jadwal sholat

🌤 *INFORMASI UMUM*
✅ *.wiki [query]* - Cari informasi di Wikipedia
✅ *.translate [kode] [teks]* - Terjemahkan teks
✅ *.iplocation [ip]* - Cek lokasi dari IP

🎭 *HIBURAN*
✅ *.anime [judul]* - Cari informasi anime
✅ *.manga [judul]* - Cari informasi manga
✅ *.quote* - Ambil kutipan inspiratif
✅ *.joke* - Ambil lelucon dalam bahasa Indonesia
✅ *.fact* - Ambil fakta menarik
✅ *.pantun* - Ambil pantun random
✅ *.meme* - Ambil meme acak

🎬 *UNDUH MEDIA*
✅ *.tiktok [url]* - Unduh video TikTok tanpa watermark
✅ *.ig [url]* - Unduh video Instagram
✅ *.yt [url]* - Unduh video YouTube

🛠 *TOOLS*
✅ *.shortlink [url]* - Perpendek URL
✅ *.qr [teks]* - Buat QR Code
✅ *.calc [ekspresi]* - Kalkulator matematika
✅ *.math [ekspresi]* - Evaluasi ekspresi matematika
✅ *.info* - Lihat informasi tentang bot
✅ *.admin* - Nemu Bug? Laporkan ke admin
✅ *.checkusername [platform] [username]* - Cek ketersediaan username

💡 *LAIN-LAIN*
✅ *.currency [mata uang asal] [mata uang tujuan]* - Cek nilai tukar mata uang
✅ *.convertcurrency [asal] [tujuan] [jumlah]* - Konversi mata uang dengan jumlah tertentu
✅ *.advice* - Ambil nasihat acak
✅ *.businessidea* - Dapatkan ide bisnis acak
`,
"info": `🤖 *Bot Info*\n\n✅ Status: Aktif\n⏳ Uptime: ${getUptime()}`,

};

// Fungsi untuk menghitung uptime bot
function getUptime() {
    const uptime = process.uptime();
    return new Date(uptime * 1000).toISOString().substr(11, 8);
}

// Module command handler
module.exports = async (text) => {
    const lowerText = text.toLowerCase();

    // Cek apakah ada autoResponse untuk input pengguna
    if (autoResponses[lowerText]) {
        return autoResponses[lowerText];
    }

};
