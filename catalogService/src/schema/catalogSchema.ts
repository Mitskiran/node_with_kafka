import Mongoose, { mongo } from "mongoose"

const catalogSchema = new Mongoose.Schema({
    name:{
        type:String,
        required: [true, "name is required"],

    },
    description:{
        type:String,
       


    },

    stock:{
        type: Number,
        required: [true, "stock is required"],
    },

    price:{
        type: Number,
         required: [true, "price is required"],
    }


    
})


module.exports = Mongoose.model("catalogSchema", catalogSchema);
// public readonly name:string,
    //     public readonly description:string,
    //     public readonly price:number,
    //     public readonly stock:Number,
    //     public readonly id?:number,