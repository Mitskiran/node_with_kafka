"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const faker_1 = require("@faker-js/faker");
const catalog_routes_1 = __importStar(require("../catalog.routes"));
const Fixtures_1 = require("../../utils/Fixtures");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", catalog_routes_1.default);
const mockRequest = () => {
    return {
        name: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.productDescription(),
        stock: faker_1.faker.datatype.number({ min: 10, max: 100 }),
        price: faker_1.faker.datatype.number({ min: 10, max: 100 }),
    };
};
describe("Catalog Routes", () => {
    describe("POST /Products", () => {
        test("created product successfully", async () => {
            const product = Fixtures_1.FactoryProduct.build();
            jest.spyOn(catalog_routes_1.catalogService, "createProduct").mockImplementationOnce(() => Promise.resolve(product));
            const requestBody = mockRequest();
            const response = await (0, supertest_1.default)(app)
                .post("/Products")
                .send(requestBody)
                .set("Accept", "application/json");
            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);
        });
        test("should give validation error when ID is missing with 400", async () => {
            const reqBody = mockRequest();
            const errorRequestBody = { ...reqBody, name: "" };
            const response = await (0, supertest_1.default)(app)
                .post("/products")
                .send(errorRequestBody)
                .set("Accept", "application/json");
            expect(response.status).toBe(400);
        });
    });
    describe("GET /Products", () => {
        test("to get implemented", async () => {
            const reqBody = {
                limit: faker_1.faker.datatype.number({ min: 10, max: 100 }),
                offset: faker_1.faker.datatype.number({ min: 10, max: 100 })
            };
            const product = Fixtures_1.FactoryProduct.buildList(10);
            // jest.spyOn(catalogService,"getProducts").mockResolvedValueOnce(product)
            jest.spyOn(catalog_routes_1.catalogService, "getProducts").mockImplementationOnce(() => {
                return Promise.resolve(product);
            });
            const response = await (0, supertest_1.default)(app)
                .get("/products")
                .query(reqBody)
                .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        });
    });
});
