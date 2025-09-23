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
          <h1>Onde suas playlists ganham vida.</h1>
          
        </div>
      </div>
      <div className={styles.cornerIcon}>N</div>
    </section>
  );
};

export default Hero;