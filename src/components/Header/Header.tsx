import { Search } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logoGroup}>
          <div className={styles.logoIcon}>
            <Image src="/estudiar.png" alt="DevRoute Logo" width={28} height={28} />
          </div>
          <h1 className={styles.logoText}>DevRoute</h1>
        </div>
        
        <div className={styles.searchGroup}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar cursos..." 
            className={styles.searchInput} 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
