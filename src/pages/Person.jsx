import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Tabs, Tab, Badge } from 'react-bootstrap';
import tmdbApi from '../api/tmdbApi';
import ApiConfig from '../api/api';
import MovieCard from '../Components/movieCard/MovieCard';
import { category } from '../api/tmdbApi';
import PageHeader from '../Components/page-header/PageHeader';
import './Person.scss';

const Person = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [movieCredits, setMovieCredits] = useState([]);
    const [tvCredits, setTvCredits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPersonData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [personData, movies, tv] = await Promise.all([
                    tmdbApi.getPerson(id),
                    tmdbApi.getPersonMovieCredits(id),
                    tmdbApi.getPersonTvCredits(id),
                ]);

                setPerson(personData);
                setMovieCredits(movies.cast || []);
                setTvCredits(tv.cast || []);
            } catch (err) {
                setError(err.message || 'Failed to load person details');
                console.error('Error fetching person:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPersonData();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="person-loading">
                <PageHeader>Person</PageHeader>
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" variant="danger" size="lg" />
                </div>
            </div>
        );
    }

    if (error || !person) {
        return (
            <div className="person-error">
                <PageHeader>Person</PageHeader>
                <div className="container my-5">
                    <Alert variant="danger">
                        <Alert.Heading>Error</Alert.Heading>
                        <p>{error || 'Person not found'}</p>
                    </Alert>
                </div>
            </div>
        );
    }

    const profileUrl = ApiConfig.w500Image(person.profile_path);

    return (
        <div className="person-page">
            <PageHeader>{person.name}</PageHeader>
            <div className="container person-content">
                <div className="person-header">
                    <div className="person-poster">
                        <img
                            src={profileUrl}
                            alt={person.name}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                            }}
                        />
                    </div>
                    <div className="person-info">
                        <h1 className="person-name">{person.name}</h1>
                        
                        {person.known_for_department && (
                            <div className="person-department">
                                <Badge bg="danger">{person.known_for_department}</Badge>
                            </div>
                        )}

                        {person.birthday && (
                            <div className="person-detail">
                                <strong>Born:</strong> {new Date(person.birthday).toLocaleDateString()}
                                {person.place_of_birth && ` in ${person.place_of_birth}`}
                            </div>
                        )}

                        {person.biography && (
                            <div className="person-biography">
                                <h3>Biography</h3>
                                <p>{person.biography}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="person-credits">
                    <Tabs defaultActiveKey="movies" className="person-tabs">
                        <Tab eventKey="movies" title={`Movies (${movieCredits.length})`}>
                            <div className="credits-grid">
                                {movieCredits.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        category={category.movie}
                                        item={movie}
                                    />
                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey="tv" title={`TV Shows (${tvCredits.length})`}>
                            <div className="credits-grid">
                                {tvCredits.map((show) => (
                                    <MovieCard
                                        key={show.id}
                                        category={category.tv}
                                        item={show}
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

export default Person;

