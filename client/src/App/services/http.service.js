import axios from 'axios';
import configFile from '../config.json';
import authService from './auth.service';
import localStorageService from './localStorage.service';

const http = axios.create({
    baseURL: configFile.apiEndPoint
});

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        if (refreshToken && expiresDate < Date.now()) {
            const data = await authService.refresh();
            localStorageService.setTokens(data);
        }

        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
        }
        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => {
        return res;
    },
    function (error) {
        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};

export default httpService;
