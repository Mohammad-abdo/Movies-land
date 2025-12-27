import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, InputGroup, Form } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import mangaApi, { getMangaImageUrl, getMangaTitle } from '../api/mangaApi';
import { useLanguage } from '../contexts/LanguageContext';
import './Manga.scss';

const Manga = () => {
    const { t, language } = useLanguage();
    const [searchParams] = useSearchParams();
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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
                
                if (currentPage === 1) {
                    setMangaList(data.data || []);
                } else {
                    setMangaList(prev => [...prev, ...(data.data || [])]);
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

    return (
        <div className="manga-page">
            <PageHeader>
                {t('nav.manga')}
            </PageHeader>
            
            <Container>
                {/* Search Bar */}
                <div className="manga-search-section">
                    <Form onSubmit={handleSearch}>
                        <InputGroup className="manga-search-input">
                            <Form.Control
                                type="text"
                                placeholder={t('manga.searchPlaceholder')}
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

                {loading && mangaList.length === 0 ? (
                    <div className="manga-loading">
                        <Spinner animation="border" variant="danger" size="lg" />
                    </div>
                ) : (
                    <>
                        <Row className="manga-grid">
                            {mangaList.map((manga) => {
                                const coverUrl = getMangaImageUrl(manga, 'large');
                                const title = getMangaTitle(manga);
                                
                                return (
                                    <Col key={manga.id} xs={6} sm={4} md={3} lg={2} className="manga-card-col">
                                        <Link to={`/manga/${manga.id}`} className="manga-card">
                                            <div className="manga-cover">
                                                <img 
                                                    src={coverUrl || 'https://via.placeholder.com/300x400?text=No+Cover'} 
                                                    alt={title}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover';
                                                    }}
                                                />
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
                            })}
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
                                            {t('common.loading')}
                                        </>
                                    ) : (
                                        t('manga.loadMore')
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

export default Manga;

