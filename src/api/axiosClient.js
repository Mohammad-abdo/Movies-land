import axios from 'axios';
import querystring from 'query-string';
import apiConfig from './api';

const axiosClient = axios.create({
    baseURL: apiConfig.baseurl,
    headers: {
        'Content-Type': 'application/json'
    },
    params: {
        api_key: apiConfig.apiKey
    },
    paramsSerializer: params => querystring.stringify({ ...params, api_key: apiConfig.apiKey })
});

axiosClient.interceptors.request.use(
    async (config) => {
        if (!apiConfig.apiKey) {
            console.error('TMDB API Key is missing. Please set REACT_APP_TMDB_API_KEY in your .env file');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (res) => {
        if (res && res.data) {
            return res.data;
        }
        return res;
    },
    (error) => {
        const errorMessage = error.response?.data?.status_message || error.message || 'An error occurred';
        console.error('API Error:', errorMessage);
        return Promise.reject(error);
    }
);

export default axiosClient;