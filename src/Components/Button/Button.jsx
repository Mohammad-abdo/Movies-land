import React from "react";
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ className = '', onClick, disabled, children, ...rest }) => {
    return (
        <button
            className={`btn_c ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export const OutlineButton = ({ className = '', onClick, disabled, children, ...rest }) => {
    return (
        <button
            className={`OutlineButton ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired
};

OutlineButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired
};

export default Button;
