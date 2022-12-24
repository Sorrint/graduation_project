import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Portal from './portal';
import { Popper } from 'react-popper';
import { ClickOutside } from './clickOutside';
const Popover = ({ onClose, reference, placement, children }) => {
    const popperRef = useRef();
    return (
        <Portal>
            <ClickOutside reference={popperRef.current} onClickOutside={onClose}>
                <Popper innerRef={popperRef} referenceElement={reference} placement={placement}>
                    {({ ref, style }) => (
                        <div ref={ref} style={style} className="popover">
                            {children}
                        </div>
                    )}
                </Popper>
            </ClickOutside>
        </Portal>
    );
};

Popover.propTypes = {
    onClose: PropTypes.func,
    reference: PropTypes.object,
    placement: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default Popover;
