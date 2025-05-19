import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle different error codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden
          throw new Error('Access denied');
        case 404:
          // Handle not found
          throw new Error('Resource not found');
        case 500:
          // Handle server error
          throw new Error('Internal server error');
        default:
          throw error;
      }
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
  search: (query) => api.get(`/products/search?query=${query}`)
};

// Cart API
export const cartApi = {
  getCart: () => api.get('/cart'),
  addToCart: (product, quantity) => api.post('/cart', { product, quantity }),
  updateCart: (id, quantity) => api.put(`/cart/${id}`, { quantity }),
  removeFromCart: (id) => api.delete(`/cart/${id}`),
  clearCart: () => api.delete('/cart')
};

// Orders API
export const ordersApi = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrder: (id, orderData) => api.put(`/orders/${id}`, orderData)
};

// Auth API
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh-token')
};

// Utility functions
export const handleError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      success: false,
      error: error.response.data.message || 'An error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // Request made but no response
    return {
      success: false,
      error: 'No response from server',
      status: 0
    };
  } else {
    // Error in setting up the request
    return {
      success: false,
      error: error.message || 'An error occurred',
      status: 0
    };
  }
};

export const handleSuccess = (response) => ({
  success: true,
  data: response.data,
  status: response.status
});

export default api;
