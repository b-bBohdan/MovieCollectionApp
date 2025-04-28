export async function getMovies(req, res, next) {
    try {
      res.status(200).json(movies); // (soon this will be MongoDB call result)
    } catch (error) {
      next(error); // tell Express to go to error middleware
    }
  }

  export async function postMovie(req, res, next){
    
    try{const movie = {
        "Title": "Added Movie",
        "Year": "2011",
        "Rating": "4.89",
        "Ratings": "1233",
        "imdbID": "tt2084949",
        "Type": "req.body.type",
        "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg",
    }
    movies.push(movie);
    res.status(200).json(movie);
    }
    catch(error){
      next(error)
    }
  }


const movies = [
    {
        "Title": "Superman, Spiderman or Batman",
        "Year": "2011",
        "Rating": "4.89",
        "Ratings": "1233",
        "imdbID": "tt2084949",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
      },
      {
        "Title": "Superman, Spiderman or Batman",
        "Year": "2011",
        "Rating": "4.89",
        "Ratings": "1233",
        "imdbID": "tt2084949",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
      }
  ];