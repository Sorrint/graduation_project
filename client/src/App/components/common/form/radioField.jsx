import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({ name, label, register, options, value, wrapperName }) => {
    return (
        <div className={'input-container'}>
            <label className={'input-container__label' + (wrapperName ? ` label__${wrapperName}` : '')}>{label}</label>
            <div className="radio-group">
                {options.map((option) => (
                    <label key={option.name + ' ' + option.value} className="radio-label">
                        <input
                            className="radio-input"
                            type="radio"
                            name={name}
                            id={option.name + ' ' + option.value}
                            {...register(name)}
                            value={option.name}
                            defaultChecked={option.name === value}
                        />
                            {option.value}
                    </label>
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
    register: PropTypes.func,
    wrapperName: PropTypes.string
};

export default RadioField;
