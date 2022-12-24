import { Router } from 'express';
import BookingController from '../controllers/booking.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = new Router();

router.post('/', authMiddleware, BookingController.create);
router.get('/', authMiddleware, BookingController.getAll);
router.get('/:userId', authMiddleware, BookingController.getByUserId);
router.delete('/:id', authMiddleware, BookingController.delete);

export default router;
