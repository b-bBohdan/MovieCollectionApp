import bcrypt from "bcrypt";
import User from '../models/user.model.js';
import { createJSONToken } from "../utils/auth.js"

const saltRounds = 10;

export async function register( req, res){
    const email = req.body.email;
    const password = req.body.password;

    try{
        const existUser = User.findOne({email: email})

        if(existUser){
            return res.status(409).json({message: "User alreadyexists"});

        } 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        })

          const token = createJSONToken(user._id, user.email);
          
         res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, email: newUser.email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
}

