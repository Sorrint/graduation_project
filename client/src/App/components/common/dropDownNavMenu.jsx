import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './navBar';
import { navBarLinks } from '../../api/menuItems';
import SideBar from '../ui/sideBar';

const DropDownNavMenu = ({ setPopper, closePopup }) => {
    return (
        <div className="burger__menu" ref={setPopper}>
            <NavBar name="burger" itemsList={[...navBarLinks]}/>
            <SideBar wrapperName={'burger'} hideBackLink={true} closePopup={closePopup}/>
        </div>
    );
};

DropDownNavMenu.propTypes = {
    setPopper: PropTypes.func,
    closePopup: PropTypes.func
};

export default DropDownNavMenu;
