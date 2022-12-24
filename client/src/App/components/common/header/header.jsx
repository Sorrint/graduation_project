import React from 'react';
import { navBarLinks } from '../../../api/menuItems';
import NavBar from '../../ui/navBar';
import HeaderTop from './headerTop';

const Header = () => {
    return (
        <div className="header">
            <HeaderTop />
            <div className="header__navigation">
                <div className="header__logo"></div>
                <NavBar name="header" itemsList={[...navBarLinks]} />
            </div>
        </div>
    );
};

export default Header;
