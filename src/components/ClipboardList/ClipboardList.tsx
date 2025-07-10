import React from 'react';
import { useClipboard } from '../../context/ClipboardContext';
import styles from './ClipboardList.module.css';

const ClipboardList: React.FC = () => {
  const { items } = useClipboard();

  return (
    <ul className={styles.clipboardList}>
      {items.length === 0 ? (
        <li className={styles.empty}>📋 클립보드 내역이 없습니다</li>
      ) : (
        items.map((text, index) => (
          <li key={index} title={text}>
            {text}
          </li>
        ))
      )}
    </ul>
  );
};

export default ClipboardList;
