import React from 'react';
import PropTypes from 'prop-types';
import RenderPrice from '../../common/booking/bookingFields/price';
import Table from '../../common/table/table';
import { updateRoomInfo } from '../../../store/rooms';
import BookingDate from '../../common/booking/bookingDate';
import RenderGuests from '../../common/booking/bookingFields/guests';
import RenderNights from '../../common/booking/bookingFields/nights';
import _ from 'lodash';
import { removeBooking } from '../../../store/bookings';

const BookingsTable = ({ bookings, sortBy, setSortBy, users, rooms, dispatch }) => {
    const handleSort = (item) => {
        setSortBy(item);
    };

    const getUserName = (userId) => {
        const currentUser = users.find((user) => (user._id === userId ? user : null));
        if (currentUser) {
            return currentUser.username;
        }
        return null;
    };
    const getRoomName = (roomId) => {
        const currentRoom = rooms.find((room) => (room._id === roomId ? room : null));
        if (currentRoom) {
            return currentRoom.name;
        }
        return null;
    };

    const transformData = (data) =>
        data.map((booking) => {
            const user = getUserName(booking.user);
            const choosenNumber = getRoomName(booking.choosenNumber);
            const arrivalDate = booking.bookingRange[0];
            const departureDate = booking.bookingRange[1];
            return { ...booking, user, choosenNumberTitle: choosenNumber, arrivalDate, departureDate };
        });

    const handleBookingRemove = (bookingId, roomId) => {
        const room = rooms.find((r) => r._id === roomId);
        const updatedBookings = room.booking.filter((b) => b._id !== bookingId);
        const updatedRoom = { ...room, booking: updatedBookings };
        dispatch(removeBooking(bookingId));
        dispatch(updateRoomInfo(updatedRoom));
    };

    const bookingData = transformData(bookings);
    const sortedBookings = _.orderBy(bookingData, [sortBy.path], [sortBy.order]);

    const columns = {
        bookingNumber: { name: '№', path: 'bookingNumber' },
        client: { name: 'Клиент', path: 'user' },
        room: { name: 'Комната', path: 'choosenNumberTitle' },

        arrivalDate: {
            name: 'Дата заезда',
            component: ({ bookingRange }) => <BookingDate date={bookingRange[0]} />,
            path: 'arrivalDate'
        },
        departureDate: {
            name: 'Дата отъезда',
            component: ({ bookingRange }) => <BookingDate date={bookingRange[1]} />,
            path: 'departureDate'
        },
        numberOfGuests: {
            name: 'Число гостей/ночей',
            component: ({ numberOfPersons, countDays }) => (
                <>
                    <RenderGuests numberOfGuests={numberOfPersons} /> / <RenderNights {...{ countDays }} />
                </>
            )
        },
        price: { name: 'Стоимость', component: ({ price }) => <RenderPrice cost={price} /> },
        delete: {
            name: '',
            component: ({ _id, choosenNumber }) => (
                <button className="remove-button" onClick={() => handleBookingRemove(_id, choosenNumber)}></button>
            )
        }
    };
    return (
        bookings && (
            <Table
                data={sortedBookings}
                columns={columns}
                onSort={handleSort}
                tableName="bookings-table"
                selectedSort={sortBy}
            />
        )
    );
};

BookingsTable.propTypes = {
    bookings: PropTypes.array,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    sortBy: PropTypes.object,
    setSortBy: PropTypes.func,
    users: PropTypes.array,
    rooms: PropTypes.array,
    dispatch: PropTypes.func
};

export default BookingsTable;
