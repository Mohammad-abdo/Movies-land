import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { OutlineButton } from "../Components/Button/Button";
import Movielist from "../Components/MovieList/Movielist";
import MovieCarousel from "../Components/MovieCarousel/MovieCarousel";
import TopRated from "../Components/TopRated/TopRated";
import AnimeCarousel from "../Components/AnimeCarousel/AnimeCarousel";
import NowPlaying from '../Components/NowPlaying/NowPlaying';
import BestMoviesSlider from '../Components/BestMoviesSlider/BestMoviesSlider';
import HomeSidebar from '../Components/HomeSidebar/HomeSidebar';
import TrendingCarousel from '../Components/TrendingCarousel/TrendingCarousel';
import { useLanguage } from '../contexts/LanguageContext';
import './Home.scss';

const Home = () => {
    const { t } = useLanguage();
    return (
        <div className="home-page">
            <Container fluid className="home-page__container">
                <Row>
                    {/* Sidebar */}
                    <Col lg={3} className="home-sidebar-col">
                        <HomeSidebar />
                    </Col>

                    {/* Main Content */}
                    <Col lg={9} className="home-content-col">
                        {/* Best Movies Slider */}
                        <BestMoviesSlider />
                        
                        {/* Trending Today Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">{t('home.trendingToday')}</h2>
                                <Link to="/trending">
                                    <OutlineButton className="section-link-btn">
                                        {t('home.viewMore')} →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <TrendingCarousel mediaType="all" />
                        </section>
                        
                        {/* Now Playing Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">{t('home.nowPlaying')}</h2>
                                <Link to="/movie?sort=now_playing">
                                    <OutlineButton className="section-link-btn">
                                        {t('home.viewMore')} →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <NowPlaying />
                        </section>

                        {/* Trending TV Series Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">{t('home.trendingTV')}</h2>
                                <Link to="/tv">
                                    <OutlineButton className="section-link-btn">
                                        {t('home.viewMore')} →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <MovieCarousel />
                        </section>

                        {/* Top Rated Movies Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">{t('home.topRated')}</h2>
                                <Link to="/movie">
                                    <OutlineButton className="section-link-btn">
                                        {t('home.viewMore')} →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <TopRated />
                        </section>

                        {/* Popular Movies Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">{t('home.popularMovies')}</h2>
                                <Link to="/movie">
                                    <OutlineButton className="section-link-btn">
                                        {t('home.viewMore')} →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <Movielist />
                        </section>

                        {/* Anime & Manga Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">{t('home.anime')}</h2>
                                <Link to="/anime">
                                    <OutlineButton className="section-link-btn">
                                        {t('home.viewMore')} →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <AnimeCarousel />
                        </section>

                        {/* Collections Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">{t('home.collections')}</h2>
                                <Link to="/collections">
                                    <OutlineButton className="section-link-btn">
                                        {t('home.viewAllCollections')} →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <div className="collections-preview">
                                <p className="text-light text-center">
                                    {t('home.discoverCollections')}
                                </p>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
