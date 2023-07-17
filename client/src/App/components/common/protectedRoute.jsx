import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getAdminRole, getCurrentUserId, getIsLoggedIn } from '../../store/users';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, children, condition = 'isLoggedIn', pathname = '/booking/login', ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isAdmin = useSelector(getAdminRole());
    const currentUserId = useSelector(getCurrentUserId());
    const conditions = { isLoggedIn, isAdmin };
    const getPathname = currentUserId ? `/booking/users/${currentUserId}${pathname}` : pathname;

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
