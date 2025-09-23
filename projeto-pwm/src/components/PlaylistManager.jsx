"use client";

import React, { useState, useEffect } from 'react';
import Parse from '../utils/parseConfig';

// Suas credenciais do Spotify
const SPOTIFY_CLIENT_ID = 'db7158a2109340699ca7e6944c80d8c3';
const SPOTIFY_CLIENT_SECRET = 'bb5097db4e8d4c178c2845c7be074229';

function PlaylistManager() {
    // ---------------- Estados do Componente ----------------
    const [playlists, setPlaylists] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [spotifyToken, setSpotifyToken] = useState('');
    
    const [editingSong, setEditingSong] = useState(null);

    // ---------------- Autenticação com a API do Spotify ----------------
    const getSpotifyToken = async () => {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
                },
                body: 'grant_type=client_credentials'
            });
            const data = await response.json();
            setSpotifyToken(data.access_token);
        } catch (error) {
            console.error('Erro ao obter o token do Spotify:', error);
        }
    };

    useEffect(() => {
        getSpotifyToken();
        fetchPlaylists();
    }, []);

    // ---------------- Busca de Músicas no Spotify ----------------
    const handleSearchSpotify = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        setLoading(true);

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=10`, {
                headers: {
                    'Authorization': `Bearer ${spotifyToken}`
                }
            });
            const data = await response.json();
            setSearchResults(data.tracks.items);
        } catch (error) {
            console.error('Erro ao buscar músicas no Spotify:', error);
        } finally {
            setLoading(false);
        }
    };

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
            newPlaylist.set('songs', []);
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

    // ---------------- Operação U (Update - Atualizar) ----------------
    const handleAddSong = async (playlistId, song) => {
        setLoading(true);
        
        const playlistToUpdate = playlists.find(p => p.id === playlistId);
        if (!playlistToUpdate) return;
        
        const songData = {
            nome_musica: song.name,
            artista: song.artists.map(artist => artist.name).join(', '),
            duracao: `${Math.floor(song.duration_ms / 60000)}:${('0' + Math.floor((song.duration_ms % 60000) / 1000)).slice(-2)}`,
            album: song.album.name
        };

        try {
            playlistToUpdate.parseObject.add('songs', songData);
            await playlistToUpdate.parseObject.save();
            
            console.log('Música adicionada com sucesso!');
            fetchPlaylists();
            
            // -------- AQUI É ONDE ESTÁ A ALTERAÇÃO --------
            setSearchResults([]); // Limpa os resultados da busca
            setSearchTerm(''); // Limpa o termo de busca também, para ficar mais limpo
            
        } catch (error) {
            console.error('Erro ao adicionar a música:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSong = async (playlistId, songIndex, updatedSongData) => {
        setLoading(true);

        try {
            const playlistToUpdate = playlists.find(p => p.id === playlistId);
            if (!playlistToUpdate) {
                console.error('Playlist não encontrada!');
                return;
            }

            const updatedSongs = [...playlistToUpdate.songs];
            updatedSongs[songIndex] = updatedSongData;

            playlistToUpdate.parseObject.set('songs', updatedSongs);
            await playlistToUpdate.parseObject.save();

            console.log('Música atualizada com sucesso!');
            setEditingSong(null);
            fetchPlaylists();
        } catch (error) {
            console.error('Erro ao atualizar a música:', error);
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

    const handleDeleteSong = async (playlistId, songIndex) => {
        if (!window.confirm("Tem certeza que deseja remover esta música da playlist?")) return;
        setLoading(true);
    
        try {
            const playlistToUpdate = playlists.find(p => p.id === playlistId);
            if (!playlistToUpdate) {
                console.error('Playlist não encontrada!');
                return;
            }
    
            const updatedSongs = [...playlistToUpdate.songs];
            updatedSongs.splice(songIndex, 1);
    
            playlistToUpdate.parseObject.set('songs', updatedSongs);
            await playlistToUpdate.parseObject.save();
    
            console.log('Música removida com sucesso!');
            fetchPlaylists();
        } catch (error) {
            console.error('Erro ao remover a música:', error);
        } finally {
            setLoading(false);
        }
    };

    // ---------------- Renderização da UI ----------------
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Minhas Playlists de Música</h1>
            
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
            
            <form onSubmit={handleSearchSpotify} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Buscar Músicas no Spotify</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Nome da Música ou Artista"
                        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                        Buscar
                    </button>
                </div>
            </form>

            {searchResults.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultados da Busca</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map(track => (
                            <li key={track.id} className="bg-white p-4 rounded-lg shadow-md">
                                <p><strong>{track.name}</strong></p>
                                <p>{track.artists.map(artist => artist.name).join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

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
                                
                                <ul className="mt-4">
                                    {playlist.songs.length > 0 ? (
                                        playlist.songs.map((song, index) => (
                                            <li key={index} className="text-sm text-gray-600 border-t border-gray-200 pt-2 mt-2">
                                                {editingSong && editingSong.index === index && editingSong.playlistId === playlist.id ? (
                                                    <div className="flex flex-col gap-2">
                                                        <input
                                                            type="text"
                                                            value={editingSong.nome_musica}
                                                            onChange={(e) => setEditingSong({ ...editingSong, nome_musica: e.target.value })}
                                                            className="p-1 border rounded"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={editingSong.artista}
                                                            onChange={(e) => setEditingSong({ ...editingSong, artista: e.target.value })}
                                                            className="p-1 border rounded"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleUpdateSong(playlist.id, index, editingSong)}
                                                                className="bg-green-500 text-white font-bold py-1 px-2 rounded text-xs"
                                                            >
                                                                Salvar
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingSong(null)}
                                                                className="bg-gray-400 text-white font-bold py-1 px-2 rounded text-xs"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <strong>{song.nome_musica}</strong> - {song.artista}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => setEditingSong({ ...song, index, playlistId: playlist.id })}
                                                                className="text-blue-500 hover:text-blue-700 transition duration-300"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteSong(playlist.id, index)}
                                                                className="text-red-500 hover:text-red-700 transition duration-300"
                                                            >
                                                                Excluir
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-500">Nenhuma música nesta playlist.</li>
                                    )}
                                </ul>

                                {searchResults.length > 0 && (
                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <p className="text-sm font-medium mb-2">Adicionar música à playlist "{playlist.name}":</p>
                                        <ul className="max-h-40 overflow-y-auto">
                                            {searchResults.map(track => (
                                                <li key={track.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
                                                    <div>
                                                        <p className="text-sm font-semibold">{track.name}</p>
                                                        <p className="text-xs text-gray-500">{track.artists.map(a => a.name).join(', ')}</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleAddSong(playlist.id, track)} 
                                                        className="bg-blue-500 text-white font-bold py-1 px-2 rounded-md text-xs hover:bg-blue-600 transition duration-300"
                                                    >
                                                        +
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

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