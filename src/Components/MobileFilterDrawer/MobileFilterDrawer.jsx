import React, { useState } from 'react';
import { FaTimes, FaFilter } from 'react-icons/fa';
import SidebarFilter from '../SidebarFilter/SidebarFilter';
import './MobileFilterDrawer.scss';

const MobileFilterDrawer = ({ 
    category, 
    onFilterChange, 
    initialGenre, 
    initialRating,
    activeFiltersCount = 0 
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleFilterChange = (newFilters) => {
        onFilterChange(newFilters);
    };

    return (
        <>
            <button 
                className="mobile-filter-toggle"
                onClick={toggleDrawer}
                aria-label="Toggle filters"
            >
                <FaFilter />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                    <span className="filter-badge">{activeFiltersCount}</span>
                )}
            </button>

            <div className={`mobile-filter-drawer ${isOpen ? 'open' : ''}`}>
                <div className="mobile-filter-overlay" onClick={toggleDrawer}></div>
                <div className="mobile-filter-content">
                    <div className="mobile-filter-header">
                        <h3>Filters</h3>
                        <button 
                            className="mobile-filter-close"
                            onClick={toggleDrawer}
                            aria-label="Close filters"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="mobile-filter-body">
                        <SidebarFilter
                            category={category}
                            onFilterChange={handleFilterChange}
                            initialGenre={initialGenre}
                            initialRating={initialRating}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileFilterDrawer;

