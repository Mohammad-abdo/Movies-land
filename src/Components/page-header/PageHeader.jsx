import React from 'react';
import './page-header.scss';

const PageHeader = props => {
    return (
        <div className="modern-page-header">
            <div className="modern-page-header__overlay"></div>
            <div className="modern-page-header__content">
                <h1 className="modern-page-header__title">{props.children}</h1>
            </div>
        </div>
    );
}

export default PageHeader;
