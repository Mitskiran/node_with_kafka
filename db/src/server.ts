import express from "express";
import { connectMongoDB } from "./connect/mongoDB/connectMongoDB";
import dotenv from "dotenv"

const app =express();


app.use(express.json())
dotenv.config();

connectMongoDB();

export const startServer=()=>{
app.listen(process.env.PORT || 5000, ()=>{
    console.log("DB server connected successfully and listening on port 5000");
})
}



startServer();
