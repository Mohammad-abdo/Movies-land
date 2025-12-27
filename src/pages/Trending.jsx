import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Spinner, Alert } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import MovieGrid from '../Components/movie-grid/MovieGrid';
import tmdbApi from '../api/tmdbApi';
import MovieCard from '../Components/movieCard/MovieCard';
import { category } from '../api/tmdbApi';
import './Trending.scss';

const Trending = () => {
    const [activeTab, setActiveTab] = useState('today');
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const [moviesToday, moviesWeek, tvToday, tvWeek] = await Promise.all([
                    tmdbApi.getTrending('movie', 'day'),
                    tmdbApi.getTrending('movie', 'week'),
                    tmdbApi.getTrending('tv', 'day'),
                    tmdbApi.getTrending('tv', 'week'),
                ]);

                setTrendingMovies({
                    today: moviesToday.results || [],
                    week: moviesWeek.results || []
                });
                setTrendingTV({
                    today: tvToday.results || [],
                    week: tvWeek.results || []
                });
            } catch (err) {
                setError(err.message || 'Failed to load trending content');
                console.error('Error fetching trending:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    const getCurrentData = () => {
        const timeWindow = activeTab.includes('today') ? 'today' : 'week';
        const type = activeTab.includes('movies') ? 'movies' : 'tv';
        
        if (type === 'movies') {
            return trendingMovies[timeWindow] || [];
        } else {
            return trendingTV[timeWindow] || [];
        }
    };

    if (loading) {
        return (
            <div className="trending-loading">
                <PageHeader>Trending Now</PageHeader>
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" variant="danger" size="lg" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="trending-error">
                <PageHeader>Trending Now</PageHeader>
                <div className="container my-5">
                    <Alert variant="danger">
                        <Alert.Heading>Error</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                </div>
            </div>
        );
    }

    const currentData = getCurrentData();

    return (
        <div className="trending-page">
            <PageHeader>Trending Now</PageHeader>
            <div className="container">
                <div className="trending-tabs">
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="trending-tabs-custom"
                    >
                        <Tab eventKey="movies-today" title="Movies Today">
                            <div className="trending-grid">
                                {(trendingMovies.today || []).map((item) => (
                                    <MovieCard
                                        key={item.id}
                                        category={category.movie}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey="movies-week" title="Movies This Week">
                            <div className="trending-grid">
                                {(trendingMovies.week || []).map((item) => (
                                    <MovieCard
                                        key={item.id}
                                        category={category.movie}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey="tv-today" title="TV Today">
                            <div className="trending-grid">
                                {(trendingTV.today || []).map((item) => (
                                    <MovieCard
                                        key={item.id}
                                        category={category.tv}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey="tv-week" title="TV This Week">
                            <div className="trending-grid">
                                {(trendingTV.week || []).map((item) => (
                                    <MovieCard
                                        key={item.id}
                                        category={category.tv}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Trending;

