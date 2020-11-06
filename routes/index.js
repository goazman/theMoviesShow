var express = require('express');
var router = express.Router();
var request = require('sync-request');
var movieModel = require('../models/movies');
const apiKey = require ("../api/env");


/* GET Movies from API */
router.get('/new-movies', function(req, res) {

  var data = request("GET", `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&region=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);

  var dataJSON = JSON.parse(data.body);
  
  // console.log(dataJSON.results);

res.json({result: true, movies:dataJSON.results})
});

/* POST rec movie to Bdd */
router.post('/wishlist-movie', async function(req, res, next) {

  var newMovie = new movieModel ({
    movieTitle: req.body.name,
    movieImg: req.body.img,
   });
   
  var movieSaved = await newMovie.save();
  var resultWish = false
  if(movieSaved.movieTitle){
    resultWish = true
  }

  res.json({resultWish})
});

/* DELETE movie from Bdd */
router.delete('/wishlist-movie/:name', async function(req, res, next) {

  var returnDb = await movieModel.deleteOne({ movieTitle: req.params.name})

  var result = false
  if(returnDb.deletedCount == 1){
    result = true
  }

  res.json({result})
});

/* GET Find all movies from Bdd */
router.get('/wishlist-movie', async function(req, res, next) {

  var allMovies = await movieModel.find()

  res.json({allMovies})
});


module.exports = router;
