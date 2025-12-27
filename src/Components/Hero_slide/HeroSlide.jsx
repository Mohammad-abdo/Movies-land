import React, { useEffect, useState } from "react";
import tmdbApi, { tvType } from '../../api/tmdbApi';
import ApiConfig from "../../api/api";
import './HeroSlide.scss';
import Button from '../Button/Button';
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { Spinner } from 'react-bootstrap';

const HeroSlide = () => {
    const [movieItems, setMovieItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                const param = { page: 1 };
                const response = await tmdbApi.getMoviesList(tvType.popular, { param });
                setMovieItems(response.results ? response.results.slice(3, 10) : []);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching hero slide movies:', err);
            } finally {
                setLoading(false);
            }
        };
        getMovies();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '500px' }}>
                <Spinner animation="border" variant="primary" size="lg" />
            </div>
        );
    }

    if (error || !movieItems || movieItems.length === 0) {
        return null;
    }

    return (
        <div className="hero-slide item_card">
            <Carousel>
                {movieItems.map((item, index) => {
                    const backdropUrl = ApiConfig.backdropImage(item.backdrop_path);
                    const title = item.title || item.name;

                    return (
                        <Carousel.Item key={item.id || index} style={{ position: 'relative' }}>
                            <img 
                                className="d-block w-100" 
                                src={backdropUrl}
                                alt={title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/1920x1080?text=No+Image';
                                }}
                            />
                            <Carousel.Caption>
                                <div className="container">
                                    <div className="row info__content__slide d-flex justify-content-between">
                                        <div className="col-12 col-md-7 d-flex justify-content-evenly flex-column">
                                            <div className="d-flex">
                                                <h2 className="title" style={{ fontSize: '60px', fontWeight: 'bold' }}>
                                                    {title}
                                                </h2>
                                            </div>
                                            {item.overview && (
                                                <div className="overview d-flex" style={{ fontSize: '28px', fontWeight: '500' }}>
                                                    {item.overview.substring(0, 200)}...
                                                </div>
                                            )}
                                            <div className="my-2 d-flex">
                                                <Link to={`/movie/${item.id}`}>
                                                    <Button className="mx-3 btn">
                                                        Watch Now
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                        {backdropUrl && (
                                            <div 
                                                className="col-4 my-3 mx-3 img__slide__card d-none d-md-block"
                                                style={{ backgroundImage: `url(${backdropUrl})` }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
}

export default HeroSlide;
