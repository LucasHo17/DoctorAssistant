import axios from 'axios';

const instance = axios.create({
  baseURL: "https://doctorassistant-e0ue.onrender.com" || 'http://127.0.0.1:8000'
,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
