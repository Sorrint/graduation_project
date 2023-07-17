const routesPrefix = process.env.REACT_APP_ROUTES_PREFIX;

export const navBarLinks = [
    {
        name: 'main',
        path: `${routesPrefix}/`,
        text: 'Главная'
    },
    {
        name: 'numbers',
        path: `${routesPrefix}/rooms`,
        text: 'Номера'
    },
    {
        name: 'services',
        path: `${routesPrefix}/services`,
        text: 'Услуги'
    },
    {
        name: 'about',
        path: `${routesPrefix}/about`,
        text: 'О нас'
    },
    {
        name: 'news',
        path: `${routesPrefix}/news`,
        text: 'Новости и акции'
    },
    {
        name: 'contacts',
        path: `${routesPrefix}/contacts`,
        text: 'Контакты'
    },
    {
        name: 'reviews',
        path: `${routesPrefix}/reviews`,
        text: 'Отзывы'
    }
];

export const sidebarLinks = [
    {
        name: 'profile',
        path: `${routesPrefix}/profile`,
        text: 'Мои данные'
    },
    {
        name: 'edit',
        path: `${routesPrefix}/edit`,
        text: 'Редактировать профиль'
    },
    {
        name: 'myBookings',
        path: `${routesPrefix}/bookings`,
        text: 'Забронировать номер'
    },
    {
        name: 'currentBookings',
        path: `${routesPrefix}/users/userId/currentBookings`
    },
    {
        name: 'review',
        path: `${routesPrefix}/review`
    }
];
