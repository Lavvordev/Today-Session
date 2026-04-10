/**
============================================================================
@project Today-Session
@title WhatsApp Session ID Generator
@author LavvorStudio
@copyright 2026 LavvorStudio. All rights reserved.
@version 1.0.0
@date 09 April 2026
@license MIT
@repository https://github.com/Lavvordev/Today-Session
============================================================================
Generate WhatsApp Session IDs, QR, Pairing Code
One File Customization, Easy Deploy, Fast Setup
============================================================================
@note This software is property of LavvorStudio
@note Developers can use this for their own bot projects
@note But claiming as your own or removing credits is prohibited
@note You may modify and customize for personal use
@note Commercial use requires prior permission
============================================================================
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadSettings() {
    const settingsPath = path.join(__dirname, '.settings');
    const config = {};
    
    if (fs.existsSync(settingsPath)) {
        const content = fs.readFileSync(settingsPath, 'utf8');
        const lines = content.split('\n');
        
        lines.forEach(line => {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                config[key.trim()] = valueParts.join('=').trim();
            }
        });
    }
    
    // Default values if not present
    return {
        webName: config.webName || 'Today Session',
        webLogoUrl: config.webLogoUrl || 'https://i.imgur.com/6I5qVqZ.png',
        companyName: config.companyName || 'LavvorStudio',
        companyTagline: config.companyTagline || 'Build apps, WhatsApp bots, and websites',
        primaryColor: config.primaryColor || '8B5CF6',
        secondaryColor: config.secondaryColor || '14B8A6',
        sessionPrefix: config.sessionPrefix || 'TODAY:~',
        sessionMode: config.sessionMode || 'short',
        githubRepo: config.githubRepo || 'https://github.com/Lavvordev/Today-Session',
        whatsappChannel: config.whatsappChannel || 'https://whatsapp.com/channel/0029VbBr866KLaHfX8d5y32z',
        supportEmail: config.supportEmail || 'support@lavvorstudio.com',
        privacyPolicyUrl: config.privacyPolicyUrl || '/privacy',
        termsUrl: config.termsUrl || '/terms',
        footerText: config.footerText || 'All rights reserved'
    };
}

export default loadSettings();
