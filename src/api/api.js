// Fallback API key - user should set their own in .env file
const DEFAULT_API_KEY = '9fd4f82abd9873f00e717892f1f9ea97';

const ApiConfig = {
    baseurl: process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3/',
    apiKey: process.env.REACT_APP_TMDB_API_KEY || DEFAULT_API_KEY,
    originalImage: (imgPath) => imgPath ? `https://image.tmdb.org/t/p/original/${imgPath}` : '',
    w500Image: (imgPath) => imgPath ? `https://image.tmdb.org/t/p/w500/${imgPath}` : '',
    backdropImage: (imgPath) => imgPath ? `https://image.tmdb.org/t/p/w1280/${imgPath}` : ''
};

export default ApiConfig;