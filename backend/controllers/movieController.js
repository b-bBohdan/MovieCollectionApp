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

  export async function getMovieByName(req, res, next) {
    const name = req.query.search?.trim().toLowerCase(); // handle undefined trim and lowercase
  
    try {
      if (!name) {
        return res.status(400).json({ error: 'Search query is required' });
      }
  
      // case-insensitive partial match
       const matchingMovies = movies.filter(movie =>
        movie.Title.toLowerCase().includes(name) );
      
   
   
  
      if (matchingMovies.length === 0) {
          return res.status(200).json([]);
      }
      setTimeout(()=>{
         res.status(200).json(matchingMovies);
      }, 500)
     
    } catch (error) {
      next(error);
    }
  }
  

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
      const Movie = req.body;
  
      if (!Movie.Title || !Movie.Year || !Movie.imdbID) {
        return res.status(400).json({ error: 'Missing required fields: title, year, imdbID' });
      }
  
      movies.push(Movie); // Placeholder for future DB insert
      res.status(201).json(Movie);
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
      },
      {
    "Title": "Nightfall City",
    "Description": "A vigilante rises from the shadows to defend a lawless metropolis.",
    "Year": "2020",
    "Rating": "4.5",
    "Ratings": "874",
    "imdbID": "tt0011223",
    "Type": "movie",
    "Poster": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Slipknot_%40_Claremont_Showgrounds.jpg/399px-Slipknot_%40_Claremont_Showgrounds.jpg"
  },
  {
    "Title": "Solar Drift",
    "Description": "A pilot must navigate his crew through a deadly space anomaly.",
    "Year": "2022",
    "Rating": "4.7",
    "Ratings": "2061",
    "imdbID": "tt0044880",
    "Type": "movie",
    "Poster": "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg"
  },
  {
    "Title": "The Lost Signal",
    "Description": "After receiving a strange radio signal, a group of scientists uncover an alien message.",
    "Year": "2018",
    "Rating": "4.2",
    "Ratings": "1349",
    "imdbID": "tt0033889",
    "Type": "movie",
    "Poster": "https://palimpsestpress.ca/wp-content/uploads/2025/04/Lost-Signal_low-res.jpg"
  },
 
  ];