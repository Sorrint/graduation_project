import { Router } from 'express';
import RoomTypeController from '../controllers/roomTypeController.js';

const router = new Router();

router.get('/', RoomTypeController.getAll);

export default router;
