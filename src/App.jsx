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
import Trending from './pages/Trending';
import Person from './pages/Person';
import Search from './pages/Search';
import NotFound from './Components/NotFound/NotFound';
import { Provider } from 'react-redux';
import Favorites from './Components/favorites/Favorites';
import store from './store/store';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/person/:id" element={<Person />} />
            <Route path="/anime/search/:keyword" element={<Anime />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/:category/search/:keyword" element={<Cataloge />} />
            <Route path="/:category/:id" element={<Details />} />
            <Route path="/:category" element={<Cataloge />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
