import React from 'react';
import PropTypes from 'prop-types';

const BookingDate = ({ date }) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const bookingDate = new Date(date);
    const locale = bookingDate.toLocaleDateString('ru', options);
    return <> {locale}</>;
};

BookingDate.propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
export default BookingDate;
