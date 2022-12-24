import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoomCardText from '../../common/room/roomCardText';
import RoomCardGuests from './roomCardGuests';

const RoomCardPrice = ({ value, wrapperName }) => {
    const [currentPersons, setCurrentPersons] = useState(Object.keys(value)[0]);

    const currentPrice = (list) => {
        const current = Object.keys(list).find((item) => item === currentPersons);
        return list[current];
    };

    const onClick = (number) => {
        setCurrentPersons(number);
    };
    return (
        <>
            <RoomCardText wrapperName={wrapperName} wrapperSubName="cost" value={`${currentPrice(value)} ₽`} />
            <RoomCardText wrapperName={wrapperName} wrapperSubName="label" value={'Цена за ночь'} />
            <RoomCardGuests
                wrapperName={wrapperName}
                wrapperSubName={'guests'}
                priceList={value}
                onClick={onClick}
                currentPersons={currentPersons}
            />
        </>
    );
};

RoomCardPrice.propTypes = {
    wrapperName: PropTypes.string,
    value: PropTypes.object
};
export default RoomCardPrice;
