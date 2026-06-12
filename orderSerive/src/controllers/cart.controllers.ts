import express, { Request, Response, NextFunction }  from "express";
import * as cartService from "../service/cart.service"
import * as repository from "../repository/cart.repository"
const repo = repository.cartRepository
const createCartController = async(req:Request, res:Response, next: NextFunction)=>{
    const repsonse = await cartService.createCart(req.body,repo);
    return res.status(200).json(repsonse);
}

const getCartController = async(req:Request, res:Response, next: NextFunction)=>{
    const repsonse = await cartService.getCart(req.body,repo);
    return res.status(200).json(repsonse);
}


const deleteCardController = async(req:Request, res:Response, next: NextFunction)=>{
     const repsonse = await cartService.deleteCart(req.params.id,repo);
    return res.status(200).json(repsonse);
}

export default  {createCartController, getCartController, deleteCardController}
