import React from 'react';
import { useParams } from 'react-router';
import PageHeader from '../Components/page-header/PageHeader';
import './Anime.scss';
import MovieGrid from '../Components/movie-grid/MovieGrid';
import { category } from '../api/tmdbApi';

const Anime = () => {
    const { keyword } = useParams();

    return (
        <>
            <PageHeader>
                Anime & Manga
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid 
                        category={category.anime} 
                        keyword={keyword}
                    />
                </div>
            </div>
        </>
    );
}

export default Anime;
