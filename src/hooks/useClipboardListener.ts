import { useEffect } from 'react';
import { useClipboard } from '../context/ClipboardContext';

export function useClipboardListener() {
  const { addClipboardItem } = useClipboard();

  useEffect(() => {
    // Electron → React 통신
    window.electronAPI?.onClipboard((text: string) => {
      addClipboardItem(text);
    });
  }, [addClipboardItem]);
}
