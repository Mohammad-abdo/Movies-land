import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './MangaSidebarFilter.scss';

const MANGA_TAGS = [
    { id: 'action', name: 'Action' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'horror', name: 'Horror' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'romance', name: 'Romance' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    { id: 'slice-of-life', name: 'Slice of Life' },
    { id: 'sports', name: 'Sports' },
    { id: 'supernatural', name: 'Supernatural' },
    { id: 'thriller', name: 'Thriller' },
    { id: 'yaoi', name: 'Yaoi' },
    { id: 'yuri', name: 'Yuri' },
];

const CONTENT_RATINGS = [
    { value: 'safe', label: 'Safe' },
    { value: 'suggestive', label: 'Suggestive' },
    { value: 'erotica', label: 'Erotica' },
    { value: 'pornographic', label: 'Pornographic' },
];

const SORT_OPTIONS = [
    { value: 'followedCount', label: 'Most Followed' },
    { value: 'relevance', label: 'Relevance' },
    { value: 'rating', label: 'Rating' },
    { value: 'createdAt', label: 'Newest' },
    { value: 'updatedAt', label: 'Recently Updated' },
    { value: 'title', label: 'Title' },
];

const STATUS_OPTIONS = [
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'hiatus', label: 'Hiatus' },
    { value: 'cancelled', label: 'Cancelled' },
];

const MangaSidebarFilter = ({ onFilterChange, initialFilters = {} }) => {
    const { t } = useLanguage();
    const [filters, setFilters] = useState({
        tags: initialFilters.tags || [],
        contentRating: initialFilters.contentRating || ['safe', 'suggestive'],
        status: initialFilters.status || '',
        sortBy: initialFilters.sortBy || 'followedCount',
        ...initialFilters
    });

    const handleTagToggle = (tagId) => {
        const newTags = filters.tags.includes(tagId)
            ? filters.tags.filter(id => id !== tagId)
            : [...filters.tags, tagId];
        
        const newFilters = { ...filters, tags: newTags };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleContentRatingToggle = (rating) => {
        const newRatings = filters.contentRating.includes(rating)
            ? filters.contentRating.filter(r => r !== rating)
            : [...filters.contentRating, rating];
        
        const newFilters = { ...filters, contentRating: newRatings };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleStatusChange = (e) => {
        const newFilters = { ...filters, status: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleSortChange = (e) => {
        const newFilters = { ...filters, sortBy: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            tags: [],
            contentRating: ['safe', 'suggestive'],
            status: '',
            sortBy: 'followedCount'
        };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    const activeFiltersCount = [
        filters.tags?.length > 0,
        filters.contentRating?.length !== 2 || !filters.contentRating.includes('safe') || !filters.contentRating.includes('suggestive'),
        filters.status,
        filters.sortBy !== 'followedCount'
    ].filter(Boolean).length;

    return (
        <div className="manga-sidebar-filter">
            <div className="manga-sidebar-filter__header">
                <h3>{t('manga.filters') || 'Filters'}</h3>
                {activeFiltersCount > 0 && (
                    <button className="manga-sidebar-filter__clear-btn" onClick={clearFilters}>
                        {t('common.clearAll') || 'Clear All'} ({activeFiltersCount})
                    </button>
                )}
            </div>

            <div className="manga-sidebar-filter__content">
                {/* Sort By */}
                <div className="filter-group">
                    <label className="filter-label">{t('manga.sortBy') || 'Sort By'}</label>
                    <select 
                        className="filter-select"
                        value={filters.sortBy}
                        onChange={handleSortChange}
                    >
                        {SORT_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div className="filter-group">
                    <label className="filter-label">{t('manga.status') || 'Status'}</label>
                    <select 
                        className="filter-select"
                        value={filters.status}
                        onChange={handleStatusChange}
                    >
                        <option value="">All Status</option>
                        {STATUS_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Content Rating */}
                <div className="filter-group">
                    <label className="filter-label">{t('manga.contentRating') || 'Content Rating'}</label>
                    <div className="tags-list">
                        {CONTENT_RATINGS.map(rating => (
                            <label key={rating.value} className="tag-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.contentRating.includes(rating.value)}
                                    onChange={() => handleContentRatingToggle(rating.value)}
                                />
                                <span>{rating.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tags/Genres */}
                <div className="filter-group">
                    <label className="filter-label">{t('manga.tags') || 'Tags'}</label>
                    <div className="tags-list">
                        {MANGA_TAGS.map(tag => (
                            <label key={tag.id} className="tag-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.tags.includes(tag.id)}
                                    onChange={() => handleTagToggle(tag.id)}
                                />
                                <span>{tag.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MangaSidebarFilter;

