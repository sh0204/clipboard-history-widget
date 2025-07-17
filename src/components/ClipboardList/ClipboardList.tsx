import React from 'react';
import styles from './ClipboardList.module.css';
import { useClipboard } from '../../context/ClipboardContext';
import { Trash2, Pin } from 'lucide-react';

export default function ClipboardList() {
  const { items, removeClipboardItem, copyToClipboard, togglePin } = useClipboard();

  if (items.length === 0) {
    return <div className={styles.empty}>📋 복사한 항목이 없습니다</div>;
  }

  // 고정된 항목이 위로 오도록 정렬
  const sortedItems = [...items].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <ul className={styles.list}>
      {sortedItems.map((item) => (
        <li
          className={`${styles.item} ${item.pinned ? styles.pinned : ''}`}
          key={item.id}
          onClick={() => copyToClipboard(item.content)}
          style={{ cursor: 'pointer' }}
          title="클릭해서 복사"
        >
          <span className={styles.text}>{item.content}</span>
          <div className={styles.actions}>
            {/* 핀 버튼: 항상 보임은 CSS에서 처리 */}
            <button
              className={styles.pinBtn}
              onClick={(e) => {
                e.stopPropagation();
                togglePin(item.id);
              }}
              title={item.pinned ? '고정 해제' : '고정'}
              type="button"
            >
              <Pin size={16} color={item.pinned ? '#facc15' : '#999'} fill={item.pinned ? '#facc15' : 'none'} />
            </button>

            {/* 삭제 버튼: 항상 보임 */}
            <button
              className={`${styles.iconBtn} deleteBtn`}
              onClick={(e) => {
                e.stopPropagation();
                removeClipboardItem(item.id);
              }}
              title="삭제"
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
