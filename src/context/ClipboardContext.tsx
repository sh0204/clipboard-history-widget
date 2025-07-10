import React, { createContext, useContext, useState, ReactNode } from 'react';

type ClipboardContextType = {
  items: string[];
  addClipboardItem: (text: string) => void;
};

const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<string[]>([]);

  const addClipboardItem = (text: string) => {
    setItems((prev) => [text, ...prev.filter((t) => t !== text)].slice(0, 10));
  };

  return (
    <ClipboardContext.Provider value={{ items, addClipboardItem }}>
      {children}
    </ClipboardContext.Provider>
  );
};

export const useClipboard = () => {
  const context = useContext(ClipboardContext);
  if (!context) {
    throw new Error('useClipboard must be used within a ClipboardProvider');
  }
  return context;
};
