// AniList API Integration (GraphQL)
// Documentation: https://anilist.github.io/ApiV2-GraphQL-Docs/

import API_CONFIG from './apiConfig';

const ANILIST_API = API_CONFIG.anilist;

if (!ANILIST_API.enabled) {
    console.warn('AniList API is not enabled. Set REACT_APP_ANILIST_ENABLED=true to enable.');
}

// GraphQL query for searching anime
const SEARCH_ANIME_QUERY = `
    query ($search: String, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media(type: ANIME, search: $search, sort: POPULARITY_DESC) {
                id
                idMal
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                type
                format
                status
                description
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                season
                seasonYear
                seasonInt
                episodes
                duration
                chapters
                volumes
                countryOfOrigin
                isLicensed
                source
                hashtag
                trailer {
                    id
                    site
                    thumbnail
                }
                updatedAt
                coverImage {
                    extraLarge
                    large
                    medium
                }
                bannerImage
                genres
                synonyms
                averageScore
                meanScore
                popularity
                favourites
                tags {
                    id
                    name
                    description
                    category
                    rank
                    isGeneralSpoiler
                    isMediaSpoiler
                    isAdult
                    userId
                }
                studios {
                    nodes {
                        id
                        name
                    }
                }
                isAdult
                nextAiringEpisode {
                    id
                    airingAt
                    timeUntilAiring
                    episode
                    mediaId
                }
            }
        }
    }
`;

// GraphQL query for searching manga
const SEARCH_MANGA_QUERY = `
    query ($search: String, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media(type: MANGA, search: $search, sort: POPULARITY_DESC) {
                id
                idMal
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                type
                format
                status
                description
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                chapters
                volumes
                countryOfOrigin
                isLicensed
                source
                updatedAt
                coverImage {
                    extraLarge
                    large
                    medium
                }
                bannerImage
                genres
                synonyms
                averageScore
                meanScore
                popularity
                favourites
                tags {
                    id
                    name
                    description
                    category
                    rank
                    isGeneralSpoiler
                    isMediaSpoiler
                    isAdult
                }
                isAdult
            }
        }
    }
`;

const graphqlRequest = async (query, variables = {}) => {
    if (!ANILIST_API.enabled) {
        throw new Error('AniList API is not enabled');
    }

    try {
        const response = await fetch(ANILIST_API.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.errors) {
            throw new Error(data.errors[0]?.message || 'AniList API error');
        }

        return data.data;
    } catch (error) {
        console.error('AniList API error:', error);
        throw error;
    }
};

export const searchAnime = async (query, page = 1, perPage = 20) => {
    return graphqlRequest(SEARCH_ANIME_QUERY, {
        search: query,
        page,
        perPage
    });
};

export const searchManga = async (query, page = 1, perPage = 20) => {
    return graphqlRequest(SEARCH_MANGA_QUERY, {
        search: query,
        page,
        perPage
    });
};

export const getAnimeDetails = async (id) => {
    const query = `
        query ($id: Int) {
            Media(id: $id, type: ANIME) {
                id
                idMal
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                type
                format
                status
                description
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                season
                seasonYear
                episodes
                duration
                coverImage {
                    extraLarge
                    large
                    medium
                }
                bannerImage
                genres
                averageScore
                popularity
                studios {
                    nodes {
                        id
                        name
                    }
                }
                characters {
                    nodes {
                        id
                        name {
                            full
                            native
                        }
                        image {
                            large
                            medium
                        }
                    }
                }
            }
        }
    `;
    
    return graphqlRequest(query, { id: parseInt(id) });
};

export const getMangaDetails = async (id) => {
    const query = `
        query ($id: Int) {
            Media(id: $id, type: MANGA) {
                id
                idMal
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                type
                format
                status
                description
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                chapters
                volumes
                coverImage {
                    extraLarge
                    large
                    medium
                }
                bannerImage
                genres
                averageScore
                popularity
            }
        }
    `;
    
    return graphqlRequest(query, { id: parseInt(id) });
};

export default {
    searchAnime,
    searchManga,
    getAnimeDetails,
    getMangaDetails
};

