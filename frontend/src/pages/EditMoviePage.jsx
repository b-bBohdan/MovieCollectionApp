import { useLoaderData } from "react-router-dom";
import { redirect } from "react-router-dom";
import MovieForm from "../components/forms/MovieForm";

export default function EditMoviePage() {
  const movie = useLoaderData();

  return (
    <>
      <MovieForm movie={movie.movie}></MovieForm>
    </>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedMovie = {
    Title: formData.get("title"),
    Description: formData.get("description"),
    Year: formData.get("year"),
    Rating: formData.get("rating"),
    Ratings: formData.get("ratings"),
    imdbID: formData.get("imdbID"),
    Type: formData.get("type"),
    Poster: formData.get("poster"),
  };
  // console.log(params.id);
  const response = await fetch(`http://localhost:3000/movies/${params.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedMovie),
    credentials: "include",
  });

  if (!response.ok) {
    return redirect(`/auth`);
  }
  return redirect(`/${params.id}`);
}
