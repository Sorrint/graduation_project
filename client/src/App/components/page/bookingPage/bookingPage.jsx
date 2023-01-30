import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getToday, getTomorrow } from '../../../utils/utils';
import BookingPanel from '../../ui/booking/bookingPanel';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomTypes, getRoomTypesLoadingStatus } from '../../../store/roomTypes';
import { getRooms, getRoomsLoadingStatus, loadRoomsList } from '../../../store/rooms';
import { useForm } from 'react-hook-form';
import { getCurrentUserData } from '../../../store/users';
import { createBooking } from '../../../store/bookings';
import BookingCards from '../../ui/booking/bookingCards';
import OverlayingPopup from '../../common/portal/overlayingPopup';
import ConfirmBookingDialog from '../../ui/booking/confirmBooking';
import { getIconId, getIconsLoadingStatus } from '../../../store/icons';
import Header from '../../ui/header';
import Loader from '../../common/loader';

const initialData = {
    bookingRange: [getToday(), getTomorrow()],
    viewOnLake: false,
    numberOfPersons: 2,
    roomTypes: 'all',
    countDays: 1
};
const allTypes = {
    label: 'Все',
    name: 'Все',
    value: 'all'
};

const transformData = (data) => {
    const { bookingRange, numberOfPersons, countDays, choosenNumber, price } = data;
    const newData = {
        bookingRange,
        numberOfPersons,
        countDays,
        choosenNumber,
        price
    };
    return newData;
};

const BookingPage = () => {
    const dispatch = useDispatch();
    const rooms = useSelector(getRooms());
    const roomsStatusLoading = useSelector(getRoomsLoadingStatus());
    const roomTypesLoading = useSelector(getRoomTypesLoadingStatus());
    const iconsStatusLoading = useSelector(getIconsLoadingStatus());
    const viewOnLakeId = useSelector(getIconId('landscape'));
    const currentUser = useSelector(getCurrentUserData());
    const typesFromDB = useSelector(getRoomTypes());
    const roomTypes = typesFromDB ? [allTypes, ...typesFromDB] : [allTypes];
    const [data, setData] = useState();
    const [active, setActive] = useState(false);
    const [, setReferenceElement] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    const { register, handleSubmit, setValue, control, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            ...initialData
        }
    });

    useEffect(() => {
        setData(getValues());
    }, []);
    const handleChange = (target) => {
        setValue(target.name, target.value);
        setData(getValues());
    };

    const getTypeName = (id) => {
        const type = roomTypes.find((type) => type._id === id);
        return type ? type.value : null;
    };

    const filterRooms = (rooms, data) => {
        const filterByExpiresDate = rooms.filter((room) => {
            const { booking } = room;
            const dataRange = data.bookingRange;
            if (booking.length > 0) {
                for (const record of booking) {
                    if (
                        (Date.parse(record.bookingRange[0]) <= Date.parse(dataRange[0]) &&
                            Date.parse(record.bookingRange[1]) >= Date.parse(dataRange[0])) ||
                        (Date.parse(record.bookingRange[0]) <= Date.parse(dataRange[1]) &&
                            Date.parse(record.bookingRange[1]) >= Date.parse(dataRange[1])) ||
                        (Date.parse(record.bookingRange[0]) >= Date.parse(dataRange[0]) &&
                            Date.parse(record.bookingRange[1]) <= Date.parse(dataRange[1]))
                    ) {
                        return false;
                    }
                }
            }
            return true;
        });
        const filterByType =
            data.roomTypes === 'all'
                ? filterByExpiresDate
                : filterByExpiresDate.filter((room) => getTypeName(room.type) === data.roomTypes);
        const filterByPersons = filterByType.filter((room) => room.maxNumberOfPersons >= data.numberOfPersons);
        if (data.viewOnLake) {
            const filterByCheckbox = filterByPersons.filter((room) => room.amenities.find((a) => a === viewOnLakeId));
            return filterByCheckbox;
        }

        return filterByPersons;
    };

    const showPopup = () => {
        setActive((prevState) => !prevState);
    };
    const onSubmit = (data) => {
        const createdRequest = { ...transformData(data), user: currentUser._id };
        dispatch(createBooking(createdRequest));
        setShowPopover(true);
    };

    const loadUpdatedRooms = () => {
        dispatch(loadRoomsList());
        setActive(false);
        setShowPopover(false);
    };
    if (roomsStatusLoading || roomTypesLoading || iconsStatusLoading) return <Loader />;
    if (data && rooms) {
        const filteredRooms = filterRooms(rooms, data);

        return (
            <>
                <Header />
                <div className="wrapper">
                    <div className="content">
                        <BookingPanel
                            onChange={handleChange}
                            data={data}
                            roomTypes={roomTypes}
                            register={register}
                            control={control}
                            setValue={setValue}
                            onSubmit={handleSubmit(onSubmit)}
                        />
                        <BookingCards rooms={filteredRooms} data={data} onClick={showPopup} onChange={handleChange} />
                    </div>
                </div>
                <OverlayingPopup isOpened={active} onClose={showPopup}>
                    <ConfirmBookingDialog
                        data={data}
                        onCancel={showPopup}
                        onConfirm={onSubmit}
                        setRef={setReferenceElement}
                    />
                </OverlayingPopup>

                <OverlayingPopup isOpened={showPopover}>
                    <div className="popup__response-message">
                        <p>{'Номер успешно забронирован. Ждем Вас в гости!'}</p>
                        <div className="confirm-button" role="button" onClick={loadUpdatedRooms}>
                            Отлично!
                        </div>
                    </div>
                </OverlayingPopup>
            </>
        );
    }
};

BookingPage.propTypes = {
    rooms: PropTypes.array,
    icons: PropTypes.array
};
export default BookingPage;
