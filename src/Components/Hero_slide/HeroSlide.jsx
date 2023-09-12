import React, { useEffect, useState } from "react";
import tmdbApi,{category, movieType, tvType} from '../../api/tmdbApi';
import ApiConfig from "../../api/api";
import './HeroSlide.scss'
import Button,{OutlineButton} from '../Button/Button'
import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from 'react-bootstrap/Carousel';
// @ts-ignore
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
const HeroSlide=()=>{
    // swiperCore.use([Autopaly]);
  
    const [movieItems,setMoviItems]=useState([])
    useEffect(()=>{
        const getMovies=async ()=>{
            const param ={page:1}
            try {
                const response= await tmdbApi.getMoviesList(tvType.popular,{param})
                // @ts-ignore
                setMoviItems(response.results.slice(3,10))
            
            } catch (error) {
                console.log(error);
            }
        }
        getMovies()
    },[])
return (
    <div className="hero-slide item_card">
     <Carousel >
      {movieItems.map((item, index) => (
        <Carousel.Item key={index} style={{position:'relative'}} className="">
          <img className="d-block w-100 " src={ApiConfig.originalImage(item.backdrop_path)}/>
          <Carousel.Caption>
          <div className="container ">
        <div className="row info__content__slide d-flex justify-content-between">
            <div className="col-7 d-flex justify-content-evenly flex-column">
         <div className="d-flex ">
         <h2 className="title " style={{fontSize:'60px',fontWeight:'bold'}}>{item.title}</h2>
         </div>
    <div className="overview d-flex" style={{fontSize:'28px',fontWeight:'500'}}>{item.overview}</div>
    <div className="my-2 d-flex ">
    <Button className=" mx-3 btn ">
        Watch now
        </Button>
        <button className="border py-2 px-4 btn_outline rounded-pill" > Watch triler</button>
    </div>
            </div>
         
            <div className="col-4 my-3 mx-3 img__slide__card " style={{backgroundImage:`url(${ApiConfig.originalImage(item.backdrop_path)})`}}>
                  {/* <img src={ApiConfig.originalImage(item.backdrop_path)} alt="" className="img__slide img-fluid" /> */}
            </div>
        </div>
     </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
    
    </div>
)
}
const HeroSliderItem= props=>{
   
    const item =props.item
    const background= ApiConfig.originalImage(item.backdrop_path ?item.backdrop_path :item.poster_path )
     return (
        <div
        className={`hero-slide__item ${props.className}`}
        style={{backgroundImage:`url(${background})`}}
        >
            {item.title}
        </div>
     )
}

export default HeroSlide;


