import React from 'react';
import './input.scss';

const Input = props => {
    return (
        <input
            className="modern-input"
            type={props.type || 'text'}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange ? (e) => props.onChange(e) : undefined}
            disabled={props.disabled}
            required={props.required}
        />
    );
}

export default Input;
