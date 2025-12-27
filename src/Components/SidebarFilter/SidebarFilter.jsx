import React, { useState, useEffect } from 'react';
import tmdbApi from '../../api/tmdbApi';
import { sortOptions } from '../../api/genres';
import { countries } from '../../api/countries';
import './SidebarFilter.scss';

const SidebarFilter = ({ 
    category, 
    onFilterChange, 
    initialGenre, 
    initialRating,
    adultContent = false,
    countryCode = null
}) => {
    const [filters, setFilters] = useState({
        genres: initialGenre ? initialGenre.split(',') : [],
        sort_by: 'popularity.desc',
        year: '',
        'vote_average.gte': initialRating || '',
        certification: adultContent ? 'R' : '',
        country: countryCode || '',
    });

    const [availableGenres, setAvailableGenres] = useState([]);
    const [loadingGenres, setLoadingGenres] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoadingGenres(true);
                // Anime uses TV endpoint, so map 'anime' to 'tv' for genres API
                const categoryForGenres = category === 'anime' ? 'tv' : category;
                if (!categoryForGenres) {
                    setLoadingGenres(false);
                    return;
                }
                const response = await tmdbApi.getGenres(categoryForGenres);
                setAvailableGenres(response.genres || []);
            } catch (err) {
                console.error('Error fetching genres:', err);
            } finally {
                setLoadingGenres(false);
            }
        };
        if (category) {
            fetchGenres();
        }
    }, [category]);

    const handleGenreToggle = (genreId) => {
        setFilters(prev => {
            const newGenres = prev.genres.includes(String(genreId))
                ? prev.genres.filter(id => id !== String(genreId))
                : [...prev.genres, String(genreId)];
            
            const newFilters = { ...prev, genres: newGenres };
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    const handleSortChange = (e) => {
        const newFilters = { ...filters, sort_by: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleYearChange = (e) => {
        const newFilters = { ...filters, year: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleRatingChange = (e) => {
        const newFilters = { ...filters, 'vote_average.gte': e.target.value || '' };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleCertificationChange = (e) => {
        const newFilters = { ...filters, certification: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleCountryChange = (e) => {
        const newFilters = { ...filters, country: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            genres: [],
            sort_by: 'popularity.desc',
            year: '',
            'vote_average.gte': '',
            certification: '',
            country: '',
        };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    const activeFiltersCount = [
        filters.genres?.length > 0,
        filters.year,
        filters['vote_average.gte'],
        filters.certification,
        filters.country,
        filters.sort_by !== 'popularity.desc'
    ].filter(Boolean).length;

    return (
        <div className="sidebar-filter">
            <div className="sidebar-filter__header">
                <h3>Filters</h3>
                {activeFiltersCount > 0 && (
                    <button className="sidebar-filter__clear" onClick={clearFilters}>
                        Clear All ({activeFiltersCount})
                    </button>
                )}
            </div>

            <div className="sidebar-filter__content">
                {/* Country Filter */}
                {!countryCode && (
                    <div className="filter-group">
                        <label className="filter-label">Country/Region</label>
                        <select 
                            className="filter-select"
                            value={filters.country}
                            onChange={handleCountryChange}
                        >
                            <option value="">All Countries</option>
                            {countries.map(country => (
                                <option key={country.code} value={country.code}>
                                    {country.flag} {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Sort By */}
                <div className="filter-group">
                    <label className="filter-label">Sort By</label>
                    <select 
                        className="filter-select"
                        value={filters.sort_by || 'popularity.desc'}
                        onChange={handleSortChange}
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Genres */}
                <div className="filter-group">
                    <label className="filter-label">Genres</label>
                    {loadingGenres ? (
                        <div className="loading-text">Loading genres...</div>
                    ) : (
                        <div className="genres-list">
                            {availableGenres.map(genre => (
                                <label key={genre.id} className="genre-checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={filters.genres.includes(String(genre.id))}
                                        onChange={() => handleGenreToggle(genre.id)}
                                    />
                                    <span>{genre.name}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Year */}
                <div className="filter-group">
                    <label className="filter-label">Release Year</label>
                    <input
                        type="number"
                        className="filter-input"
                        placeholder="e.g., 2020"
                        value={filters.year}
                        onChange={handleYearChange}
                        min="1900"
                        max={new Date().getFullYear() + 1}
                    />
                </div>

                {/* Rating */}
                <div className="filter-group">
                    <label className="filter-label">Minimum Rating</label>
                    <input
                        type="range"
                        className="filter-range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={filters['vote_average.gte'] || 0}
                        onChange={handleRatingChange}
                    />
                    <div className="range-value">
                        {filters['vote_average.gte'] || 0} / 10
                    </div>
                </div>

                {/* Certification (Age Rating) */}
                {category === 'movie' && (
                    <div className="filter-group">
                        <label className="filter-label">Age Rating</label>
                        <select 
                            className="filter-select"
                            value={filters.certification || ''}
                            onChange={handleCertificationChange}
                        >
                            <option value="">All Ratings</option>
                            <option value="G">G - General Audiences</option>
                            <option value="PG">PG - Parental Guidance</option>
                            <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
                            <option value="R">R - Restricted (17+)</option>
                            <option value="NC-17">NC-17 - Adults Only (18+)</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarFilter;
