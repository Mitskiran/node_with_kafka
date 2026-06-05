import express, { Request, Response,NextFunction } from "express"
 import orderRoutes from "./routes/order.routes"
 import cartRoutes from "./routes/cart.routes"
import cors from "cors"

const app = express()
app.use(cors());

app.use(express.json());


app.use(orderRoutes);
app.use(cartRoutes);
app.use("/api", (req:Request, res:Response, next:NextFunction)=>{
        return res.status(200).json({message:"i am here in order service"});

    })



export default app;
