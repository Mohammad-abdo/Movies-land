import React, { useEffect, useState } from "react";

import tmdbApi,{category, movieType, tvType} from '../../api/tmdbApi';
import ApiConfig from "../../api/api";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './TopRated.scss'
import { Link } from "react-router-dom";

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const TopRated = props => {
  const [items,setItem]=useState([])
  const [favorite,setFavorite]=useState([])
  useEffect(()=>{
      const gelist= async ()=>{
        try {
          const params={}
          const response= await tmdbApi.getMoviesList(movieType.top_rated,{params});
          setItem(response.results)
        } catch (error) {
          console.log(error);
        } 
      }
      gelist()
   
  },[])
  const handleAddToFavorites = (movie) => {
  //  const data= ( prevFavorites ) => [...prevFavorites, movie]
   setFavorite(( prevFavorites ) => [...prevFavorites, movie] );
  
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive}>
      {items.map((movie, index) => (
    
             <div key={index} className=" rounded__card shadow mx-1 my-2">
          <div className="card ">
          <img src={ApiConfig.originalImage(movie.poster_path)} alt={movie.title} className="img-fluid card-img-top img__card" />
          {/* <button className="btn btn-light  py-1 px-3 card__btn">Watch Now</button> */}
          <Link to={'/'+ 'movie'+'/' + movie.id } >
            <div className="card-body card__body" handleAddToFavorites={movie}>
            <FontAwesomeIcon icon="fa-solid fa-circle-play" beatFade style={{color: "#d10000",}} />
                      <p className="text-light crd__title" style={{fontSize:'17px'}}>{movie.title}    </p>
                    
                      <div className="text-light over__card" style={{fontSize:'17px'}}>{movie.overview}</div>
            
            </div>
      </Link>
          </div>
         
        </div>
          
       
      ))}
    </Carousel>
  );
};

export default TopRated