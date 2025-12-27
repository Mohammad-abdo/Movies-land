import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Spinner, Alert } from 'react-bootstrap';

import './movie-grid.scss';

import MovieCard from '../movieCard/MovieCard';
import Input from '../input/Input';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../Button/Button';

const MovieGrid = props => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);

    const { keyword } = useParams();
    const filters = props.filters || {};

    useEffect(() => {
        const getList = async () => {
            try {
                setLoading(true);
                setError(null);
                let response = null;
                
                if (keyword === undefined) {
                    // Check if any filters are active
                    const hasFilters = filters.genres?.length > 0 || filters.year || filters['vote_average.gte'] || filters.certification || filters.country || (filters.sort_by && filters.sort_by !== 'popularity.desc');
                    
                    if (hasFilters) {
                        // Use discover endpoint with filters
                        const params = {
                            params: {
                                page: page,
                                sort_by: filters.sort_by || 'popularity.desc'
                            }
                        };

                        // Add genre filter
                        if (filters.genres && filters.genres.length > 0) {
                            params.params.with_genres = filters.genres.join(',');
                        }

                        // Add year filter
                        if (filters.year) {
                            params.params.year = filters.year;
                        }

                        // Add rating filter
                        if (filters['vote_average.gte']) {
                            params.params['vote_average.gte'] = filters['vote_average.gte'];
                        }

                        // Add certification filter (for movies)
                        if (filters.certification && props.category === category.movie) {
                            params.params.certification_country = 'US';
                            params.params.certification = filters.certification;
                        }

                        // Add country filter
                        if (filters.country) {
                            if (props.category === category.movie) {
                                params.params.with_origin_country = filters.country;
                            } else {
                                params.params.with_origin_country = filters.country;
                            }
                        }
                        
                        if (props.category === category.anime) {
                            // For anime, add genre filter
                            params.params.with_genres = '16';
                            response = await tmdbApi.discover(category.tv, params);
                        } else {
                            response = await tmdbApi.discover(props.category, params);
                        }
                    } else {
                        // No filters - use popular/upcoming endpoints
                        const params = { params: { page: page } };
                        switch (props.category) {
                            case category.movie:
                                response = await tmdbApi.getMoviesList(movieType.popular, params);
                                break;
                            case category.anime:
                                response = await tmdbApi.searchAnime({ params: { page: page } });
                                break;
                            default:
                                response = await tmdbApi.getTvList(tvType.popular, params);
                        }
                    }
                } else {
                    // Search mode
                    const params = {
                        params: {
                            query: keyword,
                            page: page
                        }
                    };
                    if (props.category === category.anime) {
                        response = await tmdbApi.searchAnime(params);
                    } else {
                        response = await tmdbApi.search(props.category, params);
                    }
                }

                if (page === 1) {
                    setItems(response.results || []);
                } else {
                    setItems(prev => [...prev, ...(response.results || [])]);
                }
                setTotalPage(response.total_pages || 0);
            } catch (err) {
                setError(err.message || 'Failed to load content');
                console.error('Error loading movies:', err);
            } finally {
                setLoading(false);
            }
        };
        getList();
    }, [props.category, keyword, filters, page]);


    const loadMore = async () => {
        try {
            setLoadingMore(true);
            setPage(prev => prev + 1);
        } catch (err) {
            console.error('Error loading more:', err);
            setError('Failed to load more content');
            setLoadingMore(false);
        }
    };

    // Reset to page 1 when filters change
    useEffect(() => {
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.genres?.length, filters.sort_by, filters.year, filters['vote_average.gte'], filters.certification, filters.country]);

    if (loading && page === 1) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <Spinner animation="border" variant="primary" />
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

    if (!items || items.length === 0) {
        return (
            <Alert variant="info">
                <p>No content found. Try adjusting your filters.</p>
            </Alert>
        );
    }

    return (
        <>
            {keyword && (
                <div className="section mb-3">
                    <MovieSearch category={props.category} keyword={keyword} />
                </div>
            )}
            <div className="movie-grid">
                {items.map((item, i) => (
                    <MovieCard category={props.category} item={item} key={item.id || i} />
                ))}
            </div>
            {page < totalPage && (
                <div className="movie-grid__loadmore">
                    <OutlineButton 
                        className="small" 
                        onClick={loadMore}
                        disabled={loadingMore}
                    >
                        {loadingMore ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Loading...
                            </>
                        ) : (
                            'Load More'
                        )}
                    </OutlineButton>
                </div>
            )}
        </>
    );
}

const MovieSearch = props => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            const categoryPath = props.category === category.anime ? 'anime' : category[props.category];
            navigate(`/${categoryPath}/search/${keyword}`);
        }
    }, [keyword, props.category, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    );
}

export default MovieGrid;
