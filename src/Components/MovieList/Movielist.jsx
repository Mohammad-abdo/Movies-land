import React, { useEffect, useState } from "react";

import tmdbApi,{category, movieType, tvType} from '../../api/tmdbApi';
import ApiConfig from "../../api/api";
import './MovieList.scss'
import Button,{OutlineButton} from '../Button/Button'

import Carousel from 'react-bootstrap/Carousel';
import  PropTypes  from "prop-types";
import Card from 'react-bootstrap/Card';
import MovieCard from "../movieCard/MovieCard";
import { GoHeart } from "react-icons/go";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../store/slice/favorites";



const Movielist = props =>{
    const [items,setItem]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(1);
    const [totalpage, setTotalpage] = useState(0);
    const moviesPerPage = 10;
   
    useEffect(()=>{
        const gelist= async ()=>{
          try {
            const params = {
              page: page 
          };
            const response= await tmdbApi.getMoviesList(tvType.popular,{params});
            setItem(response.results)
            setTotalpage(response.results)
      
            
          } catch (error) {
            console.log(error);
          }
         
        }
        gelist()
       
    },[])
    const movie =props.movie;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = items.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = async(pageNumber) => {
      
        setCurrentPage(pageNumber);
    };

    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);

    // add to favoriites
    const handleAddFavorite = (movie) => {
      dispatch(addFavorite(movie));
    };
 


  const pg1= pages()

    return (
      <div className="container-fluid">
    <div className="container">
      <div className="row">
      <Row xs={2} md={5} className="g-4 mb-5">
      {currentMovies.map((item, index) =>{
  
        return (
          <Col key={item.id}>
            
               <Card className="main__card">
              <Card.Img variant="top img-fluid img__card" src={ApiConfig.originalImage(item.poster_path)} />
              <div className="m-2 icon___card">
              <GoHeart
  onClick={() => handleAddFavorite(item)}
  style={{
    fontSize: "33px",
    color: favorites.find((movie) => movie.id === item.id) ? "red" : "white",
  }}
/>

              </div>
            <Link to={'/'+'movie'+'/'+item.id} >
              <Card.Body className="card__body">
                <Card.Title className="card__titile text-light">{item.title}</Card.Title>
                <Card.Text className="card__overview">
                {item.overview}
                </Card.Text>
              </Card.Body>
  
            </Link>
            </Card>
  
           
          </Col>
        )
      })}
    </Row>
      </div>
     
      <div className="row">
      <ul className="pagination d-flex align-items-center col-12 justify-content-center">
                {Array.from({ length: Math.ceil(items.length /moviesPerPage)}, (_, index) => (
              
                    <li  key={index}>
                        <button className="mx-3 px-2 rounded text-danger shadow" onClick={() => paginate(index + 1)}>
                            {index + 1}
               
                        </button>
                    </li>
                ))}
            </ul>

      </div>
    </div>
   </div>
 
   

      
    )
}

const pages = async  ()=>{


      const response= await tmdbApi.getMoviesList(tvType.popular,{page:1});
      
      return response.page
 


}
// Movielist.PropTypes={
// categroy:PropTypes.string.isRequired,
// type:PropTypes.string.isRequired
// }
export default Movielist