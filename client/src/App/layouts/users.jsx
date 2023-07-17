import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom';
import { getRoutes } from '../App';
import UserPage from '../components/page/userPage';
import AppLoader from '../components/ui/hoc/appLoader';
import { userRoutes } from '../routes';
import { getCurrentUserId } from '../store/users';

const Users = () => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const userPath = `/booking/users/${currentUserId}`;
    const changedRoutes = userRoutes.map((route) => {
        route.path = userPath + route.pathname;
        return route;
    });
    return (
        <AppLoader>
            <UserPage>
                <Switch>
                    {currentUserId && getRoutes(changedRoutes)}
                    {currentUserId !== userId && <Redirect to={`${userPath}/profile`} />}
                    <Redirect to={`${userPath}/profile`} />
                </Switch>
            </UserPage>
        </AppLoader>
    );
};

export default Users;
