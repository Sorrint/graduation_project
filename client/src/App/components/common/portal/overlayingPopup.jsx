import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Portal from './portal';

const OverlayingPopup = ({ children, onClose, isOpened, wrapperName }) => {
    useEffect(() => {
        if (isOpened) {
            const body = document.querySelector('body');
            body.classList.add('no-scroll');

            return () => {
              body.classList.remove('no-scroll');
            };
        }
      }, [isOpened]);

      if (!isOpened) {
        return null;
    }

    return (
        <Portal>
            <div className={'popup__container' + (wrapperName ? ` popup__${wrapperName}` : '')} role="dialog">
                <div className="popup__overlay" role="button" tabIndex={0} onClick={onClose}></div>
                {children}
            </div>
        </Portal>
    );
};

OverlayingPopup.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onClose: PropTypes.func,
    isOpened: PropTypes.bool,
    wrapperName: PropTypes.string
};
export default OverlayingPopup;
