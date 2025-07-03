import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(async req => {
    let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;

    if (!authTokens) {
        return req;
    }

    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
        req.headers.Authorization = `Bearer ${authTokens.access}`;
        return req;
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: authTokens.refresh
        });

        localStorage.setItem('authTokens', JSON.stringify(response.data));
        
        const newUser = jwtDecode(response.data.access);
        const userWithRole = { ...JSON.parse(localStorage.getItem('user')), ...newUser };
        localStorage.setItem('user', JSON.stringify(userWithRole));
        
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    } catch (error) {
        console.error('Token refresh error:', error);
        window.location.href = '/login';
    }
});

export default axiosInstance;