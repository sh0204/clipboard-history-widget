import styles from './Header.module.css';
import ThemeToggle from '../Toggle/ThemeToggle';

export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>📋 Clipboard History</h1>
      <div className={styles.actions}>
        <ThemeToggle />
      </div>
    </div>
  );
}
