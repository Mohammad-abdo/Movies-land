import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../Components/movie-grid/MovieGrid';
import SidebarFilter from '../Components/SidebarFilter/SidebarFilter';
import './Cataloge.scss';

const Catalog = () => {
    const { category } = useParams();
    const [showFilters, setShowFilters] = useState(true);
    const [filters, setFilters] = useState({
        genres: [],
        sort_by: 'popularity.desc',
        year: undefined,
        'vote_average.gte': undefined,
        certification: undefined,
        page: 1
    });

    const categoryName = category === cate.movie ? 'Movies' : 
                        category === 'anime' ? 'Anime & Manga' : 'TV Series';

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <PageHeader>
                {categoryName}
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
                                categoryType={category === 'anime' ? 'anime' : category}
                                onFilterChange={handleFilterChange}
                                filters={filters}
                            />
                        </Col>
                    )}
                    <Col lg={showFilters ? 9 : 12}>
                        <div className="catalog-content">
                            <MovieGrid 
                                category={category === 'anime' ? cate.anime : category}
                                filters={filters}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Catalog;
