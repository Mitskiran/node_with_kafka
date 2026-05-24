
import { response } from "express";
import { IcatalogRepository } from "../../interface/catalogReposiory.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.Repository";
import { CatalogService } from "../catalogService";
import {faker} from "@faker-js/faker";


const mockProduct = (rest:any)=>{
    return{
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.datatype.number({min:10, max:100}),
    ...rest
    }
}





describe("This is first test case",()=>{
    let repository: IcatalogRepository;

    
    beforeEach(()=>{
       repository= new MockCatalogRepository();
    });
    afterEach(()=>{
        repository={} as MockCatalogRepository;
    });
        

    describe("create Product",()=>{
        test("test Should Create Product",async ()=>{
                const service = new CatalogService(repository);
                 const testProduct = mockProduct(
                    {price: +faker.commerce.price()
                    }
                 )
                const result =  await service.createProduct(testProduct);
                expect(result).toMatchObject({
                    id:expect.any(Number),
                    name:expect.any(String),
                    price:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String)
                });

        })
        test("Should  failed when existing product is there",async ()=>{
                
            const service = new CatalogService(repository);
                 const testProduct = mockProduct(
                    {price: +faker.commerce.price()
                    }
                 )


                 jest.spyOn(repository, "create").mockImplementationOnce(()=>Promise.resolve({} as Product))
            await expect(
                        service.createProduct(testProduct)
                        ).rejects.toThrow("Product is already Exists");
            
                

        })
        test("Should  failed when unable to create product due to database issue",async ()=>{
                
            const service = new CatalogService(repository);
                 const testProduct = mockProduct(
                    {price: +faker.commerce.price()
                    }
                 )


                 jest.spyOn(repository, "create").mockImplementationOnce(()=>Promise.reject(new Error("unable to create Product")))
            await expect(
                        service.createProduct(testProduct)
                        ).rejects.toThrow("unable to create Product");
            
                

        })

    })
    describe("update Product", ()=>{
        test("should update the product",async()=>{
            const service = new CatalogService(repository);
                 const testProduct = mockProduct(
                    {price: +faker.commerce.price(),
                        id: faker.datatype.number({min:10, max:1000})
                    }
                 )
                const result =  await service.updateProduct(testProduct);
                expect(result).toMatchObject({
                    id:expect.any(Number),
                    name:expect.any(String),
                    price:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String)
                });
        })

        test("Product Does not exist",async ()=>{
        const service = new CatalogService(repository);
                 const testProduct = mockProduct(
                    {price: +faker.commerce.price(),
                        id: faker.datatype.number({min:10, max:1000})
                    }
                 )

                 jest.spyOn(repository,"update").mockImplementationOnce(()=>Promise.resolve({} as unknown as Product))
                 await expect(service.updateProduct(testProduct)).rejects.toThrow("Id does not exist hence unable to update the product");
        })
        test("unable to update product",async ()=>{
        const service = new CatalogService(repository);
                 const testProduct = mockProduct(
                    {price: +faker.commerce.price(),
                        id: faker.datatype.number({min:10, max:1000})
                    }
                 )

                 jest.spyOn(repository,"update").mockImplementationOnce(()=>Promise.reject(new Error("unable to create Product due to database error")));

                 await expect(service.updateProduct(testProduct)).rejects.toThrow("unable to create Product due to database error");

        })
    })
    describe("get Product", ()=>{
        test("should get the product",async()=>{
            const service = new CatalogService(repository);
                 const testProduct ={id: faker.datatype.number({min:10, max:1000})
                    , limit: faker.datatype.number({min:10, max:50})
                    , offset: faker.datatype.number({min:10, max:50})
                    }
                 
                const result =  await service.getProduct(testProduct.id, testProduct.limit, testProduct.offset);
                expect(result).toMatchObject({
                    id:expect.any(Number),
                    name:expect.any(String),
                    price:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String)
                });
        })

         test("unable to fetch Product",async ()=>{
        const service = new CatalogService(repository);
                 const testProduct ={id: faker.datatype.number({min:10, max:1000})
                    , limit: faker.datatype.number({min:10, max:50})
                    , offset: faker.datatype.number({min:10, max:50})
                    }

                 jest.spyOn(repository,"findbyID").mockImplementationOnce(()=>Promise.resolve({} as unknown as Product))
                 await expect(service.getProduct(testProduct.id, testProduct.limit, testProduct.offset)).rejects.toThrow("Id does not exist hence unable to get the product");
        })
        // test("unable to update product",async ()=>{
        // const service = new CatalogService(repository);
        //          const testProduct = mockProduct(
        //             {price: +faker.commerce.price(),
        //                 id: faker.datatype.number({min:10, max:1000})
        //             }
        //          )

        //          jest.spyOn(repository,"update").mockImplementationOnce(()=>Promise.reject(new Error("unable to create Product due to database error")));

        //          await expect(service.updateProduct(testProduct)).rejects.toThrow("unable to create Product due to database error");
                 
        // })
    })
    
    
    
    
});;