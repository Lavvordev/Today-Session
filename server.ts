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
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = 3000; // Hardcoded per environment rules

// Import routes
import qrRoute from './qr.js';
import pairRoute from './pair.js';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Routes
app.use('/qr', qrRoute);
app.use('/code', pairRoute);

// API Config endpoint
app.get('/api/config', (req, res) => {
    res.json(config);
});

// Frontend Routes
app.get('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, 'pair.html'));
});

app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, 'privacy.html'));
});

app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'terms.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔════════════════════════════════════════╗
║ TODAY-SESSION IS RUNNING               ║
╠════════════════════════════════════════╣
║ Port: ${PORT}                             ║
╚════════════════════════════════════════╝`);
});

export default app;
