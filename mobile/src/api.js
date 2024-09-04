import axios from 'axios';

axios.defaults.timeout = 3000;

export const urlBase = 'http://10.132.224.13:3313';

// Função que executa os métodos HTTP do AXIOS com 
// a configuração de endereço da API

// Requisita a permissão para que o usuário realize inserções na contagem
export function requisitarPost(url, obj) {
    return axios.post(urlBase + url, obj);
}

// Requisita a permissão para que o usuário exiba os lançamentos das contagens e/ou turmas
export function requisitarGet(url, config) {
    return axios.get(urlBase + url, config);
}