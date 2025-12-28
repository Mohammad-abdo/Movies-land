# API Integration Guide

This document outlines all available APIs and how to integrate them into the Movies Land application.

## Available APIs

### 1. The Movie Database (TMDB) - Primary Movie/TV API
- **Status**: ✅ Active (Free)
- **Type**: REST API
- **Documentation**: https://www.themoviedb.org/documentation/api
- **Rate Limit**: 40 requests per 10 seconds
- **Supports**: Movies, TV Shows, People, Images, Videos, Reviews
- **Setup**: Already configured with API key in `.env`

### 2. MangaDex - Primary Manga API
- **Status**: ✅ Active (Free)
- **Type**: REST API
- **Documentation**: https://api.mangadex.org/docs/
- **Rate Limit**: 5 requests per second
- **Supports**: Manga, Chapters, Cover Art, Authors
- **Setup**: Uses proxy for CORS in production

### 3. AniList API - Anime/Manga GraphQL API
- **Status**: ⚠️ Optional (Free, requires enable)
- **Type**: GraphQL API
- **Documentation**: https://anilist.github.io/ApiV2-GraphQL-Docs/
- **Rate Limit**: 90 requests per minute
- **Supports**: Anime, Manga, Characters, Staff, Studios
- **Setup**: 
  ```bash
  REACT_APP_ANILIST_ENABLED=true
  REACT_APP_ANILIST_CLIENT_ID=your_client_id (optional)
  REACT_APP_ANILIST_CLIENT_SECRET=your_client_secret (optional)
  ```

### 4. Kitsu API - Anime/Manga API
- **Status**: ⚠️ Optional (Free, requires enable)
- **Type**: REST API (JSON:API format)
- **Documentation**: https://kitsu.docs.apiary.io/
- **Rate Limit**: 500 requests per 5 minutes
- **Supports**: Anime, Manga, Characters, Episodes, Chapters
- **Setup**: 
  ```bash
  REACT_APP_KITSU_ENABLED=true
  ```

### 5. Jikan API - Unofficial MyAnimeList API
- **Status**: ⚠️ Optional (Free, requires enable)
- **Type**: REST API
- **Documentation**: https://docs.api.jikan.moe/
- **Rate Limit**: 3 requests per second
- **Supports**: Anime, Manga, Characters, People, Top Lists, Seasons
- **Setup**: 
  ```bash
  REACT_APP_JIKAN_ENABLED=true
  ```

### 6. OMDb API - Movie/TV Database
- **Status**: ⚠️ Optional (Free tier available, requires API key)
- **Type**: REST API
- **Documentation**: http://www.omdbapi.com/
- **Rate Limit**: 1,000 requests per day (free tier)
- **Supports**: Movies, TV Shows, Episodes, Ratings
- **Setup**: 
  ```bash
  REACT_APP_OMDB_API_KEY=your_api_key
  ```
  Get API key: http://www.omdbapi.com/apikey.aspx

### 7. Lek-Manga API - Custom Manga Source
- **Status**: ⚠️ Experimental (Custom API)
- **Type**: Custom REST API
- **Base URL**: https://s4solo.lek-manga.net
- **Note**: May require CORS proxy
- **Setup**: 
  ```bash
  REACT_APP_LEKMANGA_ENABLED=true
  ```

## How to Enable Additional APIs

1. **Add environment variables** to `.env` file:
```env
# Enable AniList
REACT_APP_ANILIST_ENABLED=true
REACT_APP_ANILIST_CLIENT_ID=your_client_id
REACT_APP_ANILIST_CLIENT_SECRET=your_client_secret

# Enable Kitsu
REACT_APP_KITSU_ENABLED=true

# Enable Jikan
REACT_APP_JIKAN_ENABLED=true

# Enable OMDb (requires API key)
REACT_APP_OMDB_API_KEY=your_omdb_api_key

# Enable Lek-Manga
REACT_APP_LEKMANGA_ENABLED=true
```

2. **Restart the development server** after adding environment variables

3. **Import and use APIs** in your components:
```javascript
import anilistApi from '../api/anilistApi';
import kitsuApi from '../api/kitsuApi';
import jikanApi from '../api/jikanApi';
```

## Advanced Search Features

The application now supports:
- Multi-source search (search across multiple APIs)
- Filtered search (by genre, year, rating, etc.)
- Category-specific search (movies, TV, anime, manga)
- Real-time search suggestions
- Search history

## API Rate Limiting

Each API has different rate limits. The application implements:
- Request queuing for rate-limited APIs
- Fallback to alternative APIs when limits are reached
- Caching to reduce API calls

## Adding New APIs

To add a new API:

1. **Add configuration** to `src/api/apiConfig.js`:
```javascript
newApi: {
    name: 'New API Name',
    type: 'free' | 'paid' | 'custom',
    baseUrl: 'https://api.example.com',
    apiKey: process.env.REACT_APP_NEW_API_KEY || '',
    enabled: process.env.REACT_APP_NEW_API_ENABLED === 'true' || false,
    rateLimit: 100, // requests per time period
    supports: ['movies', 'tv'],
    // ... other config
}
```

2. **Create API service** in `src/api/newApi.js`

3. **Update search components** to use the new API

## Paid API Recommendations

If you want to use paid APIs for better data quality:

1. **TMDB Pro** - Enhanced TMDB access
2. **IMDb API** - Official IMDb data (paid service)
3. **AniList Pro** - Enhanced AniList features (if available)
4. **Custom Manga APIs** - Private APIs with better content

## CORS and Proxy Setup

Some APIs may require a CORS proxy. The application includes:
- MangaDex proxy (`api/mangadex-proxy.js`)
- Can be extended for other APIs

## Best Practices

1. **Always check API status** before making requests
2. **Implement error handling** for API failures
3. **Cache responses** when possible
4. **Respect rate limits** to avoid being blocked
5. **Use environment variables** for API keys (never commit keys)

## Support and Documentation

- Check individual API documentation for latest changes
- Monitor API status pages for outages
- Join API community forums for support
- Keep API keys secure and rotate them regularly

