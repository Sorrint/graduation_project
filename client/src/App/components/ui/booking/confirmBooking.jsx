import React from 'react';
import PropTypes from 'prop-types';
import BookingDate from './bookingDate';
import RenderGuests from '../../common/booking/bookingFields/guests';
import RenderNights from '../../common/booking/bookingFields/nights';
import RenderPrice from '../../common/booking/bookingFields/price';
import RecordRow from './bookingRecord/recordRow';
import { useSelector } from 'react-redux';
import { getRoomById } from '../../../store/rooms';

const ConfirmBookingDialog = ({ data, onCancel, onConfirm, setRef }) => {
    const room = useSelector(getRoomById(data.choosenNumber));
    const recordFields = {
        roomTitle: {
            name: 'Выбранный номер',
            component: () => <>{room.title}</>
        },
        arrivalDate: {
            name: 'Регистрация заезда',
            component: (record) => <BookingDate date={record.bookingRange[0]}></BookingDate>
        },
        departureDate: {
            name: 'Регистрация отъезда',
            component: (record) => <BookingDate date={record.bookingRange[1]}></BookingDate>
        },
        numberOfGuests: {
            name: 'Количество гостей',
            component: (record) => <RenderGuests numberOfGuests={record.numberOfPersons} />
        },
        numberOfDays: {
            name: 'Количество ночей',
            component: (record) => <RenderNights countDays={record.countDays} />
        },
        cost: { name: 'Стоимость бронирования', component: (record) => <RenderPrice cost={record.price} /> }
    };
    return (
        <div className="popup__booking" ref={setRef}>
            <div className="popup__booking-title">Информация о бронировании</div>
            <div className="popup__booking-card">
                {Object.keys(recordFields).map((field) => (
                    <RecordRow data={data} recordField={recordFields[field]} wrapperName={'booking-card'} key={field} />
                ))}
            </div>
            <div className="popup__button-group">
                <button className="confirm-button" role="button" onClick={() => onConfirm(data)}>
                    Подтвердить
                </button>
                <button className="cancel-button" onClick={onCancel}>
                    Отмена
                </button>
            </div>
        </div>
    );
};

ConfirmBookingDialog.propTypes = {
    data: PropTypes.object,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    setRef: PropTypes.func
};
export default ConfirmBookingDialog;
