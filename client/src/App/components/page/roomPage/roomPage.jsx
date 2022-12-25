import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../common/footer';
import RoomAmenities from '../../ui/room/roomAmenities';
import { addTextToProperties } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { getRoomById } from '../../../store/rooms';
import { getIcons } from '../../../store/icons';
import { Link } from 'react-router-dom';
import PropertiesList from '../../ui/room/propertiesList';
import RoomCard from '../../ui/room/roomCard';
import RoomImage from '../../common/room/roomImage';
import RoomCardText from '../../common/room/roomCardText';
import RoomCardPrice from '../../common/room/roomCardPrice';
import Header from '../../ui/header';
import Banner from '../../ui/banner';
const RoomPage = ({ id }) => {
    const icons = useSelector(getIcons());
    const room = useSelector(getRoomById(id));
    const [selectedProprerties, setSelectedProperties] = useState();

    const displayProperties = ['area', 'persons', 'countOfRooms'];
    function getOverview(name, value) {
        switch (name) {
            case 'area':
                return (
                    <>
                        {`Площадь номера ${value} м`}
                        <sup>2</sup>
                    </>
                );
            case 'persons':
                return `${value} спальных места`;
            case 'countOfRooms':
                return `${value} комн.`;
            default:
                return value;
        }
    }

    useEffect(() => {
        if (room) {
            setSelectedProperties(addTextToProperties(room.properties, displayProperties, getOverview));
        }
    }, [room]);

    const roomCardOptions = {
        image: {
            subName: 'image',
            path: 'image',
            component: ({ key, ...rest }) => <RoomImage key={key} {...rest} />
        },
        name: {
            subName: 'name',
            path: 'name',
            component: ({ key, ...rest }) => <RoomCardText key={key} {...rest} />
        },
        description: {
            subName: 'description',
            path: 'description',
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
            component: ({ key }) => (
                <Link to={`/booking`} className="room-card__button info-button" key={key}>
                    БРОНИРОВАТЬ
                </Link>
            )
        }
    };

    return (
        <>
            <Header />
            {room && icons && (
                <>
                    <div className="wrapper">
                        <Banner imgClassName={room.className} text={room.title} />

                        <div className="content">
                            <div className="room-description">
                                <div className="room-description__content-left">
                                    Описание
                                    <PropertiesList
                                        icons={icons}
                                        properties={selectedProprerties}
                                        wrapperName="room-description"
                                    />
                                    <RoomAmenities icons={icons} amenities={room.amenities} text="Оснащение номера" />
                                    <RoomAmenities icons={icons} amenities={room.otherAmenities} text="Прочее" />
                                </div>
                                <div className="room-description__content-right">
                                    <RoomCard
                                        options={roomCardOptions}
                                        data={room}
                                        wrapperName="room-info"
                                        key={room._id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </>
    );
};

RoomPage.propTypes = {
    id: PropTypes.string,
    list: PropTypes.array,
    icons: PropTypes.array
};

export default RoomPage;
