import RoomsService from '../services/rooms.service.js';

const RoomController = {
    create: async function (req, res) {
        try {
            const room = await RoomsService.create(req.body);
            res.status(201).json(room);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAll: async function (req, res) {
        try {
            const rooms = await RoomsService.getAll();
            return res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getOne: async function (req, res) {
        try {
            const room = await RoomsService.getOne(req.params.id);
            return res.status(200).json(room);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async function (req, res) {
        try {
            const updatedRoom = await RoomsService.update(req.body);
            return res.status(200).json(updatedRoom);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    delete: async function (req, res) {
        try {
            const room = await RoomsService.delete(req.params.id);
            return res.status(200).json(room);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default RoomController;
