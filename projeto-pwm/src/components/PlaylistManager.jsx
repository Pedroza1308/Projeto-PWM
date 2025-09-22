"use client";

import React, { useState, useEffect } from 'react';
import Parse from '../utils/parseConfig';

function PlaylistManager() {
  // ---------------- Estados do Componente ----------------
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [loading, setLoading] = useState(false);

  // Novos estados para os campos da música
  const [newSong, setNewSong] = useState({
    nome_musica: '',
    artista: '',
    duracao: '',
    album: ''
  });

  // ---------------- Operação R (Read - Ler) ----------------
  const fetchPlaylists = async () => {
    setLoading(true);
    const Playlist = Parse.Object.extend('Playlist');
    const query = new Parse.Query(Playlist);
    
    try {
      const results = await query.find();
      const fetchedPlaylists = results.map(obj => ({
        id: obj.id,
        name: obj.get('name'),
        songs: obj.get('songs') || [],
        parseObject: obj,
      }));
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      console.error('Erro ao buscar as playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  // ---------------- Operação C (Create - Criar) ----------------
  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!playlistName) {
      alert('Por favor, insira um nome para a playlist.');
      return;
    }
    setLoading(true);
    
    const Playlist = Parse.Object.extend('Playlist');
    const newPlaylist = new Playlist();
    
    try {
      newPlaylist.set('name', playlistName);
      newPlaylist.set('songs', []); // A nova playlist começa sem músicas
      await newPlaylist.save();
      
      console.log('Playlist criada com sucesso!');
      setPlaylistName('');
      fetchPlaylists();
    } catch (error) {
      console.error('Erro ao criar a playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Operação U (Update - Atualizar) ----------------
  const handleAddSong = async (playlistId) => {
    if (!newSong.nome_musica || !newSong.artista) {
      alert('Nome da música e artista são obrigatórios!');
      return;
    }
    setLoading(true);
    
    const playlistToUpdate = playlists.find(p => p.id === playlistId);
    if (!playlistToUpdate) return;
    
    try {
      // Adiciona o novo objeto de música ao array
      playlistToUpdate.parseObject.add('songs', newSong);
      await playlistToUpdate.parseObject.save();
      
      console.log('Música adicionada com sucesso!');
      setNewSong({ nome_musica: '', artista: '', duracao: '', album: '' }); // Limpa os campos
      fetchPlaylists();
    } catch (error) {
      console.error('Erro ao adicionar a música:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Operação D (Delete - Deletar) ----------------
  const handleDeletePlaylist = async (playlistId) => {
    if (!window.confirm("Tem certeza que quer deletar esta playlist?")) return;
    setLoading(true);
    
    const playlistToDelete = playlists.find(p => p.id === playlistId);
    if (!playlistToDelete) return;
    
    try {
      await playlistToDelete.parseObject.destroy();
      console.log('Playlist deletada com sucesso!');
      fetchPlaylists();
    } catch (error) {
      console.error('Erro ao deletar a playlist:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // ---------------- Renderização da UI ----------------
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Minhas Playlists de Música</h1>
      
      {/* Formulário para criar uma nova playlist */}
      <form onSubmit={handleCreatePlaylist} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Criar Nova Playlist</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Nome da Playlist"
            disabled={loading}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          />
          <button type="submit" disabled={loading} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300">
            {loading ? 'Carregando...' : 'Criar Playlist'}
          </button>
        </div>
      </form>

      <hr className="my-8" />
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Playlists Existentes</h2>
      {loading ? (
        <p className="text-gray-500">Carregando playlists...</p>
      ) : playlists.length === 0 ? (
        <p className="text-gray-500">Nenhuma playlist encontrada. Crie uma nova!</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map(playlist => (
            <li key={playlist.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">{playlist.name}</h4>
                
                {/* Formulário para adicionar música */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-sm font-medium mb-2">Adicionar nova música:</p>
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    <input
                      type="text"
                      value={newSong.nome_musica}
                      onChange={(e) => setNewSong({...newSong, nome_musica: e.target.value})}
                      placeholder="Nome da Música"
                      disabled={loading}
                      className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={newSong.artista}
                      onChange={(e) => setNewSong({...newSong, artista: e.target.value})}
                      placeholder="Artista"
                      disabled={loading}
                      className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={newSong.duracao}
                      onChange={(e) => setNewSong({...newSong, duracao: e.target.value})}
                      placeholder="Duração (ex: 3:45)"
                      disabled={loading}
                      className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={newSong.album}
                      onChange={(e) => setNewSong({...newSong, album: e.target.value})}
                      placeholder="Álbum"
                      disabled={loading}
                      className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button onClick={() => handleAddSong(playlist.id)} disabled={loading} className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 disabled:bg-green-300">
                    Adicionar
                  </button>
                </div>
              </div>

              {/* Lista de músicas */}
              <ul className="mt-4">
                {playlist.songs.length > 0 ? (
                  playlist.songs.map((song, index) => (
                    <li key={index} className="text-sm text-gray-600 border-t border-gray-200 pt-2 mt-2">
                      <strong>{song.nome_musica}</strong> - {song.artista}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">Nenhuma música nesta playlist.</li>
                )}
              </ul>

              <button onClick={() => handleDeletePlaylist(playlist.id)} disabled={loading} className="w-full mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 disabled:bg-red-300">
                Deletar Playlist
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlaylistManager;