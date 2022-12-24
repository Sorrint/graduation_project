import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RoomStatus = ({ booking, userId, roomId }) => {
    const getClassName = (booking) => (booking.length > 0 ? 'room-status__busy' : 'room-status__free');
    const getText = (booking) =>
        booking.length > 0 ? (
            <Link to={`/users/${userId}/allBookings?roomId=${roomId}`} role="button">
                {'Забронирован'}
            </Link>
        ) : (
            'Свободен'
        );

    return <div className={getClassName(booking)}>{getText(booking)}</div>;
};

RoomStatus.propTypes = {
    booking: PropTypes.array,
    userId: PropTypes.string,
    roomId: PropTypes.string
};
export default RoomStatus;
