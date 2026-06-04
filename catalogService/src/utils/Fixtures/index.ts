import { Factory } from "rosie"
import {faker}from "@faker-js/faker"
import { Product } from "../../models/product.model"

export const FactoryProduct = new Factory<Product>()
.attr("id", faker.datatype.number({min:1, max:1000}))
.attr("name", faker.commerce.productName())
.attr("description", faker.commerce.productDescription())
.attr("stock", faker.datatype.number({min:1, max:100}))
.attr("price", faker.datatype.number({min:100, max:10000}))

/*


add a new Squash 









*/