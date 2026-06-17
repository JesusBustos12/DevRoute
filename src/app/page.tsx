"use client";

import { useState } from 'react';
import Header from '@/components/Header/Header';
import HeroSection from '@/components/HeroSection/HeroSection';
import CourseGrid from '@/components/CourseGrid/CourseGrid';
import CTASection from '@/components/CTASection/CTASection';
import Chatbot from '@/components/Chatbot/Chatbot';
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';
import { courses } from '@/data/courses';
import styles from './page.module.css';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.categories?.includes(selectedCategory);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.page}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <HeroSection selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          <CourseGrid courses={filteredCourses} />
          <CTASection />
        </div>
      </main>
      <Chatbot />
      <ScrollToTopButton />
    </div>
  );
}
