import { mock } from "node:test";
import type { IcatalogRepository } from "../interface/catalogReposiory.interface.ts";
import { Product } from "../models/product.model.js";

export class MockCatalogRepository implements IcatalogRepository{
   async  create(data: Product): Promise<Product> {
        const mockData = {
            id:123,
            ...data
        }
        return Promise.resolve(mockData)
        
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: Number): void {
        throw new Error("Method not implemented.");
    }
    find(): Promise<[]> {
        throw new Error("Method not implemented.");
    }
    findbyID(id: Number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}