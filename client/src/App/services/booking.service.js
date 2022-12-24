import httpService from './http.service';
import localStorageService from './localStorage.service';

const bookingEndPoint = 'booking/';

const bookingService = {
    get: async () => {
        const { data } = await httpService.get(bookingEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(bookingEndPoint, payload);
        return data;
    },
    getCurrentUserBookings: async () => {
        const { data } = await httpService.get(bookingEndPoint + localStorageService.getUserId());
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(bookingEndPoint + id);
        return data;
    }
};

export default bookingService;
