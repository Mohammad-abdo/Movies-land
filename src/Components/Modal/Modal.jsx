import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({ active: activeProp, id, children }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(activeProp);
    }, [activeProp]);

    return (
        <div id={id} className={`modal ${active ? 'active' : ''}`}>
            {children}
        </div>
    );
};

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
    children: PropTypes.node
};

export const ModalContent = ({ onClose, children }) => {
    const contentRef = useRef(null);

    const closeModal = () => {
        if (contentRef.current?.parentNode) {
            contentRef.current.parentNode.classList.remove('active');
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <div ref={contentRef} className="modal__content">
            {children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    );
};

ModalContent.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node
};

export default Modal;