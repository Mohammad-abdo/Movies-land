import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaHeart } from "react-icons/fa";
import './footer.scss';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const logo = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Movieweb_Logo.png';

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/movie' },
        { name: 'TV Series', path: '/tv' },
        { name: 'Anime', path: '/anime' },
        { name: 'Trending', path: '/trending' },
    ];

    const browseLinks = [
        { name: 'Popular Movies', path: '/movie' },
        { name: 'Top Rated', path: '/movie?sort=top_rated' },
        { name: 'Upcoming', path: '/movie?sort=upcoming' },
        { name: 'Now Playing', path: '/movie?sort=now_playing' },
    ];

    const tvLinks = [
        { name: 'Popular TV Shows', path: '/tv' },
        { name: 'Top Rated TV', path: '/tv?sort=top_rated' },
        { name: 'On The Air', path: '/tv?sort=on_the_air' },
        { name: 'Airing Today', path: '/tv?sort=airing_today' },
    ];

    const socialLinks = [
        { icon: FaFacebook, url: 'https://facebook.com', label: 'Facebook' },
        { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
        { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
        { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube' },
    ];

    return (
        <footer className="modern-footer">
            <div className="footer-container container">
                {/* Top Section */}
                <div className="footer-top">
                    <div className="footer-logo-section">
                        <Link to="/" className="footer-logo">
                            <img src={logo} alt="Movies Land Logo" className="footer-logo-image" />
                            <span className="footer-logo-text">Movies Land</span>
                        </Link>
                        <p className="footer-tagline">
                            Your ultimate destination for discovering the best movies and TV shows.
                            Explore, watch, and enjoy premium entertainment content.
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        aria-label={social.label}
                                    >
                                        <Icon />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-link-column">
                            <h4 className="footer-column-title">Quick Links</h4>
                            <ul className="footer-link-list">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-link-column">
                            <h4 className="footer-column-title">Movies</h4>
                            <ul className="footer-link-list">
                                {browseLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-link-column">
                            <h4 className="footer-column-title">TV Shows</h4>
                            <ul className="footer-link-list">
                                {tvLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>
                            &copy; {currentYear} Movies Land. All rights reserved.
                        </p>
                        <p className="footer-made-with">
                            Made with <FaHeart className="heart-icon" /> for movie lovers worldwide
                        </p>
                    </div>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/about">About Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
