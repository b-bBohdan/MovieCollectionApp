import mongoose from "mongoose";
import { Types, Document } from "mongoose";

//ts
export interface IUser {
  _id: Types.ObjectId;
  email: string;
  username: string;
  likes: Types.ObjectId[];
  password?: string | null;
  pp_Url?: string | null;
  provider?: string | null;
}

export type UserDocument = Document & IUser;
//
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    pp_Url: String,
    provider: String,
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
export default User;
