import React from 'react';
import PropTypes from 'prop-types';
import RoomCard from '../room/roomCard';
import RoomImage from '../../common/room/roomImage';
import RoomCardText from '../../common/room/roomCardText';
import PropertiesList from '../room/properties/propertiesList';
import { getIcons } from '../../../store/icons';
import { useSelector } from 'react-redux';
import { addTextToProperties, renderGuests } from '../../../utils/utils';
import BookingCardPanel from './bookingCardPanel';

const BookingCards = ({ rooms, data, onChange, onClick }) => {
    const { numberOfPersons, countDays } = data;
    const panelInfo = `${countDays} ночь / ${renderGuests(numberOfPersons)}`;
    const icons = useSelector(getIcons());
    const displayProperties = ['area', 'persons', 'countOfRooms'];
    const getPlaceholders = (propName, value) => {
        switch (propName) {
            case 'area':
                return `${value} кв.м`;
            case 'persons':
                return `до ${value} мест`;
            case 'countOfRooms':
                return `${value} комн.`;
            default:
                break;
        }
    };
    const getPrice = (priceList, persons, range) => {
        if (persons >= 2) {
            return priceList[persons] * range;
        }
        return priceList[2] * range;
    };

    const bookingsList = rooms.map((room) => {
        return {
            ...room,
            properties: addTextToProperties(room.properties, displayProperties, getPlaceholders),
            bookingData: {
                bookingPrice: { value: getPrice(room.priceList, numberOfPersons, countDays), subName: 'cost' },
                bookingInfo: { value: panelInfo, subName: 'info' },
                roomId: { value: room._id }
            }
        };
    });

    const roomCardOptions = {
        image: {
            subName: 'image',
            path: 'image',
            component: ({ key, ...rest }) => <RoomImage key={key} {...rest} />
        },
        title: {
            subName: 'title',
            path: 'title',
            component: ({ key, ...rest }) => <RoomCardText key={key} {...rest} />
        },
        customString: {
            subName: 'info',
            path: 'properties',
            component: ({ value, key, ...rest }) => (
                <PropertiesList icons={icons} direction="row" properties={value} {...rest} key={key} />
            )
        },
        price: {
            subName: 'panel',
            path: 'bookingData',
            component: ({ key, ...rest }) => (
                <BookingCardPanel {...rest} key={key} onSelect={onChange} onClick={onClick} />
            )
        }
    };
    return (
        <div className="booking-cards">
            {bookingsList.length === 0
                ? 'нет подходящих номеров'
                : bookingsList.map((room) => (
                      <RoomCard options={roomCardOptions} data={room} wrapperName="booking-card" key={room._id} />
                  ))}
        </div>
    );
};

BookingCards.propTypes = {
    rooms: PropTypes.array,
    data: PropTypes.object,
    onChange: PropTypes.func,
    onClick: PropTypes.func
};
export default BookingCards;
