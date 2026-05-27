import  express, { type NextFunction, type Request, type Response }  from "express";
import { CatalogRepository } from "../repository/catalog.repository";
import { CatalogService } from "../services/catalogService";
import { off } from "node:cluster";

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());


router.post("/products",async(req:Request, res:Response, next:NextFunction)=>{
    
    if(!req.body.name)
    {
        res.status(400).json({message: "name is required"});
    }
    const data = await catalogService.createProduct(req.body);

    return res.status(201).json(data);
})
router.get("/products", async (req:Request, res:Response, next:NextFunction)=>{
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    console.log(limit);
    console.log(offset);
    const productArray = await catalogService.getProducts(limit, offset);

    return res.status(200).json(productArray);
});


export  default router;