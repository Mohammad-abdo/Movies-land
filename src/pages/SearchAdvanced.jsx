import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab, Spinner, InputGroup, Form, Button, Accordion, Badge } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import MovieCard from '../Components/movieCard/MovieCard';
import { category } from '../api/tmdbApi';
import tmdbApi from '../api/tmdbApi';
import { useLanguage } from '../contexts/LanguageContext';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
import API_CONFIG from '../api/apiConfig';
import './SearchAdvanced.scss';

const SearchAdvanced = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t, language } = useLanguage();
    const query = searchParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState(query);
    const [activeTab, setActiveTab] = useState('all');
    const [results, setResults] = useState({
        all: [],
        movies: [],
        tv: [],
        anime: [],
        manga: []
    });
    const [loading, setLoading] = useState(false);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [filters, setFilters] = useState({
        year: '',
        genre: '',
        rating: '',
        sortBy: 'popularity.desc'
    });
    const [selectedSources, setSelectedSources] = useState({
        tmdb: true,
        anilist: API_CONFIG.anilist.enabled,
        kitsu: API_CONFIG.kitsu.enabled,
        jikan: API_CONFIG.jikan.enabled
    });

    useEffect(() => {
        if (query) {
            performSearch(query);
        }
    }, [query, activeTab]);

    const performSearch = async (searchTerm) => {
        if (!searchTerm.trim()) return;

        try {
            setLoading(true);
            const searchPromises = [];

            // Search all categories
            if (activeTab === 'all' || activeTab === 'movies') {
                searchPromises.push(
                    tmdbApi.search(category.movie, { params: { query: searchTerm, page: 1 } })
                        .then(res => ({ type: 'movies', data: res.results || [] }))
                        .catch(() => ({ type: 'movies', data: [] }))
                );
            }

            if (activeTab === 'all' || activeTab === 'tv') {
                searchPromises.push(
                    tmdbApi.search(category.tv, { params: { query: searchTerm, page: 1 } })
                        .then(res => ({ type: 'tv', data: res.results || [] }))
                        .catch(() => ({ type: 'tv', data: [] }))
                );
            }

            const results = await Promise.all(searchPromises);
            
            const newResults = {
                all: [],
                movies: [],
                tv: []
            };

            results.forEach(({ type, data }) => {
                if (type === 'movies') newResults.movies = data;
                if (type === 'tv') newResults.tv = data;
            });

            newResults.all = [...newResults.movies, ...newResults.tv];

            setResults(newResults);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setSearchParams({ q: searchQuery.trim() });
        }
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            year: '',
            genre: '',
            rating: '',
            sortBy: 'popularity.desc'
        });
    };

    const activeFiltersCount = [
        filters.year,
        filters.genre,
        filters.rating,
        filters.sortBy !== 'popularity.desc'
    ].filter(Boolean).length;

    const getCurrentResults = () => {
        if (activeTab === 'movies') return results.movies;
        if (activeTab === 'tv') return results.tv;
        return results.all;
    };

    const currentResults = getCurrentResults();

    return (
        <div className="search-advanced-page">
            <PageHeader>
                {t('pages.searchAdvanced')}
            </PageHeader>
            
            <Container>
                {/* Search Bar */}
                <div className="advanced-search-bar">
                    <Form onSubmit={handleSearch}>
                        <InputGroup className="search-input-group">
                            <Form.Control
                                type="text"
                                placeholder={t('search.placeholder') || 'Search movies, TV, anime, manga...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <Button 
                                type="button"
                                variant="outline-secondary"
                                className="filter-toggle-btn"
                                onClick={() => setFiltersVisible(!filtersVisible)}
                                title="Toggle Filters"
                            >
                                <FaFilter />
                                {activeFiltersCount > 0 && (
                                    <Badge bg="danger" className="filter-badge">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                            <Button type="submit" variant="danger" className="search-submit-btn">
                                <FaSearch /> {t('search.search') || 'Search'}
                            </Button>
                        </InputGroup>
                    </Form>

                    {/* Advanced Filters */}
                    {filtersVisible && (
                        <div className="advanced-filters-panel">
                            <div className="filters-header">
                                <h5>Advanced Filters</h5>
                                <Button 
                                    variant="link" 
                                    size="sm"
                                    onClick={clearFilters}
                                    className="clear-filters-btn"
                                >
                                    Clear All
                                </Button>
                            </div>
                            <Row>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Year</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="e.g., 2020"
                                            value={filters.year}
                                            onChange={(e) => handleFilterChange('year', e.target.value)}
                                            min="1900"
                                            max={new Date().getFullYear() + 1}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Min Rating</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="e.g., 7.0"
                                            value={filters.rating}
                                            onChange={(e) => handleFilterChange('rating', e.target.value)}
                                            min="0"
                                            max="10"
                                            step="0.1"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Sort By</Form.Label>
                                        <Form.Select
                                            value={filters.sortBy}
                                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                        >
                                            <option value="popularity.desc">Popularity</option>
                                            <option value="vote_average.desc">Rating</option>
                                            <option value="release_date.desc">Newest</option>
                                            <option value="release_date.asc">Oldest</option>
                                            <option value="title.asc">Title A-Z</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Search Sources</Form.Label>
                                        <div className="source-checkboxes">
                                            <Form.Check
                                                type="checkbox"
                                                label="TMDB"
                                                checked={selectedSources.tmdb}
                                                onChange={(e) => setSelectedSources(prev => ({...prev, tmdb: e.target.checked}))}
                                            />
                                            {API_CONFIG.anilist.enabled && (
                                                <Form.Check
                                                    type="checkbox"
                                                    label="AniList"
                                                    checked={selectedSources.anilist}
                                                    onChange={(e) => setSelectedSources(prev => ({...prev, anilist: e.target.checked}))}
                                                />
                                            )}
                                            {API_CONFIG.kitsu.enabled && (
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Kitsu"
                                                    checked={selectedSources.kitsu}
                                                    onChange={(e) => setSelectedSources(prev => ({...prev, kitsu: e.target.checked}))}
                                                />
                                            )}
                                            {API_CONFIG.jikan.enabled && (
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Jikan"
                                                    checked={selectedSources.jikan}
                                                    onChange={(e) => setSelectedSources(prev => ({...prev, jikan: e.target.checked}))}
                                                />
                                            )}
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    )}
                </div>

                {/* Search Tabs */}
                {query && (
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k || 'all')}
                        className="search-tabs"
                    >
                        <Tab eventKey="all" title={t('search.all')} className="search-tab-content">
                            <SearchResults 
                                results={currentResults} 
                                loading={loading}
                                type="all"
                                language={language}
                                t={t}
                            />
                        </Tab>
                        <Tab eventKey="movies" title={t('nav.movies')}>
                            <SearchResults 
                                results={currentResults} 
                                loading={loading}
                                type="movies"
                                category={category.movie}
                                language={language}
                                t={t}
                            />
                        </Tab>
                        <Tab eventKey="tv" title={t('nav.tv')}>
                            <SearchResults 
                                results={currentResults} 
                                loading={loading}
                                type="tv"
                                category={category.tv}
                                language={language}
                                t={t}
                            />
                        </Tab>
                    </Tabs>
                )}

                {!query && (
                    <div className="search-empty-state">
                        <p>{t('search.startSearching')}</p>
                    </div>
                )}
            </Container>
        </div>
    );
};

const SearchResults = ({ results, loading, type = 'all', category, language, t }) => {
    if (loading) {
        return (
            <div className="search-loading">
                <Spinner animation="border" variant="danger" size="lg" />
            </div>
        );
    }

    if (!results || results.length === 0) {
        return (
            <div className="search-no-results">
                <p>{t('search.noResults')}</p>
            </div>
        );
    }

    return (
        <div className="search-results-grid">
            <Row>
                {results.map((item) => (
                    <Col key={item.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                        {category && (
                            <MovieCard
                                category={category}
                                item={item}
                            />
                        )}
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default SearchAdvanced;
