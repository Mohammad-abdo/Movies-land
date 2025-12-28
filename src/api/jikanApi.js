// Jikan API Integration (Unofficial MyAnimeList API)
// Documentation: https://docs.api.jikan.moe/

import API_CONFIG from './apiConfig';

const JIKAN_API = API_CONFIG.jikan;

if (!JIKAN_API.enabled) {
    console.warn('Jikan API is not enabled. Set REACT_APP_JIKAN_ENABLED=true to enable.');
}

const buildUrl = (endpoint) => {
    return `${JIKAN_API.baseUrl}/${endpoint}`;
};

const fetchJikan = async (url) => {
    if (!JIKAN_API.enabled) {
        throw new Error('Jikan API is not enabled');
    }

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Jikan API error:', error);
        throw error;
    }
};

export const searchAnime = async (query, page = 1, limit = 25) => {
    const url = buildUrl(`anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    return fetchJikan(url);
};

export const searchManga = async (query, page = 1, limit = 25) => {
    const url = buildUrl(`manga?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    return fetchJikan(url);
};

export const getAnimeDetails = async (id) => {
    const url = buildUrl(`anime/${id}/full`);
    return fetchJikan(url);
};

export const getMangaDetails = async (id) => {
    const url = buildUrl(`manga/${id}/full`);
    return fetchJikan(url);
};

export const getTopAnime = async (type = 'all', page = 1, limit = 25) => {
    // type: all, airing, upcoming, bypopularity, favorite
    const url = buildUrl(`top/anime?type=${type}&page=${page}&limit=${limit}`);
    return fetchJikan(url);
};

export const getTopManga = async (type = 'all', page = 1, limit = 25) => {
    // type: all, manga, novels, oneshots, doujin, manhwa, manhua, bypopularity, favorite
    const url = buildUrl(`top/manga?type=${type}&page=${page}&limit=${limit}`);
    return fetchJikan(url);
};

export const getSeasonalAnime = async (year, season) => {
    // season: winter, spring, summer, fall
    const url = buildUrl(`seasons/${year}/${season}`);
    return fetchJikan(url);
};

export default {
    searchAnime,
    searchManga,
    getAnimeDetails,
    getMangaDetails,
    getTopAnime,
    getTopManga,
    getSeasonalAnime
};

