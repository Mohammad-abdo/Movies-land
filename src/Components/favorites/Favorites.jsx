import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import ApiConfig from '../../api/api';
import tmdbApi from '../../api/tmdbApi';
import { removeFavorite,addFavorite } from '../../store/slice/favorites';
const Favorites = () => {
  // @ts-ignore
  const favorites = useSelector((state) => state.favorites);


  const dispatch = useDispatch();
console.log(favorites);
const handleAddFavorite = (movie) => {
  dispatch(addFavorite(movie));
  
  console.log(dispatch);
 
};
  const handleRemoveFavorite = (movieId) => {
      dispatch(removeFavorite(movieId))
      console.log( dispatch(removeFavorite(movieId)));
  }

  return (
  <div className="container " style={{marginTop:"150px"}}>
      <div className="row">
        <h1 className="text-light my-4 border shadow px-3 py-2 w-50">
            My Favorites Movies :
        </h1>
    <Row xs={1} md={5} className="g-4 mb-5">
    {favorites.map((item, index) => (
        <Col key={item.id}>
          
        <Card className="main__card">
       <Card.Img variant="top img-fluid img__card" src={ApiConfig.originalImage(item.poster_path)} />
       <div className="m-2 icon___card">
       <GoHeart onClick={()=>handleRemoveFavorite(item.id)} style={{ fontSize: "33px", color: !item ?'red':'white' }}/>
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
    )}
  </Row>
    </div>
  </div>
  );
};

export default Favorites;