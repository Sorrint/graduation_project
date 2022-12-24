import httpService from './http.service';

const bannerEndPoint = 'banners/';

const bannerService = {
    get: async () => {
        const { data } = await httpService.get(bannerEndPoint);
        return data;
    }
};

export default bannerService;
