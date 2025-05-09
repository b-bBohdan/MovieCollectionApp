import SearchBar from '../components/SearchBar'
import MovieContainer from '../components/Container'
import { useLoaderData } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function MoviesPage() {
  const initialMovies = useLoaderData(); // from loader
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState(initialMovies);

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await SearchMovie(search);
      console.log(results);
      setMovies(results);
    };
    fetchMovies();
  }, [search]); // runs every time search changes

  return (
    <>
      <SearchBar setSearch={setSearch} />
      <p className='text-3xl'>{search}</p>
      <MovieContainer movies={movies} />
    </>
  );
}

async function SearchMovie(title) {
  const url = title 
    ? `http://localhost:1890/movies?search=${title}`
    : `http://localhost:1890/movies`;
  
  const res = await fetch(url);
  const movies = await res.json();
  return movies;
}

export async function loader() {
  return await SearchMovie(); // return the result!
}