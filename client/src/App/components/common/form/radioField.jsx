import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({ name, label, register, options, value }) => {
    return (
        <div className="radio-container">
            <label className="radio-container__title">{label}</label>
            <div className="radio-container__options">
                {options.map((option) => (
                    <div key={option.name + ' ' + option.value} className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={option.name + ' ' + option.value}
                            {...register(name)}
                            value={option.name}
                            defaultChecked={option.name === value}
                        />
                        <label className="form-check-label" htmlFor={option.name + ' ' + option.value}>
                            {option.value}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    register: PropTypes.func
};

export default RadioField;
