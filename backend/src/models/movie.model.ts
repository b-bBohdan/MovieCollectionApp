import mongoose from "mongoose";
import { Types, Document } from "mongoose";

//ts
export interface IMovie {
  _id: Types.ObjectId;
  Title: { type: String; required: true };
  Description: String;
  Year: Number;
  Rating: Number;
  Ratings: Number;
  imdbID: { type: String; required: true; unique: true };
  Type: String;
  Poster: String;
  likedByUsers: [{ type: mongoose.Schema.Types.ObjectId; ref: "User" }];
}

export type MovieDocument = Document & IMovie;

const movieSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Description: String,
    Year: Number,
    Rating: Number,
    Ratings: Number,
    imdbID: { type: String, required: true, unique: true },
    Type: String,
    Poster: String,
    likedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { collection: "movies" }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
