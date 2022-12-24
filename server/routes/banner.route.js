import { Router } from 'express';
import BannerController from '../controllers/banner.controller.js';

const router = new Router();

router.post('/', BannerController.create);
router.get('/', BannerController.getAll);
router.get('/:id', BannerController.getOne);

export default router;
