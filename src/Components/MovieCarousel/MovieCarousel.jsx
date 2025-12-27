import React, { useEffect, useState } from "react";
import tmdbApi, { tvType } from '../../api/tmdbApi';
import ApiConfig from "../../api/api";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MovieCarousel.scss';
import { Link } from "react-router-dom";
import { Spinner } from 'react-bootstrap';

const MovieCarousel = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getList = async () => {
            try {
                setLoading(true);
                const params = {};
                const response = await tmdbApi.getTvList(tvType.popular, { params });
                setItems(response.results || []);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching TV series:', err);
            } finally {
                setLoading(false);
            }
        };
        getList();
    }, []);

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
            items: 1,
        },
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <div className="text-light">Error loading TV series</div>;
    }

    return (
        <Carousel responsive={responsive}>
            {items.map((movie) => (
                <Link key={movie.id} to={'/' + 'tv' + '/' + movie.id}>
                    <div className="rounded__card shadow mx-1 my-2">
                        <div className="card">
                            <img 
                                src={ApiConfig.originalImage(movie.poster_path)} 
                                alt={movie.name || movie.title} 
                                className="img-fluid card-img-top img__card"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                                }}
                            />
                            <button className="btn btn-light py-1 px-3 card__btn">Watch Now</button>
                            <div className="card-body card__body">
                                <p className="text-light crd__title" style={{ fontSize: '17px' }}>
                                    {movie.name || movie.title}
                                </p>
                                {movie.overview && (
                                    <div className="text-light over__card" style={{ fontSize: '17px' }}>
                                        {movie.overview.substring(0, 100)}...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </Carousel>
    );
};

export default MovieCarousel;
