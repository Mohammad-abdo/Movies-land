import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Alert, Container } from 'react-bootstrap';
import tmdbApi from '../api/tmdbApi';
import ApiConfig from '../api/api';
import PageHeader from '../Components/page-header/PageHeader';
import { useLanguage } from '../contexts/LanguageContext';
import './Collections.scss';

const Collections = () => {
    const { t } = useLanguage();
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch popular collections
        // Note: TMDB doesn't have a direct collections list endpoint
        // We'll fetch multiple pages of popular movies to find collections
        const fetchCollections = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch multiple pages to get more collections
                const collectionMap = new Map();
                const pagesToFetch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Fetch more pages
                
                // Fetch multiple pages in parallel
                const pagePromises = pagesToFetch.map(page => 
                    tmdbApi.getMoviesList('popular', { params: { page } }).catch(err => {
                        console.warn(`Error fetching page ${page}:`, err);
                        return { results: [] }; // Return empty results on error
                    })
                );
                
                const responses = await Promise.all(pagePromises);
                
                // Extract unique collections from all pages
                responses.forEach(response => {
                    if (response && response.results) {
                        response.results.forEach(movie => {
                            if (movie.belongs_to_collection && movie.belongs_to_collection.id) {
                                const collectionId = movie.belongs_to_collection.id;
                                if (!collectionMap.has(collectionId)) {
                                    collectionMap.set(collectionId, {
                                        id: collectionId,
                                        name: movie.belongs_to_collection.name,
                                        poster_path: movie.belongs_to_collection.poster_path,
                                        backdrop_path: movie.belongs_to_collection.backdrop_path,
                                    });
                                }
                            }
                        });
                    }
                });
                
                // Convert map to array and fetch full collection details
                const collectionArray = Array.from(collectionMap.values());
                
                if (collectionArray.length === 0) {
                    setError(t('collections.noCollectionsFound'));
                    setLoading(false);
                    return;
                }
                
                // Fetch full collection details for each collection with error handling
                const collectionPromises = collectionArray.slice(0, 30).map(async (col) => {
                    try {
                        const details = await tmdbApi.getCollection(col.id);
                        // Ensure the response has the expected structure
                        if (details && details.id) {
                            return details;
                        }
                        // Return basic info if response is invalid
                        return {
                            id: col.id,
                            name: col.name,
                            poster_path: col.poster_path,
                            backdrop_path: col.backdrop_path,
                            parts: details?.parts || [],
                            overview: details?.overview || ''
                        };
                    } catch (err) {
                        console.error(`Error fetching collection ${col.id}:`, err);
                        // Return basic collection info if details fetch fails
                        return {
                            id: col.id,
                            name: col.name,
                            poster_path: col.poster_path,
                            backdrop_path: col.backdrop_path,
                            parts: [],
                            overview: ''
                        };
                    }
                });
                
                const collectionsData = await Promise.all(collectionPromises);
                // Filter out null/undefined and keep collections that have at least a name
                const validCollections = collectionsData.filter(c => 
                    c && 
                    c.id && 
                    c.name && 
                    (c.parts && c.parts.length > 0 || c.poster_path || c.backdrop_path)
                );
                
                // Sort by number of parts (more parts = better collection)
                validCollections.sort((a, b) => (b.parts?.length || 0) - (a.parts?.length || 0));
                
                setCollections(validCollections.slice(0, 20)); // Limit to top 20
                
                if (validCollections.length === 0) {
                    setError(t('collections.noCollectionsFound'));
                }
            } catch (err) {
                setError(err.message || t('collections.loadError'));
                console.error('Error fetching collections:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, [t]);

    if (loading) {
        return (
            <div className="collections-loading">
                <PageHeader>{t('nav.collections')}</PageHeader>
                <Container>
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                        <Spinner animation="border" variant="danger" size="lg" />
                        <span className="ms-3">{t('common.loading')}</span>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="collections-error">
                <PageHeader>{t('nav.collections')}</PageHeader>
                <Container>
                    <Alert variant="danger" className="my-5">
                        <Alert.Heading>{t('common.error')}</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                </Container>
            </div>
        );
    }

    if (collections.length === 0) {
        return (
            <div className="collections-page">
                <PageHeader>{t('nav.collections')}</PageHeader>
                <Container>
                    <Alert variant="info" className="my-5">
                        <p>{t('collections.noCollectionsFound')}</p>
                    </Alert>
                </Container>
            </div>
        );
    }

    return (
        <div className="collections-page">
            <PageHeader>{t('nav.collections')}</PageHeader>
            <Container className="collections-container">
                <div className="collections-grid">
                    {collections.map((collection) => (
                        <Link
                            key={collection.id}
                            to={`/collections/${collection.id}`}
                            className="collection-card"
                        >
                            <div 
                                className="collection-backdrop"
                                style={{
                                    backgroundImage: collection.backdrop_path 
                                        ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${ApiConfig.backdropImage(collection.backdrop_path)})`
                                        : 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8))'
                                }}
                            >
                                <div className="collection-content">
                                    {collection.poster_path && (
                                        <img
                                            src={ApiConfig.w500Image(collection.poster_path)}
                                            alt={collection.name}
                                            className="collection-poster"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    )}
                                    <div className="collection-info">
                                        <h3 className="collection-name">{collection.name}</h3>
                                        {collection.overview && (
                                            <p className="collection-overview">
                                                {collection.overview.substring(0, 150)}...
                                            </p>
                                        )}
                                        {collection.parts && (
                                            <div className="collection-count">
                                                {collection.parts.length} {collection.parts.length === 1 ? t('common.movie') : t('common.movies')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Collections;

