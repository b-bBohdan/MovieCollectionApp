import express from 'express';
import { getUsers, getUser, postUser, patchUser, getUserByName, deleteUser, toggleMovie } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = express.Router();

// POST /api/users/login
// userRouter.get('/', (req, res, next) => {
//     const name = req.query.search;
//     if (name) {
//       return getUserByName(req, res, next);  // ✅ pass next
//     }
//     return getUsers(req, res, next);         // ✅ pass next
//   });
// userRouter.get('/:id', getUser);

//userRouter.post('/post', postUser);
userRouter.patch('/:id', verifyToken, patchUser);
userRouter.patch('/:id/toggle-like', verifyToken, toggleMovie);
userRouter.delete('/:id', verifyToken, deleteUser);


export default userRouter;