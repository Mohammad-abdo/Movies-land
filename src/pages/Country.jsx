import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import MovieGrid from '../Components/movie-grid/MovieGrid';
import SidebarFilter from '../Components/SidebarFilter/SidebarFilter';
import { category as cate } from '../api/tmdbApi';
import { countries, getCountryByCode } from '../api/countries';
import './Country.scss';

const Country = () => {
    const { countryCode } = useParams();
    const [searchParams] = useSearchParams();
    const initialGenre = searchParams.get('genre') || '';
    const initialRating = searchParams.get('rating') || '';
    
    const [selectedGenre, setSelectedGenre] = useState(initialGenre);
    const [selectedRating, setSelectedRating] = useState(initialRating);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (countryCode) {
            const countryData = getCountryByCode(countryCode.toUpperCase());
            setCountry(countryData);
        }
    }, [countryCode]);

    const handleFilterChange = (genre, rating) => {
        setSelectedGenre(genre);
        setSelectedRating(rating);
    };

    if (!country) {
        return (
            <div className="country-error">
                <PageHeader>Country Not Found</PageHeader>
                <div className="container my-5">
                    <Alert variant="danger">
                        <Alert.Heading>Error</Alert.Heading>
                        <p>Country not found. Please select a valid country.</p>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageHeader>
                {country.flag} {country.name} Movies & TV Shows
            </PageHeader>
            <div className="container-fluid catalog-page country-page">
                <div className="row">
                    <div className="col-lg-3 col-md-4 sidebar-filter-container">
                        <SidebarFilter 
                            category={cate.movie}
                            onFilterChange={handleFilterChange}
                            initialGenre={initialGenre}
                            initialRating={initialRating}
                            countryCode={countryCode}
                        />
                    </div>
                    <div className="col-lg-9 col-md-8 movie-grid-container">
                        <div className="section mb-3">
                            <MovieGrid 
                                category={cate.movie} 
                                genre={selectedGenre} 
                                rating={selectedRating}
                                countryCode={countryCode}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Country;


