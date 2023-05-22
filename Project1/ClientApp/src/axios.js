import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:44495/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    timeout: 5000,
  },
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
