import axios from "axios";
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const userService = {
    getProfile: (userId) => apiClient.get(`/users/${userId}`),
    updateRole: (userId, role, profileData) => apiClient.put(`/users/${userId}`, { role, profileData }),
};



apiClient.interceptors.request.use(
    async (config) => {

        const session = await getSession();
        const token = process.env.TOKEN_SECRET;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;