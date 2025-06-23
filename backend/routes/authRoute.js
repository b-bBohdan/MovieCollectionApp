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
  "/google/movies", (req, res, next)=>{
  passport.authenticate("google", {
    session:false}, (err, user, info)=>{

       if (err || !user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

        const token = createJSONToken(user._id, user.email);

       res.cookie("token", token, {
        httpOnly: true,       // Cannot be accessed via JS
        //secure: true,         // HTTPS only
        sameSite: "Strict",   // Prevent CSRF
        maxAge: 60 * 60 * 1000 // 1 hour
        });

      res.redirect("http://localhost:5173/");

    })(req, res, next);}
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

export default router;