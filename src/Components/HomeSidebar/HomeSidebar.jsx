import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaFilm, FaTv, FaBookOpen, FaFire, FaHeart, FaSearch, FaStar, FaCalendar } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import './HomeSidebar.scss';

const HomeSidebar = () => {
    const location = useLocation();
    const { t } = useLanguage();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const categories = [
        {
            nameKey: 'nav.movies',
            icon: <FaFilm />,
            path: '/movie',
            subcategories: [
                { nameKey: 'movies.popular', path: '/movie?sort_by=popularity.desc' },
                { nameKey: 'movies.topRated', path: '/movie?sort_by=vote_average.desc' },
                { nameKey: 'movies.upcoming', path: '/movie?sort_by=release_date.desc' },
                { nameKey: 'movies.nowPlaying', path: '/movie?sort_by=popularity.desc&vote_average.gte=7' },
                { nameKey: 'nav.trending', path: '/trending?type=movie' },
            ]
        },
        {
            nameKey: 'nav.tv',
            icon: <FaTv />,
            path: '/tv',
            subcategories: [
                { nameKey: 'tv.popular', path: '/tv?sort_by=popularity.desc' },
                { nameKey: 'tv.topRated', path: '/tv?sort_by=vote_average.desc' },
                { nameKey: 'tv.onAir', path: '/tv?sort_by=popularity.desc' },
                { nameKey: 'tv.airingToday', path: '/tv?sort_by=popularity.desc' },
            ]
        },
        {
            nameKey: 'home.anime',
            icon: <FaBookOpen />,
            path: '/anime',
            subcategories: [
                { nameKey: 'sidebar.animePopular', path: '/anime?sort_by=popularity.desc' },
                { nameKey: 'sidebar.animeTopRated', path: '/anime?sort_by=vote_average.desc' },
                { nameKey: 'sidebar.latestReleases', path: '/anime?sort_by=release_date.desc' },
            ]
        }
    ];

    const quickLinks = [
        { nameKey: 'sidebar.trending', icon: <FaFire />, path: '/trending' },
        { nameKey: 'sidebar.myFavorites', icon: <FaHeart />, path: '/Favorites' },
        { nameKey: 'sidebar.search', icon: <FaSearch />, path: '/search' },
    ];

    const browseLinks = [
        { nameKey: 'nav.collections', path: '/collections' },
        { nameKey: 'nav.adult', path: '/adult' },
    ];

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <aside className="home-sidebar">
            <div className="home-sidebar__content">
                {/* Quick Links Section */}
                <div className="sidebar-section">
                    <h3 className="sidebar-section__title">{t('sidebar.quickLinks')}</h3>
                    <ul className="sidebar-links">
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.path} 
                                    className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
                                >
                                    <span className="sidebar-link__icon">{link.icon}</span>
                                    <span className="sidebar-link__text">{t(link.nameKey)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories with Dropdowns */}
                <div className="sidebar-section">
                    <h3 className="sidebar-section__title">{t('sidebar.browseByCategory')}</h3>
                    <ul className="sidebar-categories">
                        {categories.map((category, index) => (
                            <li key={index} className="sidebar-category">
                                <div className="sidebar-category__header">
                                    <Link 
                                        to={category.path}
                                        className={`sidebar-category__link ${isActive(category.path) ? 'active' : ''}`}
                                    >
                                        <span className="sidebar-category__icon">{category.icon}</span>
                                        <span className="sidebar-category__name">{t(category.nameKey)}</span>
                                    </Link>
                                    {category.subcategories && category.subcategories.length > 0 && (
                                        <button
                                            className="sidebar-category__toggle"
                                            onClick={() => toggleDropdown(index)}
                                            aria-label="Toggle dropdown"
                                        >
                                            {activeDropdown === index ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                    )}
                                </div>
                                {category.subcategories && activeDropdown === index && (
                                    <ul className="sidebar-subcategories">
                                        {category.subcategories.map((sub, subIndex) => (
                                            <li key={subIndex}>
                                                <Link 
                                                    to={sub.path}
                                                    className={`sidebar-subcategory__link ${isActive(sub.path) ? 'active' : ''}`}
                                                >
                                                    {t(sub.nameKey)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Browse More Section */}
                <div className="sidebar-section">
                    <h3 className="sidebar-section__title">{t('sidebar.browseMore')}</h3>
                    <ul className="sidebar-links">
                        {browseLinks.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.path} 
                                    className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
                                >
                                    <span className="sidebar-link__text">{t(link.nameKey)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Filters Section */}
                <div className="sidebar-section">
                    <h3 className="sidebar-section__title">
                        <FaStar className="sidebar-section__icon" /> {t('sidebar.quickFilters')}
                    </h3>
                    <div className="sidebar-filters">
                        <Link to="/movie?vote_average.gte=7" className="sidebar-filter-chip">
                            <FaStar /> {t('sidebar.highRated')}
                        </Link>
                        <Link to="/movie?sort_by=release_date.desc" className="sidebar-filter-chip">
                            <FaCalendar /> {t('sidebar.latestReleases')}
                        </Link>
                        <Link to="/trending" className="sidebar-filter-chip">
                            <FaFire /> {t('nav.trending')}
                        </Link>
                        <Link to="/movie?sort_by=vote_average.desc" className="sidebar-filter-chip">
                            <FaStar /> {t('sidebar.topRated')}
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default HomeSidebar;

