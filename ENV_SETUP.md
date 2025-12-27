# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_TMDB_API_KEY=your_api_key_here
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3/
```

## How to Get Your TMDB API Key

1. Go to [The Movie Database](https://www.themoviedb.org/)
2. Create an account or log in
3. Navigate to [API Settings](https://www.themoviedb.org/settings/api)
4. Request an API key (it's free)
5. Copy your API key
6. Replace `your_api_key_here` in your `.env` file

## Important Notes

- The `.env` file is already in `.gitignore` - do not commit it
- Never share your API key publicly
- Restart your development server after creating/updating the `.env` file
- All React environment variables must start with `REACT_APP_`

## Troubleshooting

If you get API errors:
1. Verify your API key is correct
2. Check that the `.env` file is in the root directory
3. Restart the development server (`npm start`)
4. Ensure there are no extra spaces or quotes around the API key value

