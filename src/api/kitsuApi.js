// Kitsu API Integration
// Documentation: https://kitsu.docs.apiary.io/

import API_CONFIG from './apiConfig';

const KITSU_API = API_CONFIG.kitsu;

if (!KITSU_API.enabled) {
    console.warn('Kitsu API is not enabled. Set REACT_APP_KITSU_ENABLED=true to enable.');
}

const buildUrl = (endpoint, params = {}) => {
    const baseUrl = `${KITSU_API.baseUrl}/${endpoint}`;
    const queryParams = new URLSearchParams(params).toString();
    return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchKitsu = async (url) => {
    if (!KITSU_API.enabled) {
        throw new Error('Kitsu API is not enabled');
    }

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Kitsu API error:', error);
        throw error;
    }
};

export const searchAnime = async (query, page = 1, limit = 20) => {
    const url = buildUrl('anime', {
        'filter[text]': query,
        'page[limit]': limit,
        'page[offset]': (page - 1) * limit,
        'sort': 'popularityRank'
    });
    
    return fetchKitsu(url);
};

export const searchManga = async (query, page = 1, limit = 20) => {
    const url = buildUrl('manga', {
        'filter[text]': query,
        'page[limit]': limit,
        'page[offset]': (page - 1) * limit,
        'sort': 'popularityRank'
    });
    
    return fetchKitsu(url);
};

export const getAnimeDetails = async (id) => {
    const url = buildUrl(`anime/${id}`, {
        'include': 'genres,categories,castings,characters'
    });
    
    return fetchKitsu(url);
};

export const getMangaDetails = async (id) => {
    const url = buildUrl(`manga/${id}`, {
        'include': 'genres,categories,castings,characters'
    });
    
    return fetchKitsu(url);
};

export const getTrendingAnime = async (limit = 20) => {
    const url = buildUrl('trending/anime', {
        'limit': limit
    });
    
    return fetchKitsu(url);
};

export default {
    searchAnime,
    searchManga,
    getAnimeDetails,
    getMangaDetails,
    getTrendingAnime
};

