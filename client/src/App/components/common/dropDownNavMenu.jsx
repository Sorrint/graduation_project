import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './navBar';
import { navBarLinks } from '../../api/menuItems';

const DropDownNavMenu = ({ setPopper }) => {
    return (
        <div className="sidebar__menu" ref={setPopper}>
            <NavBar name="sidebar" itemsList={[...navBarLinks]}/>
        </div>
    );
};

DropDownNavMenu.propTypes = {
    setPopper: PropTypes.func,
    currentUser: PropTypes.object
};

export default DropDownNavMenu;
