import express from 'express';
import { getMovies, getMovie, postMovie, patchMovie } from '../controllers/movieController.js';

const movieRouter = express.Router();

// POST /api/users/login
movieRouter.get('/', getMovies);
movieRouter.get('/:id', getMovie);

movieRouter.post('/post', postMovie);
movieRouter.patch('/:id', patchMovie);


export default movieRouter;