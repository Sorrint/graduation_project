import React from 'react';
import PropTypes from 'prop-types';

const RoomCardText = ({ value, wrapperName, wrapperSubName }) => {
    return (
        <div className={`${wrapperName}__${wrapperSubName}`} key={value}>
            {value}
        </div>
    );
};

RoomCardText.propTypes = {
    wrapperName: PropTypes.string,
    wrapperSubName: PropTypes.string,
    value: PropTypes.string
};
export default RoomCardText;
