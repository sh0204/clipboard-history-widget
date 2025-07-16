import React from 'react';
import styles from './Footer.module.css';
import { useClipboard } from '../../context/ClipboardContext';

export default function Footer() {
  const { clearClipboard } = useClipboard();

  return (
    <footer className={styles.footer} onClick={clearClipboard}>
      <span className={styles.clearAllText}>Clear All</span>
    </footer>
  );
}
