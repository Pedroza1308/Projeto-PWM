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
        
        <nav className={styles.navMenu}>
          <div className={styles.navLinks}>
            <Link href="/">Home</Link>
            <Link href="/subscribe">Subscribe</Link>
          </div>
          <div className={styles.menuIcon}>☰</div>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;