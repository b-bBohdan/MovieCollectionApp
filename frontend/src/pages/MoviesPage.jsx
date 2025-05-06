import SearchBar from '../components/SearchBar'
import MovieContainer from '../components/Container'
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

export async function loader() {
  const res = await fetch('http://localhost:1890/movies');
  const movies = await res.json();
  return movies;
}

export default function MoviesPage(){
    const [search, setSearch] = useState('');

    const movies = useLoaderData();
    return <>   
        <SearchBar setSearch={setSearch}/>
        <p className='text-3xl'>WHrwrwrwr {search}</p>
        <MovieContainer movies={movies}/>           
       
    </>
}