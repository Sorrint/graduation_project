import httpService from './http.service';

const roomTypesEndPoint = 'roomTypes/';

const roomTypesService = {
    get: async () => {
        const { data } = await httpService.get(roomTypesEndPoint);
        return data;
    }
};

export default roomTypesService;
