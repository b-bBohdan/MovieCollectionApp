import { redirect } from "react-router-dom";
import MovieForm from "../components/forms/MovieForm";

export default function AddMoviePage() {
  return <MovieForm></MovieForm>;
}

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData.get("poster"));
  const Movie = {
    Title: formData.get("title"),
    Description: formData.get("description"),
    Year: formData.get("year"),
    Rating: formData.get("rating"),
    Ratings: formData.get("ratings"),
    imdbID: formData.get("imdbID"),
    Type: formData.get("type"),
    Poster: formData.get("poster"),
  };

  const response = await fetch(`http://localhost:3000/movies/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Movie),
    credentials: "include",
  });
  if (!response.ok) {
    return redirect("/auth");
  }

  return redirect("/");
}
