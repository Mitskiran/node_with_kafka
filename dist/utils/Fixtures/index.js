"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryProduct = void 0;
const rosie_1 = require("rosie");
const faker_1 = require("@faker-js/faker");
exports.FactoryProduct = new rosie_1.Factory()
    .attr("id", faker_1.faker.datatype.number({ min: 1, max: 1000 }))
    .attr("name", faker_1.faker.commerce.productName())
    .attr("description", faker_1.faker.commerce.productDescription())
    .attr("stock", faker_1.faker.datatype.number({ min: 1, max: 100 }))
    .attr("price", faker_1.faker.datatype.number({ min: 100, max: 10000 }));
