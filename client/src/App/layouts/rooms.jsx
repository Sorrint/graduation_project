import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BookingPage from '../components/page/bookingPage';

import RoomPage from '../components/page/roomPage';
import RoomsListPage from '../components/page/roomsListPage';
import AppLoader from '../components/ui/hoc/appLoader';

const Rooms = () => {
    const { roomId } = useParams();
    const { pathname } = useLocation();

    return (
        <>
            <AppLoader>
                {pathname === '/booking' ? <BookingPage /> : roomId ? <RoomPage id={roomId} /> : <RoomsListPage />}
            </AppLoader>
        </>
    );
};

export default Rooms;
