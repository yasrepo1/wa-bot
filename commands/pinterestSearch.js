const axios = require('axios');

async function searchPinterest(query) {
    if (!query) return "⚠️ Gunakan format: *.pin [teks]*";

    const apiKey = 'P5KSFKEF3GY8O37NMGWLI391COCVBL9ASY7XD6RERYSG5PPKAPF3RIYCTEVU3YCG895Q8XIGAFGIRXJ9';  // Ganti dengan API key ScrapingBee Anda
    const url = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}&render=1`;

    try {
        const response = await axios.get(url);
        const html = response.data;

        // Proses HTML untuk mengambil URL gambar
        const regex = /data-src="(https:\/\/i.pinimg.com\/.*?\.jpg)"/g;
        const images = [];
        let match;
        while ((match = regex.exec(html)) !== null) {
            images.push(match[1]);
        }

        if (images.length === 0) {
            return "⚠️ Tidak ditemukan gambar yang sesuai dengan pencarian.";
        }

        // Mengembalikan 5 gambar pertama
        let result = `📌 *Hasil Pencarian Pinterest*\n\n`;
        images.slice(0, 5).forEach((img, index) => {
            result += `🌟 Gambar ${index + 1}:\n${img}\n`;
        });

        return result;
    } catch (error) {
        console.error("Error scraping Pinterest:", error);
        return "⚠️ Gagal mengambil gambar dari Pinterest.";
    }
}

module.exports = async (command, args) => {
    switch (command) {
        case "pin": 
            return await searchPinterest(args.join(" "));
        default:
            return "⚠️ Perintah tidak dikenali.";
    }
};
