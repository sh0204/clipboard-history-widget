import React, { createContext, useContext, useState } from 'react';

type ClipboardContextType = {
  items: string[];
  addClipboardItem: (text: string) => void;
  removeClipboardItem: (text: string) => void;
  clearClipboard: () => void;
  copyToClipboard: (text: string) => void; // 누락된 타입 추가
};

const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<string[]>([]);

  const addClipboardItem = (text: string) => {
    setItems((prev) => [text, ...prev.filter((t) => t !== text)].slice(0, 10));
  };

  const removeClipboardItem = (text: string) => {
    setItems((prev) => prev.filter((t) => t !== text));
  };

  const clearClipboard = () => {
    setItems([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch((e) => {
      console.error('Clipboard copy failed:', e);
    });
  };

  return (
    <ClipboardContext.Provider
      value={{ items, addClipboardItem, removeClipboardItem, clearClipboard, copyToClipboard }}
    >
      {children}
    </ClipboardContext.Provider>
  );
};

export const useClipboard = () => {
  const context = useContext(ClipboardContext);
  if (!context) throw new Error('useClipboard must be used within ClipboardProvider');
  return context;
};
