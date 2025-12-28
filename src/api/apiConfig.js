// Comprehensive API Configuration System
// Supports multiple APIs (free and paid)

const API_CONFIG = {
    // TMDB (Primary - Free)
    tmdb: {
        name: 'The Movie Database (TMDB)',
        type: 'free',
        baseUrl: process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3/',
        apiKey: process.env.REACT_APP_TMDB_API_KEY || '9fd4f82abd9873f00e717892f1f9ea97',
        enabled: true,
        rateLimit: 40, // requests per 10 seconds
        supports: ['movies', 'tv', 'people', 'images', 'videos'],
        imageBaseUrl: 'https://image.tmdb.org/t/p/'
    },

    // MangaDex (Primary Manga - Free)
    mangadex: {
        name: 'MangaDex',
        type: 'free',
        baseUrl: process.env.NODE_ENV === 'production' 
            ? '/api/mangadex-proxy' 
            : 'https://api.mangadex.org',
        enabled: true,
        rateLimit: 5, // requests per second
        supports: ['manga', 'chapters', 'cover_art', 'author'],
        imageBaseUrl: 'https://uploads.mangadex.org'
    },

    // AniList API (Free - GraphQL)
    anilist: {
        name: 'AniList',
        type: 'free',
        baseUrl: 'https://graphql.anilist.co',
        enabled: process.env.REACT_APP_ANILIST_ENABLED === 'true' || false,
        rateLimit: 90, // requests per minute
        supports: ['anime', 'manga', 'characters', 'staff', 'studios'],
        requiresAuth: false,
        clientId: process.env.REACT_APP_ANILIST_CLIENT_ID || '',
        clientSecret: process.env.REACT_APP_ANILIST_CLIENT_SECRET || ''
    },

    // Kitsu API (Free)
    kitsu: {
        name: 'Kitsu',
        type: 'free',
        baseUrl: 'https://kitsu.io/api/edge',
        enabled: process.env.REACT_APP_KITSU_ENABLED === 'true' || false,
        rateLimit: 500, // requests per 5 minutes
        supports: ['anime', 'manga', 'characters', 'episodes', 'chapters'],
        version: '1.0'
    },

    // Jikan API (Unofficial MyAnimeList - Free)
    jikan: {
        name: 'Jikan (MyAnimeList)',
        type: 'free',
        baseUrl: 'https://api.jikan.moe/v4',
        enabled: process.env.REACT_APP_JIKAN_ENABLED === 'true' || false,
        rateLimit: 3, // requests per second
        supports: ['anime', 'manga', 'characters', 'people', 'top', 'seasons'],
        version: 'v4'
    },

    // Lek-Manga API (Example custom API)
    lekmanga: {
        name: 'Lek-Manga',
        type: 'custom',
        baseUrl: 'https://s4solo.lek-manga.net',
        enabled: process.env.REACT_APP_LEKMANGA_ENABLED === 'true' || false,
        rateLimit: 10, // requests per second
        supports: ['manga', 'chapters'],
        requiresProxy: true, // May need CORS proxy
        customHeaders: {}
    },

    // OMDb API (Optional - Requires API Key - Free tier available)
    omdb: {
        name: 'OMDb API',
        type: 'free_with_key',
        baseUrl: 'https://www.omdbapi.com',
        apiKey: process.env.REACT_APP_OMDB_API_KEY || '',
        enabled: process.env.REACT_APP_OMDB_API_KEY ? true : false,
        rateLimit: 1000, // requests per day (free tier)
        supports: ['movies', 'tv', 'episodes', 'ratings'],
        requiresApiKey: true
    }
};

// Helper functions
export const getApiConfig = (apiName) => {
    return API_CONFIG[apiName] || null;
};

export const isApiEnabled = (apiName) => {
    const config = getApiConfig(apiName);
    return config && config.enabled;
};

export const getEnabledApis = () => {
    return Object.keys(API_CONFIG).filter(key => isApiEnabled(key));
};

export const getApisBySupport = (supportType) => {
    return Object.keys(API_CONFIG).filter(key => {
        const config = API_CONFIG[key];
        return config && config.enabled && config.supports && config.supports.includes(supportType);
    });
};

export default API_CONFIG;

