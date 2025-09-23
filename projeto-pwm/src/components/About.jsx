
import React from 'react';
import styles from './About.module.css';

const Sobre = () => {
  return (
    
    <section id="about" className={`${styles.sobreSection} container mx-auto p-4 md:p-8 text-center`}>
      <h2 className={`${styles.sobreTitle} text-3xl font-bold mb-6`}>
        Sobre o ECOS
      </h2>
      <p className={`${styles.sobreText} text-gray-600 max-w-2xl mx-auto`}>
        Bem-vindo ao ECOS, o seu universo particular para a criação e gerenciamento de playlists. 
        Nossa missão é fornecer uma plataforma intuitiva e poderosa onde você pode organizar suas músicas favoritas,
        descobrir novos sons com a ajuda da API do Spotify e montar a trilha sonora perfeita para cada momento da sua vida.
        Crie, edite e delete playlists com facilidade e deixe a música fluir.
      </p>
    </section>
  );
};

export default Sobre;