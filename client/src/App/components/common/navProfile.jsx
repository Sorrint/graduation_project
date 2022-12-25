import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '../../store/users';
import DropDownMenu from './dropDownMenu';
import Popover from './portal/popover';
const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [referenceElement, setReferenceElement] = useState(null);
    const [, setPopperElement] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if (!currentUser) return 'Loading...';
    return (
        <>
            <div className="dropdown">
                <div className="dropdown__profile" onClick={toggleMenu} ref={setReferenceElement}>
                    <div className="dropdown__name">{currentUser.username}</div>
                    <img src={currentUser.avatar} className="dropdown__avatar" alt="" height="40" />
                </div>
            </div>
            {isOpen && (
                <Popover reference={referenceElement} onClose={toggleMenu}>
                    <DropDownMenu setPopper={setPopperElement} currentUser={currentUser} />
                </Popover>
            )}
        </>
    );
};

export default NavProfile;
