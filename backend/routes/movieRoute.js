import express from 'express';
import { getMovies, getMovie, postMovie, patchMovie, getMovieByName } from '../controllers/movieController.js';

const movieRouter = express.Router();

// POST /api/users/login
movieRouter.get('/', (req, res, next) => {
    const name = req.query.search;
    if (name) {
      return getMovieByName(req, res, next);  // ✅ pass next
    }
    return getMovies(req, res, next);         // ✅ pass next
  });
movieRouter.get('/:id', getMovie);

movieRouter.post('/post', postMovie);
movieRouter.patch('/:id', patchMovie);


export default movieRouter;