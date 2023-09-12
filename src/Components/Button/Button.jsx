import React from "react";
import PropesTypes from 'prop-types';
import './Button.scss'
const Button =props =>{
    return (
        <>
        <button
        // @ts-ignore
        className={`btn_c ${props.className}`} onClick={props.onClick ? ()=> props.onClick():null}
        >
            {props.children}
        </button>
        </>
    )
}
export const OutlineButton =props =>{
    return (
    
        <button
        className={`OutlineButton ${props.className}`} onClick={props.onClick ? ()=> props.onClick():null}
        >
            {props.children}
        </button>
    )
}

Button.PropesTypes={
    onclick:PropesTypes.func
}

export default Button ;