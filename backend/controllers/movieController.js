export async function getMovies(req, res, next) {
    try {
      res.status(200).json(movies); // (soon this will be MongoDB call result)
    } catch (error) {
      next(error); // tell Express to go to error middleware
    }
  }

export async function getMovie(req, res, next) {
  try {
    const movie = movies.find( elem => elem.imdbID == (req.params.id));
  
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }


    res.status(200).json(movie);
   
  
  } catch (error) {
    next(error);
  }};

  export async function patchMovie(req, res, next){
  
    try {
      const updatedMovie = req.body;
      const Id = req.params.id;
  
      const Index = movies.findIndex((movie)=>{return movie.imdbID==Id});
      movies[Index] = {...movies[Index], ...updatedMovie}; // Placeholder for future DB insert
      res.status(201).json(movies[Index]);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  export async function postMovie(req, res, next){
  
    try {
      const { title, description, year, rating, ratings, imdbID, type, poster } = req.body;
  
      if (!title || !year || !imdbID) {
        return res.status(400).json({ error: 'Missing required fields: title, year, imdbID' });
      }
  
      const movie = {
        title,
        description,
        year,
        rating,
        ratings,
        imdbID,
        type,
        poster,
      };
  
      movies.push(movie); // Placeholder for future DB insert
      res.status(201).json(movie);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

const movies = [
    {
        "Title": "Superman, Spiderman or Batman",
        "Description": "poiouijkl;poiukjliouiyhjkiuyhgjk",
        "Year": "2011",
        "Rating": "4.8",
        "Ratings": "1233",
        "imdbID": "tt2084949",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
      },
      {
        "Title": "MINECRAFT MOVIE",
        "Description": "Bohdan krasava",
        "Year": "2025",
        "Rating": "4.9",
        "Ratings": "1233",
        "imdbID": "tt2084945",
        "Type": "movie",
        "Poster": "https://www.movieposters.com/cdn/shop/files/a-minecraft-movie_nccb8hda_480x.progressive.jpg?v=1742306006"
      }
  ];