import Parse from 'parse';

// Suas chaves de API do Back4app
const APP_ID = 'mtZbVG1Y9x9ennJXtn9VTlJUDLPHO4c4LLmbel4t'; 
const JAVASCRIPT_KEY = 'Z6vmCFqNPW6Ntj2cgbDK2xNpUeLgH3xvJa6yZBZ0';

// CORREÇÃO: Adicionada a barra "/" no final da URL
const SERVER_URL = 'https://parseapi.back4app.com/';

// CORREÇÃO: A inicialização agora é feita em duas linhas separadas
Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = SERVER_URL;

export default Parse;


