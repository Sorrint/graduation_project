import httpService from './http.service';

const iconsEndPoint = 'icons/';

const iconsService = {
    get: async () => {
        const { data } = await httpService.get(iconsEndPoint);
        return data;
    }
};

export default iconsService;
