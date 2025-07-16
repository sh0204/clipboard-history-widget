import React from 'react';
import styles from './ClipboardList.module.css';
import { useClipboard } from '../../context/ClipboardContext';
import { Trash2, Copy } from 'lucide-react'; // ✅ Lucide 아이콘

export default function ClipboardList() {
  const { items, removeClipboardItem, copyToClipboard } = useClipboard();

  if (items.length === 0) {
    return <div className={styles.empty}>📋 복사한 항목이 없습니다</div>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item, idx) => (
        <li className={styles.item} key={idx}>
          <span className={styles.text}>{item}</span>
          <div className={styles.actions}>
            <button className={styles.iconBtn} onClick={() => copyToClipboard(item)} title="Copy">
              <Copy size={16} />
            </button>
            <button className={styles.iconBtn} onClick={() => removeClipboardItem(item)} title="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
