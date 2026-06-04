import  express, { type NextFunction, type Request, type Response }  from "express";
import { CatalogRepository } from "../repository/catalog.repository";
import { CatalogService } from "../services/catalogService";
import { CreateProductRequest, updateProductRequest } from "../dto/product.dto";
import { validationRequest } from "../utils/Fixtures/requestValidator";

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());


router.post("/products",async(req:Request, res:Response, next:NextFunction)=>{
    
    const {error, input } = await validationRequest(CreateProductRequest, req.body)
    if(error)
    {
        return res.status(400).json(error);
    }
    const data = await catalogService.createProduct(input);

    return res.status(201).json(data);
})

router.patch("/product/:id",async (req:Request, res:Response, next:NextFunction)=>{
    try {
        
     const {error, input} = await validationRequest(updateProductRequest, req.body);
     if(error)
     {
        return res.status(400).json(error)
     }

     let id = Number(req.params.id);
     const updatedProduct = await catalogService.updateProduct(id, input)

    

        if(updatedProduct.id)
        {
         return res.status(201).json(updatedProduct);
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }

        return res.status(400).json("Unable to create the product");
    

});
router.get("/products", async (req:Request, res:Response, next:NextFunction)=>{
    try {
        
        const limit = Number(req.query.limit);

    const offset = Number(req.query.offset);
    const productArray = await catalogService.getProducts(limit, offset);
    if(productArray.length)
    {
        return res.status(200).json(productArray);
    }
    else
    {    return res.status(200).json(productArray);
    }
    
    } catch (error) {
        return res.status(400).json(error);
    }
    
});

router.get("/products/:id", async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const id = Number(req.params.id);
    const Product = await catalogService.getProduct(id);
    
    
        return res.status(200).json(Product);
    
    
      
    
    
    } catch (error) {
        return res.status(400).json(error);
    }
    
});


export  default router;



