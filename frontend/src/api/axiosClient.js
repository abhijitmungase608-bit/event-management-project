import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eventsphere_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauth and token exists, token expired -> clear storage
      if (localStorage.getItem('eventsphere_token')) {
        localStorage.removeItem('eventsphere_token');
        localStorage.removeItem('eventsphere_user');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
