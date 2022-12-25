import { createAction, createSlice } from '@reduxjs/toolkit';
import bookingService from '../services/booking.service';

const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
        entities: null,
        error: null,
        isLoading: true
    },
    reducers: {
        bookingsRequested: (state) => {
            state.isLoading = true;
        },
        userBookingsRecieved: (state, action) => {
            if (!state.entities) {
                state.entities = {};
            }
            state.entities.current = action.payload;
            state.isLoading = false;
        },
        allBookingsRecieved: (state, action) => {
            if (!state.entities) {
                state.entities = {};
            }
            state.entities.allBookings = action.payload;
            state.isLoading = false;
        },
        bookingsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.entities = null;
            state.isLoading = false;
        },
        bookingCreated: (state, action) => {
            if (!Array.isArray(state.entities.current)) {
                state.entities.current = [];
            }
            state.entities.current.push(action.payload);
        },
        bookingRemoved: (state, action) => {
            state.entities.current = state.entities.current.filter((c) => c._id !== action.payload);
            if (state.entities.allBookings) {
                state.entities.allBookings.filter((c) => c._id !== action.payload);
            }
        },
        bookingsReset: (state) => {
            state.entities = null;
            state.error = null;
            state.isLoading = true;
        }
    }
});

const { reducer: bookingsReducer, actions } = bookingSlice;
const {
    bookingsRequested,
    userBookingsRecieved,
    allBookingsRecieved,
    bookingsRequestFailed,
    bookingCreated,
    bookingRemoved,
    bookingsReset
} = actions;

const bookingCreateRequested = createAction('bookings/bookingCreateRequested');
const createBookingFailed = createAction('bookings/createBookingFailed');
const bookingRemoveRequested = createAction('bookings/bookingRemoveRequested');
const removeBookingFailed = createAction('bookings/removeBookingFailed');

export const loadBookingsList = () => async (dispatch) => {
    dispatch(bookingsRequested());
    try {
        const data = await bookingService.get();
        dispatch(allBookingsRecieved(data));
    } catch (error) {
        dispatch(bookingsRequestFailed(error.message));
    }
};

export const createBooking = (payload) => async (dispatch) => {
    dispatch(bookingCreateRequested);
    try {
        const data = await bookingService.create(payload);
        const { newBooking } = data;
        dispatch(bookingCreated(newBooking));
    } catch (error) {
        dispatch(createBookingFailed(error.message));
    }
};

export const loadCurrentUserBookings = (userId) => async (dispatch) => {
    dispatch(bookingsRequested());
    try {
        const data = await bookingService.getCurrentUserBookings(userId);
        dispatch(userBookingsRecieved(data));
    } catch (error) {
        dispatch(bookingsRequestFailed(error.message));
    }
};

export const clearBookingsList = () => (dispatch) => {
    dispatch(bookingsReset());
};

export const removeBooking = (bookingId) => async (dispatch) => {
    dispatch(bookingRemoveRequested());
    try {
        const data = await bookingService.delete(bookingId);
        if (data === null) {
            dispatch(bookingRemoved(bookingId));
        }
    } catch (error) {
        dispatch(removeBookingFailed(error.message));
    }
};

export const getUserBookings = () => (state) => {
    if (state.bookings.entities?.current) {
        return state.bookings.entities.current;
    }
};

export const getBookingsList = () => (state) => {
    if (state.bookings.entities?.allBookings) {
        return state.bookings.entities.allBookings;
    }
};

export const getBookingsLoadingStatus = () => (state) => state.bookings.isLoading;

export default bookingsReducer;
