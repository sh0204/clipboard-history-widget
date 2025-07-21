import React, { useEffect, useRef, useState } from 'react';
import styles from './ClipboardList.module.css';
import { useClipboard } from '../../context/ClipboardContext';
import { Trash2, Pin, Search, X } from 'lucide-react';

export default function ClipboardList() {
  const { items, removeClipboardItem, copyToClipboard, togglePin } = useClipboard();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchTerm('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = items
    .filter((item) => item.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  if (items.length === 0) {
    return <div className={styles.empty}>📋 복사한 항목이 없습니다</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.searchWrapper}>
          {searchOpen ? (
            <>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="내용 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                onBlur={() => {
                  if (searchTerm === '') setSearchOpen(false);
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => {
                    setSearchTerm('');
                    searchInputRef.current?.focus();
                  }}
                  aria-label="검색어 지우기"
                >
                  <X size={16} />
                </button>
              )}
            </>
          ) : (
            <button
              className={styles.searchToggle}
              onClick={() => {
                setSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 0);
              }}
              title="검색"
              type="button"
            >
              <Search size={16} />
            </button>
          )}
        </div>
      </div>

      <ul className={styles.list}>
        {filteredItems.map((item) => (
          <li
            className={`${styles.item} ${item.pinned ? styles.pinned : ''}`}
            key={item.id}
            onClick={() => copyToClipboard(item.content)}
            title="클릭해서 복사"
          >
            <span className={styles.text}>{item.content}</span>
            <div className={styles.actions}>
              <button
                className={styles.pinBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(item.id);
                }}
                title={item.pinned ? '고정 해제' : '고정'}
                type="button"
              >
                <Pin
                  size={16}
                  color={item.pinned ? '#facc15' : '#999'}
                  fill={item.pinned ? '#facc15' : 'none'}
                />
              </button>
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
    </div>
  );
}
