import cors from 'cors';  
import express from 'express'
import movieRouter from "./routes/movieRoute.js";
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/movies', movieRouter)

app.listen(8080, ()=>{
    console.log("Server started")});