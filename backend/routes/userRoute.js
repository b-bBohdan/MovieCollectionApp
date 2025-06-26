import express from "express";
import {
  getUsers,
  getUser,
  postUser,
  patchUser,
  getUserByName,
  deleteUser,
  toggleMovie,
  getLikes,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = express.Router();

// POST /api/users/login
// userRouter.get('/', (req, res, next) => {
//     const name = req.query.search;
//     if (name) {
//       return getUserByName(req, res, next);  // ✅ pass next
//     }
//     return getUsers(req, res, next);         // ✅ pass next
//   });
userRouter.get("/", verifyToken, getUser);

//userRouter.post('/post', postUser);

userRouter.patch("/toggle-like", verifyToken, toggleMovie);

userRouter.get("/likes", verifyToken, getLikes);

userRouter.patch("/:id", verifyToken, patchUser);

userRouter.delete("/:id", verifyToken, deleteUser);

export default userRouter;
