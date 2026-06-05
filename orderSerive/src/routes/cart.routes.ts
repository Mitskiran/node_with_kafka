import express, { Request, Response, NextFunction }  from "express";
import * as cartService from "../service/cart.service"
import * as repository from "../repository/cart.repository"
const router   = express.Router();
const repo = repository.cardRepository
router.post("/cart", async(req:Request, res:Response, next: NextFunction)=>{
    const repsonse = await cartService.createCart(req.body,repo);
    return res.status(200).json(repsonse);
})

router.get("/cart", async(req:Request, res:Response, next: NextFunction)=>{
    const repsonse = await cartService.getCart(req.body,repo);
    return res.status(200).json(repsonse);
})


router.delete("/cart/:id", async(req:Request, res:Response, next: NextFunction)=>{
     const repsonse = await cartService.deleteCart(req.params.id,repo);
    return res.status(200).json(repsonse);
})






export default router;
