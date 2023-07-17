import Rooms from './layouts/rooms';
import LogOut from './layouts/logOut';
import Users from './layouts/users';

import AboutPage from './components/page/aboutPage';
import Contacts from './components/page/contactsPage';
import LoginPage from './components/page/loginPage';
import MainPage from './components/page/mainPage';
import NewsPage from './components/page/newsPage';
import Services from './components/page/servicesPage';

import UserProfile from './components/page/userPage/userProfile';
import BookingsList from './components/page/userPage/bookingsList';
import ReviewsPage from './components/page/reviewsPage';
import Review from './components/page/userPage/review';
import UserBookings from './components/page/userPage/userBookings';
import RoomsList from './components/page/userPage/roomsList';
import EditUserData from './components/ui/forms/editUserData';
import BookingPage from './components/page/bookingPage';

export const routesPrefix = process.env.REACT_APP_ROUTES_PREFIX;

export const publicRoutes = [
    { path: `${routesPrefix}/`, name: 'Main Page', component: MainPage, exact: true },
    { path: `${routesPrefix}/rooms/:roomId?`, name: 'Rooms', component: Rooms },
    { path: `${routesPrefix}/booking`, name: 'Booking', component: BookingPage, protected: true },
    { path: `${routesPrefix}/logout`, name: 'LogOut', component: LogOut },
    { path: `${routesPrefix}/login`, name: 'Login', component: LoginPage },
    { path: `${routesPrefix}/about`, name: 'About', component: AboutPage },
    { path: `${routesPrefix}/services`, name: 'Services', component: Services },
    { path: `${routesPrefix}/news`, name: 'News', component: NewsPage },
    { path: `${routesPrefix}/contacts`, name: 'Contacts', component: Contacts },
    { path: `${routesPrefix}/reviews`, name: 'Reviews', component: ReviewsPage, protected: true },
    { path: `${routesPrefix}/users/:userId?/:route?`, name: 'Users', component: Users, protected: true, exact: true }
];

export const userRoutes = [
    { pathname: '/edit', name: 'edit', component: EditUserData },
    { pathname: '/profile', name: 'profile', component: UserProfile },
    { pathname: '/myBookings', name: 'userBookings', component: UserBookings },
    { pathname: '/review', name: 'review', component: Review },
    {
        pathname: '/allBookings',
        name: 'bookingsList',
        component: BookingsList,
        protected: true,
        condition: 'isAdmin',
        redirect: '/profile'
    },
    {
        pathname: '/roomsList',
        name: 'roomsList',
        component: RoomsList,
        protected: true,
        condition: 'isAdmin',
        redirect: '/profile'
    }
];
