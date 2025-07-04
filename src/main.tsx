// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext'; // ✅ 이거 꼭!
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider> {/* ✅ ThemeContext로 전체 감싸야 함 */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
