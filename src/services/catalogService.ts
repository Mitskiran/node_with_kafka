import { off } from "node:cluster";
import  { IcatalogRepository } from "../interface/catalogReposiory.interface";
import  { Product } from "../models/product.model";

export class CatalogService{
    private __repository:IcatalogRepository;
    // here the database "__repository" is injected runtime with iCatalogRepository as Interface type.
    constructor(__repository:IcatalogRepository){
        this.__repository=__repository;                                 ``
    }
   async createProduct(input:any){
        try {
            const data = await this.__repository.create(input);
        if(!data.id) {
            throw new Error("Product is already Exists");
        }

        return data;
            
        } catch (error) {
           throw new Error(`${error}`);
        }
        
    }
    async updateProduct(input:any) {
        try{
        const data = await this.__repository.update(input);
        //emit event to elasctic search as well.
        if(!data.id)
        {
            throw new Error("Id does not exist hence unable to update the product");
        }
        return data;
        }
        catch(error)
        {
             throw new Error(`${error}`);
        }

    
                     
    }
    deleteProduct(id:number){
    }
    async getProducts(limit:number, offset:number){
        const data = this.__repository.find(limit, offset)
        return data;

    }
    async getProduct(id:number,limit:number, offset:number){
        try{
        const product = await this.__repository.findbyID(id, limit, offset)
        if(!product.id)
        {
            throw new Error("Id does not exist hence unable to get the product");
        }
        return product;
        }
        catch(error){
        throw new Error(`${error}`);
        }


    }

    
}




