import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children, error, register }) => {
    const handleChange = () => {
        onChange({ name, value: !value });
    };
    const getInputClasses = () => {
        return 'form-check-input' + (error ? ' is-invalid' : '');
    };

    return (
        <div className="form-check">
            <input className={getInputClasses()} type="checkbox" id={name} onChange={handleChange} {...register} />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string,
    register: PropTypes.object
};
export default CheckBoxField;
