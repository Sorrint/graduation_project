import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RoomType from '../../common/room/roomType';
import Table from '../../common/table/table';

import { renderGuests } from '../../../utils/utils';
import SelectField from '../../common/form/selectField';
import RoomStatus from '../../common/room/roomStatus';
import RoomEditIcon from '../../common/room/roomEditIcon';
import _ from 'lodash';
import { getRoomTypeById } from '../../../store/roomTypes';
import Loader from '../../common/loader';

const RoomsTable = ({ onSelect, rooms, sortBy, setSortBy, currentUserId }) => {
    const handleSort = (item) => {
        setSortBy(item);
    };

    const excludeExpiresDate = (rooms) => {
        const filteredBookings = rooms.map((room) => {
            const { booking } = room;
            if (booking.length > 0) {
                const filterBookings = booking.filter((record) => new Date(record.bookingRange[1]) > Date.now());
                return { ...room, booking: [...filterBookings] };
            }
            return { ...room };
        });
        return filteredBookings;
    };

    const transformData = (roomData) => {
        return roomData.map((room) => {
            const priceOptions = Object.keys(room.priceList).reduce((arr, key) => {
                const value = key;
                const name = `${renderGuests(value)} ${room.priceList[key]} ₽`;
                arr.push({ name, value });
                return arr;
            }, []);
            const roomType = useSelector(getRoomTypeById(room.type));
            const typeName = roomType.name;
            const status = room.booking.length > 0 ? 'Забронирован' : 'Свободен';
            return { ...room, priceOptions, typeName, status };
        });
    };

    if (rooms && currentUserId) {
        const expiresRoom = excludeExpiresDate(rooms);
        const transformedRooms = transformData(expiresRoom);
        const sortedRooms = _.orderBy(transformedRooms, [sortBy.path], [sortBy.order]);
        const columns = {
            bookingNumber: { name: 'Номер', path: 'name' },
            type: { name: 'Категория', component: (room) => <RoomType id={room.type} />, path: 'typeName' },
            numberOfGuests: {
                name: 'Число гостей',
                component: (room) => <>{`до ${room.maxNumberOfPersons} человек`}</>
            },
            price: {
                name: 'Стоимость за 1 ночь',
                component: (room) => (
                    <SelectField
                        options={room.priceOptions}
                        name={'price'}
                        defaultOption={'Выберите количество гостей'}
                    />
                )
            },
            status: {
                name: 'Статус',
                component: (room) => <RoomStatus booking={room.booking} userId={currentUserId} roomId={room._id} />,
                path: 'status'
            },
            edit: {
                name: '',
                component: (room) => <RoomEditIcon room={room} onSelect={onSelect} />
            }
        };
        return (
            transformedRooms && (
                <Table
                    columns={columns}
                    data={sortedRooms}
                    tableName="roomData-table"
                    selectedSort={sortBy}
                    onSort={handleSort}
                />
            )
        );
    }
    return <Loader />;
};

RoomsTable.propTypes = {
    onSelect: PropTypes.func,
    rooms: PropTypes.array,
    sortBy: PropTypes.object,
    setSortBy: PropTypes.func,
    currentUserId: PropTypes.string
};

export default RoomsTable;
