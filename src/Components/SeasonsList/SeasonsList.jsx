import React, { useState, useEffect } from 'react';
import { Spinner, Accordion, Badge } from 'react-bootstrap';
import tmdbApi from '../../api/tmdbApi';
import ApiConfig from '../../api/api';
import { useLanguage } from '../../contexts/LanguageContext';
import './SeasonsList.scss';

const SeasonsList = ({ tvId, totalSeasons }) => {
    const { t } = useLanguage();
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                setLoading(true);
                const seasonsData = [];
                
                // Fetch details for each season
                for (let i = 1; i <= totalSeasons; i++) {
                    try {
                        const seasonData = await tmdbApi.getSeasonDetails(tvId, i);
                        seasonsData.push(seasonData);
                    } catch (err) {
                        console.error(`Error fetching season ${i}:`, err);
                    }
                }
                
                setSeasons(seasonsData);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching seasons:', err);
            } finally {
                setLoading(false);
            }
        };

        if (tvId && totalSeasons) {
            fetchSeasons();
        }
    }, [tvId, totalSeasons]);

    if (loading) {
        return (
            <div className="seasons-loading">
                <Spinner animation="border" variant="primary" size="sm" />
            </div>
        );
    }

    if (error || !seasons || seasons.length === 0) {
        return null;
    }

    return (
        <div className="seasons-list">
            <h3 className="seasons-title">{t('details.seasonsAndEpisodes')}</h3>
            <Accordion defaultActiveKey="0" className="seasons-accordion">
                {seasons.map((season, index) => (
                    <Accordion.Item 
                        eventKey={index.toString()} 
                        key={season.id || index}
                        className="season-item"
                    >
                        <Accordion.Header>
                            <div className="season-header-content">
                                <div className="season-poster-small">
                                    {season.poster_path && (
                                        <img 
                                            src={ApiConfig.w500Image(season.poster_path)} 
                                            alt={season.name}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="season-info">
                                    <h4 className="season-name">{season.name}</h4>
                                    <div className="season-meta">
                                        {season.air_date && (
                                            <span className="season-year">
                                                {new Date(season.air_date).getFullYear()}
                                            </span>
                                        )}
                                        {season.episode_count && (
                                            <Badge bg="secondary" className="episode-count-badge">
                                                {season.episode_count} {t('common.episode')}
                                            </Badge>
                                        )}
                                    </div>
                                    {season.overview && (
                                        <p className="season-overview">{season.overview.substring(0, 150)}...</p>
                                    )}
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {season.episodes && season.episodes.length > 0 ? (
                                <div className="episodes-grid">
                                    {season.episodes.map((episode) => (
                                        <div key={episode.id} className="episode-card">
                                            <div className="episode-poster">
                                                {episode.still_path ? (
                                                    <img 
                                                        src={ApiConfig.w500Image(episode.still_path)} 
                                                        alt={episode.name}
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/300x169?text=No+Image';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="episode-placeholder">
                                                        <span>حلقة {episode.episode_number}</span>
                                                    </div>
                                                )}
                                                <div className="episode-number">{t('common.episode')} {episode.episode_number}</div>
                                            </div>
                                            <div className="episode-info">
                                                <h5 className="episode-name">{episode.name}</h5>
                                                {episode.air_date && (
                                                    <span className="episode-date">
                                                        {new Date(episode.air_date).toLocaleDateString('ar-EG')}
                                                    </span>
                                                )}
                                                {episode.vote_average > 0 && (
                                                    <div className="episode-rating">
                                                        ⭐ {episode.vote_average.toFixed(1)}
                                                    </div>
                                                )}
                                                {episode.overview && (
                                                    <p className="episode-overview">{episode.overview.substring(0, 100)}...</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-episodes">{t('common.noEpisodes')}</p>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default SeasonsList;

