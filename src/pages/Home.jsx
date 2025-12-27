import React from "react";
import { Link } from 'react-router-dom';
import { OutlineButton } from "../Components/Button/Button";
import Movielist from "../Components/MovieList/Movielist";
import MovieCarousel from "../Components/MovieCarousel/MovieCarousel";
import TopRated from "../Components/TopRated/TopRated";
import AnimeCarousel from "../Components/AnimeCarousel/AnimeCarousel";
import NowPlaying from '../Components/NowPlaying/NowPlaying';
import BestMoviesSlider from '../Components/BestMoviesSlider/BestMoviesSlider';
import './Home.scss';

const Home = () => {
    return (
        <div className="home-page">
            {/* Best Movies Slider */}
            <BestMoviesSlider />
            
            {/* Now Playing Section */}
            <section className="home-section">
                <div className="container">
                    <NowPlaying />
                </div>
            </section>

            {/* Trending TV Series Section */}
            <section className="home-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Trending TV Series</h2>
                        <Link to="/tv">
                            <OutlineButton className="section-link-btn">
                                View More →
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieCarousel />
                </div>
            </section>

            {/* Top Rated Movies Section */}
            <section className="home-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="section-link-btn">
                                View More →
                            </OutlineButton>
                        </Link>
                    </div>
                    <TopRated />
                </div>
            </section>

            {/* Popular Movies Section */}
            <section className="home-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Popular Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="section-link-btn">
                                View More →
                            </OutlineButton>
                        </Link>
                    </div>
                    <Movielist />
                </div>
            </section>

            {/* Anime & Manga Section */}
            <section className="home-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Anime & Manga</h2>
                        <Link to="/anime">
                            <OutlineButton className="section-link-btn">
                                View More →
                            </OutlineButton>
                        </Link>
                    </div>
                    <AnimeCarousel />
                </div>
            </section>
        </div>
    );
}

export default Home;
