import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getRoomTypeById, getRoomTypesLoadingStatus } from '../../../store/roomTypes';

const RoomType = ({ id }) => {
    const roomType = useSelector(getRoomTypeById(id));
    const isLoading = useSelector(getRoomTypesLoadingStatus());

    if (!isLoading) {
        return <>{roomType.name}</>;
    } else {
        return 'Loading...';
    }
};

RoomType.propTypes = {
    id: PropTypes.string
};

export default RoomType;
