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
        tv: [],
        people: []
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

            // People search using multi-search
            if (activeTab === 'all' || activeTab === 'people') {
                searchPromises.push(
                    fetch(`https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY || 'your-api-key'}&query=${encodeURIComponent(searchTerm)}&page=1`)
                        .then(res => res.json())
                        .then(res => ({ type: 'people', data: res.results || [] }))
                        .catch(() => ({ type: 'people', data: [] }))
                );
            }

            const results = await Promise.all(searchPromises);
            
            const newResults = {
                all: [],
                movies: [],
                tv: [],
                people: []
            };

            results.forEach(({ type, data }) => {
                if (type === 'movies') newResults.movies = data;
                if (type === 'tv') newResults.tv = data;
                if (type === 'people') newResults.people = data;
            });

            newResults.all = [...newResults.movies, ...newResults.tv, ...newResults.people];

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
                {language === 'ar' ? 'بحث متقدم' : 'Advanced Search'}
            </PageHeader>
            
            <Container>
                {/* Search Bar */}
                <div className="advanced-search-bar">
                    <Form onSubmit={handleSearch}>
                        <InputGroup className="search-input-group">
                            <Form.Control
                                type="text"
                                placeholder={language === 'ar' ? 'ابحث عن أفلام، مسلسلات، ممثلين...' : 'Search movies, TV shows, actors...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <Button type="submit" variant="danger" className="search-submit-btn">
                                {language === 'ar' ? 'بحث' : 'Search'}
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
                        <Tab eventKey="all" title={language === 'ar' ? 'الكل' : 'All'} className="search-tab-content">
                            <SearchResults 
                                results={currentResults} 
                                loading={loading}
                                type="all"
                                language={language}
                            />
                        </Tab>
                        <Tab eventKey="movies" title={language === 'ar' ? 'أفلام' : 'Movies'}>
                            <SearchResults 
                                results={currentResults} 
                                loading={loading}
                                type="movies"
                                category={category.movie}
                                language={language}
                            />
                        </Tab>
                        <Tab eventKey="tv" title={language === 'ar' ? 'مسلسلات' : 'TV Series'}>
                            <SearchResults 
                                results={currentResults} 
                                loading={loading}
                                type="tv"
                                category={category.tv}
                                language={language}
                            />
                        </Tab>
                    </Tabs>
                )}

                {!query && (
                    <div className="search-empty-state">
                        <p>{language === 'ar' ? 'ابدأ البحث عن المحتوى المفضل لديك' : 'Start searching for your favorite content'}</p>
                    </div>
                )}
            </Container>
        </div>
    );
};

const SearchResults = ({ results, loading, type = 'all', category, language }) => {
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
                <p>{language === 'ar' ? 'لا توجد نتائج' : 'No results found'}</p>
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

const PeopleResults = ({ results, loading, language }) => {
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
                <p>{language === 'ar' ? 'لا توجد نتائج' : 'No results found'}</p>
            </div>
        );
    }

    return (
        <div className="people-results-grid">
            <Row>
                {results.map((person) => (
                    <Col key={person.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                        <Link to={`/person/${person.id}`} className="person-card">
                            <div className="person-image">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}` || 'https://via.placeholder.com/300x450?text=No+Image'}
                                    alt={person.name}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                    }}
                                />
                            </div>
                            <div className="person-info">
                                <h5>{person.name}</h5>
                                {person.known_for_department && (
                                    <span className="person-department">{person.known_for_department}</span>
                                )}
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default SearchAdvanced;

