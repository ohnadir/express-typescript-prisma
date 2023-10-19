import express from "express";
import dotenv from "dotenv";
// import { connectDb } from "./config";
import { authenticationRouter, userRouter } from './routes';

const app = express();
app.use(express.json());

// config dot env file
dotenv.config();

//database with database
// connectDb();


app.use('/authentication', authenticationRouter);
app.use('/user', userRouter);

app.get('/', (req, res)=>{
    res.send("Hello world !")
})

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server app Listing at http://localhost:${PORT}`);
})