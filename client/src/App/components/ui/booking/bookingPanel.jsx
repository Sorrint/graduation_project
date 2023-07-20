import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxField from '../../common/form/checkbox';
import SelectField from '../../common/form/selectField';
import Calendar from '../../common/form/calendar';
import Counter from '../../common/form/counter';

const BookingPanel = ({ onChange, data, roomTypes, control, onSubmit, register }) => {
    const { bookingRange, numberOfPersons } = data;

    return (
        <form className="form-container__form " onSubmit={onSubmit}>
            <div className="booking-panel">
                <Calendar
                    bookingRange={bookingRange}
                    onChange={onChange}
                    control={control}
                    minDate={new Date()}
                    wrapperName="booking-panel"
                    label="Период"
                />
                <Counter
                    name="numberOfPersons"
                    value={numberOfPersons}
                    onChange={onChange}
                    min={1}
                    max={6}
                    wrapperName="booking-panel"
                    label="Число гостей"
                />
                <SelectField
                    name={'roomTypes'}
                    options={roomTypes}
                    defaultOption={'Выберите класс номера'}
                    onChange={onChange}
                    wrapperName="booking-panel"
                    label="Категория номера"
                />
                <div className="panel-checkbox">
                    <CheckBoxField
                        name="viewOnLake"
                        onChange={onChange}
                        {...register('viewOnLake')}
                        wrapperName="booking-panel">
                        Вид на озеро
                    </CheckBoxField>
                </div>
            </div>
        </form>
    );
};

BookingPanel.propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.object,
    roomTypes: PropTypes.array,
    setCountDays: PropTypes.func,
    control: PropTypes.object,
    onSubmit: PropTypes.func,
    register: PropTypes.func
};
export default BookingPanel;
