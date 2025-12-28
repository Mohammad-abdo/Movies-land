import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import mangaApi, { getChapterPages } from '../api/mangaApi';
import { useLanguage } from '../contexts/LanguageContext';
import './MangaChapter.scss';

const MangaChapter = () => {
    const { id, chapterId } = useParams();
    const { t } = useLanguage();
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const imageUrls = await getChapterPages(chapterId);
                setPages(imageUrls);
            } catch (err) {
                setError(err.message || 'Failed to load chapter');
                console.error('Error fetching chapter:', err);
            } finally {
                setLoading(false);
            }
        };

        if (chapterId) {
            fetchChapter();
        }
    }, [chapterId]);

    if (loading) {
        return (
            <div className="manga-chapter-loading">
                <Container>
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                        <Spinner animation="border" variant="danger" size="lg" />
                    </div>
                </Container>
            </div>
        );
    }

    if (error || pages.length === 0) {
        return (
            <div className="manga-chapter-error">
                <Container>
                    <Alert variant="danger">
                        <Alert.Heading>{t('common.error')}</Alert.Heading>
                        <p>{error || t('manga.chapterNotFound')}</p>
                        <Link to={`/manga/${id}`}>
                            <Button variant="primary">
                                {t('manga.backToManga')}
                            </Button>
                        </Link>
                    </Alert>
                </Container>
            </div>
        );
    }

    return (
        <div className="manga-chapter-reader">
            <Container>
                {/* Navigation Bar */}
                <div className="chapter-navigation">
                    <Link to={`/manga/${id}`} className="back-btn">
                        ← {t('manga.back') || 'Back'}
                    </Link>
                    <div className="page-counter">
                        {t('manga.totalPages') || 'Total Pages'}: {pages.length}
                    </div>
                </div>

                {/* All Manga Pages - Continuous Scroll */}
                <div className="manga-pages-container">
                    {pages.map((pageUrl, index) => (
                        <div key={index} className="manga-page-wrapper">
                            <img 
                                src={pageUrl} 
                                alt={`Page ${index + 1}`}
                                className="manga-page-image"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/800x1200?text=Image+Error';
                                }}
                            />
                            <div className="page-number">{index + 1}</div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default MangaChapter;

