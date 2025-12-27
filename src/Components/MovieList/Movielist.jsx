import React, { useEffect, useState } from "react";
import tmdbApi, { tvType, category } from '../../api/tmdbApi';
import './MovieList.scss';
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../store/slice/favorites";
import { Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../movieCard/MovieCard';

const Movielist = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const moviesPerPage = 20;

    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);

    useEffect(() => {
        const getList = async () => {
            try {
                setLoading(true);
                const params = { params: { page: 1 } };
                const response = await tmdbApi.getMoviesList(tvType.popular, params);
                setItems(response.results || []);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching movies:', err);
            } finally {
                setLoading(false);
            }
        };
        getList();
    }, []);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = items.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddFavorite = (movie) => {
        dispatch(addFavorite(movie));
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <Spinner animation="border" variant="danger" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <p>{error}</p>
            </Alert>
        );
    }

    return (
        <div className="movie-list-container">
            <div className="movie-list-grid">
                {currentMovies.map((item) => {
                    const isFavorite = favorites.some((movie) => movie.id === item.id);
                    return (
                        <div key={item.id} className="movie-list-item">
                            <MovieCard 
                                category={category.movie} 
                                item={item} 
                            />
                            <button
                                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                                onClick={() => handleAddFavorite(item)}
                                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                <GoHeart />
                            </button>
                        </div>
                    );
                })}
            </div>

            {items.length > moviesPerPage && (
                <div className="movie-list-pagination">
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(items.length / moviesPerPage) }, (_, index) => (
                            <li key={index}>
                                <button
                                    className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Movielist;
