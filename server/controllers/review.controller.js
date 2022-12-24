import ReviewService from '../services/review.service.js';

const ReviewController = {
    create: async function (req, res) {
        try {
            const review = await ReviewService.create(req.body);
            res.status(201).json(review);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAll: async function (req, res) {
        try {
            const reviews = await ReviewService.getAll();
            return res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async function (req, res) {
        try {
            const removedReview = await ReviewService.getOne(req.params.id);
            if (removedReview.user.toString() === req.user._id) {
                await removedReview.remove();
                return res.send(null);
            } else {
                res.status(401).json({ message: 'Пользователь не авторизован' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default ReviewController;
