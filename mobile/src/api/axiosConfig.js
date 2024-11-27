// src/api/axiosConfig.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ativarLogRequisicoes } from './apiAxiosLog';

// IP Atual = 10.132.224.60 || IP Antigo = 10.132.224.72

const api = axios.create({
    baseURL: 'http://10.132.224.60:3901',
    timeout: 5000 // Ajuste o tempo de espera para 5 segundos (ou mais)
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token recuperado no interceptor:', token); // Adicione esse log
        if (token) {
            // config.headers.Authorization = `Bearer ${token}`;
            config.headers.Authorization = `${token}`;
        }
    } catch (error) {
        console.error('Erro ao recuperar o token:', error);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api

// == Ativando o log do axios
ativarLogRequisicoes(api);