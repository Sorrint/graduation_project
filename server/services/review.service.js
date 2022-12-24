import Review from '../models/review.model.js';

const ReviewService = {
    create: async function (review) {
        const createdReview = await Review.create(review);
        return createdReview;
    },
    getAll: async function () {
        const reviews = await Review.find();
        return reviews;
    },
    getOne: async function (id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const review = await Review.findById(id);
        return review;
    },
    delete: async function (id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const review = await Review.findByIdAndDelete(id);
        return review;
    }
};

export default ReviewService;
