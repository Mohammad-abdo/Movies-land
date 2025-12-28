import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner, Alert, Card } from 'react-bootstrap';
import tmdbApi from '../api/tmdbApi';
import PageHeader from '../Components/page-header/PageHeader';
import ApiConfig from '../api/api';
import './Reviews.scss';

const Reviews = () => {
    const { category, id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await tmdbApi.getReviews(category, id);
                setReviews(response.results || []);
            } catch (err) {
                setError(err.message || 'Failed to load reviews');
                console.error('Error fetching reviews:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id && category) {
            fetchReviews();
        }
    }, [category, id]);

    if (loading) {
        return (
            <div className="reviews-loading">
                <PageHeader>Reviews</PageHeader>
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" variant="danger" size="lg" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="reviews-error">
                <PageHeader>Reviews</PageHeader>
                <div className="container my-5">
                    <Alert variant="danger">
                        <Alert.Heading>Error</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                </div>
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="reviews-empty">
                <PageHeader>Reviews</PageHeader>
                <div className="container my-5">
                    <Alert variant="info">
                        <Alert.Heading>No Reviews Yet</Alert.Heading>
                        <p>There are no reviews available for this content yet.</p>
                        <Link to={`/${category}/${id}`}>
                            <button className="btn-primary">Back to Details</button>
                        </Link>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <div className="reviews-page">
            <PageHeader>Reviews</PageHeader>
            <div className="container reviews-container">
                <div className="reviews-list">
                    {reviews.map((review) => (
                        <Card key={review.id} className="review-card">
                            <Card.Body>
                                <div className="review-header">
                                    <div className="review-author">
                                        {review.author_details.avatar_path ? (
                                            <img
                                                src={ApiConfig.w500Image(review.author_details.avatar_path)}
                                                alt={review.author}
                                                className="author-avatar"
                                            />
                                        ) : (
                                            <div className="author-avatar-placeholder">
                                                {review.author.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div className="author-info">
                                            <h5 className="author-name">{review.author}</h5>
                                            {review.author_details.rating && (
                                                <div className="author-rating">
                                                    ⭐ {review.author_details.rating}/10
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="review-date">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="review-content">
                                    <p>{review.content}</p>
                                </div>
                                {review.url && (
                                    <a 
                                        href={review.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="review-link"
                                    >
                                        Read Full Review →
                                    </a>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;


