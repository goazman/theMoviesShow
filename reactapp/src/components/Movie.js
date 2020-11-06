import React, { useState } from 'react';
import '../App.css';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Col, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faVideo} from '@fortawesome/free-solid-svg-icons';


function Movie (props) {

    const [watchMovie, setWatchMovie] = useState(false);
    const [countWatchMovie, setCountWatchMovie] = useState(0);
    const [myRatingMovie, setMyRatingMovie] = useState(0);
    const [isRatingMovie, setIsRatingMovie] = useState(false);

    const [rating, setRating] = useState(props.globalRating);
    const [countRating, setCountRating] = useState(props.globalCountRating);
  
    // Movies count views
    var watchClick = ()=> {
        setWatchMovie(true);
        setCountWatchMovie(countWatchMovie+1);
      }

    // Mise a jour compteur films header
    var handleClickHeart = (name, img) => {
        if(props.movieLiked === true){
            props.handleClickDeleteMovieParent(name)
          } else {
            props.handleClickAddMovieParent(name,img)
          }
    }

    // Heart icon to red
    if(props.movieLiked){
        var colorLike = {color: '#e74c3c',cursor:'pointer',marginLeft:"5px"}
      } else {
        colorLike = {cursor:'pointer',marginLeft:"5px"}
      }

    var colorWatch;
    if (watchMovie) {
        colorWatch = {cursor:'pointer', marginLeft:"5px", color:"#C1272D"};
    } else {
        colorWatch = {cursor:'pointer', marginLeft:"5px"};
    }

    // Stars rate
    var setMyRating = (rating) => {
        if(rating < 0){
          rating = 0
        }
        if(rating > 10){
          rating = 10
        }
        setMyRatingMovie(rating)
        setIsRatingMovie(true)
      }

    var tabRating = [];
    for(var i=0;i<10;i++){
        var color = {}
        if(i<myRatingMovie){
            color = {color: '#f1c40f'}
        }
        let count = i+1
        tabRating.push(<FontAwesomeIcon onClick={() => setMyRating(count)} style={color} icon={faStar} />)
    }

    // Prise en compte de la note dans la moyenne
    var nbTotalNote = rating * countRating
    var nbTotalVote = countRating
  
    if(isRatingMovie){
      nbTotalVote +=1
      nbTotalNote += myRatingMovie
    };
    var moyenneTotal = Math.round(nbTotalNote / nbTotalVote)

    var tabGlobalRating = []
    for(i = 0;i < 10;i++){
        color = {}
        if(i<moyenneTotal){
            color = {color: '#f1c40f'}
        }
        tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} /> )
    }


    return (
        <Col xs="12" lg="6" xl="4">
            <Card style={{marginBottom:"30px", borderRadius:"15px"}}>
                <CardImg top width="100%" style={{borderRadius:"15px 15px 0px 0px"}} src={props.movieImg} alt={props.movieName}/>
                <CardBody>
                    <p>Like 
                        <FontAwesomeIcon style={colorLike} icon={faHeart} onClick={()=>handleClickHeart(props.movieName,props.movieImg)}/>
                    </p>
                    <p>Nombre de vues
                        <FontAwesomeIcon style={colorWatch} icon={faVideo} onClick={() => watchClick()}/>
                        <Badge href="#" color="secondary" style={{marginLeft:"10px"}}>{countWatchMovie}</Badge>
                    </p>
                    <p>Mon avis 
                        {tabRating}
                        <Badge href="#" color="secondary" style={{marginLeft:"5px"}} onClick={ ()=>setMyRating(myRatingMovie-1) }>-</Badge>
                        <Badge href="#" color="secondary" style={{marginLeft:"5px"}} onClick={ ()=>setMyRating(myRatingMovie+1) }>+</Badge>
                    </p>
                    <p>Moyenne 
                        {tabGlobalRating}
                        ({nbTotalVote})
                    </p>
                    <CardTitle tag="h5" style={{color:"#2F318F"}}>
                        {props.movieName}
                    </CardTitle>
                    <CardSubtitle tag="h6" style={{textDecoration:"underline", marginBottom:"5px"}}>Synopsis :</CardSubtitle>
                    <CardText>{props.movieDesc}.</CardText>
                </CardBody>
            </Card>
        </Col> 
    );
}

export default Movie;