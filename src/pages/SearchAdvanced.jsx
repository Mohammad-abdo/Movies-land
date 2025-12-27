import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab, Spinner, InputGroup, Form, Button } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import MovieCard from '../Components/movieCard/MovieCard';
import { category } from '../api/tmdbApi';
import tmdbApi from '../api/tmdbApi';
import { useLanguage } from '../contexts/LanguageContext';
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
        tv: []
    });
    const [loading, setLoading] = useState(false);

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
                                placeholder={t('search.placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <Button type="submit" variant="danger" className="search-submit-btn">
                                {t('search.search')}
                            </Button>
                        </InputGroup>
                    </Form>
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
