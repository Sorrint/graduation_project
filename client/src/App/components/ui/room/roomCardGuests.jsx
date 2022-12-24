import React from 'react';
import PropTypes from 'prop-types';
import RenderGuests from '../../common/booking/bookingFields/guests';

const RoomCardGuests = ({ priceList, wrapperName, wrapperSubName, onClick, currentPersons }) => {
    const handleClick = (guestsNumber) => {
        onClick(guestsNumber);
    };
    const getClassName = (number) => {
        const name = `${wrapperName}__numberOfGuests`;
        return number === currentPersons ? `${name}_active info-button` : `${name} info-button`;
    };
    return (
        <div className={`${wrapperName}__${wrapperSubName}`}>
            {Object.keys(priceList).map((guestsNumber) => (
                <div
                    className={getClassName(guestsNumber)}
                    key={guestsNumber}
                    onClick={() => handleClick(guestsNumber)}
                    role="button"
                >
                    <RenderGuests numberOfGuests={guestsNumber} />
                </div>
            ))}
        </div>
    );
};

RoomCardGuests.propTypes = {
    priceList: PropTypes.object,
    wrapperName: PropTypes.string,
    wrapperSubName: PropTypes.string,
    onClick: PropTypes.func,
    currentPersons: PropTypes.string
};
export default RoomCardGuests;
