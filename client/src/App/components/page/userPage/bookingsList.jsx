import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsList, getBookingsLoadingStatus } from '../../../store/bookings';
import { getRooms, getRoomsLoadingStatus } from '../../../store/rooms';
import { getUsersList, getUsersLoadingStatus } from '../../../store/users';

import BookingsTable from '../../ui/booking/bookingsTable';
import BookingsTableSettings from '../../ui/booking/bookingsTableSettings';
import qs from 'query-string';
import usePaginate from '../../../hooks/usePaginate';
import Pagination from '../../common/pagination';
import Loader from '../../common/loader';

const BookingsList = () => {
    const [selectedUser, setSelectedUser] = useState();
    const [selectedRoom, setSelectedRoom] = useState();
    const [sortBy, setSortBy] = useState({ path: 'bookingNumber', order: 'asc' });

    useEffect(() => {
        const { roomId } = qs.parse(location.search);
        if (roomId) setSelectedRoom(roomId);
    }, []);

    const bookings = useSelector(getBookingsList());
    const users = useSelector(getUsersList());
    const rooms = useSelector(getRooms());

    const bookingsLoading = useSelector(getBookingsLoadingStatus());
    const usersLoading = useSelector(getUsersLoadingStatus());
    const roomsLoading = useSelector(getRoomsLoadingStatus());

    const dispatch = useDispatch();

    function filterBookings(data) {
        const filterByDate = data.filter((booking) => new Date(booking.bookingRange[1]) > Date.now());
        const filterByRoom = selectedRoom
            ? filterByDate.filter((booking) => booking.choosenNumber === selectedRoom)
            : filterByDate;
        const filterByUser = selectedUser
            ? filterByRoom.filter((booking) => booking.user === selectedUser)
            : filterByRoom;
        return filterByUser;
    }

    const filteredBookings = filterBookings(bookings || []);
    const count = filteredBookings.length;
    const { itemsCrop, currentPage, currentPageSize, setCurrentPage } = usePaginate(filteredBookings || []);

    if (bookingsLoading || usersLoading || roomsLoading) {
        return (
            <div className="content loader-content">
                <Loader />
            </div>
        );
    }
    return (
        <div className="admin-panel">
            <h1 className="admin-panel__title">Список бронирований</h1>
            <BookingsTableSettings
                setUser={(target) => setSelectedUser(target.value)}
                setRoom={(target) => setSelectedRoom(target.value)}
                selectedRoom={selectedRoom}
                users={users}
                rooms={rooms}
                dispatch={dispatch}
            />
            <BookingsTable bookings={itemsCrop} sortBy={sortBy} setSortBy={setSortBy} users={users} rooms={rooms} />
            {count > 0 && (
                <div className="pagination__container">
                    <Pagination
                        itemCount={count}
                        pageSize={currentPageSize}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default BookingsList;
