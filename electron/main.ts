import { app, BrowserWindow, clipboard } from 'electron';
import path from 'node:path';

let win: BrowserWindow | null = null;
let lastText = '';

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 500,
    resizable: true, 
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  win.loadURL('http://localhost:5173'); // Vite 개발 서버 주소
}

app.whenReady().then(() => {
  createWindow();

  // 클립보드 감시
  setInterval(() => {
    const text = clipboard.readText();
    if (text && text !== lastText) {
      lastText = text;
      win?.webContents.send('clipboard:text', text);
    }
  }, 1000);
});
