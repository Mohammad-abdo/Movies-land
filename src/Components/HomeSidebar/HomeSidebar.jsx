import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaFilm, FaTv, FaBookOpen, FaFire, FaHeart, FaSearch, FaStar, FaCalendar } from 'react-icons/fa';
import './HomeSidebar.scss';

const HomeSidebar = () => {
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const categories = [
        {
            name: 'Movies',
            icon: <FaFilm />,
            path: '/movie',
            subcategories: [
                { name: 'Popular Movies', path: '/movie?sort_by=popularity.desc' },
                { name: 'Top Rated', path: '/movie?sort_by=vote_average.desc' },
                { name: 'Upcoming', path: '/movie?sort_by=release_date.desc' },
                { name: 'Now Playing', path: '/movie?sort_by=popularity.desc&vote_average.gte=7' },
                { name: 'Trending', path: '/trending?type=movie' },
            ]
        },
        {
            name: 'TV Series',
            icon: <FaTv />,
            path: '/tv',
            subcategories: [
                { name: 'Popular TV Shows', path: '/tv?sort_by=popularity.desc' },
                { name: 'Top Rated', path: '/tv?sort_by=vote_average.desc' },
                { name: 'On The Air', path: '/tv?sort_by=popularity.desc' },
                { name: 'Airing Today', path: '/tv?sort_by=popularity.desc' },
            ]
        },
        {
            name: 'Anime & Manga',
            icon: <FaBookOpen />,
            path: '/anime',
            subcategories: [
                { name: 'Popular Anime', path: '/anime?sort_by=popularity.desc' },
                { name: 'Top Rated Anime', path: '/anime?sort_by=vote_average.desc' },
                { name: 'Latest Releases', path: '/anime?sort_by=release_date.desc' },
            ]
        }
    ];

    const quickLinks = [
        { name: 'Trending Now', icon: <FaFire />, path: '/trending' },
        { name: 'My Favorites', icon: <FaHeart />, path: '/Favorites' },
        { name: 'Search', icon: <FaSearch />, path: '/search' },
    ];

    const browseLinks = [
        { name: 'Collections', path: '/collections' },
        { name: 'Adult Content (18+)', path: '/adult' },
    ];

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <aside className="home-sidebar">
            <div className="home-sidebar__content">
                {/* Quick Links Section */}
                <div className="sidebar-section">
                    <h3 className="sidebar-section__title">Quick Links</h3>
                    <ul className="sidebar-links">
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.path} 
                                    className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
                                >
                                    <span className="sidebar-link__icon">{link.icon}</span>
                                    <span className="sidebar-link__text">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories with Dropdowns */}
                <div className="sidebar-section">
                    <h3 className="sidebar-section__title">Browse by Category</h3>
                    <ul className="sidebar-categories">
                        {categories.map((category, index) => (
                            <li key={index} className="sidebar-category">
                                <div className="sidebar-category__header">
                                    <Link 
                                        to={category.path}
                                        className={`sidebar-category__link ${isActive(category.path) ? 'active' : ''}`}
                                    >
                                        <span className="sidebar-category__icon">{category.icon}</span>
                                        <span className="sidebar-category__name">{category.name}</span>
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
                                                    {sub.name}
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
                    <h3 className="sidebar-section__title">Browse More</h3>
                    <ul className="sidebar-links">
                        {browseLinks.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.path} 
                                    className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
                                >
                                    <span className="sidebar-link__text">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Filters Section */}
                <div className="sidebar-section">
                    <h3 className="sidebar-section__title">
                        <FaStar className="sidebar-section__icon" /> Quick Filters
                    </h3>
                    <div className="sidebar-filters">
                        <Link to="/movie?vote_average.gte=7" className="sidebar-filter-chip">
                            <FaStar /> High Rated (7+)
                        </Link>
                        <Link to="/movie?sort_by=release_date.desc" className="sidebar-filter-chip">
                            <FaCalendar /> Latest Releases
                        </Link>
                        <Link to="/trending" className="sidebar-filter-chip">
                            <FaFire /> Trending
                        </Link>
                        <Link to="/movie?sort_by=vote_average.desc" className="sidebar-filter-chip">
                            <FaStar /> Top Rated
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default HomeSidebar;

