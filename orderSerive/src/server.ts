 import app from "./express-app"
import dotenv from "dotenv"
import {connectMongoDB} from "./db/connectMongoDB"
dotenv.config();

const PORT = process.env.APP_PORT || 9003
connectMongoDB()
export const startServer=()=>{


    app.listen(PORT, ()=>{
    console.log("server is listening and can be access on http://localhost:9003/api");
    
    console.log("server is listening and can be access on http://localhost:9003/cart");
    
 
})
process.on('uncaughtException', async(err)=>{
    console.log(err);
    process.exit(1);
})
}



startServer();
