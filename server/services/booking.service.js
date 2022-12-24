import Booking from '../models/booking.model.js';

const BookingService = {
    create: async function (data) {
        const createdBooking = await Booking.create(data);
        return createdBooking;
    },
    delete: async function (id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        await Booking.findByIdAndDelete(id);
        return null;
    },
    getAll: async function () {
        const bookings = await Booking.find();
        return bookings;
    },
    getByUserId: async function (userId) {
        if (!userId) {
            throw new Error('не указан ID');
        }
        const booking = await Booking.find({ user: userId });
        return booking;
    }
};

export default BookingService;
