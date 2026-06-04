import request from "supertest";
import express from "express";
import {faker} from "@faker-js/faker"

import catalogRoutes, {catalogService}  from "../catalog.routes";
import { FactoryProduct } from "../../utils/Fixtures";




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


describe("Catalog Routes Tests",()=>{
    describe("PATCH Products/:id",()=>{
        test("should update a product when given ID",async ()=>{
            
            const product = FactoryProduct.build();
            const id=product.id;
            let  updateProducts=mockRequest();

            jest.spyOn(catalogService,"updateProduct").mockImplementationOnce(()=>Promise.resolve(product))
            const response = await request(app)
            .patch(`/product/${id}`)
            .send(updateProducts)
            .set("Accept","application/json")
            
            // console.log(response.body);

            expect(response.status).toBe(201)
            expect(response.body).toEqual(product)
            
        })
        test("should give error when update product with given ID",async ()=>{
            
            const product = FactoryProduct.build();
            const id=product.id;
            let  updateProducts=mockRequest();

            jest.spyOn(catalogService,"updateProduct").mockImplementationOnce(()=>Promise.reject("Unable to create the product"))
            const response = await request(app)
            .patch(`/product/${id}`)
            .send(updateProducts)
            .set("Accept","application/json")
            
            console.log(response.body);
            
            expect(response.status).toBe(500)
            expect(response.body).toEqual("Unable to create the product");

            
        })
        test("should give an error when passing negative value to price",async ()=>{
            const factoryProduct = await FactoryProduct.build();
            const requestBody = mockRequest();
            const updaterequestBody = {...requestBody, price:-1};
            
            jest.spyOn(catalogService, "updateProduct").mockImplementationOnce(()=>Promise.resolve(factoryProduct))
            const response = await request(app)
            .patch(`/product/${factoryProduct.id}`)
            .send(updaterequestBody)
            .set("Accept","application/json")

            expect(response.status).toBe(400)
            expect(response.body).toEqual("price must not be less than 1");
       })
    })
    describe("POST /Products", ()=>{

        test("created product successfully",async ()=>{
            const product = FactoryProduct.build();
            // console.log(product);
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
            // console.log(response.body);
            expect(response.status).toBe(400);
            expect(response.body).toEqual("name should not be empty")
        })
        

        
    })
    describe("GET /Products?limit=0&offset=0", ()=>{
        test("should receive the list of Array",async ()=>{
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
            .get(`/products?limit=${reqBody.limit}&offset=${reqBody.offset}`)
            .set("Accept", "application/json")
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product)
        })

        test("should give unable to find product string when no Product array Recieved",async ()=>{
            const reqBody = { 
             limit : faker.datatype.number({min:10, max:100}),
             offset : faker.datatype.number({min:10, max:100})
            }
            const product = FactoryProduct.buildList(0);
         
            jest.spyOn(catalogService,"getProducts").mockImplementationOnce(()=>{
                
                return Promise.resolve(product);
            })

            const response = await request(app)
            .get(`/products?limit=${reqBody.limit}&offset=${reqBody.offset}`)
            .set("Apply","application/json")

            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)
        })
        
            
    })

    describe("GET /Products:id", ()=>{
        test("should receive the product",async ()=>{
            

            const product = FactoryProduct.build();
            // jest.spyOn(catalogService,"getProducts").mockResolvedValueOnce(product)
            jest.spyOn(catalogService,"getProduct").mockImplementationOnce(()=>{
                return Promise.resolve(product)
            })
            const response = await request(app)
            .get(`/products/${product.id}`)
            .set("Accept", "application/json")



            expect(response.status).toBe(200);
            expect(response.body).toEqual(product)
        })

        test("should give unable to find product string when no Product  Recieved for the id",async ()=>{
    
            const product = FactoryProduct.build();
            const emptyProduct = {...product, id:0}
            jest.spyOn(catalogService,"getProduct").mockImplementationOnce(()=>{
                
                return Promise.resolve(emptyProduct);
            })

            const response = await request(app)
            .get(`/products/${product.id}`)
            .set("Apply","application/json")

            expect(response.status).toBe(200)
            expect(response.body.id).toBe(0)
        })
        
            
    })
})








