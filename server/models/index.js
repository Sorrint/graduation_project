import Banner from './banner.model.js';
import Booking from './booking.model.js';
import Room from './room.model.js';
import Icon from './icon.model.js';
import RoomType from './roomType.model.js';
import Role from './role.model.js';
import User from './user.model.js';
import Counter from './counter.model.js';
import Review from './review.model.js';

const db = {
    counter: Counter,
    banners: Banner,
    rooms: Room,
    icon: Icon,
    roomType: RoomType,
    role: Role,
    user: User,
    booking: Booking,
    review: Review
};

export default db;
