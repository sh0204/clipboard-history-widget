// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  onClipboard: (callback: (text: string) => void) => {
    ipcRenderer.on('clipboard:text', (_, text) => callback(text));
  },
  sendResize: (width: number, height: number) => {
    ipcRenderer.send('resize-window', { width, height });
  },
});
