import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv',
    anime: 'tv' // Anime uses TV endpoint with keyword filtering
};

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
};

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
};

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    details: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, { params: {} });
    },
    // Anime-specific search - searches for anime content
    getAnimeList: (type, params) => {
        const url = 'discover/tv';
        return axiosClient.get(url, { 
            params: { 
                ...params,
                with_genres: '16' // Animation genre ID
            } 
        });
    },
    // Get anime by keyword
    searchAnime: (params) => {
        if (params?.params?.query) {
            // If there's a search query, use search endpoint
            const url = 'search/tv';
            return axiosClient.get(url, { 
                params: { 
                    ...params.params,
                    with_genres: '16'
                } 
            });
        } else {
            // Otherwise, use discover endpoint for anime
            const url = 'discover/tv';
            return axiosClient.get(url, { 
                params: { 
                    ...params.params,
                    with_genres: '16' // Animation genre ID
                } 
            });
        }
    },
    // Get genres list
    getGenres: (cate) => {
        const url = 'genre/' + category[cate] + '/list';
        return axiosClient.get(url, { params: {} });
    },
    // Discover content with filters
    discover: (cate, params) => {
        const url = 'discover/' + category[cate];
        return axiosClient.get(url, params);
    },
    // Get certifications (age ratings)
    getCertifications: () => {
        const url = 'certification/movie/list';
        return axiosClient.get(url, { params: {} });
    },
    // Get person details
    getPerson: (id) => {
        const url = 'person/' + id;
        return axiosClient.get(url, { params: {} });
    },
    // Get person movie credits
    getPersonMovieCredits: (id) => {
        const url = 'person/' + id + '/movie_credits';
        return axiosClient.get(url, { params: {} });
    },
    // Get person TV credits
    getPersonTvCredits: (id) => {
        const url = 'person/' + id + '/tv_credits';
        return axiosClient.get(url, { params: {} });
    },
    // Get recommendations
    getRecommendations: (cate, id) => {
        const url = category[cate] + '/' + id + '/recommendations';
        return axiosClient.get(url, { params: {} });
    },
    // Get reviews
    getReviews: (cate, id) => {
        const url = category[cate] + '/' + id + '/reviews';
        return axiosClient.get(url, { params: {} });
    },
    // Get watch providers
    getWatchProviders: (cate, id) => {
        const url = category[cate] + '/' + id + '/watch/providers';
        return axiosClient.get(url, { params: {} });
    },
    // Get trending (daily/weekly)
    getTrending: (mediaType, timeWindow) => {
        const url = 'trending/' + mediaType + '/' + timeWindow;
        return axiosClient.get(url, { params: {} });
    },
    // Get collection details
    getCollection: (id) => {
        const url = 'collection/' + id;
        return axiosClient.get(url, { params: {} });
    },
    // Get now playing movies
    getNowPlaying: (params) => {
        const url = 'movie/now_playing';
        return axiosClient.get(url, params);
    },
    // Get airing today TV shows
    getAiringToday: (params) => {
        const url = 'tv/airing_today';
        return axiosClient.get(url, params);
    },
    // Multi search (movies, TV, people)
    multiSearch: (params) => {
        const url = 'search/multi';
        return axiosClient.get(url, params);
    },
    // Get movies by country
    getMoviesByCountry: (countryCode, params) => {
        const url = 'discover/movie';
        return axiosClient.get(url, {
            params: {
                ...params.params,
                with_origin_country: countryCode,
            }
        });
    },
    // Get TV by country
    getTvByCountry: (countryCode, params) => {
        const url = 'discover/tv';
        return axiosClient.get(url, {
            params: {
                ...params.params,
                with_origin_country: countryCode,
            }
        });
    },
    // Get adult content (18+)
    getAdultContent: (cate, params) => {
        const url = 'discover/' + category[cate];
        return axiosClient.get(url, {
            params: {
                ...params.params,
                certification_country: 'US',
                certification: 'R', // R-rated for movies
                'certification.gte': 'R',
            }
        });
    },
    // Get content by certification
    getContentByCertification: (cate, certification, params) => {
        const url = 'discover/' + category[cate];
        return axiosClient.get(url, {
            params: {
                ...params.params,
                certification_country: 'US',
                certification: certification,
            }
        });
    },
    // Get watch providers by country
    getWatchProvidersByCountry: (countryCode) => {
        const url = 'watch/providers/movie';
        return axiosClient.get(url, {
            params: {
                watch_region: countryCode,
            }
        });
    },
};

export default tmdbApi;