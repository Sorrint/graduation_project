// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRoomsLoadingStatus, loadRoomsList } from '../../../store/rooms';
// import { getRoomTypesLoadingStatus, loadRoomTypesList } from '../../../store/roomTypes';
// import { getIconsLoadingStatus, loadIconsList } from '../../../store/icons';
// import { getAdminRole, getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users';
// import { loadCurrentUserBookings, loadBookingsList } from '../../../store/bookings';
// import { getReviewsLoadingStatus, loadReviewsList } from '../../../store/review';

// const AppLoader = ({ children }) => {
//     const dispatch = useDispatch();
//     const isLoggedIn = useSelector(getIsLoggedIn());
//     const usersLoadingStatus = useSelector(getUsersLoadingStatus());
//     const roomsLoadingStatus = useSelector(getRoomsLoadingStatus());
//     const roomTypesLoadingStatus = useSelector(getRoomTypesLoadingStatus());
//     const iconsLoadingStatus = useSelector(getIconsLoadingStatus());
//     const reviewsLoadingStatus = useSelector(getReviewsLoadingStatus());

//     useEffect(() => {
//         dispatch(loadRoomsList());
//         dispatch(loadRoomTypesList());
//         dispatch(loadIconsList());
//         dispatch(loadUsersList());

//         if (isLoggedIn) {
//             dispatch(loadReviewsList());
//             dispatch(loadCurrentUserBookings());

//             const isAdmin = useSelector(getAdminRole());

//             if (isAdmin) {
//                 dispatch(loadBookingsList());
//             }
//         }
//     }, [isLoggedIn]);
//     if (
//         usersLoadingStatus ||
//         roomsLoadingStatus ||
//         roomTypesLoadingStatus ||
//         iconsLoadingStatus ||
//         reviewsLoadingStatus
//     ) {
//         return 'Loading...';
//     }
//     return children;
// };

// AppLoader.propTypes = {
//     children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
// };

// export default AppLoader;
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomsLoadingStatus, loadRoomsList } from '../../../store/rooms';
import { getRoomTypesLoadingStatus, loadRoomTypesList } from '../../../store/roomTypes';
import { getIconsLoadingStatus, loadIconsList } from '../../../store/icons';
import { getCurrentUserData } from '../../../store/users';
import { loadCurrentUserBookings, loadBookingsList } from '../../../store/bookings';

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const roomsStatusLoading = useSelector(getRoomsLoadingStatus());
    const roomTypesLoading = useSelector(getRoomTypesLoadingStatus());
    const iconsStatusLoading = useSelector(getIconsLoadingStatus());
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
    if (roomsStatusLoading || roomTypesLoading || iconsStatusLoading) return 'Loading...';
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AppLoader;
