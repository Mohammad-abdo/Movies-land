import React from "react";
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
    return (
        <div className="not-found-page">
            <div className="not-found-container">
                <div className="not-found-content">
                    <h1 className="not-found-code">404</h1>
                    <h2 className="not-found-title">Page Not Found</h2>
                    <p className="not-found-message">
                        Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                    <div className="not-found-actions">
                        <Link to="/" className="not-found-btn-primary">
                            Go to Home
                        </Link>
                        <button 
                            onClick={() => window.history.back()} 
                            className="not-found-btn-secondary"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
