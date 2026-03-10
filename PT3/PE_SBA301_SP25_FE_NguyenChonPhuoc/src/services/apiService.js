import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (member) => api.post('/auth/register', member),
};

export const carService = {
    getAll: () => api.get('/cars'),
    create: (car) => api.post('/cars', car),
    update: (id, car) => api.put(`/cars/${id}`, car),
    removeCar: (id) => api.delete(`/cars/${id}`),
};

export const countryService = {
    getAll: () => api.get('/countries'), // Assuming this exists or will be needed
};

export default api;
