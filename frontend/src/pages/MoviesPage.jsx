import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import MovieContainer from "../components/movie/Container";
import { useLoaderData, redirect } from "react-router-dom";
import { useState } from "react";
import GhostContainer from "../components/movie/GhostContainer";

export default function MoviesPage() {
  const initialMovies = useLoaderData(); // from loader
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState(initialMovies);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);

    const results = await SearchMovie(search);
    //console.log(results);

    setMovies(results);
    setIsSearching(false);
  };

  return (
    <>
      <SearchBar setSearch={setSearch} onSearchClick={handleSearch} />
      {/*<p className='text-3xl'>{search}</p>*/}
      {isSearching && <GhostContainer type="container"></GhostContainer>}
      {!isSearching &&
        (movies.length === 0 ? (
          <p className="mt-7.5 text-4xl">0 movies found your request</p>
        ) : (
          <MovieContainer movies={movies} />
        ))}

      <Link
        to="add"
        className="z-60 fixed bottom-8 right-8 bg-green-500 text-white text-3xl rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600"
      >
        +
      </Link>
    </>
  );
}

async function SearchMovie(title) {
  const url = title
    ? `http://localhost:3000/movies?search=${title}`
    : `http://localhost:3000/movies`;

  const res = await fetch(url);
  const movies = await res.json();
  return movies;
}

export async function loader() {
  return await SearchMovie(); // return the result!
}

export async function action({ request }) {
  const formData = await request.formData();

  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(`http://localhost:3000/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });

  return redirect(`http://localhost:5173/`);
}
