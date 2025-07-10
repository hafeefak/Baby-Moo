import axios from 'axios';
import { clearAuthData, getAuthToken, isAdmin } from '../Utils/Auth';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://localhost:7010/api', // change 7010 to your backend port
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Request interceptor: add JWT token
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // If admin route and not admin, block request
    if (config.url.includes('/admin/') && !isAdmin()) {
      return Promise.reject(new Error('Unauthorized access'));
    }
  }
  return config;
});

// ✅ Response interceptor: handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        clearAuthData();
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        toast.error("You don't have permission");
        window.location.href = "/";
      } else {
        const msg = error.response.data?.message || 'Something went wrong';
        toast.error(msg);
      }
    } else {
      toast.error("Network error - please check your connection");
    }
    return Promise.reject(error);
  }
);

export default api;
