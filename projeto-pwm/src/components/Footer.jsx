"use client";

// src/components/Footer.jsx
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const scrollToPlaylist = () => {
    const playlistSection = document.querySelector('[id="playlist"]') || 
                           document.querySelector('.container.mx-auto.p-4');
    if (playlistSection) {
      playlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Seção da marca */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logo}>
              ECOS
            </Link>
            <p className={styles.tagline}>Great Things Are Coming</p>
            <p className={styles.description}>
              Crie e gerencie suas playlists favoritas com a integração do Spotify.
              Descubra novas músicas e organize sua biblioteca musical.
            </p>
          </div>

          {/* Navegação */}
          <div className={styles.linksSection}>
            <h4>Navegação</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><button onClick={scrollToPlaylist} className={styles.linkButton}>Minhas Playlists</button></li>
              <li><Link href="/subscribe">Subscribe</Link></li>
            </ul>
          </div>

          {/* Recursos */}
          <div className={styles.linksSection}>
            <h4>Recursos</h4>
            <ul>
              <li><a href="https://developer.spotify.com/" target="_blank" rel="noopener noreferrer">API Spotify</a></li>
              <li><a href="https://www.back4app.com/" target="_blank" rel="noopener noreferrer">Back4App</a></li>
              <li><a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>

        </div>

        <hr className={styles.divider} />

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>&copy; 2025 ECOS. Todos os direitos reservados.</p>
          <p className={styles.madeWith}>
            Feito com amor para amantes da música • PWM Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;