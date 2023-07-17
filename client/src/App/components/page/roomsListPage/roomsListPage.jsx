import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../common/footer';
import { useSelector } from 'react-redux';
import { getRooms, getRoomsLoadingStatus } from '../../../store/rooms';
import { getRoomTypes } from '../../../store/roomTypes';
import RoomImage from '../../common/room/roomImage';
import RoomCard from '../../ui/room/roomCard';
import RoomCardText from '../../common/room/roomCardText';
import RoomCardPrice from '../../common/room/roomCardPrice';
import { Link } from 'react-router-dom';
import Header from '../../ui/header';
import Banner from '../../ui/banner';
import Loader from '../../common/loader';

const RoomsListPage = () => {
    const rooms = useSelector(getRooms());
    const roomsStatusLoading = useSelector(getRoomsLoadingStatus());
    const types = useSelector(getRoomTypes());
    const [selectedType, setSelectedType] = useState();
    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };
    const filteredRooms = selectedType ? rooms.filter((room) => room.type === selectedType) : rooms;
    const clearType = () => {
        setSelectedType();
    };
    const upperCase = (text) => {
        return text.toUpperCase();
    };
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
            component: ({ value, key, ...rest }) => (
                <RoomCardText
                    key={key}
                    value={`Вместимость до ${value.maxNumberOfPersons} мест ${value.area} кв.м (${value.countOfRooms} комн)`}
                    {...rest}
                />
            )
        },
        price: {
            subName: 'price',
            path: 'priceList',
            component: ({ key, ...rest }) => <RoomCardPrice {...rest} key={key} />
        },
        link: {
            subName: 'button',
            path: '_id',
            component: ({ value, key }) => (
                <Link to={`/booking/rooms/${value}`} className="room-card__button info-button" key={key}>
                    ПОДРОБНЕЕ
                </Link>
            )
        }
    };

    if (roomsStatusLoading) return <Loader />;

    if (types) {
        return (
            <>
                <Header />
                <div className="wrapper">
                    <Banner />
                    <div className="wrapper__header">
                        <h1>На территории расположены три жилых коттеджа с теплыми и просторными номерами</h1>
                        <div className="wrapper__filter">
                            <div className="wrapper__button" onClick={() => clearType()}>
                                ВСЕ
                            </div>
                            {types &&
                                types.map((type) => (
                                    <div
                                        className="wrapper__button"
                                        key={type._id}
                                        onClick={() => handleTypeSelect(type._id)}
                                    >
                                        {upperCase(type.name)}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="content">
                        {filteredRooms &&
                            filteredRooms.map((room) => (
                                <RoomCard
                                    options={roomCardOptions}
                                    data={room}
                                    wrapperName="room-card"
                                    key={room._id}
                                />
                            ))}
                    </div>
                </div>
                <Footer />
            </>
        );
    }
};

RoomsListPage.propTypes = {
    rooms: PropTypes.array,
    types: PropTypes.array
};
export default RoomsListPage;
