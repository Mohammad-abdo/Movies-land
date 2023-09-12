
// import './assets/boxicons-2.0.7/css/boxicons.main.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper'
import './App.scss';
import { BrowserRouter ,Route ,RouterProvider,Routes, createBrowserRouter} from 'react-router-dom';
import Header from './Components/Header/Hrader';
import Footer from './Components/Footer/Footer';
// import  Routes  from './config/Routes';
import Home from './pages/Home';
import Cataloge from './pages/Cataloge';
import Details from './pages/Details';
import MovieCarousel from './Components/MovieCarousel/MovieCarousel';
import NotFound from './Components/NotFound/NotFound';
import { Provider } from 'react-redux';
import Favorites from './Components/favorites/Favorites';
import store from './store/store';
import AppLayout from './AppLayout';
// import VideoList from './Components/VideoMovies/Videos';
// const router= createBrowserRouter([
//   {
//     path:"/",
//     element:<AppLayout/>,
//     children:[
//       {index:true,element:<Home/>},
//       {path:"/:category/search/:keyword",  element: <Cataloge/> },
//       {path:"/category/:id", element:<Details/>},
//       {path:"//:category", element:<Cataloge/>},
//       {path:"/MovieCarousel", element:<MovieCarousel/>},
//       {path:"/Favorites", element:<Favorites/>},
//       {path:"*", element:<NotFound/>}, 
//     ]
//   }
// ])

// function App() {
//   return (
//    <>
//     <Provider store={store}>
//     <RouterProvider router={router}/>
//     </Provider>
//    </>
  
//   );
// }

function App() {
  return (
   <>
    <Provider store={store}>
    <BrowserRouter>
     <Header/> 
     <Routes >
    <Route path="/"  Component={Home}/>
    <Route path="/:category/search/:keyword"  Component={ Cataloge }/>
    <Route path="/:category/:id"  Component={Details}/>
    <Route path="/:category"  Component={Cataloge}/>
    <Route path="/MovieCarousel"  Component={MovieCarousel}/>
    <Route path="/Favorites"  Component={Favorites}/>
   
    <Route path="*"  Component={NotFound}/>

</Routes>    
    <Footer/>
   </BrowserRouter>
    </Provider>
    {/* <Provider store={store}>

<RouterProvider router={router}/>
  </Provider> */}
   </>
  
  );
}

export default App;
