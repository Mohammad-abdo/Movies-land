import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import tmdbApi, { movieType, category } from '../../api/tmdbApi';
import ApiConfig from '../../api/api';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './BestMoviesSlider.scss';
import { FaPlay, FaStar, FaInfoCircle } from 'react-icons/fa';

const BestMoviesSlider = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBestMovies = async () => {
            try {
                setLoading(true);
                setError(null);
                const params = { params: { page: 1 } };
                const response = await tmdbApi.getMoviesList(movieType.top_rated, params);
                setMovies(response.results?.slice(0, 10) || []);
            } catch (err) {
                setError(err.message || 'Failed to load movies');
                console.error('Error fetching best movies:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBestMovies();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1920 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1920, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    if (loading) {
        return (
            <div className="best-movies-slider-loading">
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '600px' }}>
                    <Spinner animation="border" variant="danger" size="lg" />
                </div>
            </div>
        );
    }

    if (error || !movies || movies.length === 0) {
        return null;
    }

    return (
        <div className="best-movies-slider">
            <div className="container">
                <div className="slider-header">
                    <h1 className="slider-title">
                        <span className="title-highlight">Best</span> Movies of All Time
                    </h1>
                    <p className="slider-subtitle">Discover the most acclaimed films loved by millions</p>
                </div>
                
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    transitionDuration={500}
                    removeArrowOnDeviceType={['mobile']}
                    className="best-movies-carousel"
                >
                    {movies.map((movie) => {
                        const backdropUrl = ApiConfig.backdropImage(movie.backdrop_path);
                        const posterUrl = ApiConfig.w500Image(movie.poster_path);
                        const title = movie.title || movie.name;

                        return (
                            <div key={movie.id} className="best-movie-card">
                                <Link 
                                    to={`/movie/${movie.id}`}
                                    className="movie-card-link"
                                >
                                    <div 
                                        className="movie-card-backdrop"
                                        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${backdropUrl})` }}
                                    >
                                        <div className="movie-card-content">
                                            <div className="movie-poster-wrapper">
                                                <img
                                                    src={posterUrl}
                                                    alt={title}
                                                    className="movie-poster"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                                    }}
                                                />
                                            </div>
                                            
                                            <div className="movie-info">
                                                <div className="movie-rating">
                                                    <FaStar className="star-icon" />
                                                    <span>{movie.vote_average?.toFixed(1)}</span>
                                                </div>
                                                
                                                <h3 className="movie-title">{title}</h3>
                                                
                                                {movie.overview && (
                                                    <p className="movie-overview">
                                                        {movie.overview.substring(0, 120)}...
                                                    </p>
                                                )}

                                                <div className="movie-actions">
                                                    <div className="action-btn watch-btn">
                                                        <FaPlay /> Watch Now
                                                    </div>
                                                    <div className="action-btn info-btn">
                                                        <FaInfoCircle /> Details
                                                    </div>
                                                </div>

                                                <div className="movie-year">
                                                    {movie.release_date && new Date(movie.release_date).getFullYear()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </div>
    );
};

export default BestMoviesSlider;


