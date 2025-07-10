import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { ClipboardProvider } from './context/ClipboardContext'; // ✅ 요거!

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ClipboardProvider> {/* ✅ 클립보드 컨텍스트 감싸기 */}
        <App />
      </ClipboardProvider>
    </ThemeProvider>
  </React.StrictMode>
);
