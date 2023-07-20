import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, name, error, placeholder, rows = 2, register, displayLabel = true, wrapperName }) => {
    const getInputClasses = () => {
        return 'input-container__input' + (error ? ' is-invalid' : '');
    };
    return (
        <>
            <div className="input-container">
                {displayLabel && <label htmlFor={name} className={'form-label' + (wrapperName ? ` form-label_${wrapperName}` : '')}>
                    {label}
                </label>}
                <textarea
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    rows={rows}
                    {...register}
                />
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </>
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
    value: PropTypes.string,
    displayLabel: PropTypes.bool,
    wrapperName: PropTypes.string
};
