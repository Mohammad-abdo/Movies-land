// MangaDex API integration
const MANGA_DEX_BASE_URL = 'https://api.mangadex.org';

// Helper function to build image URL
export const getMangaImageUrl = (manga, size = 'medium') => {
    if (!manga.relationships) return null;
    
    const coverRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
    if (!coverRelationship || !coverRelationship.attributes) return null;
    
    const fileName = coverRelationship.attributes.fileName;
    const mangaId = manga.id;
    
    // Image sizes: 256, 512, or original
    const imageSize = size === 'small' ? '256' : size === 'large' ? '512' : '512';
    return `https://uploads.mangadex.org/covers/${mangaId}/${fileName}.${imageSize}.jpg`;
};

// Helper function to get manga title
export const getMangaTitle = (manga) => {
    if (!manga.attributes || !manga.attributes.title) return 'Unknown Title';
    
    // Try to get English title first, then fallback to first available
    const titles = manga.attributes.title;
    return titles.en || titles['en-us'] || Object.values(titles)[0] || 'Unknown Title';
};

// Helper function to get manga description
export const getMangaDescription = (manga) => {
    if (!manga.attributes || !manga.attributes.description) return '';
    
    const descriptions = manga.attributes.description;
    return descriptions.en || descriptions['en-us'] || Object.values(descriptions)[0] || '';
};

// Fetch trending/popular manga
export const getPopularManga = async (limit = 20, offset = 0) => {
    try {
        const response = await fetch(
            `${MANGA_DEX_BASE_URL}/manga?limit=${limit}&offset=${offset}&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art&includes[]=author`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching popular manga:', error);
        throw error;
    }
};

// Search manga
export const searchManga = async (query, limit = 20, offset = 0) => {
    try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
            `${MANGA_DEX_BASE_URL}/manga?title=${encodedQuery}&limit=${limit}&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&includes[]=cover_art&includes[]=author`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching manga:', error);
        throw error;
    }
};

// Get manga details by ID
export const getMangaDetails = async (mangaId) => {
    try {
        const response = await fetch(
            `${MANGA_DEX_BASE_URL}/manga/${mangaId}?includes[]=cover_art&includes[]=author&includes[]=artist`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching manga details:', error);
        throw error;
    }
};

// Get manga chapters
export const getMangaChapters = async (mangaId, limit = 100, offset = 0, language = 'en') => {
    try {
        const response = await fetch(
            `${MANGA_DEX_BASE_URL}/manga/${mangaId}/feed?limit=${limit}&offset=${offset}&translatedLanguage[]=${language}&order[chapter]=asc&contentRating[]=safe&contentRating[]=suggestive`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching manga chapters:', error);
        throw error;
    }
};

// Get chapter pages/images
export const getChapterPages = async (chapterId) => {
    try {
        // First get chapter data
        const chapterResponse = await fetch(`${MANGA_DEX_BASE_URL}/at-home/server/${chapterId}`);
        const chapterData = await chapterResponse.json();
        
        if (!chapterData.baseUrl || !chapterData.chapter) {
            throw new Error('Invalid chapter data');
        }
        
        const baseUrl = chapterData.baseUrl;
        const hash = chapterData.chapter.hash;
        const pages = chapterData.chapter.data;
        const dataSaver = chapterData.chapter.dataSaver;
        
        // Use data for full quality (pages array) or dataSaver for faster loading (lower quality)
        const useDataSaver = false; // Set to true for faster loading but lower quality
        const pageData = useDataSaver ? dataSaver : pages;
        const dataPath = useDataSaver ? 'data-saver' : 'data';
        
        // Build image URLs
        const imageUrls = pageData.map(page => {
            return `${baseUrl}/${dataPath}/${hash}/${page}`;
        });
        
        return imageUrls;
    } catch (error) {
        console.error('Error fetching chapter pages:', error);
        throw error;
    }
};

// Get chapter details
export const getChapterDetails = async (chapterId) => {
    try {
        const response = await fetch(`${MANGA_DEX_BASE_URL}/chapter/${chapterId}?includes[]=manga&includes[]=scanlation_group`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chapter details:', error);
        throw error;
    }
};

export default {
    getPopularManga,
    searchManga,
    getMangaDetails,
    getMangaChapters,
    getChapterPages,
    getChapterDetails,
    getMangaImageUrl,
    getMangaTitle,
    getMangaDescription,
};

