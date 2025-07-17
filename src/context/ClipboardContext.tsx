import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // ✅ 고유 id 생성을 위해 필요

// ✅ 새로운 타입 정의
type ClipboardItem = {
  id: string;
  content: string;
  pinned: boolean;
};

type ClipboardContextType = {
  items: ClipboardItem[];
  addClipboardItem: (text: string) => void;
  removeClipboardItem: (id: string) => void;
  clearClipboard: () => void;
  copyToClipboard: (text: string) => void;
  togglePin: (id: string) => void;
};

const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<ClipboardItem[]>([]);

  const addClipboardItem = (text: string) => {
    setItems((prev) => {
      // 이미 같은 내용이 있다면 삭제
      const filtered = prev.filter((item) => item.content !== text);
      // 최대 10개 유지
      return [
        { id: uuidv4(), content: text, pinned: false },
        ...filtered,
      ].slice(0, 10);
    });
  };

  const removeClipboardItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearClipboard = () => {
    setItems([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch((e) => {
      console.error('Clipboard copy failed:', e);
    });
  };

  const togglePin = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item
      )
    );
  };

  return (
    <ClipboardContext.Provider
      value={{
        items,
        addClipboardItem,
        removeClipboardItem,
        clearClipboard,
        copyToClipboard,
        togglePin,
      }}
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
