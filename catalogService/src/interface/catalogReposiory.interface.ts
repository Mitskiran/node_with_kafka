import type { Product } from "../models/product.model";

export interface IcatalogRepository{
    create(data:Product): Promise<Product>;
    update(data:Product): Promise<Product>;
    findbyIdandDelete(id:Number):number|string;
    find(limit:number, offset:number): Promise<Product[]>;
    findbyID(id:Number): Promise<Product>;
}