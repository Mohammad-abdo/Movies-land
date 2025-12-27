import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import ApiConfig from '../../api/api';
import { category } from '../../api/tmdbApi';
import './MobileOptimizedCard.scss';

const MobileOptimizedCard = ({ item, category: cate }) => {
    const posterUrl = ApiConfig.w500Image(item.poster_path);
    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date;
    const rating = item.vote_average?.toFixed(1);

    return (
        <Link to={`/${cate}/${item.id}`} className="mobile-optimized-card">
            <div className="card-poster">
                <img 
                    src={posterUrl} 
                    alt={title}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                    }}
                />
                <div className="card-rating">
                    <span className="rating-star">⭐</span>
                    <span className="rating-value">{rating || 'N/A'}</span>
                </div>
                <div className="card-overlay">
                    <div className="card-actions">
                        <button className="play-btn">▶</button>
                    </div>
                </div>
            </div>
            <div className="card-info">
                <h4 className="card-title">{title}</h4>
                {releaseDate && (
                    <span className="card-date">{new Date(releaseDate).getFullYear()}</span>
                )}
            </div>
        </Link>
    );
};

export default MobileOptimizedCard;

