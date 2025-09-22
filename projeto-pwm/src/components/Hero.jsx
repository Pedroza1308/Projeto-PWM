// src/components/Hero.jsx
import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroLeft}>
        <span className={styles.brand}>ECOS</span>
      </div>
      <div className={styles.heroRight}>
        <div className={styles.heroContent}>
          <h1>GREAT THINGS ARE COMING</h1>
          <Link href="/#playlist" className={styles.ctaButton}>
            Learn More
          </Link>
        </div>
      </div>
      <div className={styles.cornerIcon}>N</div>
    </section>
  );
};

export default Hero;