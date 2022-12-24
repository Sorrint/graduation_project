import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DropDownMenu = ({ setPopper, currentUser }) => {
    return (
        <div className="dropdown__menu" ref={setPopper}>
            <div className="dropdown__item">
                <Link to={`/users/${currentUser._id}/profile`}>Профиль</Link>
            </div>
            <div className="dropdown__item">
                <Link to="/logout">Выйти</Link>
            </div>
        </div>
    );
};

DropDownMenu.propTypes = {
    setPopper: PropTypes.func,
    currentUser: PropTypes.object
};

export default DropDownMenu;
