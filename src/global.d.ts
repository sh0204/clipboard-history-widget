export {};

declare global {
  interface Window {
    electronAPI: {
      onClipboard: (callback: (text: string) => void) => void;
    };
  }
}
