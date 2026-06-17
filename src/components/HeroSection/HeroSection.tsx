import { BookOpen, Terminal, Cpu, Database, Grid } from 'lucide-react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function HeroSection({ selectedCategory, onSelectCategory }: HeroSectionProps) {
  const categories = [
    { name: 'all', label: 'Todos', icon: Grid, class: styles.badgeDefault },
    { name: 'Frontend', label: 'Frontend', icon: BookOpen, class: styles.badgeRose },
    { name: 'Backend', label: 'Backend', icon: Terminal, class: styles.badgeTeal },
    { name: 'IA & Agentes', label: 'IA & Agentes', icon: Cpu, class: styles.badgeIndigo },
    { name: 'Bases de Datos', label: 'Bases de Datos', icon: Database, class: styles.badgeAmber },
  ];

  return (
    <section className={styles.hero}>
      <h2 className={styles.title}>
        Tu ruta hacia el{' '}
        <span className={styles.highlightRose}>Desarrollo Web</span> y la{' '}
        <span className={styles.highlightTeal}>IA</span>
      </h2>
      <p className={styles.subtitle}>
        Descubre qué aprender y en qué orden. Desde los fundamentos de HTML
        hasta la integración de Inteligencia Artificial, bases de datos y
        ciberseguridad.
      </p>
      <div className={styles.badges}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              className={`${styles.badge} ${cat.class} ${isActive ? styles.active : ''}`}
              onClick={() => onSelectCategory(cat.name)}
              aria-pressed={isActive}
            >
              <Icon size={16} /> {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
