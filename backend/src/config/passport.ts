import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
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

        const storedPassword = user.password;

        if (!storedPassword) {
          return cb(null, false, { message: "Incorrect password" });
        }

        const match = await bcrypt.compare(password, storedPassword);

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

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Missing environment variable GOOGLE_CLIENT_ID");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing environment variable GOOGLE_CLIENT_SECRET");
}

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/auth/google/movies",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile: Profile, cb: VerifyCallback) => {
      try {
        console.log(profile);

        if (!profile.emails) {
          return cb(null, false);
        }

        const result = await User.findOne({ email: profile.emails[0].value });

        if (!result) {
          const newUser = await User.create({
            username: profile.displayName || "NewUser",
            email: profile.emails[0].value,
            password: null,
            provider: "google",
            likes: [],
            pp_Url: profile._json.picture || null,
          });

          console.log(newUser);
          return cb(null, newUser);
        } else {
          console.log(result);
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
