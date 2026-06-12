import express, { Request, Response, NextFunction }  from "express";
import * as cartService from "../service/cart.service"
import * as repository from "../repository/cart.repository"
import * as controllers from "../controllers/cart.controllers"
const router   = express.Router();
const repo = repository.cartRepository
router.post("/cart", controllers.default.createCartController)

router.get("/cart", controllers.default.getCartController)


router.delete("/cart/:id", controllers.default.deleteCardController)






export default router;
