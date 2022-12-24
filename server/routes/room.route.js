import { Router } from 'express';
import RoomController from '../controllers/room.controller.js';

const router = new Router();

router.post('/', RoomController.create);
router.get('/', RoomController.getAll);
router.get('/:id', RoomController.getOne);
router.post('/:roomId', RoomController.update);
router.delete('/:id', RoomController.delete);

export default router;
