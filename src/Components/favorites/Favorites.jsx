import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import { removeFavorite } from '../../store/slice/favorites';
import MovieCard from '../movieCard/MovieCard';
import { category } from '../../api/tmdbApi';
import './Favorites.scss';

const Favorites = () => {
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveFavorite = (movieId) => {
        dispatch(removeFavorite(movieId));
    };

    if (!favorites || favorites.length === 0) {
        return (
            <div className="favorites-empty">
                <div className="container">
                    <Alert variant="info" className="modern-alert-empty">
                        <Alert.Heading>No Favorites Yet</Alert.Heading>
                        <p>Start adding movies to your favorites list!</p>
                        <Link to="/" className="btn-primary-link">
                            Browse Movies
                        </Link>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <div className="container">
                <div className="favorites-header">
                    <h1 className="favorites-title">
                        My Favorite Movies
                        <span className="favorites-count">({favorites.length})</span>
                    </h1>
                </div>
                <div className="favorites-grid">
                    {favorites.map((item) => (
                        <div key={item.id} className="favorites-item">
                            <MovieCard 
                                category={item.category || category.movie} 
                                item={item} 
                            />
                            <button 
                                className="favorites-remove-btn"
                                onClick={() => handleRemoveFavorite(item.id)}
                                title="Remove from favorites"
                            >
                                <GoHeart />
                                <span>Remove</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
