import BookingService from '../services/booking.service.js';
import CounterService from '../services/counter.service.js';
import RoomsService from '../services/rooms.service.js';

const BookingController = {
    getAll: async function (req, res) {
        try {
            const bookings = await BookingService.getAll(req.body);
            return res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async function (req, res) {
        try {
            const autoInc = await CounterService.update();
            const bookingInfo = { ...req.body, bookingNumber: autoInc };
            const newBooking = await BookingService.create(bookingInfo);
            const { choosenNumber, bookingRange } = newBooking;
            const currentRoom = await RoomsService.getOne(choosenNumber);
            currentRoom.booking.push({ _id: newBooking._id, bookingRange });
            const updatedRoom = await RoomsService.update(currentRoom);
            return res.status(201).json({ newBooking, updatedRoom });
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    delete: async function (req, res) {
        try {
            const { id } = req.params;
            const updatedBooking = await BookingService.delete(id);
            return res.status(200).json(updatedBooking);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getByUserId: async function (req, res) {
        try {
            const { userId } = req.params;
            const bookings = await BookingService.getByUserId(userId);
            return res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
};

export default BookingController;
