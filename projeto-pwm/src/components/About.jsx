import React from 'react';

const Sobre = () => {
  return (
    <section id="about" className="min-h-screen bg-gray-50 border-t border-b border-gray-200 container mx-auto p-4 md:p-8 text-center flex flex-col justify-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          Sobre o ECOS
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Bem-vindo ao ECOS, o seu universo particular para a criação e gerenciamento de playlists. 
          Nossa missão é fornecer uma plataforma intuitiva e poderosa onde você pode organizar suas músicas favoritas,
          descobrir novos sons com a ajuda da API do Spotify e montar a trilha sonora perfeita para cada momento da sua vida.
          Crie, edite e delete playlists com facilidade e deixe a música fluir.
        </p>
      </div>
    </section>
  );
};

export default Sobre;