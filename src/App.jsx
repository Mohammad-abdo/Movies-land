import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Hrader';
import Footer from './Components/Footer/Footer';
import Home from './pages/Home';
import Cataloge from './pages/Cataloge';
import Details from './pages/Details';
import Anime from './pages/Anime';
import Manga from './pages/Manga';
import MangaDetails from './pages/MangaDetails';
import MangaChapter from './pages/MangaChapter';
import Trending from './pages/Trending';
import Discover from './pages/Discover';
import Upcoming from './pages/Upcoming';
import TopRatedPage from './pages/TopRatedPage';
import MobileNavigation from './Components/MobileNavigation/MobileNavigation';
import Person from './pages/Person';
import Search from './pages/Search';
import SearchAdvanced from './pages/SearchAdvanced';
import Adult from './pages/Adult';
import Collections from './pages/Collections';
import Country from './pages/Country';
import Reviews from './pages/Reviews';
import NotFound from './Components/NotFound/NotFound';
import { Provider } from 'react-redux';
import Favorites from './Components/favorites/Favorites';
import store from './store/store';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchAdvanced />} />
            <Route path="/search-old" element={<Search />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/adult" element={<Adult />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/country/:countryCode" element={<Country />} />
            <Route path="/person/:id" element={<Person />} />
            <Route path="/anime/search/:keyword" element={<Anime />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/manga/:id/chapter/:chapterId" element={<MangaChapter />} />
            <Route path="/manga/:id" element={<MangaDetails />} />
            <Route path="/manga" element={<Manga />} />
            <Route path="/:category/search/:keyword" element={<Cataloge />} />
            <Route path="/:category/:id/reviews" element={<Reviews />} />
            <Route path="/:category/:id" element={<Details />} />
            <Route path="/:category" element={<Cataloge />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileNavigation />
          <Footer />
        </BrowserRouter>
      </Provider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
