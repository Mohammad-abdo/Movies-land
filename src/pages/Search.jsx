import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import tmdbApi from '../api/tmdbApi';
import MovieCard from '../Components/movieCard/MovieCard';
import { category } from '../api/tmdbApi';
import PageHeader from '../Components/page-header/PageHeader';
import Input from '../Components/input/Input';
import Button from '../Components/Button/Button';
import './Search.scss';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState(query);

    useEffect(() => {
        if (query) {
            performSearch(query);
        }
    }, [query]);

    const performSearch = async (searchQuery) => {
        try {
            setLoading(true);
            setError(null);
            const params = { params: { query: searchQuery, page: 1 } };
            const response = await tmdbApi.multiSearch(params);
            setResults(response.results || []);
        } catch (err) {
            setError(err.message || 'Failed to search');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setSearchParams({ q: searchInput.trim() });
        }
    };

    const movies = results.filter(item => item.media_type === 'movie' || !item.media_type);
    const tvShows = results.filter(item => item.media_type === 'tv');
    const people = results.filter(item => item.media_type === 'person');

    return (
        <div className="search-page">
            <PageHeader>Search Results</PageHeader>
            <div className="container search-container">
                {/* Search Form */}
                <div className="search-form-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <Input
                            type="text"
                            placeholder="Search for movies, TV shows, actors..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </div>

                {loading && (
                    <div className="search-loading">
                        <Spinner animation="border" variant="danger" size="lg" />
                    </div>
                )}

                {error && (
                    <Alert variant="danger">
                        <Alert.Heading>Error</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                )}

                {!loading && !error && query && (
                    <div className="search-results">
                        {results.length === 0 ? (
                            <div className="no-results">
                                <h3>No results found</h3>
                                <p>Try searching with different keywords</p>
                            </div>
                        ) : (
                            <>
                                {movies.length > 0 && (
                                    <div className="results-section">
                                        <h2 className="results-title">Movies ({movies.length})</h2>
                                        <div className="results-grid">
                                            {movies.map((item) => (
                                                <MovieCard
                                                    key={item.id}
                                                    category={category.movie}
                                                    item={item}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {tvShows.length > 0 && (
                                    <div className="results-section">
                                        <h2 className="results-title">TV Shows ({tvShows.length})</h2>
                                        <div className="results-grid">
                                            {tvShows.map((item) => (
                                                <MovieCard
                                                    key={item.id}
                                                    category={category.tv}
                                                    item={item}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {people.length > 0 && (
                                    <div className="results-section">
                                        <h2 className="results-title">People ({people.length})</h2>
                                        <div className="people-grid">
                                            {people.map((person) => (
                                                <Link
                                                    key={person.id}
                                                    to={`/person/${person.id}`}
                                                    className="person-card"
                                                >
                                                    <img
                                                        src={person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                                                        alt={person.name}
                                                        className="person-image"
                                                    />
                                                    <h3 className="person-name">{person.name}</h3>
                                                    {person.known_for && person.known_for.length > 0 && (
                                                        <p className="person-known-for">
                                                            Known for: {person.known_for.map(item => item.title || item.name).join(', ')}
                                                        </p>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                {!query && (
                    <div className="search-placeholder">
                        <h3>Start Searching</h3>
                        <p>Enter a movie, TV show, or actor name to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;


