import localStorageService from './localStorage.service';
import axios from 'axios';
import configFile from '../config.json';

const httpAuth = axios.create({
    baseURL: configFile.apiEndPoint + '/auth'
});
const authService = {
    register: async (userData) => {
        const { data } = await httpAuth.post('signup', { ...userData });
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post('login', { email, password });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post('token', {
            refreshToken: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
