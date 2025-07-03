import { useLoaderData } from "react-router-dom";
import MovieDetail from "../components/movie/MovieDetails";

export default function SingleMoviePage() {
  const movie = useLoaderData();
  return (
    <>
      <h1>Movie details</h1>
      <MovieDetail movie={movie.movie} />
    </>
  );
}

export async function loader({ request, params }) {
  const Id = params.id;

  //defer
  return {
    movie: await loadEvent(Id), /// so the navigation will load only when event loaded
  };
}

async function loadEvent(Id) {
  // console.log(Id);
  const response = await fetch(`http://localhost:3000/movies/${Id}`);

  if (!response.ok) {
    // throw json({message: "Couldnt fetch the data"}, {status:500})
    throw new Response(
      JSON.stringify({ message: " coulddddddddnot fetch data " }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
