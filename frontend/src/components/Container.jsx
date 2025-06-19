import { Link } from 'react-router-dom'
import './Container.css'
import Movie from './Movie'

const movie1 = {
  "Title": "Superman, Spiderman or Batman",
  "Year": "2011",
  "Rating": "4.89",
  "Ratings": "1233",
  "imdbID": "tt2084949",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
}

export default function MovieContainer({ movies }) {
  if (!Array.isArray(movies)) {
    return <p className="text-red-500">Invalid movie data</p>; // Optional fallback
  }

  return (
    <>
      <div className="container">
        { movies.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} />
        ))}
      </div>
      
    </>
  );
}
