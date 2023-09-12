import React from "react";
import HeroSlide from "../Components/Hero_slide/HeroSlide";
import { Link } from 'react-router-dom';
import { OutlineButton } from "../Components/Button/Button";
import Movielist from "../Components/MovieList/Movielist";
import MovieCarousel from "../Components/MovieCarousel/MovieCarousel";
import TopRated from "../Components/TopRated/TopRated";
const Home=()=>{
return (
    <>
    <div>
       <HeroSlide/>
        <div className="container">
            <div className="section my-5 d-flex align items-center justify-content-between">
                <h2 className="text-light">Trending Tv</h2>
                <Link to={ "/movie" } >
                    <OutlineButton className="small btn rounded-pill " style={{ borderWidth: '2px', padding: '.25rem 1.5rem',fontSize: '1rem'}}>
                        View More
                    </OutlineButton>
                
                   
                    </Link>
                 
                    
            </div>
            <MovieCarousel/>
            {/* <Movielist/> */}
        </div>
        <div className="container">
            <div className="section my-5 d-flex align items-center justify-content-between">
                <h2 className="text-light">Top Rated Movie</h2>
                <Link to={ "/movie" } >
                    <OutlineButton className="small btn rounded-pill " style={{ borderWidth: '2px', padding: '.25rem 1.5rem',fontSize: '1rem'}}>
                        View More
                    </OutlineButton>
                
                   
                    </Link>
                 
                    
            </div>
            <TopRated/>
            {/* <Movielist/> */}
        </div>
        <div className="container">
            <div className="section my-5 d-flex align items-center justify-content-between">
                <h2 className="text-light">Popular Movies</h2>
                <Link to={ "/movie" } >
                    <OutlineButton className="small btn rounded-pill " style={{ borderWidth: '2px', padding: '.25rem 1.5rem',fontSize: '1rem'}}>
                        View More
                    </OutlineButton>
                
                   
                    </Link>
                 
                    
            </div>
           
            <Movielist/>
        </div>

    </div>
    </>
)
}

export default Home