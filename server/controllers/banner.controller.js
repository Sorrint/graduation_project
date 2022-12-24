import BannerService from '../services/banner.service.js';

const BannerController = {
    getAll: async function (req, res) {
        try {
            const banners = await BannerService.getAll();
            return res.status(200).json(banners);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getOne: async function (req, res) {
        try {
            const banner = await BannerService.getOne(req.params.id);
            return res.status(200).json(banner);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async function (req, res) {
        try {
            const banner = await BannerService.create(req.body);
            res.status(201).json(banner);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default BannerController;
