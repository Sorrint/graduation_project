import RoomTypeService from '../services/roomType.service.js';

const RoomTypeController = {
    getAll: async function (req, res) {
        try {
            const roomTypes = await RoomTypeService.getAll();
            return res.status(200).json(roomTypes);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default RoomTypeController;
