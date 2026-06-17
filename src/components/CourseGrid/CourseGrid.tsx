import { Course } from '@/types';
import CourseCard from '@/components/CourseCard/CourseCard';
import styles from './CourseGrid.module.css';

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <section className={styles.grid}>
      {courses.map((course, idx) => (
        <CourseCard key={idx} course={course} index={idx} />
      ))}
    </section>
  );
}
