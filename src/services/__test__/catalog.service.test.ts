
import { IcatalogRepository } from "../../interface/catalogReposiory.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.Repository";
import { CatalogService } from "../catalogService";


const mockProduct = ()=>{

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
                 const testProduct =mockProduct;
                //{
                //     name:"Kiran",
                //     description:"some description",
                //     stock:10,
                //     price:100,
                // }
                const result =  await service.createProduct(testProduct);
                expect(result).toMatchObject({
                    id:expect.any(Number),
                    name:expect.any(String),
                    price:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String)
                });

        })
        test("test should delete a product",()=>{

            const service = new CatalogService(repository)

        })

    })
    
    
    
    
});