import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = forwardRef(function CheckBoxField({ name, onChange, children, error, disabled = false, wrapperName }, ref) {
    const getInputClasses = () => {
        return 'form-check-input' + (disabled ? 'form-check-input-disabled' : '');
    };

    console.log(name);
    return (
        <>
            <label className={'form-check-label' + (wrapperName ? ` check-label_${wrapperName}` : '')} >
                <input
                    className={getInputClasses()}
                    type="checkbox"
                    onChange={onChange}
                    name={name}
                    ref={ref}
                    disabled={disabled}/>
                    {children}
            </label>
        </>
    );
});

CheckBoxField.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string,
    disabled: PropTypes.bool,
    wrapperName: PropTypes.string
};
export default CheckBoxField;
