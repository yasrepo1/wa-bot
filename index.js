const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const sharp = require('sharp');
const { sendMenu } = require('./commands/menu');
const { sendInfo } = require('./commands/info');
const { downloadMedia, downloadPhoto } = require('./commands/download');
const commandHandler = require('./handlers/commandHandler');
const responseHandler = require('./handlers/response');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const sock = makeWASocket({ auth: state, printQRInTerminal: true });

    sock.ev.on('connection.update', (update) => {
        const { connection, qr } = update;
        if (qr) qrcode.generate(qr, { small: true });
        if (connection === "open") console.log("✅ Bot berhasil terhubung!");
        if (connection === "close") startBot();
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || !msg.key.remoteJid) return;

        const sender = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!text) return;

        console.log(`💬 Pesan dari ${sender}: ${text}`);

        // Perintah menu dan info
        if (text === ".menu" || text === ".help") return sendMenu(sock, sender);
        if (text === ".info") return sendInfo(sock, sender);

        // Perintah download media (bisa untuk foto/video)
        if (text.startsWith(".tiktok ")) {
            const url = text.replace(".tiktok ", "").trim();
            if (url.includes("/photo/")) {
                return downloadPhoto(sock, sender, url, "tiktok");
            }
            return downloadMedia(sock, sender, url, "tiktok");
        }

        if (text.startsWith(".ig ")) {
            const url = text.replace(".ig ", "").trim();
            if (url.includes("/p/") || url.includes("/reel/")) {
                return downloadMedia(sock, sender, url, "instagram");
            }
            return downloadPhoto(sock, sender, url, "instagram");
        }

        if (text.startsWith(".yt ")) return downloadMedia(sock, sender, text.replace(".yt ", "").trim(), "youtube");

        // Perintah stiker teks (.brat)
        if (text.startsWith(".brat ")) {
            const stickerText = text.replace(".brat ", "").trim();
            if (!stickerText) return sock.sendMessage(sender, { text: "❌ Harap masukkan teks untuk stiker!" });

            return sendTextSticker(sock, sender, stickerText);
        }

        // Periksa apakah pesan berisi gambar untuk diubah menjadi stiker
        if (msg.message.imageMessage) {
            await createStickerBaileys(sock, sender, msg);
        }

        // Cek apakah ada perintah di commandHandler
        const args = text.slice(1).split(" ");
        const command = args.shift().toLowerCase();
        const response = await commandHandler(command, args);

        if (response) await sock.sendMessage(sender, { text: response });

        // Cek apakah ada auto-response di responseHandler
        const autoResponse = await responseHandler(text);
        if (autoResponse) await sock.sendMessage(sender, { text: autoResponse });
    });
}

// Fungsi untuk membuat stiker teks
async function sendTextSticker(sock, sender, text) {
    const width = 512;
    const height = 512;
    const outputPath = "sticker.webp";

    const svgImage = `
        <svg width="${width}" height="${height}">
            <rect width="100%" height="100%" fill="white"/>
            <text x="50%" y="50%" font-size="60" text-anchor="middle" fill="black" dy=".3em">${text}</text>
        </svg>
    `;

    fs.writeFileSync("text.svg", svgImage);

    await sharp("text.svg")
        .resize(width, height)
        .toFormat("webp")
        .toFile(outputPath);

    fs.unlinkSync("text.svg");

    await sock.sendMessage(sender, { sticker: fs.readFileSync(outputPath) });
    fs.unlinkSync(outputPath);
}

// Fungsi untuk membuat stiker dengan Baileys
async function createStickerBaileys(sock, sender, msg) {
    const buffer = await sock.downloadMediaMessage(msg);
    if (!buffer) {
        console.log("❌ Gagal mengunduh gambar.");
        return sock.sendMessage(sender, { text: "⚠️ Gagal mengunduh gambar." });
    }

    const media = msg.message.imageMessage;
    if (!media || !["image/jpeg", "image/png", "image/webp"].includes(media.mimetype)) {
        console.log("❌ Gambar bukan format yang valid.");
        return sock.sendMessage(sender, { text: 'Mohon kirimkan gambar dalam format JPG, PNG, atau WEBP!' });
    }

    console.log("📥 Gambar berhasil diunduh, mengonversi ke WebP...");

    const stickerBuffer = await sharp(buffer)
        .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFormat('webp')
        .toBuffer();

    await sock.sendMessage(sender, { sticker: stickerBuffer });
    console.log("✅ Stiker berhasil dibuat dan dikirim.");
}

startBot(); // Memulai bot
