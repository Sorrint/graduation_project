import React from 'react';
import PropTypes from 'prop-types';
import SelectField from '../common/form/selectField';
const BookingsTableSettings = ({ setUser, users, rooms, setRoom, selectedRoom }) => {
    const defaultValue = { name: ' Все', value: '' };

    const usersList = [
        defaultValue,
        ...users.map((u) => {
            return { name: u.username, value: u._id };
        })
    ];
    const roomsList = [
        defaultValue,
        ...rooms.map((r) => {
            return { name: r.name, value: r._id };
        })
    ];
    return (
        <div className="bookings-settings">
            <SelectField
                label="Клиент"
                options={usersList}
                name="users"
                defaultOption={'Выберите пользователя'}
                onChange={setUser}
            />
            <SelectField
                label="Номер"
                options={roomsList}
                name="rooms"
                defaultOption={'Выберите номер'}
                onChange={setRoom}
                value={selectedRoom}
            />
        </div>
    );
};

BookingsTableSettings.propTypes = {
    usersList: PropTypes.array,
    setUser: PropTypes.func,
    setRoom: PropTypes.func,
    roomsList: PropTypes.array,
    selectedRoom: PropTypes.string,
    users: PropTypes.array,
    rooms: PropTypes.array
};
export default BookingsTableSettings;
