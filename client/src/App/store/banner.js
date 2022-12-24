import { createSlice } from '@reduxjs/toolkit';
import bannerService from '../services/banners.service';

const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        entities: null,
        error: null,
        isLoading: true,
        dataLoading: false
    },
    reducers: {
        bannerRequested: (state) => {
            state.isLoading = true;
        },
        bannerRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        bannerRequestFailed: (state, action) => {
            state.error = action.payload;
            state.entities = null;
            state.isLoading = false;
        }
    }
});

const { reducer: bannerReducer, actions } = bannerSlice;
const { bannerRequested, bannerRecieved, bannerRequestFailed } = actions;

export const loadBannersList = () => async (dispatch) => {
    dispatch(bannerRequested());
    try {
        const data = await bannerService.get();
        dispatch(bannerRecieved(data));
    } catch (error) {
        dispatch(bannerRequestFailed(error.message));
    }
};
export const getBannerByLocation = (pathname) => (state) => {
    if (state.banner.entities) {
        const banner = state.banner.entities.find((banner) => banner.path === pathname);
        return banner;
    }
};

export const getBannersLoadingStatus = () => (state) => state.banner.isLoading;
export const getBanners = () => (state) => state.banner.entities;
export const getBannerDataStatus = () => (state) => state.banner.dataLoaded;

export default bannerReducer;
