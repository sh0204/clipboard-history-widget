import React, { createContext, useContext, useState, ReactNode } from 'react';


const ClipboardContext = createContext<any>(null);

export const ClipboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<string[]>([]);

  const addClipboardItem = (text: string) => {
    setItems((prev) => [text, ...prev.filter((t) => t !== text)].slice(0, 10)); // 중복 제거 + 10개 제한
  };

  return (
    <ClipboardContext.Provider value={{ items, addClipboardItem }}>
      {children}
    </ClipboardContext.Provider>
  );
};

export const useClipboard = () => useContext(ClipboardContext);
