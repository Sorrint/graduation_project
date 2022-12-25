import { createSlice } from '@reduxjs/toolkit';
import iconsService from '../services/icons.service';

const iconsSlice = createSlice({
    name: 'icons',
    initialState: {
        entities: null,
        error: null,
        isLoading: true
    },
    reducers: {
        iconsRequested: (state) => {
            state.isLoading = true;
        },
        iconsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        iconsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.entities = null;
            state.isLoading = false;
        }
    }
});

const { reducer: iconsReducer, actions } = iconsSlice;
const { iconsRequested, iconsRecieved, iconsRequestFailed } = actions;

export const loadIconsList = () => async (dispatch) => {
    dispatch(iconsRequested());
    try {
        const data = await iconsService.get();
        dispatch(iconsRecieved(data));
    } catch (error) {
        dispatch(iconsRequestFailed(error.message));
    }
};

export const getIconsLoadingStatus = () => (state) => state.icons.isLoading;
export const getIcons = () => (state) => state.icons.entities;
export const getIconId = (name) => (state) => {
    const icon = state.icons.entities ? state.icons.entities.find((icon) => icon.name === name) : null;
    if (icon) return icon._id;
    return null;
};
export default iconsReducer;
