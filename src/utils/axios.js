import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'https://fourtrip-server.onrender.com/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token_agents');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token_agents');
      localStorage.removeItem('agent_id');
      const navigate = useNavigate();
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
