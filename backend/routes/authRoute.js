import express from "express";
import passport from "passport";
import { register } from "../controllers/authController.js";
import {createJSONToken} from "../utils/auth.js"



const router = express.Router();


router.post(
  "/login",
  (res, req, next) => {
    passport.authenticate('local', {session: false}, (err, user, info)=>{
        if (err || !user) {
            return res.status(401).json({ message: "Invalid credentials" });
          }
        
           const token = createJSONToken(user._id, user.email);

        return res.json({ token, user: { id: user._id, email: user.email } });

    })(req, res, next); //bc passport.authenticate returns middleware which we run with
  } 
);

router.post("/signup", register);

router.get(
  "/auth/google/movies",
  passport.authenticate("google", {
    session:false}, (req, res)=>{

        const token = createJSONToken(req.user._id, req.user.email);

        res.json({
        token,
        user: { id: req.user._id, email: req.user.email },
    });

    })
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

export default router;