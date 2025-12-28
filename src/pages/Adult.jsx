import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../Components/page-header/PageHeader';
import MovieGrid from '../Components/movie-grid/MovieGrid';
import SidebarFilter from '../Components/SidebarFilter/SidebarFilter';
import AgeVerification from '../Components/AgeVerification/AgeVerification';
import { category as cate } from '../api/tmdbApi';
import './Adult.scss';

const Adult = () => {
    const [searchParams] = useSearchParams();
    const initialGenre = searchParams.get('genre') || '';
    const initialRating = searchParams.get('rating') || '';
    const [ageVerified, setAgeVerified] = useState(false);
    const [showAgeModal, setShowAgeModal] = useState(true);

    useEffect(() => {
        // Check if age was already verified
        const verified = localStorage.getItem('ageVerified');
        if (verified === 'true') {
            setAgeVerified(true);
            setShowAgeModal(false);
        }
    }, []);

    const [selectedGenre, setSelectedGenre] = useState(initialGenre);
    const [selectedRating, setSelectedRating] = useState(initialRating);

    const handleFilterChange = (genre, rating) => {
        setSelectedGenre(genre);
        setSelectedRating(rating);
    };

    const handleAgeVerified = () => {
        setAgeVerified(true);
        setShowAgeModal(false);
    };

    if (!ageVerified) {
        return (
            <AgeVerification 
                show={showAgeModal} 
                onVerified={handleAgeVerified}
            />
        );
    }

    return (
        <>
            <PageHeader>
                <span className="adult-badge">🔞</span> Adult Content (18+)
            </PageHeader>
            <div className="container-fluid catalog-page adult-page">
                <div className="adult-warning">
                    <p>⚠️ This section contains adult content. Viewer discretion is advised.</p>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-4 sidebar-filter-container">
                        <SidebarFilter 
                            category={cate.movie}
                            onFilterChange={handleFilterChange}
                            initialGenre={initialGenre}
                            initialRating={initialRating}
                            adultContent={true}
                        />
                    </div>
                    <div className="col-lg-9 col-md-8 movie-grid-container">
                        <div className="section mb-3">
                            <MovieGrid 
                                category={cate.movie} 
                                genre={selectedGenre} 
                                rating="R"
                                adultContent={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Adult;


