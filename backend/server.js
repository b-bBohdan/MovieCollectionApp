import cors from 'cors';  
import express from 'express'
import movieRouter from "./routes/movieRoute.js";
import bodyParser from 'body-parser';
import env from 'dotenv';

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/movies', movieRouter)

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)});