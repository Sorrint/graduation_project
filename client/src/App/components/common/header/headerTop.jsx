import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsLoggedIn } from '../../../store/users';
import NavProfile from '../navProfile';

const HeaderTop = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <div className="header__top-bar">
            <div className="header__content">
                <div className="header__contacts">
                    <div className="header__phone">8 800 700 000</div>
                    <div className="header__mail">mail@hotel.ru</div>
                </div>
                <Link to="/booking/booking" className="header__button" role="button">
                    ЗАБРОНИРОВАТЬ НОМЕР
                </Link>
                {isLoggedIn ? (
                    <NavProfile />
                ) : (
                    <Link to="/booking/login">
                        <button className="header__button" role="button">
                            ВОЙТИ/ЗАРЕГИСТРИРОВАТЬСЯ
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HeaderTop;
