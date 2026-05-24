import { mock } from "node:test";
import type { IcatalogRepository } from "../interface/catalogReposiory.interface.ts";
import { Product } from "../models/product.model.js";
import { promiseHooks } from "node:v8";


export class MockCatalogRepository implements IcatalogRepository{
   async  create(data: Product): Promise<Product> {
        const mockData = {
            id:123,
            ...data
        }
        return Promise.resolve(mockData)
        
    }
    update(data: Product): Promise<Product> {
        

        return Promise.resolve(data);
    }
    delete(id: Number): void {
        throw new Error("Method not implemented.");
    }
    find(limit:number, offset:number): Promise<Product[]> {
        console.log("dev mein changes kiye re baba");
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