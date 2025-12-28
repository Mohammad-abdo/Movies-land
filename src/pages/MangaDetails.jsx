import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner, Alert, Badge, Row, Col } from 'react-bootstrap';
import PageHeader from '../Components/page-header/PageHeader';
import mangaApi, { getMangaImageUrl, getMangaTitle, getMangaDescription } from '../api/mangaApi';
import { useLanguage } from '../contexts/LanguageContext';
import './MangaDetails.scss';

const MangaDetails = () => {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const [manga, setManga] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chaptersLoading, setChaptersLoading] = useState(true);

    useEffect(() => {
        const fetchMangaDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const [mangaData, chaptersData] = await Promise.all([
                    mangaApi.getMangaDetails(id),
                    mangaApi.getMangaChapters(id).catch(() => ({ data: [] }))
                ]);
                
                // Store included data with manga for image URL generation
                const manga = mangaData.data;
                const includedData = mangaData.included || [];
                setManga({
                    ...manga,
                    _includedData: includedData
                });
                setChapters(chaptersData.data || []);
            } catch (err) {
                setError(err.message || 'Failed to load manga');
                console.error('Error fetching manga details:', err);
            } finally {
                setLoading(false);
                setChaptersLoading(false);
            }
        };

        if (id) {
            fetchMangaDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="manga-details-loading">
                <PageHeader>{t('nav.manga') || 'Manga'}</PageHeader>
                <Container>
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                        <Spinner animation="border" variant="danger" size="lg" />
                    </div>
                </Container>
            </div>
        );
    }

    if (error || !manga) {
        return (
            <div className="manga-details-error">
                <PageHeader>{t('nav.manga') || 'Manga'}</PageHeader>
                <Container>
                    <Alert variant="danger">
                        <Alert.Heading>{t('common.error')}</Alert.Heading>
                        <p>{error || t('manga.notFound')}</p>
                        <Link to="/manga">
                            <button className="btn btn-primary">
                                {t('manga.backToManga')}
                            </button>
                        </Link>
                    </Alert>
                </Container>
            </div>
        );
    }

    const coverUrl = getMangaImageUrl(manga, 'large', manga._includedData);
    const title = getMangaTitle(manga);
    const description = getMangaDescription(manga);
    const attributes = manga.attributes || {};

    return (
        <div className="manga-details-page">
            <PageHeader>{title}</PageHeader>
            
            <Container>
                <Row className="manga-details-content">
                    <Col md={4} className="manga-cover-col">
                        <div className="manga-cover-large">
                            <img 
                                src={coverUrl || 'https://via.placeholder.com/400x600?text=No+Cover'} 
                                alt={title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x600?text=No+Cover';
                                }}
                            />
                        </div>
                    </Col>
                    
                    <Col md={8} className="manga-info-col">
                        <div className="manga-info-section">
                            <h1 className="manga-title-large">{title}</h1>
                            
                            {attributes.tags && attributes.tags.length > 0 && (
                                <div className="manga-tags">
                                    {attributes.tags.slice(0, 10).map((tag) => (
                                        <Badge key={tag.id} bg="secondary" className="manga-tag">
                                            {tag.attributes?.name?.en || tag.attributes?.name?.['en-us'] || 'Tag'}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            
                            {description && (
                                <div className="manga-description">
                                    <h3>{t('manga.description')}</h3>
                                    <p>{description}</p>
                                </div>
                            )}
                            
                            <div className="manga-meta">
                                {attributes.status && (
                                    <div className="meta-item">
                                        <strong>{t('manga.status')}:</strong>
                                        <span>{attributes.status}</span>
                                    </div>
                                )}
                                {attributes.contentRating && (
                                    <div className="meta-item">
                                        <strong>{t('manga.rating')}:</strong>
                                        <span>{attributes.contentRating}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Chapters List */}
                <div className="manga-chapters-section">
                    <h2 className="section-title">
                        {t('manga.chapters')} ({chapters.length})
                    </h2>
                    
                    {chaptersLoading ? (
                        <div className="chapters-loading">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : chapters.length > 0 ? (
                        <div className="chapters-list">
                            {chapters.map((chapter) => {
                                const chapterTitle = chapter.attributes?.title || 
                                    `Chapter ${chapter.attributes?.chapter || 'N/A'}`;
                                const chapterNumber = chapter.attributes?.chapter || 0;
                                const chapterId = chapter.id;
                                
                                return (
                                    <Link 
                                        key={chapterId}
                                        to={`/manga/${id}/chapter/${chapterId}`}
                                        className="chapter-item"
                                    >
                                        <div className="chapter-info">
                                            <span className="chapter-number">
                                                {t('manga.chapter')} {chapterNumber}
                                            </span>
                                            {chapterTitle && chapterTitle !== `Chapter ${chapterNumber}` && (
                                                <span className="chapter-title">{chapterTitle}</span>
                                            )}
                                        </div>
                                        <div className="chapter-meta">
                                            {chapter.attributes?.publishAt && (
                                                <span className="chapter-date">
                                                    {new Date(chapter.attributes.publishAt).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="no-chapters">
                            <p>{t('manga.noChapters')}</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default MangaDetails;

