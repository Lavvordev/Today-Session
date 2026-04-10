/**
TODAY-SESSION - QR ROUTE (WITH BUTTONS)
@author LavvorStudio
@version 1.0.0
*/
import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import QRCode from 'qrcode';
import zlib from 'zlib';
import pino from "pino";
import giftedBtns from 'gifted-btns';
const { sendButtons } = giftedBtns;
import config from './config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const sessionDir = path.join(__dirname, 'auth_info_today');

async function cleanAuthDir(id) {
    const sessionPath = path.join(sessionDir, id);
    if (fs.existsSync(sessionPath)) {
        await fs.remove(sessionPath);
    }
}

router.get('/', async (req, res) => {
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    let responseSent = false;

    async function generateQR() {
        const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, fetchLatestBaileysVersion } = await import('baileys');
        
        const { version } = await fetchLatestBaileysVersion();
        const { state, saveCreds } = await useMultiFileAuthState(path.join(sessionDir, sessionId));

        try {
            const sock = makeWASocket({
                version,
                auth: state,
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: Browsers.macOS(config.webName),
                connectTimeoutMs: 60000,
                keepAliveIntervalMs: 30000
            });

            sock.ev.on('creds.update', saveCreds);

            sock.ev.on("connection.update", async (update) => {
                const { connection, lastDisconnect, qr } = update;

                if (qr && !responseSent) {
                    const qrImage = await QRCode.toDataURL(qr);
                    if (!res.headersSent) {
                        responseSent = true;
                        res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>${config.webName} | QR Code</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            color: white;
        }
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen p-4">
    <div class="glass p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
        <h1 class="text-3xl font-bold mb-2 text-[#${config.primaryColor}]">${config.webName}</h1>
        <div class="bg-white p-4 rounded-2xl inline-block my-6">
            <img src="${qrImage}" alt="QR Code" class="w-64 h-64"/>
        </div>
        <p class="text-gray-400 mb-8">Scan this QR code with WhatsApp to connect</p>
        <a href="/" class="inline-flex items-center gap-2 px-6 py-3 bg-[#${config.primaryColor}] hover:opacity-90 transition-all rounded-full font-semibold">
            <i class="fas fa-arrow-left"></i> Back to Home
        </a>
    </div>
</body>
</html>
                        `);
                    }
                }

                if (connection === "open") {
                    console.log(`[QR] ✅ Connected`);
                    await delay(10000);

                    let sessionData = null;
                    let attempts = 0;
                    const maxAttempts = 15;

                    while (attempts < maxAttempts && !sessionData) {
                        try {
                            const credsPath = path.join(sessionDir, sessionId, "creds.json");
                            if (fs.existsSync(credsPath)) {
                                const data = fs.readFileSync(credsPath);
                                if (data && data.length > 100) {
                                    sessionData = data;
                                    break;
                                }
                            }
                            await delay(3000);
                            attempts++;
                        } catch (readError) {
                            await delay(2000);
                            attempts++;
                        }
                    }

                    if (!sessionData) {
                        await cleanAuthDir(sessionId);
                        return;
                    }

                    try {
                        const compressedData = zlib.gzipSync(sessionData);
                        const base64Data = compressedData.toString('base64');
                        let fullSession = config.sessionPrefix + base64Data;

                        const userId = sock.user.id;

                        await sendButtons(sock, userId, {
                            title: `✨ ${config.webName.toUpperCase()} ✨`,
                            text: `✅ *Session Generated Successfully!*\n\n📌 *Session ID:*\n\`${fullSession}\`\n\n💡 Click below to copy or visit links`,
                            footer: `👨‍💻 By: ${config.companyName}`,
                            aimode: false,
                            buttons: [
                                {
                                    name: 'cta_copy',
                                    buttonParamsJson: JSON.stringify({
                                        display_text: '📋 Copy Session ID',
                                        copy_code: fullSession
                                    })
                                },
                                {
                                    name: 'cta_url',
                                    buttonParamsJson: JSON.stringify({
                                        display_text: '⭐ GitHub Repo',
                                        url: config.githubRepo
                                    })
                                },
                                {
                                    name: 'cta_url',
                                    buttonParamsJson: JSON.stringify({
                                        display_text: '📢 WhatsApp Channel',
                                        url: config.whatsappChannel
                                    })
                                }
                            ]
                        });

                        console.log(`[QR] Session sent with buttons to ${userId}`);
                        await delay(3000);
                    } catch (sendError) {
                        console.error("Send error:", sendError);
                        const compressedData = zlib.gzipSync(sessionData);
                        const base64Data = compressedData.toString('base64');
                        const fullSession = config.sessionPrefix + base64Data;
                        await sock.sendMessage(userId, { 
                            text: `✨ ${config.webName.toUpperCase()} ✨\n\n✅ Session Generated!\n\nSession ID:\n${fullSession}\n\nBy: ${config.companyName}`
                        });
                    } finally {
                        await cleanAuthDir(sessionId);
                        await sock.ws?.close();
                    }
                }

                if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== 401) {
                    console.log("[QR] Reconnecting...");
                    await delay(5000);
                    generateQR();
                }
            });
        } catch (err) {
            console.error("[QR] Error:", err);
            if (!responseSent && !res.headersSent) {
                responseSent = true;
                res.status(500).send('Service unavailable');
            }
            await cleanAuthDir(sessionId);
        }
    }
    await generateQR();
});

export default router;
