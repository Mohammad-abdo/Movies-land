import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, InputGroup, Form, Tabs, Tab } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import mangaApi, { getMangaImageUrl, getMangaTitle } from '../api/mangaApi';
import { useLanguage } from '../contexts/LanguageContext';
import MangaSidebarFilter from '../Components/MangaSidebarFilter/MangaSidebarFilter';
import './Manga.scss';

const Manga = () => {
    const { t, language } = useLanguage();
    const [searchParams] = useSearchParams();
    const [mangaList, setMangaList] = useState([]);
    const [popularManga, setPopularManga] = useState([]);
    const [latestManga, setLatestManga] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingPopular, setLoadingPopular] = useState(true);
    const [loadingLatest, setLoadingLatest] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [filters, setFilters] = useState({
        tags: [],
        contentRating: ['safe', 'suggestive'],
        status: '',
        sortBy: 'followedCount'
    });

    // Fetch popular manga for "Popular" tab
    useEffect(() => {
        const fetchPopularManga = async () => {
            try {
                setLoadingPopular(true);
                const data = await mangaApi.getPopularManga(20, 0);
                const includedData = (data && data.included) ? data.included : [];
                const mangaWithIncludes = (data.data || []).map(manga => ({
                    ...manga,
                    _includedData: includedData
                }));
                setPopularManga(mangaWithIncludes);
            } catch (err) {
                console.error('Error fetching popular manga:', err);
            } finally {
                setLoadingPopular(false);
            }
        };
        fetchPopularManga();
    }, []);

    // Fetch latest manga for "Latest" tab
    useEffect(() => {
        const fetchLatestManga = async () => {
            try {
                setLoadingLatest(true);
                const data = await mangaApi.getPopularManga(20, 0);
                const includedData = (data && data.included) ? data.included : [];
                const mangaWithIncludes = (data.data || []).map(manga => ({
                    ...manga,
                    _includedData: includedData
                }));
                setLatestManga(mangaWithIncludes);
            } catch (err) {
                console.error('Error fetching latest manga:', err);
            } finally {
                setLoadingLatest(false);
            }
        };
        fetchLatestManga();
    }, []);

    useEffect(() => {
        const fetchManga = async () => {
            try {
                setLoading(true);
                setError(null);
                
                let data;
                if (searchQuery.trim()) {
                    data = await mangaApi.searchManga(searchQuery, 20, (currentPage - 1) * 20);
                } else {
                    data = await mangaApi.getPopularManga(20, (currentPage - 1) * 20);
                }
                
                // Store included data for image URLs - MangaDex API returns includes array
                const includedData = (data && data.included) ? data.included : [];
                const mangaWithIncludes = (data.data || []).map(manga => ({
                    ...manga,
                    _includedData: includedData
                }));
                
                if (currentPage === 1) {
                    setMangaList(mangaWithIncludes);
                } else {
                    setMangaList(prev => [...prev, ...mangaWithIncludes]);
                }
                
                setHasMore((data.data || []).length === 20);
            } catch (err) {
                setError(err.message || 'Failed to load manga');
                console.error('Error fetching manga:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchManga();
    }, [searchQuery, currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setMangaList([]);
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
        setMangaList([]);
    };

    const renderMangaCard = (manga) => {
        const coverUrl = getMangaImageUrl(manga, 'large', manga._includedData);
        const title = getMangaTitle(manga, language === 'ar' ? 'ar' : 'en');
        
        return (
            <Col key={manga.id} xs={4} sm={4} md={3} lg={2} className="manga-card-col">
                <Link to={`/manga/${manga.id}`} className="manga-card">
                    <div className="manga-cover">
                        {coverUrl ? (
                            <img 
                                src={coverUrl} 
                                alt={title}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    if (e.target.nextElementSibling) {
                                        e.target.nextElementSibling.classList.add('show');
                                    }
                                }}
                            />
                        ) : null}
                        <div className={`manga-cover-placeholder ${!coverUrl ? 'show' : ''}`}>
                            <span>{title.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="manga-overlay">
                            <div className="manga-rating">
                                ⭐ {manga.attributes?.contentRating || 'N/A'}
                            </div>
                        </div>
                    </div>
                    <div className="manga-info">
                        <h4 className="manga-title">{title}</h4>
                        {manga.attributes?.status && (
                            <span className="manga-status">{manga.attributes.status}</span>
                        )}
                    </div>
                </Link>
            </Col>
        );
    };

    const activeFiltersCount = [
        filters.tags?.length > 0,
        filters.contentRating?.length !== 2,
        filters.status,
        filters.sortBy !== 'followedCount'
    ].filter(Boolean).length;

    return (
        <div className="manga-page">
            <PageHeader>
                {t('nav.manga') || 'Manga'}
            </PageHeader>
            
            <Container fluid>
                <Row>
                    {/* Sidebar Filter */}
                    <Col lg={3} className="manga-sidebar-col">
                        <MangaSidebarFilter 
                            onFilterChange={handleFilterChange}
                            initialFilters={filters}
                        />
                    </Col>

                    {/* Main Content */}
                    <Col lg={9} className="manga-content-col">
                        {/* Search Bar */}
                        <div className="manga-search-section">
                            <Form onSubmit={handleSearch}>
                                <InputGroup className="manga-search-input">
                                    <Form.Control
                                        type="text"
                                        placeholder={t('manga.searchPlaceholder') || 'Search manga...'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <InputGroup.Text as="button" type="submit" className="search-btn">
                                        🔍
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form>
                        </div>

                        {error && (
                            <Alert variant="danger" className="manga-error">
                                {error}
                            </Alert>
                        )}

                        {/* Category Tabs */}
                        <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k || 'all')}
                            className="manga-tabs"
                        >
                            <Tab eventKey="all" title={t('manga.all') || 'All Manga'}>
                                {loading && mangaList.length === 0 ? (
                                    <div className="manga-loading">
                                        <Spinner animation="border" variant="danger" size="lg" />
                                    </div>
                                ) : (
                                    <>
                                        <Row className="manga-grid">
                                            {mangaList.map(renderMangaCard)}
                                        </Row>

                                        {hasMore && mangaList.length > 0 && (
                                            <div className="manga-load-more">
                                                <button 
                                                    onClick={loadMore} 
                                                    disabled={loading}
                                                    className="load-more-btn"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <Spinner size="sm" style={{ marginRight: '0.5rem' }} /> 
                                                            {t('common.loading') || 'Loading...'}
                                                        </>
                                                    ) : (
                                                        t('manga.loadMore') || 'Load More'
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </Tab>
                            
                            <Tab eventKey="popular" title={t('manga.popular') || 'Popular'}>
                                {loadingPopular ? (
                                    <div className="manga-loading">
                                        <Spinner animation="border" variant="danger" size="lg" />
                                    </div>
                                ) : (
                                    <Row className="manga-grid">
                                        {popularManga.map(renderMangaCard)}
                                    </Row>
                                )}
                            </Tab>
                            
                            <Tab eventKey="latest" title={t('manga.latest') || 'Latest'}>
                                {loadingLatest ? (
                                    <div className="manga-loading">
                                        <Spinner animation="border" variant="danger" size="lg" />
                                    </div>
                                ) : (
                                    <Row className="manga-grid">
                                        {latestManga.map(renderMangaCard)}
                                    </Row>
                                )}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Manga;
