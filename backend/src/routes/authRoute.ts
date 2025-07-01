import express from "express";
import passport from "passport";
import { register } from "../controllers/authController.js";
import { createJSONToken } from "../utils/auth.js";
import { UserDocument } from "../models/user.model.js";

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: Error | null, user: UserDocument, info?: any) => {
      if (err || !user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const idStr = user._id.toString();
      const token = createJSONToken(idStr, user.email);

      res.cookie("token", token, {
        httpOnly: true, // Cannot be accessed via JS
        //secure: true,         // HTTPS only
        sameSite: "strict", // Prevent CSRF
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      return res.status(201).json({ message: "User logged in" });
    }
  )(req, res, next); //bc passport.authenticate returns middleware which we run with
});

router.post("/signup", register);

router.get("/google/movies", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      session: false,
    },
    (err: Error | null, user: UserDocument, info?: any) => {
      if (err || !user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const idStr = user._id.toString();
      const token = createJSONToken(idStr, user.email);

      res.cookie("token", token, {
        httpOnly: true, // Cannot be accessed via JS
        //secure: true,         // HTTPS only
        sameSite: "strict", // Prevent CSRF
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.redirect("http://localhost:5173/");
    }
  )(req, res, next);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // or true if you're on HTTPS
  });
  res.status(200).json({ message: "Logged out" });
});

export default router;
