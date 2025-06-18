import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'
import MovieContainer from '../components/Container'
import { useLoaderData } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function MoviesPage() {
  const initialMovies = useLoaderData(); // from loader
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState(initialMovies);


  const handleSearch = async () => {
    const results = await SearchMovie(search);
    console.log(results);
    setMovies(results);
  };

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const results = await SearchMovie(search);
  //     console.log(results);
  //     setMovies(results);
  //   };
  //   fetchMovies();
  // }, [search]); // runs every time search changes

  return (
    <>
      <SearchBar setSearch={setSearch} onSearchClick={handleSearch} />
      {/*<p className='text-3xl'>{search}</p>*/}
      {movies.length===0
              ?<p className='mt-7.5 text-4xl'>0 movies found your request</p>
      
              :<MovieContainer movies={movies} />}
      <Link
        to="add"
        className="fixed bottom-8 right-8 bg-green-500 text-white text-3xl rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600"
      >
        +
      </Link>
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