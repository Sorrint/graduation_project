import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, value, onChange, defaultOption, options, name, error, register, elementName }) => {
    const handleChange = ({ target }) => {
        onChange && onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        const name = elementName ? `form-select__${elementName}` : `form-select`;
        return `${name}` + (error ? ' is-invalid' : '');
    };

    const optionsArray = !Array.isArray(options) && typeof options === 'object' ? Object.values(options) : options;
    return (
        <div className="input-container">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                {...register}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.length > 0 &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    name: PropTypes.string,
    error: PropTypes.string,
    register: PropTypes.object,
    elementName: PropTypes.string
};
export default SelectField;
