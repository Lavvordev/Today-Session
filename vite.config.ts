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

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
