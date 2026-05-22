import type { IcatalogRepository } from "../interface/catalogReposiory.interface.ts";
import type { Product } from "../models/product.model.ts";

export class MockCatalogRepository implements IcatalogRepository{
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
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