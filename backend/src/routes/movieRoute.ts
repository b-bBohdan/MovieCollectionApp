import express, { Response, Request, NextFunction } from "express";
import {
  getMovies,
  getMovie,
  postMovie,
  patchMovie,
  getMovieByName,
  deleteMovie,
} from "../controllers/movieController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { promises } from "dns";

const movieRouter = express.Router();

// POST /api/users/login
movieRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const name = req.query.search;
    if (name) {
      return getMovieByName(req, res, next); // ✅ pass next
    }
    return getMovies(req, res, next); // ✅ pass next
  }
);
movieRouter.get("/:id", getMovie);

movieRouter.post("/post", verifyToken, postMovie);
movieRouter.patch("/:id", patchMovie);
movieRouter.delete("/:id", verifyToken, deleteMovie);

export default movieRouter;
