import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import useHover from '../../../hooks/useHover';

const RoomCard = ({ options, data, wrapperName }) => {
    const ref = useRef();
    const isHovering = useHover(ref);
    useEffect(() => {
        if (wrapperName !== 'room-info') {
            ref.current.style.boxShadow = isHovering ? '0 0 5px 2px #3ac4fa' : '';
            ref.current.style.scale = isHovering ? '1.05' : '1';
        }
    }, [isHovering]);

    const renderContent = ({ option, data, key }) => {
        if (option.component && typeof option.component === 'function') {
            const component = option.component;
            const value = option.path ? data[option.path] : { ...data };
            return component({ value, wrapperName, wrapperSubName: option.subName, key });
        }
        return _.get(data, option.path);
    };

    return (
        <div className={wrapperName} ref={ref}>
            {Object.keys(options).map((option) =>
                renderContent({ option: options[option], data, key: `${option}${data._id}` })
            )}
        </div>
    );
};

RoomCard.propTypes = {
    options: PropTypes.object,
    wrapperName: PropTypes.string,
    data: PropTypes.object
};
export default RoomCard;
