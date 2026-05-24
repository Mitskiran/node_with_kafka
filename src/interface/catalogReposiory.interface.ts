import type { Product } from "../models/product.model";

export interface IcatalogRepository{
    create(data:Product): Promise<Product>;
    update(data:Product): Promise<Product>;
    delete(id:Number):void;
    find(limit:number, offset:number): Promise<Product[]>;
    findbyID(id:Number, limit:number, offset:number): Promise<Product>;
}