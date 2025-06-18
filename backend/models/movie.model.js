import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: String,
  Year: Number,
  Rating: Number,
  Ratings: Number,
  imdbID: { type: String, required: true, unique: true },
  Type: String,
  Poster: String,
}, {collection: 'movies'});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;