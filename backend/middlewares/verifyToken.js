import jwt from "jsonwebtoken"

export default function verifyToken(req, res, next) {
  try {
    const token = req.cookies.token;
    console.log("token: "+token);
    if (!token){
      res.status(401).json({message: "No token provided"});
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
   res.status(401).json({ message: "Invalid or expired token" });
  }
}