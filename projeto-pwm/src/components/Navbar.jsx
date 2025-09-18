// src/components/Navbar/Navbar.jsx

import Link from 'next/link';
import Image from 'next/image'; // <-- 1. Importe o componente Image
import styles from './Navbar.module.css';

// 2. Importe a sua imagem


const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        
       
        <Link href="/" className={styles.logo}>
          <Image
            
           
            src="/assets/logo-ecos.png" 
            
            width={90}
            height={36}
            priority
          />
        </Link>
        
        <nav className={styles.navLinks}>
          <ul>
            <li>
              <Link href="/">Início</Link>
            </li>
            <li>
              <Link href="/conceito">Conceito</Link>
            </li>
            <li>
              <Link href="/playlists">Playlists</Link>
            </li>
          </ul>
        </nav>
        
        <Link href="/signup" className={styles.ctaButton}>
          Comece a Ouvir
        </Link>

      </div>
    </header>
  );
};

export default Navbar;