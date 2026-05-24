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
    find(): Promise<[]> {
        throw new Error("Method not implemented.");
    }
    findbyID(id: Number, limit:number, offset:number): Promise<Product> {
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