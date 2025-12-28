import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import tmdbApi from '../../api/tmdbApi';
import ApiConfig from '../../api/api';
import './CastSection.scss';

const CastSection = ({ category, id }) => {
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                setLoading(true);
                const response = await tmdbApi.credits(category, id);
                setCast(response.cast?.slice(0, 12) || []);
                setCrew(response.crew?.slice(0, 6) || []);
            } catch (err) {
                console.error('Error fetching credits:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id && category) {
            fetchCredits();
        }
    }, [category, id]);

    if (loading) {
        return (
            <div className="cast-loading">
                <Spinner animation="border" variant="danger" size="sm" />
            </div>
        );
    }

    if (!cast || cast.length === 0) {
        return null;
    }

    return (
        <div className="cast-section">
            <h2 className="section-title">Cast</h2>
            <div className="cast-grid">
                {cast.map((actor) => (
                    <Link 
                        key={actor.id} 
                        to={`/person/${actor.id}`}
                        className="cast-card"
                    >
                        <div className="cast-image">
                            <img
                                src={ApiConfig.w500Image(actor.profile_path)}
                                alt={actor.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="cast-info">
                            <h4 className="cast-name">{actor.name}</h4>
                            <p className="cast-character">{actor.character}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {crew.length > 0 && (
                <>
                    <h2 className="section-title">Crew</h2>
                    <div className="crew-grid">
                        {crew.map((member) => (
                            <div key={member.id} className="crew-card">
                                <h4 className="crew-name">{member.name}</h4>
                                <p className="crew-job">{member.job}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CastSection;


