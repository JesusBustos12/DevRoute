'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label="Toggle theme"
    >
      <div className={styles.knob}>
        {isDark
          ? <Moon size={14} className={styles.iconMoon} />
          : <Sun size={14} className={styles.iconSun} />
        }
      </div>
    </button>
  );
}
