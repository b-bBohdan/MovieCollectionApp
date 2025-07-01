import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import movieRouter from "./routes/movieRoute";
import userRouter from "./routes/userRoute";
import authRouter from "./routes/authRoute";

//import bodyParser from 'body-parser';
import env from "dotenv";
import connectDB from "./config/db";
import "./config/passport";

import { notFound, errorHandler } from "./middlewares/errorMiddleware";

env.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

//app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/movies", movieRouter);
app.use("/users", userRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
