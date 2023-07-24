import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import usePaginate from '../../../hooks/usePaginate';
import { getBookingsLoadingStatus, getUserBookings, removeBooking } from '../../../store/bookings';
import { updateRoomInfo } from '../../../store/rooms';
import Loader from '../../common/loader';
import Pagination from '../../common/pagination';
import BookingRecord from '../../ui/booking/bookingRecord';

const UserBookings = () => {
    const dispatch = useDispatch();
    const userBookings = useSelector(getUserBookings());
    const bookingsLoading = useSelector(getBookingsLoadingStatus());
    const handleBookingRemove = (room, record) => {
        const updatedBookings = room.booking.filter((b) => b._id !== record._id);
        const updatedRoom = { ...room, booking: updatedBookings };
        dispatch(removeBooking(record._id));
        dispatch(updateRoomInfo(updatedRoom));
    };

    const { itemsCrop, currentPage, currentPageSize, setCurrentPage, itemsList } = usePaginate(userBookings || []);
    const count = itemsList.length;

    if (bookingsLoading) {
        return (
            <div className="content loader-content">
                <Loader />
            </div>
        );
    }
    if (itemsCrop) {
        return (
            <div className="user-bookings">
                <h2 className="userpage-title">Мои бронирования</h2>
                {itemsCrop.map((record) => (
                    <BookingRecord record={record} onRemove={handleBookingRemove} key={record._id} />
                ))}
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
    }
};

export default UserBookings;
