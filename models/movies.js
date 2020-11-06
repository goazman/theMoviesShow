
var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
   movieTitle : String,
   moviesSynop: String,
   movieImg: String,
   movieVote: Number,
   movieNote: Number
  });

var movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel;

