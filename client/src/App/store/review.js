import { createAction, createSlice } from '@reduxjs/toolkit';
import reviewService from '../services/review.service';

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        reviewsRequested: (state) => {
            state.isLoading = true;
        },
        reviewsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        reviewsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        reviewCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        reviewRemoved: (state, action) => {
            state.entities = state.entities.filter((review) => review._id !== action.payload);
        }
    }
});

const { reducer: reviewsReducer, actions } = reviewsSlice;
const { reviewsRequested, reviewsReceived, reviewsRequestFailed, reviewCreated, reviewRemoved } = actions;

const createReviewRequested = createAction('reviews/createReviewRequested');
const createReviewFailed = createAction('reviews/createReviewFailed');
const removeReviewRequested = createAction('reviews/removeReviewRequested');
const removeReviewFailed = createAction('reviews/removeReviewFailed');

export const createReview =
    ({ payload, userId }) =>
    async (dispatch) => {
        dispatch(createReviewRequested());
        try {
            const review = {
                ...payload,
                user: userId
            };
            const content = await reviewService.createReview(review);
            dispatch(reviewCreated(content));
        } catch (error) {
            dispatch(createReviewFailed(error.message));
        }
    };

export const removeReview = (reviewId) => async (dispatch) => {
    dispatch(removeReviewRequested());
    try {
        const content = await reviewService.removeReview(reviewId);
        if (!content) dispatch(reviewRemoved(reviewId));
    } catch (error) {
        dispatch(removeReviewFailed());
    }
};

export const loadReviewsList = () => async (dispatch) => {
    dispatch(reviewsRequested());
    try {
        const content = await reviewService.getReviews();
        dispatch(reviewsReceived(content));
    } catch (error) {
        dispatch(reviewsRequestFailed(error.message));
    }
};

export const getReviews = () => (state) => state.reviews.entities;
export const getReviewsLoadingStatus = () => (state) => state.reviews.isLoading;

export default reviewsReducer;
