import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadRoomsList } from '../../../store/rooms';
import { loadRoomTypesList } from '../../../store/roomTypes';
import { loadIconsList } from '../../../store/icons';
import { getCurrentUserData } from '../../../store/users';
import { loadCurrentUserBookings, loadBookingsList } from '../../../store/bookings';

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUserData());
    const isAdmin = currentUser?.roles.find((role) => role === 'admin');
    useEffect(() => {
        dispatch(loadRoomsList());
        dispatch(loadRoomTypesList());
        dispatch(loadIconsList());
        if (currentUser) {
            dispatch(loadCurrentUserBookings());
        }

        if (isAdmin) {
            dispatch(loadBookingsList());
        }
    }, [isAdmin, currentUser]);
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AppLoader;
