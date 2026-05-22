import type { Product } from "../models/product.model";

export interface IcatalogRepository{
    create(data:Product): Promise<Product>;
    update(data:Product): Promise<Product>;
    delete(id:Number):void;
    find(): Promise<[]>;
    findbyID(id:Number): Promise<Product>;
}