// src/api/axiosConfig.js
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearAuthData, getAuthToken } from '../Utils/Auth';

// ✅ Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:7010/api', // Adjust your backend port if needed
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Add Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle responses & errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status;
      const url = error.config?.url || '';

      if (status === 401) {
        // Unauthorized → clear token & redirect to login
        clearAuthData();
        window.location.href = "/userlogin";
      } else if (status === 403) {
        // Forbidden → show toast only for user-triggered actions
        const backgroundUrls = [
          '/users', '/orders/total-products', '/orders/total-revenue', '/products'
        ];
        const isBackground = backgroundUrls.some(u => url.includes(u));
        if (!isBackground) {
          toast.error("You don't have permission to perform this action.");
        }
        // For background calls: just fail silently
      } else if (status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        // Other client errors
        toast.error(error.response.data?.message || 'Something went wrong');
      }
    } else {
      // Network error (e.g., no internet)
      toast.error("Network error - please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
