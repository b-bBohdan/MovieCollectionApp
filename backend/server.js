import cors from 'cors';  
import express from 'express'

import movieRouter from "./routes/movieRoute.js";
import userRouter from './routes/userRoute.js';

import bodyParser from 'body-parser';
import env from 'dotenv';
import connectDB from './config/db.js'; 

import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use('/movies', movieRouter);
app.use('/users', userRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)});