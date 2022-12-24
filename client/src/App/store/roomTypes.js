import { createSlice } from '@reduxjs/toolkit';
import roomTypesService from '../services/roomTypes.service';

const roomTypesSlice = createSlice({
    name: 'roomTypes',
    initialState: {
        entities: null,
        error: null,
        isLoading: true
    },
    reducers: {
        roomTypesRequested: (state) => {
            state.isLoading = true;
        },
        roomTypesRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        roomTypesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.entities = null;
            state.isLoading = false;
        }
    }
});

const { reducer: roomTypesReducer, actions } = roomTypesSlice;
const { roomTypesRequested, roomTypesRecieved, roomTypesRequestFailed } = actions;

export const loadRoomTypesList = () => async (dispatch) => {
    dispatch(roomTypesRequested());
    try {
        const data = await roomTypesService.get();
        dispatch(roomTypesRecieved(data));
    } catch (error) {
        dispatch(roomTypesRequestFailed(error.message));
    }
};

export const getRoomTypesLoadingStatus = () => (state) => state.roomTypes.isLoading;
export const getRoomTypes = () => (state) => state.roomTypes.entities;

export const getRoomTypeById = (id) => (state) => {
    if (state.roomTypes.entities) {
        return state.roomTypes.entities.find((type) => type._id === id);
    }
};
export default roomTypesReducer;
