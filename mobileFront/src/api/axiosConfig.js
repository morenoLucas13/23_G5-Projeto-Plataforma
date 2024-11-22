// src/api/axiosConfig.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
    baseURL: 'http://10.132.224.72:3901'
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    } catch (error) {
        console.error('Erro ao recuperar o token:', error)
    }
    return config;
}, error => {
    return Promise.reject(error)
});

export default api
