import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import mangaApi, { getChapterPages } from '../api/mangaApi';
import { useLanguage } from '../contexts/LanguageContext';
import './MangaChapter.scss';

const MangaChapter = () => {
    const { id, chapterId } = useParams();
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const pageRef = useRef(null);

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

    useEffect(() => {
        // Scroll to top when page changes
        if (pageRef.current) {
            pageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            handleNextPage();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            handlePrevPage();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentPage, pages.length]);

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
                        ← {t('manga.back')}
                    </Link>
                    <div className="page-counter">
                        {t('manga.page')} {currentPage + 1} / {pages.length}
                    </div>
                    <div className="chapter-controls">
                        <Button 
                            variant="outline-light" 
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="nav-btn"
                        >
                            ← {t('manga.previous')}
                        </Button>
                        <Button 
                            variant="outline-light" 
                            onClick={handleNextPage}
                            disabled={currentPage === pages.length - 1}
                            className="nav-btn"
                        >
                            {t('manga.next')} →
                        </Button>
                    </div>
                </div>

                {/* Manga Page */}
                <div className="manga-page-container" ref={pageRef}>
                    <img 
                        src={pages[currentPage]} 
                        alt={`Page ${currentPage + 1}`}
                        className="manga-page-image"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x1200?text=Image+Error';
                        }}
                    />
                </div>

                {/* Page Navigation at Bottom */}
                <div className="chapter-navigation-bottom">
                    <Button 
                        variant="outline-danger" 
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                    >
                        ← {t('manga.previousPage')}
                    </Button>
                    <span className="page-indicator">
                        {currentPage + 1} / {pages.length}
                    </span>
                    <Button 
                        variant="danger" 
                        onClick={handleNextPage}
                        disabled={currentPage === pages.length - 1}
                    >
                        {t('manga.nextPage')} →
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default MangaChapter;

