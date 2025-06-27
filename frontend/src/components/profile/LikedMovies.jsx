import Movie from "../movie/Movie";

export default function LikedMovies({ likedMovies }) {
  if (!Array.isArray(likedMovies)) {
    return <p className="text-red-500">Invalid movie data</p>; // Optional fallback
  }

  return (
    <div className="bg-stone-600 rounded-3xl p-5">
      <div className="text-base md:text-3xl text-left">
        <strong> Your liked likedMovies:</strong>
      </div>
      <div className="smallcontainer">
        {likedMovies.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} />
        ))}
      </div>
    </div>
  );
}
