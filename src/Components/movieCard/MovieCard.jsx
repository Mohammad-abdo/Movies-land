import React from "react";

import tmdbApi,{ category } from "../../api/tmdbApi";
import { Link } from "react-router-dom"

import ApiConfig from "../../api/api";

import './MovieCard.scss'
// import Button from "../Button/Button";
import { Card } from "react-bootstrap";

const MovieCard = props =>{
    const item =props.item

    const link='/'+category[props.category]+'/'+item.id
    const bg=ApiConfig.originalImage(item.poster_path|| item.backdrop_path)
    // console.log(item)
 return (
   <Link to={link}>
    {/* <div className="movie-card" style={{backgroundImage:`url(${bg})`}}>
      
   <div className="card__info">
   <Button>
            <i className="fas fa-play"></i>
        </Button>
        <h3>{item.title || item.name}</h3>
   </div>
    </div> */}
    <Card className="main__card">
     <Card.Img variant="top img-fluid img__card" src={ApiConfig.originalImage(item.poster_path)} />
     
     <button className="btn  card__btn">Wtch Now</button>
     <Card.Body className="card__body">
       <Card.Title className="card__titile text-light">{item.title}</Card.Title>
       <Card.Text className="card__overview">
       {/* {item.overview} */}
       </Card.Text>
     </Card.Body>
   </Card>
   </Link>



 )
}


export default MovieCard;