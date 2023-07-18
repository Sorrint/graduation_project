import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminRole, getCurrentUserId, getIsLoggedIn } from '../../store/users';
import { Redirect, Route } from 'react-router-dom';
import { getRooms, loadRoomsList } from '../../store/rooms';
import { loadRoomTypesList } from '../../store/roomTypes';
import { loadIconsList } from '../../store/icons';

const ProtectedRoute = ({ component: Component, children, condition = 'isLoggedIn', pathname = '/booking/login', ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isAdmin = useSelector(getAdminRole());
    const currentUserId = useSelector(getCurrentUserId());
    const conditions = { isLoggedIn, isAdmin };
    const getPathname = currentUserId ? `/booking/users/${currentUserId}${pathname}` : pathname;
    const rooms = useSelector(getRooms());

    if (isLoggedIn && !rooms) {
        const dispatch = useDispatch();
        dispatch(loadRoomsList());
        dispatch(loadRoomTypesList());
        dispatch(loadIconsList());
    }
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!conditions[condition]) {
                    return <Redirect to={{ pathname: getPathname, state: { from: props.location } }} />;
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    condition: PropTypes.string,
    pathname: PropTypes.string
};

export default ProtectedRoute;
