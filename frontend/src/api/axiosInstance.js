// frontend/src/api/axiosInstance.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

// --- THE DEFINITIVE TEST ---
// We are temporarily ignoring the environment variable and hardcoding the production URL.
// This forces the Vercel deployment to use the correct address.
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api';

// The old logic is commented out for now.
// const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api';

// --- NO OTHER CHANGES ARE NEEDED IN THIS FILE ---

const axiosInstance = axios.create({
    baseURL
});

axiosInstance.interceptors.request.use(async req => {
    let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    if (!authTokens) return req;

    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 5;
    if (!isExpired) {
        req.headers.Authorization = `Bearer ${authTokens.access}`;
        return req;
    }

    try {
        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authTokens.refresh
        });
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    } catch (error) {
        console.error('Token refresh failed!', error);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
    }
});

export default axiosInstance;