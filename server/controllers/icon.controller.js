import IconService from '../services/icon.service.js';

const IconController = {
    create: async function (req, res) {
        try {
            const icon = await IconService.create(req.body);
            res.status(201).json(icon);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAll: async function (req, res) {
        try {
            const icons = await IconService.getAll();
            return res.status(200).json(icons);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getOne: async function (req, res) {
        try {
            const icon = await IconService.getOne(req.params.id);
            return res.status(200).json(icon);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async function (req, res) {
        try {
            const updatedRoom = await IconService.update(req.body);
            return res.status(200).json(updatedRoom);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    delete: async function (req, res) {
        try {
            const icon = await IconService.delete(req.params.id);
            return res.status(200).json(icon);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default IconController;
