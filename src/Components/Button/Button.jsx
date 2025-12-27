import React from "react";
import PropTypes from 'prop-types';
import './Button.scss';

const Button = props => {
    return (
        <button
            className={`btn_c ${props.className || ''}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export const OutlineButton = props => {
    return (
        <button
            className={`OutlineButton ${props.className || ''}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node
};

OutlineButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node
};

export default Button;
