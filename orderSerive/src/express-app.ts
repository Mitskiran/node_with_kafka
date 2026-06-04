import express, { Request, Response,NextFunction } from "express"
// import catalogRouter from "./api/order.routes"
import cors from "cors"

const app = express()
app.use(cors());

app.use(express.json());

app.use("/api", (req:Request, res:Response, next:NextFunction)=>{
        return res.status(200).json({message:"i am here in order service"});

    })



export default app;
