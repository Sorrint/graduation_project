import { Router } from 'express';
import RoleController from '../controllers/role.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { roleMiddleware } from '../middleware/role.middleware.js';

const router = new Router();

router.get('/', roleMiddleware(['admin']), RoleController.getAll);
router.post('/', RoleController.create);

export default router;
