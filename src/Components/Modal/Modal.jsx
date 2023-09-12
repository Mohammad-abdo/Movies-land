import React, { useEffect, useRef, useState } from "react";
import PropesTypes from 'prop-types';
const Modal =props =>{
  const   [active,setActive]=useState(false);

  useEffect(()=>{
    setActive(props.active)
  },[props.active])
    return (
        <>
<div id={props.id} className={`modal ${active ? 'active':''}`}>
{props.children}
</div>
        </>
    )
}


Modal.PropesTypes={
 active:PropesTypes.bool,
 id:PropesTypes.string
}

export  const ModelContent=props=>{
    const contentRef=useRef(null);
    const closeModal=()=>{
        // @ts-ignore
        contentRef.current.parentNode.classList.remove('active');
        if(props.onClose) props.onClose()
    }
return (
    <div ref={contentRef} className="modal__content"
    >
        {props.children}
        <div className="modal__content__close" onClick={closeModal}>
            <i className="bx bx-x"></i>
        </div>
    </div>
)
}

export default Modal ;