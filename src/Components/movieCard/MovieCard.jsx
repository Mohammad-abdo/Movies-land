import React, { useState } from "react";
import { Link } from "react-router-dom";
import { category } from "../../api/tmdbApi";
import ApiConfig from "../../api/api";
import './MovieCard.scss';

const MovieCard = props => {
    const item = props.item;
    const categoryPath = props.category === category.anime ? 'tv' : category[props.category];
    const link = '/' + categoryPath + '/' + item.id;
    const posterUrl = ApiConfig.w500Image(item.poster_path);
    const title = item.title || item.name;
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <Link to={link} className="modern-movie-card">
            <div className="modern-movie-card__poster">
                {!imageError ? (
                    <img 
                        src={posterUrl}
                        alt={title}
                        onError={handleImageError}
                    />
                ) : (
                    <div className="modern-movie-card__placeholder">
                        <span>{title.charAt(0)}</span>
                    </div>
                )}
                <div className="modern-movie-card__overlay">
                    <div className="modern-movie-card__rating">
                        {item.vote_average && (
                            <span className="rating-star">⭐</span>
                        )}
                        {item.vote_average && (
                            <span>{item.vote_average.toFixed(1)}</span>
                        )}
                    </div>
                    <div className="modern-movie-card__info">
                        <h3 className="modern-movie-card__title">{title}</h3>
                        {item.release_date && (
                            <p className="modern-movie-card__date">
                                {new Date(item.release_date || item.first_air_date).getFullYear()}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;
