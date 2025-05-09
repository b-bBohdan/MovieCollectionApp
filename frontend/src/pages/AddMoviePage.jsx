import { redirect } from 'react-router-dom';
import EditingMovie from '../components/EditingMovie'
import AddMovie from '../components/AddMovie';

export default function AddMoviePage(){

    return <AddMovie></AddMovie>
}

export async function action ({ request }) {

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

    await fetch(`http://localhost:1890/movies/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Movie),
    });

    return redirect(`http://localhost:5173/`);
  }