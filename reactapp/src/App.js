import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Button, Nav, NavItem, NavLink, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import Movie  from "./components/Movie";

function App() {

  const [movieCount, setMovieCount] = useState(0);
  const [movieLiked, setMovieLiked] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(async () => {
    const response = await fetch('/new-movies');
    const jsonResponse = await response.json();
    // console.log(jsonResponse.movies);
    setMovieList(jsonResponse.movies);
    
    const responseWish = await fetch('wishlist-movie');
    const jsonResponseWish = await responseWish.json();
    console.log(jsonResponseWish);
    
    const wishlistFromDB = jsonResponseWish.allMovies.map((movie,i) => {
        return {name:movie.movieTitle, img:movie.movieImg}
      })
      
      setMovieLiked(wishlistFromDB);
      setMovieCount(jsonResponseWish.allMovies.length);
      
  }, []);


  var handleClickAddMovie = async (name,img) => {
    setMovieCount(movieCount+1);
    setMovieLiked([...movieLiked, {name:name, img:img}]);
    
    const response = await fetch('/wishlist-movie', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${name}&img=${img}`
    })
    // console.log(name,img);
  }

  var handleClickDeleteMovie = async (name) => {
    // console.log(name)
    setMovieCount(movieCount-1);
    setMovieLiked(movieLiked.filter(e => e.name !== name));

    const response = await fetch(`/wishlist-movie/${name}`, {
      method: 'DELETE'
    })
  }

  var movieWhishList = movieLiked.map((whishlist,i) => {
    return (
      <ListGroupItem key={i}>
        <ListGroupItemText onClick={() => {handleClickDeleteMovie(whishlist.name)}}>
          <img width="25%" alt="movieImg" src={whishlist.img}/> {whishlist.name}
        </ListGroupItemText>
      </ListGroupItem>
    )
  })


  var movieListItems = movieList.map((movie,i) => {
    var result = movieLiked.find(e => e.name === movie.title)
    var liked = false;
    if(result !== undefined){
    liked = true
    }
    result = movie.overview
    if(result.length > 80){
      result = result.slice(0,80)+'...'
    }
    var urlImage = '/generique.jpg'
    if(movie.backdrop_path != null){
      urlImage = 'https://image.tmdb.org/t/p/w500/'+movie.backdrop_path
    }
    return(<Movie key={i} movieLiked={liked} 
      handleClickDeleteMovieParent={handleClickDeleteMovie}handleClickAddMovieParent={handleClickAddMovie} movieName={movie.title} movieDesc={result} movieImg={urlImage} globalRating={movie.popularity} globalCountRating={movie.vote_count} 
    />)
})
  
  return (
    <div style={{backgroundColor:"#2F318F"}}>
      <Container>
        <Nav style={{ width:"100%", alignItems:"flex-end"}}>
          <span>
            <img src="../moviesshow.png" width="250" alt="logo"/>
          </span>
          <NavItem>
            <NavLink>
              <Button type="button" color="warning" style={{color:"#023047"}}>Les sorties</Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button type="button" id="Popover1" color="warning" >{movieCount} films</Button>
                <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                  <PopoverHeader>Mes films</PopoverHeader>
                    <PopoverBody>
                      <ListGroup>
                        {movieWhishList}
                      </ListGroup>
                    </PopoverBody>
                </Popover>
            </NavLink>
          </NavItem>
        </Nav>
        {/* Divider */}
        <Row style={{height:"1px", backgroundColor:"#FFFFFF", marginTop:"20px"}}></Row>
        {/* Liste des films */}
          <Row style={{marginTop:"30px"}}>
            {movieListItems}
          </Row>
      </Container>
    </div>
  );
}

export default App;