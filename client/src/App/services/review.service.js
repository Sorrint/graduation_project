import httpService from './http.service';

const reviewEndPoint = 'reviews/';

const reviewService = {
    createReview: async (payload) => {
        const { data } = await httpService.post(reviewEndPoint + payload._id, payload);
        return data;
    },
    getReviews: async () => {
        const { data } = await httpService.get(reviewEndPoint);
        return data;
    },
    removeReview: async (reviewId) => {
        const { data } = await httpService.delete(reviewEndPoint + reviewId);
        return data;
    }
};

export default reviewService;
