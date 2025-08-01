import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { DeleteIcon, Link as LinkIcon, Star, ThumbsUp } from "lucide-react"; // Nice icons

export default function MovieDetail({ movie }) {
  const [likes, setLikes] = useState(movie.likedByUsers.length);
  const navigate = useNavigate();

  const handleLikeToggle = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/toggle-like", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: movie._id }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        // setLiked(data.isLiked);
        setLikes((prev) => (data.isLiked ? prev + 1 : prev - 1));
      } else {
        const data = await response.json();
        console.error("Failed to toggle like", data);
        navigate("/auth");
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  console.log(movie);
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are You sure of deleting ${movie.Title}?`
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/movies/${movie.imdbID}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        alert("You need to authorize first");
        navigate("/auth");
        return;
      }
      alert("deleted");
      navigate("/");
    } catch (err) {
      alert("Something went wrong during deletion.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <img
            src={movie.Poster}
            alt="Movie Poster"
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Movie Description */}
        <div className="flex-1 space-y-4 max-w-prose">
          <h1 className="text-4xl font-bold">{movie.Title}</h1>
          <p className="text-gray-600 break-words whitespace-pre-wrap">
            {movie.Description}
          </p>
          <p className="text-gray-500">
            <strong>Genre:</strong> Adventure, Sci-Fi
            <br />
            <strong>Release Year:</strong> {movie.Year}
          </p>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t ">
        {/* Ratings */}
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" />
          <span className="text-lg font-semibold">{movie.Rating}/ 5</span>
          <span className="text-gray-500">({movie.Ratings})</span>
        </div>

        {/* Like Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow"
          >
            <ThumbsUp />
            Like {likes}
          </button>
          <Link
            to="edit"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
          >
            <DeleteIcon />
          </button>
        </div>

        {/* Comments Placeholder */}
        <div className="text-gray-600">
          <p>
            <strong>Comments:</strong>
          </p>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
