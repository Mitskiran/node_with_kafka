"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
class CatalogService {
    // here the database "__repository" is injected runtime with iCatalogRepository as Interface type.
    constructor(__repository) {
        this.__repository = __repository;
        ``;
    }
    async createProduct(input) {
        try {
            const data = await this.__repository.create(input);
            if (!data.id) {
                throw new Error("Product is already Exists");
            }
            return data;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async updateProduct(input) {
        try {
            const data = await this.__repository.update(input);
            //emit event to elasctic search as well.
            if (!data.id) {
                throw new Error("Id does not exist hence unable to update the product");
            }
            return data;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async deleteProduct(id) {
        const DeletedProduct = await this.__repository.findbyIdandDelete(id);
        return DeletedProduct;
    }
    async getProducts(limit, offset) {
        try {
            const products = await this.__repository.find(limit, offset);
            return products;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async getProduct(id, limit, offset) {
        try {
            const product = await this.__repository.findbyID(id, limit, offset);
            if (!product.id) {
                throw new Error("Id does not exist hence unable to get the product");
            }
            return product;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.CatalogService = CatalogService;
