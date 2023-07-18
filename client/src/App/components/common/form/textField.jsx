import React, { useState } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { icons } from '../../../api/icons';

const TextField = ({ label, type, name, error, placeholder, register, formName, autoComplete, field }) => {
    const [showPassword, setShowPassword] = useState(false);
    const icon = showPassword === false ? parse(`${icons.closedEye}`) : parse(`${icons.openEye}`);
    const getInputClasses = () => {
        return 'input-container__input' + (error ? ' is-invalid' : '');
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (<>
        <div className="input-container">
            <label className="input-container__label" htmlFor={name}>
                {label}
            </label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? 'text' : type}
                    id={name + ' ' + formName}
                    name={name}
                    className={getInputClasses()}
                    placeholder={placeholder}
                    {...register}
                    autoComplete={autoComplete}
                    {...field}
                />

                {type === 'password' && (
                    <button className="input-container__password-button" type="button" onClick={toggleShowPassword}>
                        <i className="input-container__icon">{icon}</i>
                    </button>
                )}
            </div>
        </div>
        {error && <div className="invalid-feedback">{error}</div>}
    </>);
};

export default TextField;

TextField.defaultProps = {
    type: 'text'
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.object,
    formName: PropTypes.string,
    autoComplete: PropTypes.string,
    field: PropTypes.object
};
