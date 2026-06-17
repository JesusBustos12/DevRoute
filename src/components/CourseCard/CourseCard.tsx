import { Star } from 'lucide-react';
import { Course } from '@/types';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const handleClick = () => {
    if (course.url) {
      window.open(course.url, "_blank");
    }
  };

  return (
    <div 
      className={`${styles.card} ${course.url ? styles.clickable : ''}`}
      onClick={course.url ? handleClick : undefined}
    >
      {course.image && (
        <div className={styles.imageContainer}>
          <img 
            src={course.image} 
            alt={course.title} 
            className={styles.image}
            loading="lazy"
          />
        </div>
      )}
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIndex}>{index + 1}</div>
          <div className={styles.ratingBadge}>
            <Star size={12} className={styles.ratingIcon} />
            {course.rating}
          </div>
        </div>
        <h3 className={`${styles.cardTitle} line-clamp-2`}>{course.title}</h3>
        <p className={`${styles.cardDesc} line-clamp-3`}>{course.desc}</p>
      </div>
    </div>
  );
}
