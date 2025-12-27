# Movies Land 🎬

A modern, professional movie browsing application built with React that allows users to discover movies and TV series, view details, watch trailers, and manage their favorites list.

![Movies Land](./thumb.png)

## Features

- 🎥 **Browse Movies & TV Series** - Discover popular, top-rated, and upcoming content
- 🔍 **Search Functionality** - Search for movies and TV shows by keyword
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ❤️ **Favorites System** - Save your favorite movies for easy access
- 🎬 **Movie Details** - View comprehensive details including trailers, ratings, and descriptions
- ⚡ **Fast & Optimized** - Built with modern React best practices
- 🛡️ **Error Handling** - Robust error boundaries and loading states
- 🔒 **Secure** - API keys managed through environment variables

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router v6** - Client-side routing
- **Redux Toolkit** - State management for favorites
- **Bootstrap 5** - Responsive UI components
- **Axios** - HTTP client for API requests
- **TMDB API** - Movie and TV data source
- **Sass** - Styling with CSS preprocessor

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Movies-land
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_TMDB_API_KEY=your_api_key_here
   REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3/
   ```

   **Important:** Replace `your_api_key_here` with your actual TMDB API key.

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run deploy` - Deploys to GitHub Pages (requires gh-pages)

## Project Structure

```
src/
├── api/              # API configuration and endpoints
├── Components/       # Reusable React components
│   ├── Button/      # Button components
│   ├── ErrorBoundary/ # Error boundary wrapper
│   ├── favorites/   # Favorites component
│   ├── Footer/      # Footer component
│   ├── Header/      # Header/Navigation component
│   ├── Hero_slide/  # Hero carousel
│   ├── movieCard/   # Movie card component
│   ├── movie-grid/  # Movie grid layout
│   └── ...
├── pages/           # Page components
│   ├── Home.jsx     # Homepage
│   ├── Details.jsx  # Movie/TV details page
│   └── Cataloge.jsx # Catalog/Browse page
├── store/           # Redux store configuration
├── Sass/            # Global styles
└── App.jsx          # Main app component
```

## API Configuration

This app uses The Movie Database (TMDB) API. You need to:

1. Sign up at [themoviedb.org](https://www.themoviedb.org/)
2. Get your API key from [API Settings](https://www.themoviedb.org/settings/api)
3. Add it to your `.env` file as `REACT_APP_TMDB_API_KEY`

## Deployment

### GitHub Pages

1. Update `homepage` in `package.json` to your repository URL
2. Run `npm run deploy`

### Other Platforms

Build the app for production:

```bash
npm run build
```

The `build` folder will contain the optimized production build ready to deploy to any static hosting service (Netlify, Vercel, etc.).

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Use environment variables for all sensitive data
- API keys are client-side only (consider using a backend proxy for production)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- All the open-source libraries and frameworks used in this project

---

Made with ❤️ using React
