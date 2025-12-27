import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import MovieGrid from '../Components/movie-grid/MovieGrid';
import SidebarFilter from '../Components/SidebarFilter/SidebarFilter';
import { category as cate } from '../api/tmdbApi';
import { useLanguage } from '../contexts/LanguageContext';
import './Upcoming.scss';

const Upcoming = () => {
    const { t, language } = useLanguage();
    const [filters, setFilters] = useState({
        genres: [],
        sort_by: 'popularity.desc',
        year: new Date().getFullYear(),
        'vote_average.gte': undefined,
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="upcoming-page">
            <PageHeader>
                {t('pages.upcoming')}
            </PageHeader>
            
            <Container fluid className="catalog-page">
                <Row>
                    <Col lg={3} className="catalog-sidebar">
                        <SidebarFilter
                            category={cate.movie}
                            onFilterChange={handleFilterChange}
                            initialGenre={filters.genres?.join(',')}
                            initialRating={filters['vote_average.gte']}
                        />
                    </Col>
                    <Col lg={9} className="movie-grid-container">
                        <MovieGrid 
                            category={cate.movie}
                            filters={filters}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Upcoming;

