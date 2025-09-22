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
          <Link href="/">exemplo</Link>
          <Link href="/subscribe">exemplo</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;