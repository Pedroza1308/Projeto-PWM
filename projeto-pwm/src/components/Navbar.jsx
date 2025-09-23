// src/components/Navbar.jsx
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          ECOS
        </Link>
        <nav className={styles.navLinks}>
          <a href="#about">Conheça</a>
          <a href="#criar">Crie</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;