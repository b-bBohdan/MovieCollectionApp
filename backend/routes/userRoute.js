import express from 'express';
import { getUsers, getUser, postUser, patchUser, getUserByName, deleteUser, toggleMovie } from '../controllers/userController.js';

const userRouter = express.Router();

// POST /api/users/login
userRouter.get('/', (req, res, next) => {
    const name = req.query.search;
    if (name) {
      return getUserByName(req, res, next);  // ✅ pass next
    }
    return getUsers(req, res, next);         // ✅ pass next
  });
userRouter.get('/:id', getUser);

userRouter.post('/post', postUser);
userRouter.patch('/:id', patchUser);
userRouter.patch('/:id/toggle-like', toggleMovie);
userRouter.delete('/:id', deleteUser);


export default userRouter;