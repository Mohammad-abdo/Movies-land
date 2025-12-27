import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../Button/Button';
import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container className="error-boundary">
                    <Alert variant="danger" className="modern-alert-error">
                        <Alert.Heading>Something went wrong</Alert.Heading>
                        <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
                        <div className="error-boundary__actions">
                            <OutlineButton onClick={() => window.location.reload()}>
                                Refresh Page
                            </OutlineButton>
                            <Link to="/">
                                <OutlineButton>Go to Home</OutlineButton>
                            </Link>
                        </div>
                    </Alert>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
