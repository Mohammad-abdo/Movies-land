import React, { useRef, useEffect, useState } from "react";
import './Header.scss';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from "react-redux";
import Input from '../input/Input';
import { useLanguage } from '../../contexts/LanguageContext';

const logo = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Movieweb_Logo.png';

const Header = () => {
    const { language, toggleLanguage, t } = useLanguage();
    
    const categories = [
        { name: t('nav.movies'), path: '/movie', subcategories: [
            { name: t('movies.popular'), path: '/movie' },
            { name: t('movies.topRated'), path: '/movie?sort=top_rated' },
            { name: t('movies.upcoming'), path: '/movie?sort=upcoming' },
            { name: t('movies.nowPlaying'), path: '/movie?sort=now_playing' },
            { name: t('nav.collections'), path: '/collections' },
        ]},
        { name: t('nav.tv'), path: '/tv', subcategories: [
            { name: t('tv.popular'), path: '/tv' },
            { name: t('tv.topRated'), path: '/tv?sort=top_rated' },
            { name: t('tv.onAir'), path: '/tv?sort=on_the_air' },
            { name: t('tv.airingToday'), path: '/tv?sort=airing_today' },
        ]},
        { name: t('nav.anime'), path: '/anime' },
        { name: t('nav.manga'), path: '/manga' },
        { name: t('nav.trending'), path: '/trending' },
        { name: t('nav.adult'), path: '/adult', icon: '🔞' },
    ];
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

    // Close mobile menu when pressing escape key and prevent body scroll
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

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
                                    placeholder={t('nav.searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="search-submit">
                                    <FaSearch />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Language Switcher */}
                    <button 
                        className="language-switcher"
                        onClick={toggleLanguage}
                        title={t('nav.langSwitchTitle')}
                        aria-label={t('nav.langSwitchTitle')}
                    >
                        <span className="lang-code">{t('nav.langCode')}</span>
                    </button>

                    {/* Favorites */}
                    <Link to="/Favorites" className="favorites-link" title={t('nav.favorites')}>
                        <span className="favorites-text">{t('nav.favorites')}</span>
                        {favoritesCount > 0 && (
                            <span className="favorites-badge">{favoritesCount}</span>
                        )}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="mobile-menu-toggle"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setMobileMenuOpen(!mobileMenuOpen);
                        }}
                        aria-label="Toggle mobile menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="mobile-menu-overlay"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav">
                    {categories.map((category, index) => (
                        <div key={index} className="mobile-nav-item">
                            <div 
                                className="mobile-nav-link-header"
                            >
                                {category.subcategories ? (
                                    <>
                                        <button
                                            className="mobile-nav-link mobile-nav-button"
                                            onClick={() => handleDropdownToggle(index)}
                                        >
                                            {category.name}
                                        </button>
                                        <span className={`mobile-dropdown-indicator ${activeDropdown === index ? 'open' : ''}`}>
                                            ▼
                                        </span>
                                    </>
                                ) : (
                                    <Link 
                                        to={category.path}
                                        className="mobile-nav-link"
                                        onClick={closeMobileMenu}
                                    >
                                        {category.name}
                                    </Link>
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
                        {t('nav.favorites')} {favoritesCount > 0 && `(${favoritesCount})`}
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Header;
