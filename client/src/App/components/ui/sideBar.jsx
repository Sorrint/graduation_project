import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserData, getCurrentUserId } from '../../store/users';
import parse from 'html-react-parser';
import { icons } from '../../api/icons';
import { Link, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routesPrefix } from '../../routes';

const SideBar = ({ wrapperName, hideBackLink = false, closePopup }) => {
    const { route } = useParams();
    const location = useLocation();
    const currentPath = location.pathname;
    const getClassname = (text) => ('sidebar__item ' + (wrapperName ? ` ${wrapperName}__item` : '') + (text === route ? ' active' : ''));
    const currentUser = useSelector(getCurrentUserData());
    const currentUserId = useSelector(getCurrentUserId());
    const isAdmin = currentUser?.roles.find((role) => role === 'admin');
    const userPath = `/booking/users/${currentUserId}`;

    return (<>
        {currentUser &&
            (<div className={'sidebar' + (wrapperName ? ` sidebar__${wrapperName}` : '')}>
                <ul className='sidebar__links'>
                    {wrapperName && (<li className={`${wrapperName}__item` + (currentPath === `${routesPrefix}/booking` ? ` active` : '')} onClick={closePopup}><Link to="/booking/booking" className={`${wrapperName}__link`} role="button">
                        ЗАБРОНИРОВАТЬ НОМЕР
                    </Link></li>)}
                    <li className={getClassname('profile')} onClick={closePopup}>
                        <Link to={`${userPath}/profile`} className={wrapperName ? `${wrapperName}__link` : 'sidebar__link'}>
                            <span className="sidebar__icon"> {parse(`${icons.profile}`)}</span>
                            <div className="sidebar__text">Мои данные</div>
                        </Link>
                    </li>
                    <li className={getClassname('myBookings')} onClick={closePopup}>
                        <Link to={`${userPath}/myBookings`} className={wrapperName ? `${wrapperName}__link` : 'sidebar__link'}>
                            <span className="sidebar__icon"> {parse(`${icons.bookings}`)}</span>
                            <div className="sidebar__text">Мои бронирования</div>
                        </Link>
                    </li>
                    <li className={getClassname('review')}>
                        <Link to={`${userPath}/review`} className={wrapperName ? `${wrapperName}__link` : 'sidebar__link'} onClick={closePopup}>
                            <span className="sidebar__icon"> {parse(`${icons.review}`)}</span>
                            <div className="sidebar__text">Оставить отзыв</div>
                        </Link>
                    </li>

                    {isAdmin && (
                        <>
                            <li className={getClassname('roomsList')} onClick={closePopup}>
                                <Link to={`${userPath}/roomsList`} className={wrapperName ? `${wrapperName}__link` : 'sidebar__link'}>
                                    <span className="sidebar__icon"> {parse(`${icons.listRooms}`)}</span>
                                    <div className="sidebar__text">Статус номеров</div>
                                </Link>
                            </li>
                            <li className={getClassname('allBookings')}>
                                <Link to={`${userPath}/allBookings`} className={wrapperName ? `${wrapperName}__link` : 'sidebar__link'} onClick={closePopup}>
                                    <span className="sidebar__icon"> {parse(`${icons.allBookings}`)}</span>
                                    <div className="sidebar__text">Список бронирований</div>
                                </Link>
                            </li>
                        </>
                    )}
                    {!hideBackLink && <li className="sidebar__item" >
                        <Link to="/" className={'sidebar__link'}>
                            <span className="sidebar__icon"> {parse(`${icons.toMainPage}`)}</span>
                            <div className="sidebar__text">Вернуться на главную</div>
                        </Link>
                    </li>}
                </ul>
            </div>)}</>)
    ;
};

export default SideBar;

SideBar.propTypes = {
    wrapperName: PropTypes.string,
    hideBackLink: PropTypes.bool,
    closePopup: PropTypes.func
};
