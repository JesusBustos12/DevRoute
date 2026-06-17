'use client';

import styles from './CTASection.module.css';

export default function CTASection() {
  const openChat = () => {
    const chatBtn = document.querySelector<HTMLButtonElement>('[data-chat-trigger]');
    chatBtn?.click();
  };

  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>¿Tienes dudas sobre tu aprendizaje?</h2>
      <p className={styles.ctaText}>
        Nuestro asistente virtual impulsado por IA está listo para responder tus
        preguntas sobre programación, la ruta de aprendizaje y qué tecnologías
        elegir.
      </p>
      <button onClick={openChat} className={styles.ctaButton}>
        Hablar con el Asistente
      </button>
    </section>
  );
}
