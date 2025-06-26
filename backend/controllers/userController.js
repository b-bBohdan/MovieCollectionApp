import User from "../models/user.model.js";
import Movie from "../models/movie.model.js";

export async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json(Users); // (soon this will be MongoDB call result)
  } catch (error) {
    next(error); // tell Express to go to error middleware
  }
}

export async function getUser(req, res, next) {
  try {
    const tokenUserId = req.user.userId;
    const user = await User.findOne({ _id: tokenUserId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getLikes(req, res, next) {
  try {
    const tokenUserId = req.user.userId;

    const user = await User.findById(tokenUserId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const movieIds = user.likes.map((id) => id.toString());

    const existingMovies = await Movie.find({ _id: { $in: movieIds } }, "_id");
    const existingMovieIds = new Set(
      existingMovies.map((m) => m._id.toString())
    );

    const likedClean = user.likes.filter((id) =>
      existingMovieIds.has(id.toString())
    );

    // Update user only if needed
    if (likedClean.length !== user.likes.length) {
      await User.findByIdAndUpdate(
        tokenUserId,
        { likes: likedClean },
        { new: true }
      );
    }

    // Return populated likes
    const updatedUser = await User.findById(tokenUserId).populate("likes");

    res.status(200).json(updatedUser.likes);
  } catch (error) {
    next(error);
  }
}

export async function getUserByName(req, res, next) {
  const name = req.query.search?.trim().toLowerCase(); // handle undefined trim and lowercase

  try {
    if (!name) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // case-insensitive partial match
    const matchingUsers = await User.find({
      Title: { $regex: name, $options: "i" }, // case-insensitive partial match
    });

    if (matchingUsers.length === 0) {
      return res.status(200).json([]);
    }
    setTimeout(() => {
      res.status(200).json(matchingUsers);
    }, 500);
  } catch (error) {
    next(error);
  }
}

export async function patchUser(req, res, next) {
  try {
    const Id = req.params.id;

    const updatedUser = await User.findOneAndUpdate(
      { _id: Id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export async function postUser(req, res, next) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const Id = req.params.id;
    const deletedUser = await User.findOneAndDelete({ _id: Id });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204).end(); // ✅ Correct way to send 204 with no body
  } catch (error) {
    next(error);
  }
}

export async function toggleMovie(req, res, next) {
  try {
    const userId = req.user.userId;

    const movieId = req.body.movieId;
    console.log(movieId, " <-IDs->", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const hasLiked = user.likes.includes(movieId);

    // Update user likes
    const updatedUserLikes = hasLiked
      ? user.likes.filter((id) => id.toString() !== movieId)
      : [...user.likes, movieId];

    // Update movie likedByUsers
    const updatedMovieLikes = hasLiked
      ? movie.likedByUsers.filter((id) => id.toString() !== userId)
      : [...movie.likedByUsers, userId];

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { likes: updatedUserLikes },
      { new: true }
    );

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { likedByUsers: updatedMovieLikes },
      { new: true }
    );

    res
      .status(200)
      .json({ user: updatedUser, movie: updatedMovie, isLiked: !hasLiked });
  } catch (error) {
    next(error);
  }
}
