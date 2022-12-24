import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, name, error, placeholder, value, rows = 2, register }) => {
    const getInputClasses = () => {
        return 'input-container__input' + (error ? ' is-invalid' : '');
    };
    return (
        <div className="input-container">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                className={getInputClasses()}
                id={name}
                name={name}
                placeholder={placeholder}
                rows={rows}
                {...register}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default TextAreaField;

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.object,
    rows: PropTypes.number,
    value: PropTypes.string
};
