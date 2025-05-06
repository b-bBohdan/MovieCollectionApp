import { useLoaderData } from 'react-router-dom'
import { redirect } from 'react-router-dom';
import EditingMovie from '../components/EditingMovie'

export default function EditMoviePage(){
    const movie = useLoaderData();

    return <><EditingMovie movie={movie.movie}></EditingMovie></>
}

export async function action ({ request, params }) {

    const formData = await request.formData();
    const updatedMovie = {
      Title: formData.get("title"),
      Description: formData.get("description"),
      Year: formData.get("year"),
      Rating: formData.get("rating"),
    };

    await fetch(`http://localhost:1890/movies/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    });

    return redirect(`http://localhost:5173/${params.id}`);
  }