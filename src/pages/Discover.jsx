import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab, Spinner } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import MovieGrid from '../Components/movie-grid/MovieGrid';
import SidebarFilter from '../Components/SidebarFilter/SidebarFilter';
import { category as cate } from '../api/tmdbApi';
import { useLanguage } from '../contexts/LanguageContext';
import './Discover.scss';

const Discover = () => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('movies');
    const [filters, setFilters] = useState({
        genres: [],
        sort_by: 'popularity.desc',
        year: undefined,
        'vote_average.gte': undefined,
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const getCategoryName = () => {
        if (activeTab === 'movies') return cate.movie;
        if (activeTab === 'tv') return cate.tv;
        return cate.movie;
    };

    return (
        <div className="discover-page">
            <PageHeader>
                {language === 'ar' ? 'استكشف' : 'Discover'}
            </PageHeader>
            
            <Container fluid>
                <Row>
                    <Col lg={3} className="discover-sidebar">
                        <SidebarFilter
                            category={getCategoryName()}
                            onFilterChange={handleFilterChange}
                            initialGenre={filters.genres?.join(',')}
                            initialRating={filters['vote_average.gte']}
                        />
                    </Col>
                    
                    <Col lg={9} className="discover-content">
                        <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k || 'movies')}
                            className="discover-tabs"
                        >
                            <Tab eventKey="movies" title={language === 'ar' ? 'أفلام' : 'Movies'}>
                                <MovieGrid 
                                    category={cate.movie}
                                    filters={filters}
                                />
                            </Tab>
                            <Tab eventKey="tv" title={language === 'ar' ? 'مسلسلات' : 'TV Series'}>
                                <MovieGrid 
                                    category={cate.tv}
                                    filters={filters}
                                />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Discover;

