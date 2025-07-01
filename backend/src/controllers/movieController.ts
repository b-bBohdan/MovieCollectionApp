import Movie from "../models/movie.model.js";
import { Request, Response, NextFunction } from "express";

export async function getMovies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies); // (soon this will be MongoDB call result)
  } catch (error) {
    next(error); // tell Express to go to error middleware
  }
}

export async function getMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movie = await Movie.findOne({ imdbID: req.params.id });

    if (!movie) {
      res.status(404).json({ error: "Movie not found" });
      return;
    }

    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}

export async function getMovieByName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const raw_name: string | undefined = req.query.search?.toString(); // handle undefined trim and lowercase
    const name = raw_name ? raw_name.trim().toLowerCase() : null;

    if (!name) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // case-insensitive partial match
    const matchingMovies = await Movie.find({
      Title: { $regex: name, $options: "i" }, // case-insensitive partial match
    });

    if (matchingMovies.length === 0) {
      return res.status(200).json([]);
    }
    setTimeout(() => {
      res.status(200).json(matchingMovies);
    }, 500);
  } catch (error) {
    next(error);
  }
}

export async function patchMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const Id = req.params.id;

    const updatedMovie = await Movie.findOneAndUpdate(
      { imdbID: Id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedMovie) {
      res.status(404).json({ error: "Movie not found" });
      return;
    }

    res.status(200).json(updatedMovie);
    return;
  } catch (error) {
    next(error);
  }
}

export async function postMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movie = await Movie.create(req.body);
    //console.log(movie);
    res.status(201).json(movie);
    return;
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function deleteMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const Id = req.params.id;
    const deletedMovie = await Movie.findOneAndDelete({ imdbID: Id });

    if (!deletedMovie) {
      res.status(404).json({ error: "Movie not found" });
      return;
    }

    res.status(204).end(); // ✅ Correct way to send 204 with no body
  } catch (error) {
    next(error);
  }
}

const moviesArr = [
  {
    Title: "Superman, Spiderman or Batman",
    Description: "poiouijkl;poiukjliouiyhjkiuyhgjk",
    Year: "2011",
    Rating: "4.8",
    Ratings: "1233",
    imdbID: "tt2084949",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg",
  },
  {
    Title: "MINECRAFT MOVIE",
    Description: "Bohdan krasava",
    Year: "2025",
    Rating: "4.9",
    Ratings: "1233",
    imdbID: "tt2084945",
    Type: "movie",
    Poster:
      "https://www.movieposters.com/cdn/shop/files/a-minecraft-movie_nccb8hda_480x.progressive.jpg?v=1742306006",
  },
  {
    Title: "Nightfall City",
    Description:
      "A vigilante rises from the shadows to defend a lawless metropolis.",
    Year: "2020",
    Rating: "4.5",
    Ratings: "874",
    imdbID: "tt0011223",
    Type: "movie",
    Poster:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Slipknot_%40_Claremont_Showgrounds.jpg/399px-Slipknot_%40_Claremont_Showgrounds.jpg",
  },
  {
    Title: "Solar Drift",
    Description:
      "A pilot must navigate his crew through a deadly space anomaly.",
    Year: "2022",
    Rating: "4.7",
    Ratings: "2061",
    imdbID: "tt0044880",
    Type: "movie",
    Poster:
      "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg",
  },
  {
    Title: "The Lost Signal",
    Description:
      "After receiving a strange radio signal, a group of scientists uncover an alien message.",
    Year: "2018",
    Rating: "4.2",
    Ratings: "1349",
    imdbID: "tt0033889",
    Type: "movie",
    Poster:
      "https://palimpsestpress.ca/wp-content/uploads/2025/04/Lost-Signal_low-res.jpg",
  },
];
