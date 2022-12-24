import httpService from './http.service';

const roomsEndPoint = 'rooms/';

const roomsService = {
    get: async () => {
        const { data } = await httpService.get(roomsEndPoint);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.post(roomsEndPoint + payload._id, payload);
        return data;
    }
};

export default roomsService;
