import React from 'react';
import PropTypes from 'prop-types';
const RoomImage = ({ value, wrapperName, wrapperSubName }) => {
    return <img className={`${wrapperName}__${wrapperSubName}`} src={value} alt="" />;
};

RoomImage.propTypes = {
    value: PropTypes.string,
    wrapperName: PropTypes.string,
    wrapperSubName: PropTypes.string
};
export default RoomImage;
