import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getRooms, getRoomsLoadingStatus } from '../../../store/rooms';
import { getRoomTypesLoadingStatus } from '../../../store/roomTypes';
import { getCurrentUserId } from '../../../store/users';
import Loader from '../../common/loader';
import OverlayingPopup from '../../common/portal/overlayingPopup';
import EditRoomForm from '../../ui/forms/editRoomForm';
import RoomsTable from '../../ui/room/roomsTable';

const RoomsList = () => {
    const [selectedRoom, setSelectedRoom] = useState();
    const [active, setActive] = useState(false);
    const showPopup = () => {
        setActive((prevState) => !prevState);
    };
    const [showPopover, setShowPopover] = useState(false);

    const handleSelect = (room) => {
        setSelectedRoom(room);
        setActive((prevState) => !prevState);
    };

    const handleClose = () => {
        setActive();
        setShowPopover(false);
    };
    const currentUserId = useSelector(getCurrentUserId());
    const rooms = useSelector(getRooms());
    const [sortBy, setSortBy] = useState({ path: 'bookingNumber', order: 'asc' });

    const roomsLoading = useSelector(getRoomsLoadingStatus());
    const roomTypesLoading = useSelector(getRoomTypesLoadingStatus());

    if (roomsLoading || roomTypesLoading) {
        return (
            <div className="content loader-content">
                <Loader />
            </div>
        );
    }
    return (
        <div className="admin-panel">
            <h2 className="admin-panel__title">Статус номеров</h2>
            <div className="scroll-container">
                <RoomsTable
                    onSelect={handleSelect}
                    rooms={rooms}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    currentUserId={currentUserId}
                />
            </div>
            <OverlayingPopup isOpened={active} onClose={showPopup} wrapperName={'edit-room'}>
                <div className="admin-panel__content">
                    <button className="close-button" onClick={showPopup} />
                    <EditRoomForm room={selectedRoom} showPopover={() => setShowPopover(true)} />
                </div>
            </OverlayingPopup>
            <OverlayingPopup isOpened={showPopover}>
                <div className="popup__response-message">
                    <p>{'Номер успешно отредактирован'}</p>
                    <div className="confirm-button" role="button" onClick={handleClose}>
                        Отлично!
                    </div>
                </div>
            </OverlayingPopup>
        </div>
    );
};

export default RoomsList;
