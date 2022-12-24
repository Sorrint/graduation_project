import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = ({ name, itemsList }) => {
    return (
        <div className={`${name}__links`}>
            {itemsList &&
                itemsList.map((item) => (
                    <Link to={item.path} className="header__link" key={item.name}>
                        {item.text.toUpperCase()}
                    </Link>
                ))}
        </div>
    );
};

NavBar.propTypes = {
    name: PropTypes.string,
    itemsList: PropTypes.array
};

export default NavBar;
