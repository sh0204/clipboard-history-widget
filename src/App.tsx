// src/App.tsx
import React from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className={styles.widgetContainer}>
      <Header />
      {/* 👇 여기에 ClipboardList 들어갈 예정 */}
      <div style={{ flex: 1 }}></div>
      <Footer />
    </div>
  );
}

export default App;
