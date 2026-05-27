import type { IcatalogRepository } from "../interface/catalogReposiory.interface.ts";
import type { Product } from "../models/product.model.ts";
//to be edited with actual product implementation
export class CatalogRepository implements IcatalogRepository{
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    findbyIdandDelete(id: Number): number|string {
        
        throw new Error("Method not implemented.");
    }
    find(): Promise<[]> {
        throw new Error("Method not implemented.");
    }
    findbyID(id: Number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}
