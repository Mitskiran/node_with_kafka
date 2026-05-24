import  express, { type NextFunction, type Request, type Response }  from "express";

const router = express.Router();

router.get("/product", async (req:Request, res:Response, next:NextFunction)=>{
    return res.status(200).json({message:"implemented"});
});


export default router;