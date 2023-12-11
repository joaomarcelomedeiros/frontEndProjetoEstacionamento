// src/api.ts
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9001', // Substitua pela sua URL de API
  timeout: 5000, // Configuração de timeout, se necessário
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
