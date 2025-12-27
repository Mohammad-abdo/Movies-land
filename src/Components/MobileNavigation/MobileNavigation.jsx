import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSelector } from 'react-redux';
import './MobileNavigation.scss';

const MobileNavigation = () => {
    const { t, language } = useLanguage();
    const location = useLocation();
    const favorites = useSelector((state) => state.favorites);
    const favoritesCount = favorites?.length || 0;

    const navItems = [
        { path: '/', icon: '🏠', label: language === 'ar' ? 'الرئيسية' : 'Home' },
        { path: '/movie', icon: '🎬', label: t('nav.movies') },
        { path: '/tv', icon: '📺', label: t('nav.tv') },
        { path: '/manga', icon: '📚', label: t('nav.manga') },
        { path: '/Favorites', icon: '❤️', label: t('nav.favorites'), badge: favoritesCount },
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="mobile-bottom-nav">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                    {item.badge > 0 && (
                        <span className="mobile-nav-badge">{item.badge}</span>
                    )}
                </Link>
            ))}
        </nav>
    );
};

export default MobileNavigation;

