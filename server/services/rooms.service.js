import Room from '../models/room.model.js';

const RoomsService = {
    create: async function (room) {
        const createdRoom = await Room.create(room);
        return createdRoom;
    },

    getAll: async function () {
        const rooms = await Room.find();
        return rooms;
    },
    getOne: async function (id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const room = await Room.findById(id);
        return room;
    },
    update: async function (room) {
        if (!room._id) {
            throw new Error('не указан ID');
        }
        const updatedRoom = await Room.findByIdAndUpdate(room._id, room, { new: true });
        return updatedRoom;
    },
    delete: async function (id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const room = await Room.findByIdAndDelete(id);
        return room;
    }
};

export default RoomsService;
