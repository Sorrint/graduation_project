import Banner from '../models/banner.model.js';

const BannerService = {
    getAll: async function () {
        const banners = await Banner.find();
        return banners;
    },
    getOne: async function (id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const banner = await Banner.findById(id);
        return banner;
    },
    create: async function (banner) {
        const newBanner = await Banner.create(banner);
        return newBanner;
    }
};

export default BannerService;
