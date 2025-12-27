import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import tmdbApi from '../../api/tmdbApi';
import MovieCard from '../movieCard/MovieCard';
import { category } from '../../api/tmdbApi';
import { useLanguage } from '../../contexts/LanguageContext';
import './SimilarContent.scss';

const SimilarContent = ({ category: cate, id }) => {
    const { t } = useLanguage();
    const [similarItems, setSimilarItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                setLoading(true);
                const response = await tmdbApi.similar(cate, id);
                setSimilarItems(response.results?.slice(0, 12) || []);
            } catch (err) {
                console.error('Error fetching similar content:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id && cate) {
            fetchSimilar();
        }
    }, [cate, id]);

    if (loading) {
        return (
            <div className="similar-content-loading">
                <Spinner animation="border" variant="primary" size="sm" />
            </div>
        );
    }

    if (!similarItems || similarItems.length === 0) {
        return null;
    }

    return (
        <div className="similar-content-section">
            <div className="section-header">
                <h2 className="section-title">{t('details.similarContent')}</h2>
                <Link to={`/${cate}`}>
                    <button className="view-all-btn">
                        {t('details.viewAll')} →
                    </button>
                </Link>
            </div>
            <div className="similar-content-grid">
                {similarItems.map((item) => (
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

export default SimilarContent;

