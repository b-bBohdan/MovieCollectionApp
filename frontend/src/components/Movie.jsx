import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import "./Movie.css";

export default function Movie({ movie, ...props }) {
  const { user } = useUser();
  const userId = user?._id;

  const [liked, setLiked] = useState(movie.likedByUsers.in);

  useEffect(() => {
    if (movie && userId) {
      const isLiked = movie.likedByUsers.some((id) => id.toString() === userId);
      setLiked(isLiked);
    }
  }, [movie, userId]);

  const toggleLike = (e) => {
    e.stopPropagation(); // Prevent click from triggering the link
    setLiked(!liked); // Toggle the liked state
  };
  return (
    <div className="relative">
      <Link to={"/" + movie.imdbID}>
        <div className="movie rounded-xl">
          <div className="Year">
            <p>{movie.Year}</p>
            <span>{movie.Type}</span>
          </div>

          <div>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/400"
              }
              alt={movie.Title}
            />
          </div>

          <div>
            <h3>{movie.Title}</h3>

            <Star className="text-yellow-400" />
            <h5 className="absolute bottom-6 right-35">{movie.Rating}</h5>
          </div>
        </div>
      </Link>

      <Heart
        className={`likeMovie absolute bottom-6 right-15 z-50 cursor-pointer ${
          liked ? "text-red-500" : "text-white"
        }`}
        //onClick={toggleLike}
      />
    </div>
  );
}
