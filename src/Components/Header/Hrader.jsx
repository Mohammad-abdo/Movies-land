import React, { useRef, useEffect, useState } from "react";
import './Header.scss';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaChevronRight } from 'react-icons/fa';
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
            // Navigate to advanced search page
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleAdvancedSearch = () => {
        navigate('/search');
        setSearchOpen(false);
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
                                    placeholder={t('nav.searchPlaceholder') || 'Search movies, TV, anime, manga...'}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="search-submit" title="Search">
                                    <FaSearch />
                                </button>
                                <button 
                                    type="button" 
                                    className="advanced-search-link"
                                    onClick={handleAdvancedSearch}
                                    title="Advanced Search"
                                >
                                    ⚙️
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
            <div 
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'visible' : ''}`}
                onClick={closeMobileMenu}
            ></div>

            {/* Mobile Sidebar Menu */}
            <div className={`mobile-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo" onClick={closeMobileMenu}>
                        <span className="sidebar-logo-text">Movies Land</span>
                    </Link>
                    <button 
                        className="sidebar-close-btn"
                        onClick={closeMobileMenu}
                        aria-label="Close menu"
                    >
                        <FaTimes />
                    </button>
                </div>
                
                <nav className="sidebar-nav">
                    {categories.map((category, index) => (
                        <div key={index} className="sidebar-nav-item">
                            {category.subcategories ? (
                                <>
                                    <button
                                        className="sidebar-nav-link sidebar-nav-button"
                                        onClick={() => handleDropdownToggle(index)}
                                    >
                                        <span className="sidebar-nav-text">{category.name}</span>
                                        <span className={`sidebar-dropdown-icon ${activeDropdown === index ? 'open' : ''}`}>
                                            <FaChevronRight />
                                        </span>
                                    </button>
                                    {activeDropdown === index && (
                                        <div className="sidebar-submenu">
                                            {category.subcategories.map((sub, subIndex) => (
                                                <Link 
                                                    key={subIndex}
                                                    to={sub.path}
                                                    className="sidebar-submenu-item"
                                                    onClick={closeMobileMenu}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link 
                                    to={category.path}
                                    className={`sidebar-nav-link ${pathname.startsWith(category.path) ? 'active' : ''}`}
                                    onClick={closeMobileMenu}
                                >
                                    <span className="sidebar-nav-text">{category.name}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                    
                    <div className="sidebar-divider"></div>
                    
                    <Link 
                        to="/Favorites" 
                        className={`sidebar-nav-link sidebar-favorites ${pathname === '/Favorites' ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        <span className="sidebar-nav-text">{t('nav.favorites')}</span>
                        {favoritesCount > 0 && (
                            <span className="sidebar-badge">{favoritesCount}</span>
                        )}
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Header;
