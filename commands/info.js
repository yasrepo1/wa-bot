const sendInfo = async (sock, sender) => {
    const uptime = process.uptime();
    const uptimeString = new Date(uptime * 1000).toISOString().substr(11, 8);

    const botInfo = `🤖 *Bot Info*\n\n✅ Status: Aktif\n⏳ Uptime: ${uptimeString}`;
    await sock.sendMessage(sender, { text: botInfo });
};

module.exports = { sendInfo };
