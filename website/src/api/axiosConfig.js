// src/api/axiosConfig.js

import axios from 'axios';
import { ativarLogRequisicoes } from './apiAxiosLog';
import Swal from 'sweetalert2';

// IP Atual = 10.132.224.60 || IP Antigo = 10.132.224.72

const api = axios.create({
    baseURL: 'http://10.132.224.60:3901',
    timeout: 5000 // Ajuste o tempo de espera para 5 segundos (ou mais)
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await localStorage.getItem('token');
        console.log('Token recuperado no interceptor:', token)
        if (token) {
            // config.headers.Authorization = `Bearer ${token}`
            config.headers.Authorization = `${token}`
        }
    } catch (error) {
        console.error('Erro ao recuperar o token:', error)
    }
    return config;
}, error => {
    return Promise.reject(error)
});


// == Ativando o log do axios
ativarLogRequisicoes(api);

export default api

export const apiUtils = {
    /**
     * 
     * @param {import('axios').AxiosResponse} resp 
     */
    ok: (resp) => {
        return resp.data.sucesso;
    },

    /**
     * 
     * @param {import('axios').AxiosResponse} resp 
     */
    msgErro: (resp) => {
        return resp.data.mensagem;
    }
}

export const alertas =  {
    erro: (titulo, texto) => {
        Swal.fire({
            icon: "error",
            title: titulo,
            text: texto, // Mensagem do Yup
          });
    }
}