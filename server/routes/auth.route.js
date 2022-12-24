import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import TokenController from '../controllers/token.controller.js';

const router = new Router();

router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);
router.post('/token', TokenController.refresh);
router.post('/getRoles', AuthController.getRoles);

export default router;
