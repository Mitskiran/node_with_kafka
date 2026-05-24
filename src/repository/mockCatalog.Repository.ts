
import type { IcatalogRepository } from "../interface/catalogReposiory.interface.ts";
import { Product } from "../models/product.model.js";



export class MockCatalogRepository implements IcatalogRepository{
   async create(data: Product): Promise<Product> {
        const mockData = {
            id:123,
            ...data
        }
        return Promise.resolve(mockData)
        
    }
    update(data: Product): Promise<Product> {
        

        return Promise.resolve(data);
    }
    findbyIdandDelete(id: number): number|string {
        if(id<10 || id>0)
        {
        return id
        }
    else{
        return "unable to find the product";
        }
    }
    find(limit:number, offset:number): Promise<Product[]> {
        const mockData:Product[]=[{
            id:123,
            name:"kiran",
            description:"amusement park",
            price:100,
            stock:10,
        },{id:124,
            name:"Sagar",
            description:"amusement park Sagar",
            price:100,
            stock:10,},
        {id:125,
            name:"kiran",
            description:"amusement park Mitke",
            price:100,
            stock:10,}] 
    return Promise.resolve(mockData)

    }
    findbyID(id: number, limit:number, offset:number): Promise<Product> {
        const mockdata:Product={
            id:id,
            name:"kiran",
            description:"amusement park",
            price:100,
            stock:10,
        } 
       return Promise.resolve(mockdata)
        
    }

}