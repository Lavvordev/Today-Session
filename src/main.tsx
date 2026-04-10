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

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

