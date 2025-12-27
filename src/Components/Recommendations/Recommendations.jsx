import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import tmdbApi from '../../api/tmdbApi';
import MovieCard from '../movieCard/MovieCard';
import { category } from '../../api/tmdbApi';
import './Recommendations.scss';

const Recommendations = ({ category: cate, id }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                const response = await tmdbApi.getRecommendations(cate, id);
                setRecommendations(response.results?.slice(0, 12) || []);
            } catch (err) {
                console.error('Error fetching recommendations:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id && cate) {
            fetchRecommendations();
        }
    }, [cate, id]);

    if (loading) {
        return (
            <div className="recommendations-loading">
                <Spinner animation="border" variant="danger" size="sm" />
            </div>
        );
    }

    if (!recommendations || recommendations.length === 0) {
        return null;
    }

    return (
        <div className="recommendations-section">
            <div className="section-header">
                <h2 className="section-title">Recommendations</h2>
            </div>
            <div className="recommendations-grid">
                {recommendations.map((item) => (
                    <MovieCard
                        key={item.id}
                        category={cate}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Recommendations;

