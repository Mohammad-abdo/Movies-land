import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import tmdbApi from '../../api/tmdbApi';
import MovieCard from '../movieCard/MovieCard';
import { category } from '../../api/tmdbApi';
import { OutlineButton } from '../Button/Button';
import './NowPlaying.scss';

const NowPlaying = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                setLoading(true);
                const params = { params: { page: 1 } };
                const response = await tmdbApi.getNowPlaying(params);
                setMovies(response.results?.slice(0, 12) || []);
            } catch (err) {
                console.error('Error fetching now playing:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNowPlaying();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <Spinner animation="border" variant="danger" />
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <div className="now-playing-section">
            <div className="section-header">
                <h2 className="section-title">Now Playing in Theaters</h2>
                <Link to="/movie">
                    <OutlineButton className="section-link-btn">
                        View More →
                    </OutlineButton>
                </Link>
            </div>
            <div className="now-playing-grid">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        category={category.movie}
                        item={movie}
                    />
                ))}
            </div>
        </div>
    );
};

export default NowPlaying;

