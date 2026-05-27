"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockCatalog_Repository_1 = require("../../repository/mockCatalog.Repository");
const catalogService_1 = require("../catalogService");
const faker_1 = require("@faker-js/faker");
const Fixtures_1 = require("../../utils/Fixtures");
Fixtures_1.FactoryProduct;
const mockProduct = (rest) => {
    return {
        name: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.productDescription(),
        stock: faker_1.faker.datatype.number({ min: 10, max: 100 }),
        ...rest
    };
};
describe("This is first test case", () => {
    let repository;
    beforeEach(() => {
        repository = new mockCatalog_Repository_1.MockCatalogRepository();
    });
    afterEach(() => {
        repository = {};
    });
    describe("create Product", () => {
        test("test Should Create Product", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testProduct = mockProduct({ price: +faker_1.faker.commerce.price()
            });
            const result = await service.createProduct(testProduct);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
                description: expect.any(String)
            });
        });
        test("Should  failed when existing product is there", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testProduct = mockProduct({ price: +faker_1.faker.commerce.price()
            });
            jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.resolve({}));
            await expect(service.createProduct(testProduct)).rejects.toThrow("Product is already Exists");
        });
        test("Should  failed when unable to create product due to database issue", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testProduct = mockProduct({ price: +faker_1.faker.commerce.price()
            });
            jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.reject(new Error("unable to create Product")));
            await expect(service.createProduct(testProduct)).rejects.toThrow("unable to create Product");
        });
    });
    describe("update Product", () => {
        test("should update the product", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testProduct = mockProduct({ price: +faker_1.faker.commerce.price(),
                id: faker_1.faker.datatype.number({ min: 10, max: 1000 })
            });
            const result = await service.updateProduct(testProduct);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
                description: expect.any(String)
            });
        });
        test("Product Does not exist", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testProduct = mockProduct({ price: +faker_1.faker.commerce.price(),
                id: faker_1.faker.datatype.number({ min: 10, max: 1000 })
            });
            jest.spyOn(repository, "update").mockImplementationOnce(() => Promise.resolve({}));
            await expect(service.updateProduct(testProduct)).rejects.toThrow("Id does not exist hence unable to update the product");
        });
        test("unable to update product", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testProduct = mockProduct({ price: +faker_1.faker.commerce.price(),
                id: faker_1.faker.datatype.number({ min: 10, max: 1000 })
            });
            jest.spyOn(repository, "update").mockImplementationOnce(() => Promise.reject(new Error("unable to create Product due to database error")));
            await expect(service.updateProduct(testProduct)).rejects.toThrow("unable to create Product due to database error");
        });
    });
    describe("get Product", () => {
        test("should get the product", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testProduct = { id: faker_1.faker.datatype.number({ min: 10, max: 1000 }),
                limit: faker_1.faker.datatype.number({ min: 10, max: 50 }),
                offset: faker_1.faker.datatype.number({ min: 10, max: 50 })
            };
            const result = await service.getProduct(testProduct.id, testProduct.limit, testProduct.offset);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
                description: expect.any(String)
            });
        });
        test("unable to fetch Product", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testProduct = { id: faker_1.faker.datatype.number({ min: 10, max: 1000 }),
                limit: faker_1.faker.datatype.number({ min: 10, max: 50 }),
                offset: faker_1.faker.datatype.number({ min: 10, max: 50 })
            };
            jest.spyOn(repository, "findbyID").mockImplementationOnce(() => Promise.resolve({}));
            await expect(service.getProduct(testProduct.id, testProduct.limit, testProduct.offset)).rejects.toThrow("Id does not exist hence unable to get the product");
        });
        test("Error in DB when fetching the product", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testProduct = { id: faker_1.faker.datatype.number({ min: 10, max: 1000 }),
                limit: faker_1.faker.datatype.number({ min: 10, max: 50 }),
                offset: faker_1.faker.datatype.number({ min: 10, max: 50 })
            };
            jest.spyOn(repository, "findbyID").mockImplementationOnce(() => Promise.reject(new Error("Error in DB when fetching the product")));
            await expect(service.getProduct(testProduct.id, testProduct.limit, testProduct.offset)).rejects.toThrow("Error in DB when fetching the product");
        });
    });
    describe("get Products", () => {
        test("should fetch all producta", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const input = { limit: faker_1.faker.datatype.number({ min: 1, max: 10 }),
                offset: faker_1.faker.datatype.number({ min: 1, max: 10 }) };
            const AllProducts = await service.getProducts(input.limit, input.offset);
            for (let product of AllProducts) {
                expect(product).toMatchObject({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number),
                    stock: expect.any(Number),
                    description: expect.any(String)
                });
            }
        });
        test("Unable to Fetch all products due to DB error", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const input = { limit: faker_1.faker.datatype.number({ min: 1, max: 10 }),
                offset: faker_1.faker.datatype.number({ min: 1, max: 10 }) };
            jest.spyOn(repository, "find").mockImplementationOnce(() => Promise.reject(new Error("Unable to fetch due to DB error")));
            await expect(service.getProducts(input.limit, input.offset)).rejects.toThrow("Unable to fetch due to DB error");
        });
    });
    describe("delete Products", () => {
        test("delete product using the ID", async () => {
            const service = new catalogService_1.CatalogService(repository);
            const testId = { id: faker_1.faker.datatype.number({ min: 1, max: 10 }) };
            const result = await service.deleteProduct(testId.id);
            if (result == testId.id) {
                expect(result).toEqual(testId.id);
            }
            else {
                test("unable to find the product", () => {
                    expect(result).toEqual("unable to find the product");
                });
            }
        });
    });
});
