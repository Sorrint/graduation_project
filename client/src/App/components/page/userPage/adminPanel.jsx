import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getRooms, getRoomsLoadingStatus } from '../../../store/rooms';
import { getRoomTypesLoadingStatus } from '../../../store/roomTypes';
import { getCurrentUserId } from '../../../store/users';
import Loader from '../../common/portal/loader';
import OverlayingPopup from '../../common/portal/overlayingPopup';
import EditRoomForm from '../../ui/editRoomForm';
import RoomsTable from '../../ui/room/roomsTable';

const AdminPanel = () => {
    const [selectedRoom, setSelectedRoom] = useState();
    const [active, setActive] = useState(false);
    const showPopup = () => {
        setActive((prevState) => !prevState);
    };
    const handleSelect = (room) => {
        setSelectedRoom(room);
        setActive((prevState) => !prevState);
    };

    const currentUserId = useSelector(getCurrentUserId());
    const rooms = useSelector(getRooms());
    const [sortBy, setSortBy] = useState({ path: 'bookingNumber', order: 'asc' });

    const roomsLoading = useSelector(getRoomsLoadingStatus());
    const roomTypesLoading = useSelector(getRoomTypesLoadingStatus());

    if (roomsLoading || roomTypesLoading) return <Loader />;
    return (
        <div className="admin-panel">
            <h1 className="admin-panel__title">Статус номеров</h1>
            <RoomsTable
                onSelect={handleSelect}
                rooms={rooms}
                sortBy={sortBy}
                setSortBy={setSortBy}
                currentUserId={currentUserId}
            />
            <OverlayingPopup isOpened={active} onClose={showPopup}>
                <div className="admin-panel__content">
                    <button className="close-button" onClick={showPopup} />
                    <EditRoomForm room={selectedRoom} />
                </div>
            </OverlayingPopup>
        </div>
    );
};

export default AdminPanel;
