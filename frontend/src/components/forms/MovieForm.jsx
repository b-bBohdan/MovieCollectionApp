import { Form, redirect, useNavigate, Link } from "react-router-dom";

export default function MovieForm({ movie }) {
  const navigate = useNavigate();
  // console.log(movie);
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold">{movie ? "Edit" : "Add"} Movie</h2>

      <Form method={movie ? "PATCH" : "POST"} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={movie?.Title}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={movie?.Description}
            className="w-full border rounded px-4 py-2"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Release Year</label>
            <input
              type="number"
              name="year"
              defaultValue={movie?.Year}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Rating (out of 5)
            </label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              defaultValue={movie?.Rating}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Ratings</label>
          <input
            type="number"
            name="ratings"
            defaultValue={movie?.Ratings}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">ImdbID</label>
          <input
            type="text"
            name="imdbID"
            defaultValue={movie?.imdbID}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Type</label>
          <input
            type="text"
            name="type"
            defaultValue={movie?.Type}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Poster URL</label>
          <input
            type="url"
            name="poster"
            defaultValue={movie?.Poster}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="mr-2.5 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow"
          >
            Save Changes
          </button>
          <Link
            to={`/${movie ? movie.imdbID : ""}`}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
