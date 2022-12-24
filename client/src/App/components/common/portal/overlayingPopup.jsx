import React from 'react';
import PropTypes from 'prop-types';
import Portal from './portal';

const OverlayingPopup = ({ children, onClose, isOpened }) => {
    if (!isOpened) {
        return null;
    }
    return (
        <Portal>
            <div className="popup__container" role="dialog">
                <div className="popup__overlay" role="button" tabIndex={0} onClick={onClose}></div>
                {children}
            </div>
        </Portal>
    );
};

OverlayingPopup.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onClose: PropTypes.func,
    isOpened: PropTypes.bool
};
export default OverlayingPopup;
