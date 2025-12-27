import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = ({ type = 'text', placeholder, value, onChange, disabled, required }) => {
    return (
        <input
            className="modern-input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
        />
    );
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool
};

export default Input;
