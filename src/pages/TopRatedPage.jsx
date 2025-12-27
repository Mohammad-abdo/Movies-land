import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import MovieGrid from '../Components/movie-grid/MovieGrid';
import SidebarFilter from '../Components/SidebarFilter/SidebarFilter';
import { category as cate } from '../api/tmdbApi';
import { useLanguage } from '../contexts/LanguageContext';
import './TopRatedPage.scss';

const TopRatedPage = () => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('movies');
    const [filters, setFilters] = useState({
        genres: [],
        sort_by: 'vote_average.desc',
        year: undefined,
        'vote_average.gte': 7,
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
        <div className="top-rated-page">
            <PageHeader>
                {language === 'ar' ? 'الأعلى تقييماً' : 'Top Rated'}
            </PageHeader>
            
            <Container fluid>
                <Row>
                    <Col lg={3} className="top-rated-sidebar">
                        <SidebarFilter
                            category={getCategoryName()}
                            onFilterChange={handleFilterChange}
                            initialGenre={filters.genres?.join(',')}
                            initialRating={filters['vote_average.gte']}
                        />
                    </Col>
                    
                    <Col lg={9} className="top-rated-content">
                        <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k || 'movies')}
                            className="top-rated-tabs"
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

export default TopRatedPage;

