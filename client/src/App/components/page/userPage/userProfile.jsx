import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById, getUsersLoadingStatus } from '../../../store/users';
import parse from 'html-react-parser';

import { Link } from 'react-router-dom';
import { icons } from '../../../api/icons';
import Loader from '../../common/loader';

const UserProfile = () => {
    const userId = useSelector(getCurrentUserId());
    const currentUser = useSelector(getUserById(userId));
    const usersLoading = useSelector(getUsersLoadingStatus());
    if (usersLoading) {
        return (
            <div className="content loader-content">
                <Loader />
            </div>
        );
    }
    return (
        currentUser && (
            <div className="content user-content">
                <div className="user__card">
                    <div className="user__info">
                        <Link className="user__edit" to={`/booking/users/${userId}/edit`}>
                            <div className="edit-button_abs">{parse(icons.edit)}</div>
                        </Link>

                        <div className="user__avatar">
                            <img src={currentUser.avatar} alt="Аватарка" />
                        </div>
                        <div className="user__username">Имя пользователя: {currentUser.username}</div>
                        <div className="user__email">email: {currentUser.email}</div>
                        <div className="user__sex">Пол: {currentUser.sex === 'male' ? 'мужской' : 'женский'}</div>
                    </div>
                </div>
            </div>
        )
    );
};

UserProfile.propTypes = {
    userId: PropTypes.string
};
export default UserProfile;
