import express from 'express';
import { getMovies, postMovie } from '../controllers/movieController.js';

const movieRouter = express.Router();

// POST /api/users/login
movieRouter.get('/', getMovies);

movieRouter.post('/post', postMovie)

export default movieRouter;