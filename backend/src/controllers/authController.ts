import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { createJSONToken } from "../utils/auth.js";
import { Request, Response } from "express";

const saltRounds = 10;

export async function register(req: Request, res: Response): Promise<any> {
  const user = req.body;
  //console.log(req.body);

  try {
    const existUser = await User.findOne({ email: user.email });

    if (existUser) {
      return res.status(409).json({ message: "User alreadyexists" });
    }
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser = await User.create({
      ...user,
      password: hashedPassword,
    });

    const newUserId = newUser._id.toString();
    const token = createJSONToken(newUserId, newUser.email);

    res.cookie("token", token, {
      httpOnly: true, // Cannot be accessed via JS
      //secure: true,         // HTTPS only
      sameSite: "strict", // Prevent CSRF
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Registration failed" });
  }
}
