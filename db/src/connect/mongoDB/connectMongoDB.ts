import mongoose from "mongoose"
let time:any
export const connectMongoDB = async ()=>{
    clearTimeout(time);
     time = setInterval(async ()=>{
        try {
         const MONGO_URI:string = process.env.MONGO_URI!;
        const connection = await mongoose.connect(MONGO_URI)
        console.log("mongoDB is connected successfully");
        return Promise.resolve("connected");
        
    } catch (error:any) {
        throw new Error(error);
    }

    },5000)
    
   
}
;