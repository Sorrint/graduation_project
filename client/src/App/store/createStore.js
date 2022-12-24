import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bannerReducer from './banner';
import bookingsReducer from './bookings';
import iconsReducer from './icons';
import reviewsReducer from './review';
import roomsReducer from './rooms';
import roomTypesReducer from './roomTypes';
import usersReducer from './users';

const rootReducer = combineReducers({
    rooms: roomsReducer,
    roomTypes: roomTypesReducer,
    icons: iconsReducer,
    banner: bannerReducer,
    users: usersReducer,
    bookings: bookingsReducer,
    reviews: reviewsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
