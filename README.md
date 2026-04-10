<div align="center">
  <img src="https://i.postimg.cc/cCxcnwFt/todaysession.png" width="1200" height="400" alt="Today Session Logo">
  <h1>✨ TODAY SESSION ✨</h1>
  
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=25&pause=1000&color=8B5CF6&center=true&vCenter=true&width=435&lines=WhatsApp+Session+Generator;Professional+%26+Secure;Built+by+LavvorStudio" alt="Typing SVG" />
  </a>

  <p><b>Professional WhatsApp Session ID Generator by LavvorStudio</b></p>
</div>

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Lavvordev/Today-Session)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Lavvordev/Today-Session)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

[![GitHub stars](https://img.shields.io/github/stars/Lavvordev/Today-Session?style=social)](https://github.com/Lavvordev/Today-Session/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Lavvordev/Today-Session?style=social)](https://github.com/Lavvordev/Today-Session/network)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)

---

## 📌 About

**Today Session** is a high-performance, web-based WhatsApp Session ID Generator. It provides a seamless way to generate authentication sessions for WhatsApp bots and applications using modern web technologies.

### ✨ Features

| Feature | Description |
|---------|-------------|
| 📱 QR Code Method | Instant scan-to-connect functionality |
| 🔐 Pairing Code Method | Direct connection via phone number |
| 🎨 Premium UI | Glassmorphism design with animated backgrounds |
| ⚙️ Easy Config | Centralized management via `.settings` file |
| 🚀 Full-Stack | Built with Express, Vite, and Baileys |
| 🐳 Docker Ready | Optimized for containerized environments |

---

## 📥 Installation

```bash
git clone https://github.com/Lavvordev/Today-Session.git
cd Today-Session
npm install
npm run dev
```

---

## 🔧 Configuration (`.settings`)

Manage your entire application branding and behavior from a single file:

```ini
webName=Today Session
webLogoUrl=https://i.postimg.cc/wTHBDF5J/Today-Session-logo.png
companyName=LavvorStudio
companyTagline=Build apps, WhatsApp bots, and websites
primaryColor=8B5CF6
secondaryColor=14B8A6
sessionPrefix=TODAY:~
sessionMode=short
githubRepo=https://github.com/Lavvordev/Today-Session
whatsappChannel=https://whatsapp.com/channel/0029VbBr866KLaHfX8d5y32z
supportEmail=support@lavvorstudio.com
privacyPolicyUrl=/privacy
termsUrl=/terms
footerText=All rights reserved
```

---

## 📱 How to Use

### Method 1: QR Code
1. Open the application URL.
2. Click **"QR Code Method"**.
3. Open WhatsApp on your phone → Settings → Linked Devices.
4. Scan the generated QR code.
5. Your Session ID will be sent directly to your WhatsApp.

### Method 2: Pairing Code
1. Open the application URL.
2. Click **"Pairing Code Method"**.
3. Enter your WhatsApp number with country code (e.g., `923001234567`).
4. Click **"Generate Code"** and enter the 8-digit code in WhatsApp.
5. Your Session ID will be sent directly to your WhatsApp.

---

## 🔑 Session ID Format

```
TODAY:~base64_encoded_session_data
```

### Usage in Bots:

```env
SESSION_ID=TODAY:~your_generated_id
```

---

## 📁 Project Structure

```
Today-Session/
├── server.ts         # Main Express + Vite server
├── qr.js             # QR code generation logic
├── pair.js           # Pairing code generation logic
├── config.js         # Configuration loader
├── .settings         # Application settings & branding
├── main.html         # Homepage UI
├── pair.html         # Pairing page UI
├── privacy.html      # Privacy Policy
├── terms.html        # Terms of Service
└── package.json      # Dependencies & scripts
```

---

## 👨‍💻 Author

**LavvorStudio**

- GitHub: [@LavvorStudio](https://github.com/Lavvordev)
- Website not ative: [LavvorStudio](https://lavvorstudio.com)

---

## 📄 License

MIT License - Copyright (c) 2026 LavvorStudio

---

<div align="center">
  
**Made with ❤️ by LavvorStudio**

</div>
