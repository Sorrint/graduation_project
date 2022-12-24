import React from 'react';
import PropTypes from 'prop-types';
import RoomCardText from '../../common/room/roomCardText';

const BookingCardPanel = ({ value, wrapperName, wrapperSubName, onSelect, onClick }) => {
    const { bookingPrice, bookingInfo, roomId } = value;
    const handleSelect = () => {
        onSelect({ name: 'price', value: bookingPrice.value });
        onSelect({ name: 'choosenNumber', value: roomId.value });
        onClick();
    };
    return (
        <div className={`${wrapperName}__${wrapperSubName}`}>
            <div className={`${wrapperName}__price`}>
                <RoomCardText
                    value={`${bookingPrice.value} ₽`}
                    wrapperName={wrapperName}
                    wrapperSubName={bookingPrice.subName}
                />
                <RoomCardText
                    value={`${bookingInfo.value} ₽`}
                    wrapperName={wrapperName}
                    wrapperSubName={bookingInfo.subName}
                />
            </div>
            <button className={`${wrapperName}__button info-button`} onClick={handleSelect}>
                Выбрать
            </button>
        </div>
    );
};

BookingCardPanel.propTypes = {
    value: PropTypes.object,
    wrapperName: PropTypes.string,
    wrapperSubName: PropTypes.string,
    onSelect: PropTypes.func,
    onClick: PropTypes.func
};
export default BookingCardPanel;
