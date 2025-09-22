import * as Parse from 'parse';

// Suas chaves de API do Back4app
const APP_ID = 'Bc7Oo5on0izZKr4Zr8GJWr6kZ1v9z0N3B70vRBai'; 
const JAVASCRIPT_KEY = 'rAek0mmuYbQ34Lkaihp01k2EHH5hL3TH4Wx9yTCm';
const SERVER_URL = 'https://parseapi.back4app.com';

// Inicializa o Parse, passando a URL do servidor como uma opção
Parse.initialize(APP_ID, JAVASCRIPT_KEY, { serverURL: SERVER_URL });

export default Parse;