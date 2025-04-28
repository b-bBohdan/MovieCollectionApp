import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as LinkIcon, Star, ThumbsUp } from "lucide-react"; // Nice icons

export default function MovieDetail() {
  const [likes, setLikes] = useState(0);

  const handleLike = () => setLikes(likes + 1);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <img
            src="https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
            alt="Movie Poster"
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Movie Description */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">Movie Title</h1>
          <p className="text-gray-600">
            This is a short description of the movie. It talks about the story,
            the characters, and the world they live in. An engaging, spoiler-free summary.
          </p>
          <p className="text-gray-500">
            <strong>Genre:</strong> Adventure, Sci-Fi<br />
            <strong>Release Year:</strong> 2025
          </p>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t ">
        {/* Ratings */}
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" />
          <span className="text-lg font-semibold">4.5 / 5</span>
          <span className="text-gray-500">(1200 ratings)</span>
        </div>

        {/* Like Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow"
          >
            <ThumbsUp />
            Like {likes}
          </button>
          <Link to='edit'  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow">    
              Edit
          </Link>
        </div>

        {/* Comments Placeholder */}
        <div className="text-gray-600">
          <p><strong>Comments:</strong></p>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
