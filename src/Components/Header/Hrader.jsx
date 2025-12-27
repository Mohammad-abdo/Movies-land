import React, { useRef, useEffect, useState } from "react";
import './Header.scss';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { FaSearch, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useSelector } from "react-redux";
import Input from '../input/Input';

const logo = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Movieweb_Logo.png';

const categories = [
    { name: 'Movies', path: '/movie', subcategories: [
        { name: 'Popular', path: '/movie' },
        { name: 'Top Rated', path: '/movie?sort=top_rated' },
        { name: 'Upcoming', path: '/movie?sort=upcoming' },
        { name: 'Now Playing', path: '/movie?sort=now_playing' },
    ]},
    { name: 'TV Series', path: '/tv', subcategories: [
        { name: 'Popular', path: '/tv' },
        { name: 'Top Rated', path: '/tv?sort=top_rated' },
        { name: 'On The Air', path: '/tv?sort=on_the_air' },
        { name: 'Airing Today', path: '/tv?sort=airing_today' },
    ]},
    { name: 'Anime', path: '/anime' },
    { name: 'Trending', path: '/trending' },
];

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const favorites = useSelector((state) => state.favorites);
    const favoritesCount = favorites?.length || 0;

    useEffect(() => {
        const shrinkHeader = () => {
            if (headerRef.current) {
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    headerRef.current.classList.add('shrink');
                } else {
                    headerRef.current.classList.remove('shrink');
                }
            }
        };
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleDropdownToggle = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    return (
        <div ref={headerRef} className="modern-header fixed-top">
            <div className="header-container container">
                {/* Logo */}
                <Link to="/" className="header-logo">
                    <img src={logo} alt="Movies Land Logo" className="logo-image" />
                    <span className="logo-text">Movies Land</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="header-nav">
                    {categories.map((category, index) => (
                        <div 
                            key={index}
                            className="nav-item-wrapper"
                            onMouseEnter={() => category.subcategories && setActiveDropdown(index)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link 
                                to={category.path}
                                className={`nav-link ${pathname.startsWith(category.path) ? 'active' : ''}`}
                            >
                                {category.name}
                                {category.subcategories && <FaChevronDown className="dropdown-icon" />}
                            </Link>
                            
                            {category.subcategories && activeDropdown === index && (
                                <div className="dropdown-menu">
                                    {category.subcategories.map((sub, subIndex) => (
                                        <Link 
                                            key={subIndex}
                                            to={sub.path}
                                            className="dropdown-item"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Search and Actions */}
                <div className="header-actions">
                    {/* Search */}
                    <div className="search-wrapper">
                        <form onSubmit={handleSearch} className="search-form">
                            <button 
                                type="button"
                                className="search-toggle"
                                onClick={() => setSearchOpen(!searchOpen)}
                            >
                                <FaSearch />
                            </button>
                            <div className={`search-input-wrapper ${searchOpen ? 'open' : ''}`}>
                                <Input
                                    type="text"
                                    placeholder="Search movies, TV shows..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="search-submit">
                                    <FaSearch />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Favorites */}
                    <Link to="/Favorites" className="favorites-link">
                        <GoHeart className="favorites-icon" />
                        {favoritesCount > 0 && (
                            <span className="favorites-badge">{favoritesCount}</span>
                        )}
                        <span className="favorites-text">Favorites</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav">
                    {categories.map((category, index) => (
                        <div key={index} className="mobile-nav-item">
                            <div 
                                className="mobile-nav-link-header"
                                onClick={() => category.subcategories && handleDropdownToggle(index)}
                            >
                                <Link 
                                    to={category.path}
                                    className="mobile-nav-link"
                                    onClick={closeMobileMenu}
                                >
                                    {category.name}
                                </Link>
                                {category.subcategories && (
                                    <FaChevronDown 
                                        className={`mobile-dropdown-icon ${activeDropdown === index ? 'open' : ''}`}
                                    />
                                )}
                            </div>
                            {category.subcategories && activeDropdown === index && (
                                <div className="mobile-submenu">
                                    {category.subcategories.map((sub, subIndex) => (
                                        <Link 
                                            key={subIndex}
                                            to={sub.path}
                                            className="mobile-submenu-item"
                                            onClick={closeMobileMenu}
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link 
                        to="/Favorites" 
                        className="mobile-favorites-link"
                        onClick={closeMobileMenu}
                    >
                        <GoHeart /> Favorites ({favoritesCount})
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Header;
