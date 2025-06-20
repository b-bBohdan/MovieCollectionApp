import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import bcrypt from "bcrypt";

import User from "../models/user.model.js";

import dotenv from "dotenv";
dotenv.config();

passport.use(
   "local",
  new LocalStrategy(
    { usernameField: "email" }, // allow `email` instead of default `username`
    async function verify(email, password, cb) {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return cb(null, false, { message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "Incorrect password" });
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/movies",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await User.findOne({email: profile.email}) ;

        if (!result) {
          const newUser = await User.create({
            username: profile.displayName ,
            email:  profile.emails[0].value,
            password: null,
            provider: "google",
            likes: [],
            profilepicture: profile.photos[0].value});

          return cb(null, newUser);
        } else {
          return cb(null, result);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// passport.serializeUser((user, cb) => {
//   cb(null, user._id);
// });

// passport.deserializeUser((id, cb)=>{
//     try{
//         const user = User.findById(id);
//         cb(null, user);
//     } catch (err){
//         cb(err);
//     }
// })

// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// });