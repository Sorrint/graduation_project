import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = ({ name, itemsList }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const getClassname = (text) => (`${name}__item` + (text === currentPath ? ` active` : ''));
    return (
        <div className={`${name}__links`}>
            {itemsList &&
                itemsList.map((item) => (
                    <div className={getClassname(item.path)} key={item.name}>
                        <NavLink to={item.path} className={`${name}__link`} >
                            {item.text.toUpperCase()}
                        </NavLink>
                    </div>
                ))}
        </div>
    );
};

NavBar.propTypes = {
    name: PropTypes.string,
    itemsList: PropTypes.array
};

export default NavBar;
