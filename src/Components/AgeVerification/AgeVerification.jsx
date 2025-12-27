import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import './AgeVerification.scss';

const AgeVerification = ({ onVerified, show }) => {
    const [age, setAge] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if user has already verified age
        const verified = localStorage.getItem('ageVerified');
        if (verified === 'true') {
            onVerified();
        }
    }, [onVerified]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const ageNum = parseInt(age);
        if (!age || isNaN(ageNum)) {
            setError('Please enter a valid age');
            return;
        }

        if (ageNum < 18) {
            setError('You must be 18 or older to access this content');
            return;
        }

        if (remember) {
            localStorage.setItem('ageVerified', 'true');
        }

        onVerified();
    };

    return (
        <Modal 
            show={show} 
            centered 
            backdrop="static" 
            keyboard={false}
            className="age-verification-modal"
        >
            <Modal.Body className="age-verification-content">
                <div className="age-verification-icon">🔞</div>
                <h2 className="age-verification-title">Age Verification Required</h2>
                <p className="age-verification-text">
                    This section contains adult content (18+). You must be 18 years or older to access this content.
                </p>
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter your age</Form.Label>
                        <Form.Control
                            type="number"
                            min="18"
                            max="120"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="18"
                            required
                            className="age-input"
                        />
                        {error && <div className="age-error">{error}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Remember my age (for 30 days)"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                    </Form.Group>

                    <div className="age-verification-actions">
                        <Button type="submit" variant="danger" className="verify-btn">
                            Verify Age
                        </Button>
                    </div>
                </Form>

                <p className="age-verification-disclaimer">
                    By clicking "Verify Age", you confirm that you are 18 years or older and agree to view adult content.
                </p>
            </Modal.Body>
        </Modal>
    );
};

AgeVerification.propTypes = {
    onVerified: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default AgeVerification;

