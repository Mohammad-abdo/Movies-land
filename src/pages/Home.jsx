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
import './Home.scss';

const Home = () => {
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
                        
                        {/* Now Playing Section */}
                        <section className="home-section">
                            <NowPlaying />
                        </section>

                        {/* Trending TV Series Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">Trending TV Series</h2>
                                <Link to="/tv">
                                    <OutlineButton className="section-link-btn">
                                        View More →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <MovieCarousel />
                        </section>

                        {/* Top Rated Movies Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">Top Rated Movies</h2>
                                <Link to="/movie">
                                    <OutlineButton className="section-link-btn">
                                        View More →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <TopRated />
                        </section>

                        {/* Popular Movies Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">Popular Movies</h2>
                                <Link to="/movie">
                                    <OutlineButton className="section-link-btn">
                                        View More →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <Movielist />
                        </section>

                        {/* Anime & Manga Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">Anime & Manga</h2>
                                <Link to="/anime">
                                    <OutlineButton className="section-link-btn">
                                        View More →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <AnimeCarousel />
                        </section>

                        {/* Collections Section */}
                        <section className="home-section">
                            <div className="section-header">
                                <h2 className="section-title">Movie Collections</h2>
                                <Link to="/collections">
                                    <OutlineButton className="section-link-btn">
                                        View All Collections →
                                    </OutlineButton>
                                </Link>
                            </div>
                            <div className="collections-preview">
                                <p className="text-light text-center">
                                    Discover amazing movie collections and franchises
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
