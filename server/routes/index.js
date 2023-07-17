import { Router } from 'express';
import express from 'express';
import * as path from 'path';
import url from 'url';

import BannerRoute from './banner.route.js';
import RoomRoute from './room.route.js';
import IconRoute from './icon.route.js';
import RoomTypeRoute from './roomTypes.route.js';
import AuthRoute from './auth.route.js';
import RoleRoute from './role.route.js';
import UserRoute from './user.route.js';
import BookingRoute from './booking.route.js';
import ReviewRoute from './review.route.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { check } from 'express-validator';
const router = new Router({ mergeParams: true });

router.use('/banners', BannerRoute);
router.use('/booking', BookingRoute);
router.use('/rooms', RoomRoute);
router.use('/icons', IconRoute);
router.use('/reviews', ReviewRoute);
router.use('/roomTypes', RoomTypeRoute);
router.use(
    '/auth',
    [
        check('email', 'Email не может быть пустым').notEmpty(),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 })
    ],
    AuthRoute
);
router.use('/roles', RoleRoute);
router.use('/users', UserRoute);

export function Routes(app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });
    app.use('/bookingApi/v1', router);

    if (process.env.NODE_ENV === 'production') {
        app.use('/booking/', express.static(path.join(__dirname, '..', 'client')));
        const indexPath = path.join(__dirname, '..', 'client', 'index.html');
        app.get('*', (req, res) => {
            res.sendFile(indexPath);
        });
    }
}
