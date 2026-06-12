import mongoose from "mongoose";

export const connectMongoDB  = async ()=>{
    try {
        console.log(process.env.MONGO_URI);
        const MONGO_URI:string = process.env.MONGO_URI!;
            const connection = await mongoose.connect(MONGO_URI);
            console.log("connection is successfully done");
        
    } catch (error:any) {
        throw new Error(error);
        
    }
}


