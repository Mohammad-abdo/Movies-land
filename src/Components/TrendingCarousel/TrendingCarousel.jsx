import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import tmdbApi from '../../api/tmdbApi';
import ApiConfig from '../../api/api';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { category } from '../../api/tmdbApi';
import './TrendingCarousel.scss';

const TrendingCarousel = ({ mediaType = 'all' }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                setLoading(true);
                let response;
                
                if (mediaType === 'all') {
                    // Fetch both movies and TV, combine them
                    const [moviesRes, tvRes] = await Promise.all([
                        tmdbApi.getTrending('movie', 'day'),
                        tmdbApi.getTrending('tv', 'day')
                    ]);
                    const combined = [
                        ...(moviesRes.results || []).slice(0, 6),
                        ...(tvRes.results || []).slice(0, 6)
                    ];
                    response = { results: combined };
                } else {
                    response = await tmdbApi.getTrending(mediaType, 'day');
                }
                
                setItems(response.results?.slice(0, 12) || []);
            } catch (err) {
                console.error('Error fetching trending:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, [mediaType]);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
        },
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    const getCategory = (item) => {
        return item.title ? category.movie : category.tv;
    };

    return (
        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
            {items.map((item) => {
                const cat = getCategory(item);
                const posterUrl = ApiConfig.w500Image(item.poster_path);
                const title = item.title || item.name;

                return (
                    <Link key={item.id} to={`/${cat}/${item.id}`}>
                        <div className="trending-card">
                            <div className="trending-poster">
                                <img 
                                    src={posterUrl}
                                    alt={title}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                                    }}
                                />
                                <div className="trending-overlay">
                                    <span className="trending-rating">
                                        ⭐ {item.vote_average?.toFixed(1) || 'N/A'}
                                    </span>
                                </div>
                            </div>
                            <div className="trending-info">
                                <h5 className="trending-title">{title}</h5>
                                <span className="trending-date">
                                    {new Date(item.release_date || item.first_air_date).getFullYear()}
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </Carousel>
    );
};

export default TrendingCarousel;


