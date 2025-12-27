import React, { useState, useEffect } from 'react';
import tmdbApi from '../../api/tmdbApi';
import { sortOptions } from '../../api/genres';
import './SidebarFilter.scss';

const SidebarFilter = ({ categoryType, onFilterChange, filters, onClose }) => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const response = await tmdbApi.getGenres(categoryType === 'anime' ? 'tv' : categoryType);
                setGenres(response.genres || []);
            } catch (error) {
                console.error('Error loading genres:', error);
            } finally {
                setLoading(false);
            }
        };
        loadGenres();
    }, [categoryType]);

    const handleGenreToggle = (genreId) => {
        const currentGenres = filters.genres || [];
        const newGenres = currentGenres.includes(genreId.toString())
            ? currentGenres.filter(id => id !== genreId.toString())
            : [...currentGenres, genreId.toString()];
        
        onFilterChange({ ...filters, genres: newGenres, page: 1 });
    };

    const handleSortChange = (e) => {
        onFilterChange({ ...filters, sort_by: e.target.value, page: 1 });
    };

    const handleYearChange = (e) => {
        onFilterChange({ ...filters, year: e.target.value || undefined, page: 1 });
    };

    const handleRatingChange = (e) => {
        onFilterChange({ ...filters, 'vote_average.gte': e.target.value || undefined, page: 1 });
    };

    const handleCertificationChange = (e) => {
        onFilterChange({ ...filters, certification: e.target.value || undefined, page: 1 });
    };

    const clearFilters = () => {
        onFilterChange({
            genres: [],
            sort_by: 'popularity.desc',
            year: undefined,
            'vote_average.gte': undefined,
            certification: undefined,
            page: 1
        });
    };

    const activeFiltersCount = [
        filters.genres?.length > 0,
        filters.year,
        filters['vote_average.gte'],
        filters.certification,
        filters.sort_by !== 'popularity.desc'
    ].filter(Boolean).length;

    return (
        <div className="sidebar-filter">
            <div className="sidebar-filter__header">
                <h3>Filters</h3>
                {onClose && (
                    <button className="sidebar-filter__close" onClick={onClose}>
                        ×
                    </button>
                )}
                {activeFiltersCount > 0 && (
                    <button className="sidebar-filter__clear" onClick={clearFilters}>
                        Clear All ({activeFiltersCount})
                    </button>
                )}
            </div>

            <div className="sidebar-filter__content">
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
                    {loading ? (
                        <div className="filter-loading">Loading genres...</div>
                    ) : (
                        <div className="filter-genres">
                            {genres.map(genre => (
                                <button
                                    key={genre.id}
                                    className={`filter-genre-btn ${filters.genres?.includes(genre.id.toString()) ? 'active' : ''}`}
                                    onClick={() => handleGenreToggle(genre.id)}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Year */}
                <div className="filter-group">
                    <label className="filter-label">Year</label>
                    <input
                        type="number"
                        className="filter-input"
                        placeholder="e.g. 2023"
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        value={filters.year || ''}
                        onChange={handleYearChange}
                    />
                </div>

                {/* Minimum Rating */}
                <div className="filter-group">
                    <label className="filter-label">Minimum Rating</label>
                    <div className="filter-rating">
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.5"
                            value={filters['vote_average.gte'] || 0}
                            onChange={(e) => onFilterChange({ ...filters, 'vote_average.gte': e.target.value || undefined, page: 1 })}
                            className="filter-range"
                        />
                        <span className="filter-rating-value">
                            {filters['vote_average.gte'] ? `${filters['vote_average.gte']}/10` : 'Any'}
                        </span>
                    </div>
                </div>

                {/* Age Rating (for movies only) */}
                {categoryType === 'movie' && (
                    <div className="filter-group">
                        <label className="filter-label">Age Rating</label>
                        <select
                            className="filter-select"
                            value={filters.certification || ''}
                            onChange={handleCertificationChange}
                        >
                            <option value="">All Ratings</option>
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                            <option value="NC-17">NC-17</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarFilter;

