import { Router } from 'express';
import ReviewController from '../controllers/review.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = new Router();

router.get('/', ReviewController.getAll);
router.post('/:id', authMiddleware, ReviewController.create);
router.delete('/:id', authMiddleware, ReviewController.delete);

export default router;
