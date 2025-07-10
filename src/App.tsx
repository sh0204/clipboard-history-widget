// src/App.tsx
import React from 'react';
import ClipboardList from './components/ClipboardList/ClipboardList';
import { useClipboardListener } from './hooks/useClipboardListener';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  useClipboardListener();

  return (
    <div className={styles.widgetContainer}>
      <Header />
      <ClipboardList />
         <div style={{ flex: 1 }}></div>
      <Footer />
    </div>
  );
}

export default App;
