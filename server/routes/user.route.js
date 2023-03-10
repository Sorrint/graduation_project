import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
const router = new Router();

router.get('/', UserController.getAll);
router.patch('/:userId', UserController.update);
router.get('/:id', UserController.getOne);

export default router;
