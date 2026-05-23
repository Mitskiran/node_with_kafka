import  { IcatalogRepository } from "../interface/catalogReposiory.interface";
import  { Product } from "../models/product.model";

export class CatalogService{
    private __repository:IcatalogRepository;
    constructor(__repository:IcatalogRepository){
        this.__repository=__repository;                                 ``
    }
   async createProduct(input:any){
        
        const data = await this.__repository.create(input)
        return data;
    }
    updateProduct(input:any) {
    }
    deleteProduct(id:number){
    }
    getProducts(limit:number, offset:number){

    }
    getProduct(id:number,limit:number, offset:number){

    }

    
}