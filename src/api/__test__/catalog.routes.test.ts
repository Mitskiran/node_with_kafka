import request from "supertest";
import express from "express";
import {faker} from "@faker-js/faker"

import catalogRoutes, {catalogService}  from "../catalog.routes";
import { FactoryProduct } from "../../utils/Fixtures";
import { Product } from "../../models/product.model";
import expectCookies from "supertest/lib/cookies";

const app = express();




app.use(express.json())
 
app.use("/", catalogRoutes);

const mockRequest = ()=>{
    return{
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.datatype.number({min:10, max:100}),
    price: faker.datatype.number({min:10, max:100}),
    }
}


describe("Catalog Routes",()=>{
    describe("POST /Products", ()=>{

        test("created product successfully",async ()=>{
            const product = FactoryProduct.build();

            jest.spyOn(catalogService,"createProduct").mockImplementationOnce(()=>Promise.resolve(product))
            const requestBody = mockRequest()
            const response = await request(app)
            .post("/Products")
            .send(requestBody)
            .set("Accept", "application/json");

            

            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);
            


        })
        test("should give validation error when ID is missing with 400",async ()=>{
          
            const reqBody = mockRequest();
            const errorRequestBody = {...reqBody, name:""};

            const response = await request(app)
            .post("/products")
            .send(errorRequestBody)
            .set("Accept","application/json")

            expect(response.status).toBe(400);
        })

        
    })
    describe("GET /Products", ()=>{
        test("to get implemented",async ()=>{
            const reqBody = { 
             limit : faker.datatype.number({min:10, max:100}),
             offset : faker.datatype.number({min:10, max:100})
            }
            const product = FactoryProduct.buildList(10);
            // jest.spyOn(catalogService,"getProducts").mockResolvedValueOnce(product)
            jest.spyOn(catalogService,"getProducts").mockImplementationOnce(()=>{
                return Promise.resolve(product)
            })
            const response = await request(app)
            .get("/products")
            .query(reqBody)
            .set("Accept", "application/json")
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product)
        })
        
            
    })
})


