import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Portal from './portal';

const OverlayingPopupDropDown = ({ children, onClose, isOpened }) => {
    if (!isOpened) {
        return null;
    }
    useEffect(() => {
        const body = document.querySelector('body');
        body.classList.add('no-scroll');

        return () => {
          body.classList.remove('no-scroll');
        };
      }, []);

    return (
        <Portal>
            <div className="popup__container_dropdown" role="dialog">
                <div className="popup__overlay" role="button" tabIndex={0} onClick={onClose}></div>
                {children}
            </div>
        </Portal>
    );
};

OverlayingPopupDropDown.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onClose: PropTypes.func,
    isOpened: PropTypes.bool
};
export default OverlayingPopupDropDown;
