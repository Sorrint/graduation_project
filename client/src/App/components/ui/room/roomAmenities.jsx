import React from 'react';
import PropTypes from 'prop-types';
import { getIconContent, getIconText } from '../../../utils/utils';
const RoomAmenities = ({ icons, amenities, text }) => {
    function getIcon(amenity) {
        return getIconContent(icons, amenity) ? (
            <>{getIconContent(icons, amenity)}</>
        ) : (
            <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                color="#000000"
            >
                <polyline points="4 13 9 18 20 7" />
            </svg>
        );
    }
    return (
        <div className="room-description__amenities">
            {text}
            {amenities.map((amenity) => (
                <div className="room-description__amenity" key={amenity}>
                    <i className="room-description__icon">{getIcon(amenity)}</i>
                    <span className="room-description__text">{getIconText(icons, amenity)}</span>
                </div>
            ))}
        </div>
    );
};

RoomAmenities.propTypes = {
    icons: PropTypes.array,
    amenities: PropTypes.array,
    text: PropTypes.string
};
export default RoomAmenities;
