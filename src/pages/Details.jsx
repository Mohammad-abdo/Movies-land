
import React, { useEffect, useState } from "react";
import ApiConfig from "../api/api";
import tmdbApi from "../api/tmdbApi";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import TopRated from "../Components/TopRated/TopRated";
import MovieGrid from "../Components/movie-grid/MovieGrid";


const Details=(props,{favorite})=>{
    const {category,id}=useParams();
    const [item,setItem]=useState({})
    const [video,setVideo]=useState({})
    const obg={
        id:'',
        title:'',
        imgUrl:""
    }
   const arr=[]
    useEffect(()=>{
        const getDetails= async (props)=>{
            const params ={}
            const response = await tmdbApi.details(category ,id ,params)
            const data = await axios
      .get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: {
          api_key: '9fd4f82abd9873f00e717892f1f9ea97',
        },
      })
            setItem(response)
            setVideo(data)
            console.log(response);
           
            window.scrollTo(0,0)
        }
        
    
        getDetails()
       

    },[category ,id])   
    console.log(video);
    console.log(item);
   arr.push(item)  
 
    // localStorage.setItem(item.id,JSON.stringify(item));
    // @ts-ignore
    // var movie = JSON.parse(localStorage.getItem(item.id));
    localStorage.setItem("array",JSON.stringify(arr.push(item) ));

    var array = JSON.parse( localStorage.getItem("array"));
    // console.log(array);
  
  
    console.log(arr.length);
 
   console.log(arr);

return (
    <>
    <div className=" container my-4">
       <div className="row">
        <div className="col-4 my-5 p-5">
        <Card className="main__card">

            <Card.Img variant="top img-fluid img__card" src={ApiConfig.originalImage(item.poster_path)} />
            
            <button className="btn  card__btn">Wtch Now</button>
            <Card.Body className="card__body">
              <Card.Title className="card__titile text-light">{item.title}</Card.Title>
              <Card.Text className="card__overview">
              {item.overview}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-8 my-5 p-5">
            <div className="my-4"><h1 className="text-danger">{item.title}</h1></div>
 <p className="text-light">{item.overview}</p>
 <div className="my3"><h4 className="text-light"> Release Date : {item.release_date}</h4></div>
 <div className="my-5">
    <img src={ApiConfig.originalImage(item.backdrop_path)}  className="img-fluid  "
    style={{width:"200px",height:"200px",borderRadius:"30px"}}
    alt="" />
 </div>
        </div>
       
       
       </div>
    
    </div>
    <div className="container">
    <iframe
          title="Movie Trailer"
          width="560"
          height="315"
          src={`https://www.youtube.com/watch?v=${item}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
    </div>
    <div className="container">
        <div className="my-3">
        <div className="section my-5 d-flex align items-center justify-content-between"><h2 className="text-light">Trending Tv</h2><a href="/movie"><button class="OutlineButton small btn rounded-pill ">View More</button></a></div>
        </div>
        <TopRated className="my-3"/>
    </div>
    <div className="container">
        <div className="my-3">
        <div className="section my-5 d-flex align items-center justify-content-between"><h2 className="text-light">Trending Tv</h2><a href="/movie"><button class="OutlineButton small btn rounded-pill ">View More</button></a></div>
        </div>
     
        <MovieGrid/>
    </div>
    </>
)
}

export default Details;