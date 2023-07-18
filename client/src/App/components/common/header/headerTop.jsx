import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsLoggedIn } from '../../../store/users';
import NavProfile from '../navProfile';
import DropDownNavMenu from '../dropDownNavMenu';
import OverlayingPopupDropDown from '../portal/overlayingPopupDropDown';

const HeaderTop = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const [, setPopperElement] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <div className="header__top-bar">
            <div className="header__content container">
                <div className="header__contacts">
                    <div className="header__phone">8 800 700 000</div>
                    <div className="header__mail">mail@hotel.ru</div>
                </div>
                <Link to="/booking/booking" className="header__button header__button_hidden" role="button">
                    ЗАБРОНИРОВАТЬ НОМЕР
                </Link>
                {isLoggedIn ? (
                    <NavProfile />
                ) : (
                    <Link to="/booking/login" className="header__button" role="button">
                            ВОЙТИ/ЗАРЕГИСТРИРОВАТЬСЯ
                    </Link>
                )}
                <button className='header__dropdown' onClick={toggleMenu}>
                    <span/>
                </button>
                {isOpen && (
                    <OverlayingPopupDropDown isOpened={isOpen} onClose={toggleMenu}>
                        <DropDownNavMenu setPopper={setPopperElement}/>
                    </OverlayingPopupDropDown>

                )}
            </div>
        </div>
    );
};

export default HeaderTop;
