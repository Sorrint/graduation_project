import { Router } from 'express';
import IconController from '../controllers/icon.controller.js';

const router = new Router();

router.post('/', IconController.create);
router.get('/', IconController.getAll);

export default router;
