import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import tmdbApi from '../api/tmdbApi';
import ApiConfig from '../api/api';
import PageHeader from '../Components/page-header/PageHeader';
import MovieCard from '../Components/movieCard/MovieCard';
import { category } from '../api/tmdbApi';
import './Collections.scss';

const Collections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch popular collections
        // Note: TMDB doesn't have a direct collections list endpoint
        // We'll use popular movies and group by collection
        const fetchCollections = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Get popular movies that belong to collections
                const params = { params: { page: 1 } };
                const response = await tmdbApi.getMoviesList('popular', params);
                
                // Extract unique collections
                const collectionMap = new Map();
                response.results?.forEach(movie => {
                    if (movie.belongs_to_collection) {
                        const collectionId = movie.belongs_to_collection.id;
                        if (!collectionMap.has(collectionId)) {
                            collectionMap.set(collectionId, {
                                id: collectionId,
                                name: movie.belongs_to_collection.name,
                                poster_path: movie.belongs_to_collection.poster_path,
                                backdrop_path: movie.belongs_to_collection.backdrop_path,
                                movies: []
                            });
                        }
                        collectionMap.get(collectionId).movies.push(movie);
                    }
                });
                
                // Fetch full collection details
                const collectionPromises = Array.from(collectionMap.values()).slice(0, 10).map(async (col) => {
                    try {
                        const details = await tmdbApi.getCollection(col.id);
                        return details;
                    } catch (err) {
                        return col;
                    }
                });
                
                const collectionsData = await Promise.all(collectionPromises);
                setCollections(collectionsData.filter(c => c));
            } catch (err) {
                setError(err.message || 'Failed to load collections');
                console.error('Error fetching collections:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

    if (loading) {
        return (
            <div className="collections-loading">
                <PageHeader>Movie Collections</PageHeader>
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" variant="danger" size="lg" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="collections-error">
                <PageHeader>Movie Collections</PageHeader>
                <div className="container my-5">
                    <Alert variant="danger">
                        <Alert.Heading>Error</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <div className="collections-page">
            <PageHeader>Movie Collections</PageHeader>
            <div className="container collections-container">
                <div className="collections-grid">
                    {collections.map((collection) => (
                        <Link
                            key={collection.id}
                            to={`/collection/${collection.id}`}
                            className="collection-card"
                        >
                            <div 
                                className="collection-backdrop"
                                style={{
                                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${ApiConfig.backdropImage(collection.backdrop_path)})`
                                }}
                            >
                                <div className="collection-content">
                                    {collection.poster_path && (
                                        <img
                                            src={ApiConfig.w500Image(collection.poster_path)}
                                            alt={collection.name}
                                            className="collection-poster"
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
                                                {collection.parts.length} Movies
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;

