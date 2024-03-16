import axios from 'axios';

const BASE_URL = 'https://65f48667f54db27bc021e7c9.mockapi.io';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export default axiosInstance;
