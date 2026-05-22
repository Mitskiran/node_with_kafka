import type { IcatalogRepository } from "../interface/catalogReposiory.interface";
import type { Product } from "../models/product.model";

export class CatalogService{
    private __repository:IcatalogRepository;
    constructor(__repository:IcatalogRepository){

    }
    createProduct(input:any){

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