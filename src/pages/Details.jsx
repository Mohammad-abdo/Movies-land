import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Alert, Badge } from "react-bootstrap";
import ApiConfig from "../api/api";
import tmdbApi from "../api/tmdbApi";
import TopRated from "../Components/TopRated/TopRated";
import { OutlineButton } from "../Components/Button/Button";
import CastSection from "../Components/CastSection/CastSection";
import Recommendations from "../Components/Recommendations/Recommendations";
import WatchProviders from "../Components/WatchProviders/WatchProviders";
import SeasonsList from "../Components/SeasonsList/SeasonsList";
import SimilarContent from "../Components/SimilarContent/SimilarContent";
import { category as cate } from "../api/tmdbApi";
import { useLanguage } from "../contexts/LanguageContext";
import './Details.scss';

const Details = () => {
    const { category, id } = useParams();
    const { t } = useLanguage();
    const [item, setItem] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const params = {};
                const [detailsResponse, videoResponse] = await Promise.all([
                    tmdbApi.details(category, id, params),
                    tmdbApi.getVideos(category, id).catch(() => null)
                ]);

                setItem(detailsResponse);
                if (videoResponse?.results && videoResponse.results.length > 0) {
                    const trailer = videoResponse.results.find(
                        v => v.site === 'YouTube' && v.type === 'Trailer'
                    ) || videoResponse.results.find(
                        v => v.site === 'YouTube'
                    );
                    setVideo(trailer);
                }
                
                window.scrollTo(0, 0);
            } catch (err) {
                setError(err.message || 'Failed to load details');
                console.error('Error fetching details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id && category) {
            getDetails();
        }
    }, [category, id]);

    if (loading) {
        return (
            <div className="details-loading">
                <Spinner animation="border" variant="danger" size="lg" />
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="container details-error">
                <Alert variant="danger" className="modern-alert">
                    <Alert.Heading>{t('details.loadingError')}</Alert.Heading>
                    <p>{error || t('details.notFound')}</p>
                    <Link to="/">
                        <OutlineButton>{t('details.goHome')}</OutlineButton>
                    </Link>
                </Alert>
            </div>
        );
    }

    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date;
    const backdropUrl = ApiConfig.backdropImage(item.backdrop_path);
    const posterUrl = ApiConfig.w500Image(item.poster_path);
    const runtime = item.runtime || (item.episode_run_time && item.episode_run_time[0]);

    return (
        <div className="details-page">
            {/* Hero Section with Backdrop */}
            <div 
                className="details-hero"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${backdropUrl})` }}
            >
                <div className="container">
                    <div className="details-hero__content">
                        <div className="details-hero__poster">
                            <img 
                                src={posterUrl}
                                alt={title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="details-hero__info">
                            <h1 className="details-title">{title}</h1>
                            
                            <div className="details-meta">
                                {item.vote_average && (
                                    <div className="details-rating">
                                        <span className="rating-star">⭐</span>
                                        <span className="rating-value">{item.vote_average.toFixed(1)}</span>
                                        <span className="rating-total">/10</span>
                                    </div>
                                )}
                                {releaseDate && (
                                    <span className="details-year">{new Date(releaseDate).getFullYear()}</span>
                                )}
                                {runtime && (
                                    <span className="details-runtime">{runtime} {t('details.runtime')}</span>
                                )}
                                {category === cate.tv && item.number_of_seasons && (
                                    <span className="details-seasons">
                                        {item.number_of_seasons} {item.number_of_seasons === 1 ? t('details.season') : t('details.seasonsPlural')}
                                    </span>
                                )}
                                {category === cate.tv && item.number_of_episodes && (
                                    <span className="details-episodes">
                                        {item.number_of_episodes} {t('details.episode')}
                                    </span>
                                )}
                                {item.genres && item.genres.length > 0 && (
                                    <div className="details-genres">
                                        {item.genres.map((genre) => (
                                            <Badge key={genre.id} bg="danger" className="genre-badge">
                                                {genre.name}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {item.overview && (
                                <p className="details-overview">{item.overview}</p>
                            )}

                            <div className="details-actions">
                                <Link to={`/${category}/${id}/watch`}>
                                    <button className="btn-primary">
                                        ▶ {t('details.watchNow')}
                                    </button>
                                </Link>
                                <button className="btn-secondary">
                                    + {t('details.addToFavorites')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container details-content">
                {/* Trailer Section */}
                {video && (
                    <div className="details-section">
                        <h2 className="section-title">{t('details.trailer')}</h2>
                        <div className="details-trailer">
                            <div className="ratio ratio-16x9">
                                <iframe
                                    title="Movie Trailer"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    allowFullScreen
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Additional Info */}
                <div className="details-section">
                    <h2 className="section-title">{t('details.moreInfo')}</h2>
                    <div className="details-info-grid">
                        {item.status && (
                            <div className="info-item">
                                <strong>{t('details.status')}:</strong>
                                <span>{item.status}</span>
                            </div>
                        )}
                        {item.original_language && (
                            <div className="info-item">
                                <strong>{t('details.language')}:</strong>
                                <span>{item.original_language.toUpperCase()}</span>
                            </div>
                        )}
                        {item.budget && item.budget > 0 && (
                            <div className="info-item">
                                <strong>{t('details.budget')}:</strong>
                                <span>${item.budget.toLocaleString()}</span>
                            </div>
                        )}
                        {item.revenue && item.revenue > 0 && (
                            <div className="info-item">
                                <strong>{t('details.revenue')}:</strong>
                                <span>${item.revenue.toLocaleString()}</span>
                            </div>
                        )}
                        {item.number_of_seasons && (
                            <div className="info-item">
                                <strong>{t('details.seasons')}:</strong>
                                <span>{item.number_of_seasons} {item.number_of_seasons === 1 ? t('details.season') : t('details.seasonsPlural')}</span>
                            </div>
                        )}
                        {item.number_of_episodes && (
                            <div className="info-item">
                                <strong>{t('details.episodes')}:</strong>
                                <span>{item.number_of_episodes} {t('common.episode')}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Seasons & Episodes (TV Series only) */}
                {category === cate.tv && item.number_of_seasons > 0 && (
                    <div className="details-section">
                        <SeasonsList tvId={id} totalSeasons={item.number_of_seasons} />
                    </div>
                )}

                {/* Watch Providers */}
                <WatchProviders category={category} id={id} />

                {/* Cast & Crew */}
                <CastSection category={category} id={id} />

                {/* Recommendations */}
                <Recommendations category={category} id={id} />

                {/* Similar Content */}
                <SimilarContent category={category} id={id} />
            </div>
        </div>
    );
}

export default Details;
