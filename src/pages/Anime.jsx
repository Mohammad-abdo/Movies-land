import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import SidebarFilter from '../Components/SidebarFilter/SidebarFilter';
import MovieGrid from '../Components/movie-grid/MovieGrid';
import { category } from '../api/tmdbApi';
import './Anime.scss';

const Anime = () => {
    const { keyword } = useParams();
    const [showFilters, setShowFilters] = useState(true);
    const [filters, setFilters] = useState({
        genres: [],
        sort_by: 'popularity.desc',
        year: undefined,
        'vote_average.gte': undefined,
        certification: undefined,
        page: 1
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <PageHeader>
                Anime & Manga
            </PageHeader>
            <Container fluid className="catalog-page">
                <div className="catalog-controls">
                    <Button
                        variant="outline-danger"
                        onClick={() => setShowFilters(!showFilters)}
                        className="filter-toggle-btn"
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'} {showFilters ? '👁️' : '🔍'}
                    </Button>
                </div>
                <Row>
                    {showFilters && (
                        <Col lg={3} className="catalog-sidebar">
                            <SidebarFilter
                                category="anime"
                                onFilterChange={handleFilterChange}
                                initialGenre={filters.genres?.join(',')}
                                initialRating={filters['vote_average.gte']}
                            />
                        </Col>
                    )}
                    <Col lg={showFilters ? 9 : 12}>
                        <div className="catalog-content">
                            <MovieGrid 
                                category={category.anime} 
                                keyword={keyword}
                                filters={filters}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Anime;
