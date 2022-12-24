import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { Controller } from 'react-hook-form';
registerLocale('ru', ru);

const Calendar = ({ bookingRange, onChange, control, minDate, wrapperName, label }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [inDate, outDate] = bookingRange;
    useEffect(() => {
        setDateRange([inDate, outDate]);
    }, [inDate, outDate]);
    return (
        <Controller
            control={control}
            name="bookingRange"
            render={({ field }) => (
                <div className="input-container">
                    <label className="form-label" htmlFor="datepicker">
                        {label}
                    </label>
                    <div className="datepicker">
                        <DatePicker
                            name="datepicker"
                            wrapperClassName="react-datepicker__wrapper"
                            className="input-calendar"
                            renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
                                <div>
                                    <button
                                        aria-label="Previous Month"
                                        className={
                                            'react-datepicker__navigation react-datepicker__navigation--previous'
                                        }
                                        style={customHeaderCount === 1 ? { visibility: 'hidden' } : null}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            decreaseMonth();
                                        }}
                                    >
                                        <span
                                            className={
                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                                            }
                                        >
                                            {'<'}
                                        </span>
                                    </button>
                                    <span className="react-datepicker__current-month">
                                        {monthDate.toLocaleString('ru', {
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <button
                                        aria-label="Next Month"
                                        className={'react-datepicker__navigation react-datepicker__navigation--next'}
                                        style={customHeaderCount === 0 ? { visibility: 'hidden' } : null}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            increaseMonth();
                                        }}
                                    >
                                        <span
                                            className={
                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                                            }
                                        >
                                            {'>'}
                                        </span>
                                    </button>
                                </div>
                            )}
                            selected={startDate}
                            monthsShown={2}
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(e) => {
                                setDateRange(e);
                                field.onChange(e);
                            }}
                            onCalendarClose={() => {
                                onChange({ name: 'countDays', value: (endDate - startDate) / (1000 * 60 * 60 * 24) });
                            }}
                            minDate={minDate}
                            dateFormat="P"
                            locale="ru"
                        />
                    </div>
                </div>
            )}
        />
    );
};

Calendar.propTypes = {
    onChange: PropTypes.func,
    control: PropTypes.object,
    bookingRange: PropTypes.array,
    minDate: PropTypes.object,
    wrapperName: PropTypes.string,
    label: PropTypes.string
};
export default Calendar;
