import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserData, getCurrentUserId } from '../../store/users';
import parse from 'html-react-parser';
import { icons } from '../../api/icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const SideBar = () => {
    const { route } = useParams();
    const getClassname = (text) => (text === route ? 'sidebar__item active' : 'sidebar__item');
    const currentUser = useSelector(getCurrentUserData());
    const currentUserId = useSelector(getCurrentUserId());
    const isAdmin = currentUser?.roles.find((role) => role === 'admin');
    const userPath = `/booking/users/${currentUserId}`;
    return (
        <div className="sidebar">
            <ul className="sidebar__links">
                <li className={getClassname('profile')}>
                    <Link to={`${userPath}/profile`} className="sidebar__link">
                        <span className="sidebar__icon"> {parse(`${icons.profile}`)}</span>
                        <div className="sidebar__text">Мои данные</div>
                    </Link>
                </li>
                <li className={getClassname('myBookings')}>
                    <Link to={`${userPath}/myBookings`} className="sidebar__link">
                        <span className="sidebar__icon"> {parse(`${icons.bookings}`)}</span>
                        <div className="sidebar__text">Мои бронирования</div>
                    </Link>
                </li>
                <li className={getClassname('review')}>
                    <Link to={`${userPath}/review`} className="sidebar__link">
                        <span className="sidebar__icon"> {parse(`${icons.review}`)}</span>
                        <div className="sidebar__text">Оставить отзыв</div>
                    </Link>
                </li>

                {isAdmin && (
                    <>
                        <li className={getClassname('roomsList')}>
                            <Link to={`${userPath}/roomsList`} className="sidebar__link">
                                <span className="sidebar__icon"> {parse(`${icons.listRooms}`)}</span>
                                <div className="sidebar__text">Статус номеров</div>
                            </Link>
                        </li>
                        <li className={getClassname('allBookings')}>
                            <Link to={`${userPath}/allBookings`} className="sidebar__link">
                                <span className="sidebar__icon"> {parse(`${icons.allBookings}`)}</span>
                                <div className="sidebar__text">Список бронирований</div>
                            </Link>
                        </li>
                    </>
                )}
                <li className="sidebar__item">
                    <Link to="/" className="sidebar__link">
                        <span className="sidebar__icon"> {parse(`${icons.toMainPage}`)}</span>
                        <div className="sidebar__text">Вернуться на главную</div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
